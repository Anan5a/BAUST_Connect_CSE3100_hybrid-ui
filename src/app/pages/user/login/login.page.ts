import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials:FormGroup

  constructor(
    private fb:FormBuilder,
    private authService:AuthenticationService,
    private alertController:AlertController,
    private loadingController:LoadingController,
    private router:Router,
    ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      emailorid: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

  }

  // Easy access for form fields
  get emailorid() {
    return this.credentials.get('emailorid');
  }

  get password() {
    return this.credentials.get('password');
  }

}
