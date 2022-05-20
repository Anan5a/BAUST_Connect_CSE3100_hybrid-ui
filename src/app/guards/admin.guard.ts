import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.isLoggedIn(true).then(ok => {
      if (ok === 'true') {
        if (segments.join('/').match(/admin\/list/)){
          //check if S level
          return this.authService.getProfile().then(f=>{
            if(f.level === "S")
              return true
            else
              return false
          })
        }
        return true
      }
      this.router.navigate(['/admin/login'], {queryParams:{returnTo:segments.join('/')},replaceUrl: true})
      return false
    })
  }

}
