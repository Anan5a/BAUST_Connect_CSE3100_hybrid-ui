import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {HttpConfigInterceptor} from "./interceptor/httpconfig.interceptor";
import {IonicStorageModule} from  '@ionic/storage-angular'
import {AuthenticationService} from "./services/authentication.service";
import {StorageService} from "./services/storage.service";
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),IonicStorageModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    HttpConfigInterceptor,
    StorageService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide:HTTP_INTERCEPTORS,useClass:HttpConfigInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
