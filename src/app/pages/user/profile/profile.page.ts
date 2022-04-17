import {Component, OnInit} from '@angular/core';
import {DataStudent} from "../../../dataclass/DataStudent";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  student: DataStudent = new DataStudent()

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {

    this.authService.getProfile().then(ok => {
      this.student = ok
    })
  }

}
