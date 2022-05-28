//httpConfig.interceptor.ts
import {
  HttpBackend,
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {LoaderService} from "../services/loader.service";
import {GlobalConstant} from "../GlobalConstant";
import {StorageService} from "../services/storage.service";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  loaderToShow: any;
  token: any

  constructor(
    public loaderService: LoaderService,
    private httpClient: HttpClient,
    private httpBackend: HttpBackend,
    private storageService: StorageService
  ) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes('get')){
      //console.log("skip loading")
      this.loaderService.showLoader()
    }


    return from(this.handle(request, next)).pipe(
      map((event: HttpEvent<any>) => {
        this.loaderService.hideLoader()
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 419) {
          this.csrf_token(true)
          this.loaderService.showToast("Try again", "warning")
        } else if ([403, 401, 422].includes(error.status)) {
          this.loaderService.showToast(error.error.message, "danger")
        }
        else if(error.status == 404){
          this.loaderService.showToast(error.error.message||"Item not found", "danger", 5000)
        }
        else if(error.status >= 500){
          this.loaderService.showToast("Server went haywire", "danger", 5000, "close-circle-sharp")
        }
        else{
          this.loaderService.showToast(error.message, "danger")
        }
        this.loaderService.hideLoader()
        return throwError(error);
      }))
  }

  load_csrf() {
    let httpClient = new HttpClient(this.httpBackend);
    return httpClient.get(GlobalConstant.apiUrl + 'csrf').pipe(
      catchError(this.handleError<[]>('initiate csrf'))
    );
  }

  async csrf_token(force = false) {
    if (force) {
      this.load_csrf().subscribe((response) => {
        //console.log('from server...')
        //@ts-ignore
        if (response.csrf != null) {
          //@ts-ignore
          this.storageService.set('csrf_token', response.csrf);
          //@ts-ignore
          this.token = response.csrf
        } else {
          this.loaderService.showToast('Failed to load CSRF token', "danger", 4000)
        }
      })

    }
    this.token = await this.storageService.get('csrf_token');
    //console.log(this.token)
    if (!this.token) {
      this.load_csrf().subscribe((response) => {
        //console.log('from server...')
        //@ts-ignore
        if (response.csrf != null) {
          //@ts-ignore
          this.storageService.set('csrf_token', response.csrf);
          //@ts-ignore
          this.token = response.csrf
        } else {
          this.loaderService.showToast('Failed to load CSRF token', "danger", 4000)
        }
      })
    }
  }

  public handleError<T>(operation: string, result?: T) {
    this.loaderService.hideLoader()
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private async handle(request: HttpRequest<any>, next: HttpHandler) {
    if (request.method === 'GET' || request.method === 'HEAD') {
      return next.handle(request).toPromise()
    }
    await this.csrf_token()

    //if (!request.headers.has('Content-Type')) {
    request = request.clone({
      setHeaders: {
        'content-type': 'application/json',
        'X-CSRF-TOKEN': this.token
      }
    });
    //}

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
      withCredentials: true
    });
    return next.handle(request).toPromise();
  }
}
