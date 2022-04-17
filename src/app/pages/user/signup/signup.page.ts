import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {DataDepartment} from "../../../dataclass/DataDepartment";
import {DepartmentService} from "../../../services/department.service";
import {LoaderService} from "../../../services/loader.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  credentials: FormGroup = new FormGroup({})

  departments: DataDepartment[]

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
  get student_id() {
    return this.credentials.get('student_id');
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

  get batch() {
    return this.credentials.get('batch');
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
    const isLoggedIn = this.authService.isLoggedIn()
    isLoggedIn.then((n) => {
      if (n == true)
        this.router.navigateByUrl('/profile', {replaceUrl: true})
    })
    this.credentials = this.fb.group({
        student_id: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],//, Validators.email
        email: ['', [Validators.required, Validators.email]],//, Validators.email
        password: ['', [Validators.required, Validators.minLength(8)]],
        c_password: ['', [Validators.required, Validators.minLength(8)]],
        full_name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(60)]],
        batch: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],//, Validators.email
        department_id: ['', [Validators.required]]
      },
      {
        validators: this.checkPasswords
      });
  }

  load_departments() {
    console.log('loading departments')
    //load departments
    this.departmentService.getDepartments().subscribe((response) => {
      this.departments = response
    })
  }

  async signup() {
    this.authService.signup(this.credentials.value).subscribe((response) => {
      this.loaderService.showToast("Account created successfully!", "success")
      this.router.navigateByUrl('/login', {replaceUrl: true})
    }, (error) => {

    })

  }

}
