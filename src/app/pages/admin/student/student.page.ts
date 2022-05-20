import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../services/admin.service";
import {ActivatedRoute} from "@angular/router";
import {LoaderService} from "../../../services/loader.service";

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  fullBody:any
  constructor(
    private adminService:AdminService,
    private activeRoute:ActivatedRoute,
    private loaderService:LoaderService
  ) {
  }

  ngOnInit() {
    let ID = this.activeRoute.snapshot.paramMap.get('id')
    this.getStudentList(ID)
  }

  public getStudentList(id: any) {
    this.adminService.adminStudentList(id).subscribe(succ=>{
      if (succ && succ.status == 'ok') {
        this.fullBody = succ.data
      }else {
        this.loaderService.showToast(succ.message||"Something went wrong...", "danger")
      }
    })
  }
}
