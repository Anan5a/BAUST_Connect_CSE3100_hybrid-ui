import {Component} from '@angular/core';
import {GlobalConstant} from "./GlobalConstant";
import {StorageService} from "./services/storage.service";
import {GlobalEventsService} from "./services/global-events.service";
import {DataStudent} from "./dataclass/DataStudent";
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent} from "@angular/router";
import {LoaderService} from "./services/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appName = GlobalConstant.appName

  public appPages: any = [];
  student: DataStudent = new DataStudent()

  constructor(private loader:LoaderService,private router:Router,private storageService: StorageService, public events: GlobalEventsService) {
    this.routeLoading()


    this.menu_loader()
    this.events.getObservable().subscribe((data) => {
      if ('update_menu' in data) {
        this.menu_loader()
        console.log(data)
      }
      if ('update_profile' in data) {
        console.log(data.update_profile.full_name)
        this.student = data.update_profile
      }
    })
    this.storageService.get('loggedIn').then(ok => {
      //load profile
      if (ok === 'true') {
        this.storageService.get('userProfile').then(ok => {
          if (ok)
            this.student = ok
        })
      }
    })
  }

  menu_loader() {
    this.appPages = []
    const items = [
      {title: 'Home', url: '/', icon: 'home', visible: false},
      {title: 'Login', url: '/login', icon: 'log-in', visible: false},
      {title: 'Signup', url: '/signup', icon: 'person-circle', visible: false},
      {title: 'Profile', url: '/profile', icon: 'person-circle', visible: false},
      {title: 'Departments', url: '/departments', icon: 'dice', visible: false},
      //{title: 'Student List', url: '/departments/id/students', icon: 'people-circle', visible: false},
      {title: 'Messages', url: '/messages', icon: 'chatbox-ellipses', visible: false},
      {title: 'Blog', url: '/blog', icon: 'desktop', visible: false},
      {title: 'Notices', url: '/notices', icon: 'alert-circle', visible: false},
      {title: 'Logout', url: '/login/logout', icon: 'log-out', visible: false},
      {title: 'About', url: '/about-app', icon: 'information-circle', visible: false}
    ]

    this.storageService.init().then(() => {
      this.storageService.get('loggedIn').then(ok => {

        for (const item of items) {
          if (item.title == 'Home' || item.title == 'About') {
            item.visible = true
            this.appPages.push(item)
            continue
          }
          if (ok === null) {
            if (item.title === 'Login'
              || item.title === 'Signup'
            ) {
              item.visible = true
              this.appPages.push(item)
              console.log('nl', item.title)
            }
          } else {
            if (item.title === 'Login'
              || item.title === 'Signup'
            ) {
              continue
            }
            item.visible = true
            this.appPages.push(item)
            console.log('lg', item.title)
          }
        }
      })
    })
  }
  routeLoading(){
    /**
     * Loading
     */
    this.router.events.subscribe((event:RouterEvent)=>{
      if (event instanceof RouteConfigLoadStart){
        this.loader.showLoader('')
      }else if(event instanceof RouteConfigLoadEnd){
        this.loader.hideLoader()
      }
    })

  }
}
