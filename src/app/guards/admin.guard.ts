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
import {LoaderService} from "../services/loader.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router,private loaderService:LoaderService) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.isLoggedIn(true).then(ok => {
      if (ok === 'true') {
        if (
          segments.join('/').match(/admin\/list/)||
          segments.join('/').match(/admin\/department\/add/)
        ){
          //check if S level
          return this.authService.getProfile().then(f=>{
            if(f.level === "S")
              return true
            else
              this.loaderService.showToast("Unauthorized", "danger", 3000)
            this.router.navigateByUrl("/admin/dashboard")
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
