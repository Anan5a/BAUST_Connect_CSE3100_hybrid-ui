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
  force_disable: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private storageService: StorageService,
    private events: GlobalEventsService,
    private activeRoute:ActivatedRoute
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
    const isLoggedIn = this.authService.isLoggedIn()

    /**
     * logout module
     */
    if (this.router.url.match(/\/logout/)) {
      const profile = new DataStudent()
      this.authService.logout()
      this.storageService.remove('userProfile').then(ok => {
        this.events.publishEvent({'update_menu': true})
        this.events.publishEvent({'update_profile': profile})
        this.router.navigateByUrl('/homepage', {replaceUrl: true})
        console.log('logout ok')
      }, err => {

      })
    }

    isLoggedIn.then((n) => {
      if (n === 'true')
        this.router.navigateByUrl(this.activeRoute.snapshot.queryParams['returnTo'] || '/profile', {replaceUrl: true})
    })

    this.credentials = this.fb.group({
      emailorid: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],// Validators.email
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async login() {
    this.force_disable = true
    this.authService.login(this.credentials.value).subscribe((f) => {
      if (f) {
        this.storageService.set('loggedIn', 'true')
        this.router.navigateByUrl(this.activeRoute.snapshot.queryParams['returnTo']||'/profile', {replaceUrl: true});
        this.events.publishEvent({'update_menu': true})
        this.events.publishEvent({'update_profile': f.data})
        this.storageService.set('userProfile', f.data)
      }
    })
    this.force_disable = false
  }

}
