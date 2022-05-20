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

  login(user, admin = false) {
    let rpath = admin ? "admin" : "student"
    return this.httpClient.post(this.apiRoot + rpath + '/login', user)
      .pipe(
        catchError(this.httpconfig.handleError<any>(rpath + ' Login error occurred'))
      );
  }

  signup(user) {
    return this.httpClient.post(this.completePath, user)
      .pipe(
        catchError(this.httpconfig.handleError<any>('Signup error occurred'))
      );
  }

  isLoggedIn(admin = false) {
    let admint = admin ? "Admin" : ''
    return this.storageService.get('loggedIn' + admint)

  }

  getProfile(server = false) {
    return this.storageService.get('userProfile')
  }

  logout(admin = false) {
    let rpath = admin ? "admin" : "student"

    this.storageService.remove('loggedIn' + (admin ? "Admin" : ''))
    this.storageService.remove('userProfile')

    this.httpClient.post<[]>(this.apiRoot + rpath + '/logout', {})
      .pipe(
        catchError(this.httpconfig.handleError<any>('logout error occurred'))
      )
      .subscribe(ok => {
        this.loaderService.showToast(ok.message)
      });
  }

  getProfileFromServer(id) {
    return this.httpClient.get<[]>(this.apiRoot + 'student/' + id)
      .pipe(
        catchError(this.httpconfig.handleError<any>('get profile error occurred'))
      )
  }
}
