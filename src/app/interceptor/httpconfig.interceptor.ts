//httpConfig.interceptor.ts
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse, HttpClient, HttpContext, HttpContextToken, HttpBackend
} from '@angular/common/http';
import {from, Observable, of, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {LoaderService} from "../services/loader.service";
import {DataDepartment} from "../dataclass/DataDepartment";
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
    return from(this.handle(request, next)).pipe(
      map((event: HttpEvent<any>) => {
        this.loaderService.hideLoader()
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if ([419, 401, 422].includes(error.status)) {
          this.loaderService.showToast(error.error.message, "danger")
        } else {
          this.loaderService.showToast(error.message, "danger")
        }
        this.loaderService.hideLoader()
        return throwError(error);
      }))
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
    this.loaderService.showLoader()

    return next.handle(request).toPromise();
  }

  load_csrf() {
    let httpClient = new HttpClient(this.httpBackend);
    return httpClient.get(GlobalConstant.apiUrl + 'csrf').pipe(
      catchError(this.handleError<[]>('initiate csrf'))
    );
  }

  async csrf_token() {
    this.token = await this.storageService.get('csrf_token');
    console.log(this.token)
    if(!this.token){
      this.load_csrf().subscribe((response) => {
        console.log('from server...')
        //@ts-ignore
        this.storageService.set('csrf_token', response.csrf);
        //@ts-ignore
        this.token = response.csrf
      })
    }
  }

  public handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
