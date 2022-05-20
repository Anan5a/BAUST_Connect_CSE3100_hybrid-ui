import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DepartmentService} from "../../../services/department.service";
import {LoaderService} from "../../../services/loader.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-department',
  templateUrl: './edit-department.page.html',
  styleUrls: ['./edit-department.page.scss'],
})
export class EditDepartmentPage implements OnInit {
  external_data = null
  text_1 = "Update Department"
  text_2 = "Editing a department"
  credentials: any
  create_update_text: any = "Update department";
  id:any

  constructor(
    private fb: FormBuilder,
    private deptService:DepartmentService,
    private loaderService:LoaderService,
    private router:Router,
    private activeRoute:ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id')
    this.loadDepartment(this.id)

    this.credentials = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      name_short: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
      birth_date: ['', [Validators.required]],
      icon: ['', [Validators.required,]],
      backdrop: ['', [Validators.required, ]],
      external_link: ['', [Validators.required]]
    })

  }

  updateDepartment() {
    this.deptService.updateDepartment(this.credentials.value, this.external_data.id).subscribe(response=>{
      if (response && response.status == 'ok'){
        this.loaderService.showToast("Department updated successfully!", "success")
        this.router.navigateByUrl("/admin/department", {replaceUrl:true})
      }
    })
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

  private loadDepartment(id: any) {
    this.deptService.getDepartments(id).subscribe(response=>{
      //@ts-ignore
      if (response && response.status == 'ok'){
        //@ts-ignore
        response.data.department.birth_date = response.data.department.birth_date.split('T')[0]
        //@ts-ignore
        this.external_data = response.data.department
      }
    })
  }
}
