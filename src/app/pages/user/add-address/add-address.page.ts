import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {AlertController} from "@ionic/angular";
import {DepartmentService} from "../../../services/department.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../../services/loader.service";
import {GeoDataDistricts, GeoDataDivisions, GeoDataSubDistricts} from "../../../dataclass/GeoData";
import {GeoListService} from "../../../services/geo-list.service";

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

  credentials: FormGroup = new FormGroup({})
  force_disable: boolean = false;
  districts:GeoDataDistricts[]
  divisions:GeoDataDivisions[]
  sub_districts:GeoDataSubDistricts[]

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private departmentService: DepartmentService,
    private router: Router,
    private loaderService: LoaderService,
    private geoListService:GeoListService
  ) {

  }

  // Easy access for form fields
  get district() {
    return this.credentials.get('district');
  }

  get division() {
    return this.credentials.get('division')
  }

  get sub_district() {
    return this.credentials.get('sub_district');
  }
  ngOnInit() {
    this.divisions = this.geoListService.divisions().divisions
    this.districts = this.geoListService.districts().districts
    this.sub_districts = this.geoListService.sub_districts().upazilas

    function doNothing():ValidatorFn {
      return Validators.nullValidator
    }

    this.credentials = this.fb.group({
      division: ['', [Validators.required]],
      district: ['', [Validators.required, Validators.minLength(8)]],
      sub_district: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  async addAddress() {
    this.authService.addOrUpdateAddress(this.credentials.value).subscribe(ok=>{
      if (ok&&ok.status == "ok"){
        this.loaderService.showToast(ok.message,"success")
        this.router.navigateByUrl("/profile")
      }
    })
  }
}
