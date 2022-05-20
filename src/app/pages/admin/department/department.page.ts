import {Component, OnInit} from '@angular/core';
import {DataDepartment} from "../../../dataclass/DataDepartment";
import {DepartmentService} from "../../../services/department.service";
import {LoaderService} from "../../../services/loader.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-department',
  templateUrl: './department.page.html',
  styleUrls: ['./department.page.scss'],
})
export class DepartmentPage implements OnInit {
  departments: DataDepartment[]|any;

  constructor(public router: Router, private departmentService: DepartmentService, private loaderService: LoaderService, public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    //load departments
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
