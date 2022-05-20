import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../services/admin.service";
import {LoaderService} from "../../../services/loader.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.page.html',
  styleUrls: ['./adminlist.page.scss'],
})
export class AdminlistPage implements OnInit {
  fullBody:any

  constructor(
    private adminService:AdminService,
    private loaderService:LoaderService,
    public sanitizer:DomSanitizer
  ) {
    this.loadAdminList()
  }

  ngOnInit() {
  }

  public loadAdminList(url = null) {
    this.adminService.adminList(url).subscribe(f=>{
      if (f && f.data){
        this.fullBody = f
      }else{
        this.loaderService.showToast("Failed to load admins!", "error")
      }
    })
  }

  getLabel(label: string) {
    return label.replace(/&.*;/,'')
  }
}
