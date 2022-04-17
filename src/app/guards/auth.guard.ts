import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.isLoggedIn().then(ok => {
      if (ok === 'true') {
        return true
      }
      this.router.navigateByUrl('/login', {replaceUrl: true})
      return false
    })

  }
}
