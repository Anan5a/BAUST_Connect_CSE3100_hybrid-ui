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
export class ChatService {

  private completePath: string;
  private apiRoot = GlobalConstant.apiUrl;
  private path = 'chat';
  private csrf = 'sanctum/csrf-cookie'
  private siteRoot = GlobalConstant.siteRoot;

  constructor(private httpClient: HttpClient,
              private httpconfig: HttpConfigInterceptor,
              private storageService: StorageService,
              private loaderService: LoaderService) {
    this.completePath = this.apiRoot + this.path
  }

  send(body,id = null){
    return this.httpClient.post(this.apiRoot + this.path, body)
      .pipe(
        catchError(this.httpconfig.handleError<any>('send message error occurred'))
      )
  }
  receive(body,id = null){
    return this.httpClient.post(this.apiRoot + this.path + '/get', body)
      .pipe(
        catchError(this.httpconfig.handleError<any>('get message error occurred'))
      )
  }
  chatList(){
    return this.httpClient.get(this.apiRoot + this.path)
      .pipe(
        catchError(this.httpconfig.handleError<any>('get chat list error occurred'))
      )
  }
}
