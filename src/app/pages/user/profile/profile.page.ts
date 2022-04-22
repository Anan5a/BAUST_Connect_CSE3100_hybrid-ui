import {Component, OnInit} from '@angular/core';
import {DataStudent} from "../../../dataclass/DataStudent";
import {AuthenticationService} from "../../../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoaderService} from "../../../services/loader.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  student: DataStudent = new DataStudent()

  constructor(private router:Router,private route: ActivatedRoute, private authService: AuthenticationService, private loader: LoaderService) {
  }

  ngOnInit() {
    let routing = this.route.snapshot.paramMap.get('id')
    if (routing)
      this.loadProfile(routing)
    else
      this.loadProfile()
  }

  loadProfile(id = null) {
    if (id) {
      console.log("loading "+id)
      this.authService.getProfileFromServer(id).subscribe(f => {
        if (f.status == 'ok') {
          this.student = f.data
        }
        if (f.status == 'error') {
          this.loader.showToast("The profile not found!", "danger", 5000)
          this.router.navigate(['homepage'])
        }
      })
    } else {
      console.log('profile loader')

      this.authService.getProfile().then(ok => {
        this.student = ok
      })
    }
  }

}
