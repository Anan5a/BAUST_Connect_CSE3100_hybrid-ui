import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  summary:any
  full_body: any[] = []
  constructor(
    private adminService:AdminService
  ) { }

  ngOnInit() {
    this.getSummary()
  }
  getSummary(){
    this.adminService.summary().subscribe(res=>{
      if (res && res.status == 'ok'){
        this.summary = res.data
      }
    })
  }

}
