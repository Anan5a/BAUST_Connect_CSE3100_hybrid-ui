import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DepartmentService} from "../../../services/department.service";
import {LoaderService} from "../../../services/loader.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.page.html',
  styleUrls: ['./add-department.page.scss'],
})
export class AddDepartmentPage implements OnInit {
  @Input()
  external_data = null
  text_1 = "Add Department"
  text_2 = "Add new department"
  credentials: any
  create_update_text: any = "Create department";

  constructor(
    private fb: FormBuilder,
    private deptService:DepartmentService,
    private loaderService:LoaderService,
    private router:Router
  ) {
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      name_short: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
      birth_date: ['', [Validators.required]],
      icon: ['', [Validators.required,]],
      backdrop: ['', [Validators.required, ]],
      external_link: ['', [Validators.required]]
    })
    if (this.external_data != null){
      this.text_1 = "Update Department"
      this.text_2 = "Editing a department"
      this.create_update_text = "Update department"
    }
  }

  UpdateDepartment() {
    this.deptService.updateDepartment(this.credentials.value, this.external_data.id).subscribe(response=>{
      if (response && response.status == 'ok'){
        this.loaderService.showToast("Department updated successfully!", "success")
        this.router.navigateByUrl("/admin/department", {replaceUrl:true})
      }
    })
  }
  createOrUpdateDepartment() {
    if (this.external_data != null){
      this.UpdateDepartment()
    }else {
      this.deptService.createDepartment(this.credentials.value).subscribe(response=>{
        if (response && response.status == 'ok'){
          this.loaderService.showToast("Department created successfully!", "success")
          this.router.navigateByUrl("/admin/department", {replaceUrl:true})
        }
      })
    }

  }

  get name() {
    return this.credentials.get('name')
  }

  get name_short() {
    return this.credentials.get('name_short')
  }

  get description() {
    return this.credentials.get('description')
  }

  get icon() {
    return this.credentials.get('icon')
  }

  get birth_date() {
    return this.credentials.get('birth_date')
  }

  get backdrop() {
    return this.credentials.get('backdrop')
  }

  get external_link() {
    return this.credentials.get('external_link')
  }
}
