import {Component, OnInit} from '@angular/core';
import {GlobalConstant} from "./GlobalConstant";
import {AuthenticationService} from "./services/authentication.service";
import {StorageService} from "./services/storage.service";
import {LoaderService} from "./services/loader.service";
import {GlobalEventsService} from "./services/global-events.service";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  appName = GlobalConstant.appName

  public appPages:any = [
  ];

  constructor(private storageService:StorageService,public events:GlobalEventsService) {
    this.menu_loader()
    this.events.getObservable().subscribe((data)=>{
      if ('update_menu' in data){
        this.menu_loader()
        console.log(data)
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
      {title: 'Student List', url: '/departments/id/students', icon: 'people-circle', visible: false},
      {title: 'Messages', url: '/messages', icon: 'chatbox-ellipses', visible: false},
      {title: 'Blog', url: '/blog', icon: 'desktop', visible: false},
      {title: 'Notices', url: '/notices', icon: 'alert-circle', visible: false},
      {title: 'Logout', url: '/login/logout', icon: 'log-out', visible: false},
      {title: 'About', url: '/about-app', icon: 'log-out', visible: false}
    ]

    this.storageService.init().then(()=>{
      this.storageService.get('loggedIn').then(ok=>{
        console.log(ok)
        for(const item of items){
          if (item.title == 'Home'||item.title == 'About'){
            item.visible = true
            this.appPages.push(item)
            continue
          }
          if (ok === null){
            if (item.title === 'Login'
              || item.title === 'Signup'
            ){
              item.visible = true
              this.appPages.push(item)
              console.log('nl',item.title)
            }
          }else{
            if (item.title === 'Login'
              || item.title === 'Signup'
            ){
              continue
            }
            item.visible = true
            this.appPages.push(item)
            console.log('lg',item.title)
          }
        }
      })
    })
    /*.then(n=>{
    console.log(n)

  })*/
  }

}
