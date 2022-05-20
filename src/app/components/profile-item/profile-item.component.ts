import {Component, Input, OnInit} from '@angular/core';
import {DataContactItem} from "../../dataclass/DataContactItem";

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.scss'],
})
export class ProfileItemComponent implements OnInit {
  @Input()
  contacts:DataContactItem[]

  constructor() { }

  ngOnInit() {}

}
