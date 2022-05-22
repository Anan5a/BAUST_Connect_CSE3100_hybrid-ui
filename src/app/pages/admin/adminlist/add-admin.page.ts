import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {DataDepartment} from "../../../dataclass/DataDepartment";
import {DepartmentService} from "../../../services/department.service";
import {LoaderService} from "../../../services/loader.service";
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.page.html',
  styleUrls: ['./add-admin.page.scss'],
})
export class AddAdminPage implements OnInit {

  credentials: FormGroup = new FormGroup({})
  force_disable: boolean = false;
  departments: DataDepartment[]|any

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private alertController: AlertController,
    private departmentService: DepartmentService,
    private router: Router,
    private loaderService: LoaderService
  ) {

  }

  // Easy access for form fields
  get uni_per_id() {
    return this.credentials.get('uni_per_id');
  }

  get email() {
    return this.credentials.get('email')
  }

  get password() {
    return this.credentials.get('password');
  }

  get full_name() {
    return this.credentials.get('full_name');
  }

  get level() {
    return this.credentials.get('level');
  }

  get c_password() {
    return this.credentials.get('c_password');
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('c_password').value
    return pass === confirmPass ? null : {notSame: true}
  }


  ngOnInit() {
    this.credentials = this.fb.group({
        uni_per_id: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],//, Validators.email
        email: ['', [Validators.required, Validators.email]],//, Validators.email
        password: ['', [Validators.required, Validators.minLength(8)]],
        c_password: ['', [Validators.required, Validators.minLength(8)]],
        full_name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(60)]],
        level: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],//, Validators.email
      },
      {
        validators: this.checkPasswords
      });
  }

  async createAdmin() {
    this.force_disable = true
    this.adminService.adminCreate(this.credentials.value).subscribe((response) => {
      if (response && response.status == 'ok'){
        this.loaderService.showToast("Admin created successfully!", "success")
        this.router.navigateByUrl('/admin/list', {replaceUrl: true})
      }
    }, (error) => {
      this.loaderService.showToast(error.error.message||"An error occured", "danger",3000)
    })
    this.force_disable = false
  }

}
