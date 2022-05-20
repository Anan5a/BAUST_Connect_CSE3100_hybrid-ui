import { Injectable } from '@angular/core';
import {GlobalConstant} from "../GlobalConstant";
import {HttpClient} from "@angular/common/http";
import {HttpConfigInterceptor} from "../interceptor/httpconfig.interceptor";
import {StorageService} from "./storage.service";
import {LoaderService} from "./loader.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private completePath: string;
  private apiRoot = GlobalConstant.apiUrl;
  private path = 'admin';
  private siteRoot = GlobalConstant.siteRoot;

  constructor(private httpClient: HttpClient,
              private httpconfig: HttpConfigInterceptor,
              private storageService: StorageService,
              private loaderService: LoaderService) {
    this.completePath = this.apiRoot + this.path
  }

  adminList(url = null){
    console.log(url)
    if (url){
      url = url.replace(/localhost:\d+/,'127.0.0.1')
      return this.httpClient.get(url)
        .pipe(
          catchError(this.httpconfig.handleError<any>('get admin list page error occurred'))
        )
    }
    return this.httpClient.get(this.apiRoot +  this.path)
      .pipe(
        catchError(this.httpconfig.handleError<any>('get admin list error occurred'))
      )
  }
  adminUpdate(data){

  }
  adminCreate(data){

  }

  adminStudentList(deptID){
    if (deptID.match(/(http|https):\/\//)){
      const url = deptID.replace(/localhost:\d+/,'127.0.0.1')
      return this.httpClient.get(url)
        .pipe(
          catchError(this.httpconfig.handleError<any>('get admin list error occurred'))
        )
    }
    return this.httpClient.get(this.apiRoot +  "department/student-list/"+deptID)
      .pipe(
        catchError(this.httpconfig.handleError<any>('get admin list error occurred'))
      )
  }
}
