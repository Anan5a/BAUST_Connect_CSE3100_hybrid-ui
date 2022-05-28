import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../../services/storage.service";
import {GlobalEventsService} from "../../../services/global-events.service";
import {DataStudent} from "../../../dataclass/DataStudent";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private activeRoute:ActivatedRoute,
    private storageService: StorageService,
    private events: GlobalEventsService
  ) {

  }

  // Easy access for form fields
  get emailorid() {
    return this.credentials.get('emailorid');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    const isLoggedIn = this.authService.isLoggedIn(true)
    /**
     * logout module
     */
/*

    if (this.router.url.match(/logout/)) {
      this.authService.logout(true)
      this.storageService.remove('userProfile').then(ok => {
        this.events.publishEvent({'update_menu': true})
        this.router.navigateByUrl('/', {replaceUrl: true})
        this.events.publishEvent({'update_profile': new DataStudent()})
        console.log('logout ok')
      }, err => {

      })
    }
*/
    isLoggedIn.then((n) => {
      if (n === 'true')
        this.router.navigateByUrl(this.activeRoute.snapshot.queryParams['returnTo'] || '/admin/dashboard', {replaceUrl: true})
    })

    this.credentials = this.fb.group({
      emailorid: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],// Validators.email
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async login() {
    this.authService.login(this.credentials.value, true).subscribe((f) => {
      if (f) {
        this.storageService.set('loggedInAdmin', 'true')
        this.storageService.set('userProfile', f.data)
        this.router.navigateByUrl(this.activeRoute.snapshot.queryParams['returnTo'] || '/admin/dashboard', {replaceUrl: true})
        this.events.publishEvent({'update_menu_admin': f.data})
      }
    })
  }

}
