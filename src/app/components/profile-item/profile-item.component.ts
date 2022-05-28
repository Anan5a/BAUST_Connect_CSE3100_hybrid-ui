import {Component, Input, OnInit} from '@angular/core';
import {DataContactItem} from "../../dataclass/DataContactItem";

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.scss'],
})
export class ProfileItemComponent implements OnInit {
  @Input()
  contacts:DataContactItem[] = []

  constructor() { }

  ngOnInit() {

/*    this.contacts.sort(function(a,b) {
      return Date.parse(a.channel_data?.enroll_start) - Date.parse(b.channel_data?.enroll_start);
    });*/
  }



  date2str(enroll_start:string) {
    if (enroll_start == null)
      return "current"
    return enroll_start.substr(0,4)
  }
}
