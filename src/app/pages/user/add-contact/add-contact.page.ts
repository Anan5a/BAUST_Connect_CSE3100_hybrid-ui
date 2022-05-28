import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {AlertController} from "@ionic/angular";
import {DepartmentService} from "../../../services/department.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../../services/loader.service";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
  credentials: FormGroup = new FormGroup({})
  force_disable: boolean = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private departmentService: DepartmentService,
    private router: Router,
    private loaderService: LoaderService
  ) {

  }

  // Easy access for form fields
  get type() {
    return this.credentials.get('type');
  }

  get place_name() {
    return this.credentials.get('place_name')
  }

  get enroll_start() {
    return this.credentials.get('enroll_start');
  }

  get enroll_end() {
    return this.credentials.get('enroll_end');
  }

  get position() {
    return this.credentials.get('position');
  }

  get web_link() {
    return this.credentials.get('web_link');
  }


  ngOnInit() {
    function doNothing():ValidatorFn {
      return Validators.nullValidator
    }

    this.credentials = this.fb.group({
        type: ['', [Validators.required]],//, Validators.email
        place_name: ['', [Validators.required, Validators.minLength(8)]],//, Validators.email
        position: ['', [Validators.required, Validators.minLength(2)]],
        web_link: ['', [Validators.required, Validators.pattern(/(http|https):\/\/.*/)]],
        enroll_start: ['', [Validators.required]],
        enroll_end: ['',[doNothing]],
      });
  }

  async addContact() {
    this.authService.addOrUpdateContact(this.credentials.value).subscribe(ok=>{
      if (ok&&ok.status == "ok"){
        this.loaderService.showToast(ok.message,"success")
        this.router.navigateByUrl("/profile")
      }
    })
  }
}
