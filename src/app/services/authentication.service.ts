import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {GlobalConstant} from "../GlobalConstant";
import {HttpConfigInterceptor} from "../interceptor/httpconfig.interceptor";
import {StorageService} from "./storage.service";
import {LoaderService} from "./loader.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private completePath: string;
  private apiRoot = GlobalConstant.apiUrl;
  private path = 'student';
  private csrf = 'sanctum/csrf-cookie'
  private siteRoot = GlobalConstant.siteRoot;

  constructor(private httpClient: HttpClient,
              private httpconfig: HttpConfigInterceptor,
              private storageService: StorageService,
              private loaderService: LoaderService) {
    this.completePath = this.apiRoot + this.path
  }

  login(user) {
    return this.httpClient.post(this.apiRoot + 'student/login', JSON.stringify(user))
      .pipe(
        catchError(this.httpconfig.handleError<any>('Login error occurred'))
      );
  }

  signup(user) {
    return this.httpClient.post(this.completePath, JSON.stringify(user))
      .pipe(
        catchError(this.httpconfig.handleError<any>('Signup error occurred'))
      );
  }

  isLoggedIn() {
    return this.storageService.get('loggedIn')

  }

  getProfile() {
    return this.storageService.get('userProfile')

  }

  logout() {
    this.storageService.remove('loggedIn')
    this.storageService.remove('userProfile')

    this.httpClient.post<[]>(this.apiRoot + 'student/logout', {})
      .pipe(
        catchError(this.httpconfig.handleError<any>('logout error occurred'))
      )
      .subscribe(ok => {
        this.loaderService.showToast(ok.message)
      });

  }
}
