import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {AlertController} from "@ionic/angular";
import {DepartmentService} from "../../../services/department.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../../services/loader.service";
import {GeoListService} from "../../../services/geo-list.service";
import {DataDepartment} from "../../../dataclass/DataDepartment";
import {DataStudent} from "../../../dataclass/DataStudent";
import {HomepageService} from "../../../services/homepage.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  search_data: FormGroup = new FormGroup({});
  public departments: DataDepartment[]|any
  force_disable: boolean = false;
  search_results:DataStudent[] = []
  private full_response_body


  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private departmentService: DepartmentService,
    private router: Router,
    private homepageService: HomepageService,
    private loaderService:LoaderService
  ) {

  }

  // Easy access for form fields

  get query() {
    return this.search_data.get('query');
  }

  get batch() {
    return this.search_data.get('batch')
  }

  get dept() {
    return this.search_data.get('dept');
  }
  ngOnInit() {
    this.search_data = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(14)]],
      batch: ['', [Validators.pattern(/(\d+|$^)/)]],
      dept: ['', [Validators.required ]],
    });

    this.load_departments()
  }
  search() {
    this.homepageService.search(this.search_data.value).subscribe(res=>{
      if (res && res.status == 'ok'){
        this.search_results = res.data.data
        this.full_response_body = res.data
      }
    })
  }

  load_departments() {
    console.log('loading departments')
    //load departments
    this.departmentService.getDepartments().subscribe((response) => {
      this.departments = response
    })
  }

}
