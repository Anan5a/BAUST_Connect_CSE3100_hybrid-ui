import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot, UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedGuard implements CanLoad {
  constructor(private authService:AuthenticationService,private router:Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn().then(ok=>{
      if (ok === 'true'){
        this.router.navigateByUrl('/profile', {replaceUrl: true})
        return false
      }
      return true
    })
  }

}
