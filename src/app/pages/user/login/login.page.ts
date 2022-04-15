import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";
import {StorageService} from "../../../services/storage.service";
import {AppComponent} from "../../../app.component";
import {GlobalEventsService} from "../../../services/global-events.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials:FormGroup = new FormGroup({})

  constructor(
    private fb:FormBuilder,
    private authService:AuthenticationService,
    private router:Router,
    private storageService:StorageService,
    private events:GlobalEventsService
    ) {

  }

  ngOnInit() {
    const isLoggedIn = this.authService.isLoggedIn()
    isLoggedIn.then((n)=>{
      if(n === 'true')
        this.router.navigateByUrl('/profile', {replaceUrl:true})
    })
    /**
     * logout module
     */
    if (this.router.url.match(/\/logout/)){
      this.authService.logout()
      this.events.publishEvent({'update_menu':true})
      this.router.navigateByUrl('/', {replaceUrl:true})
    }

    this.credentials = this.fb.group({
      emailorid: ['', [Validators.required,Validators.minLength(9), Validators.maxLength(9)]],// Validators.email
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  async login() {
    this.authService.login(this.credentials.value).subscribe((f)=>{
      if (f){
        this.storageService.set('loggedIn', 'true')
        this.router.navigateByUrl('/profile', {replaceUrl:true});
        this.events.publishEvent({'update_menu':true})
      }
    })
  }

  // Easy access for form fields
  get emailorid() {
    return this.credentials.get('emailorid');
  }

  get password() {
    return this.credentials.get('password');
  }

}
