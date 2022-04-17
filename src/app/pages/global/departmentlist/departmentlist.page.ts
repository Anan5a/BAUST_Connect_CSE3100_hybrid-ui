import {Component, OnInit} from '@angular/core';
import {DepartmentService} from "../../../services/department.service";
import {DataDepartment} from "../../../dataclass/DataDepartment";
import {LoaderService} from "../../../services/loader.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.page.html',
  styleUrls: ['./departmentlist.page.scss'],
})
export class DepartmentlistPage implements OnInit {
  departments: DataDepartment[]

  constructor(
    private departmentService: DepartmentService,
    private loaderService: LoaderService,
    public sanitizer: DomSanitizer,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.loadDepartments()
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe(
      (succ) => {
        this.departments = succ
      },
      (err) => {
        this.loaderService.showToast('Failed to load departments', 'danger', 3000)
      }
    )
  }

}
