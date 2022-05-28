import {Component, ViewChild} from '@angular/core';
import {GlobalConstant} from "./GlobalConstant";
import {StorageService} from "./services/storage.service";
import {GlobalEventsService} from "./services/global-events.service";
import {DataStudent} from "./dataclass/DataStudent";
import {
  NavigationCancel,
  NavigationEnd, NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterEvent
} from "@angular/router";
import {LoaderService} from "./services/loader.service";
import {IonRouterOutlet, Platform} from "@ionic/angular";
import {Plugins} from "@capacitor/core";
import {AuthenticationService} from "./services/authentication.service";

const {App} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appName = GlobalConstant.appName
  @ViewChild(IonRouterOutlet, {static: true}) routerOutlet: IonRouterOutlet;

  loadingRoute: boolean = false
  public appPages: any = [];
  student: DataStudent = new DataStudent()

  constructor(
    private loader: LoaderService,
    private router: Router,
    private storageService: StorageService,
    public events: GlobalEventsService,
    private platform: Platform,
    private authService: AuthenticationService
  ) {
    /**
     * Handles back button press and exit app
     */
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      } else {
        this.routerOutlet.pop()
      }
    });
    /**
     * Loading
     */
    this.router.events.subscribe((event) => {
      this.routeLoading(event)
    })


    this.menu_loader()

    /**
     * logout module
     */
    this.events.getObservable().subscribe((data) => {
      if ('update_menu' in data) {
        this.menu_loader()
      }
      if ('update_menu_admin' in data) {
        this.menu_loader(true)
        this.student = data.update_menu_admin
      }
      if ('update_profile' in data) {
        console.log(data.update_profile.full_name)
        this.student = data.update_profile
      }
    })
    this.storageService.get('loggedInAdmin').then(ok => {
      if (ok === 'true') {
        this.storageService.get('userProfile').then(ok => {
          if (ok)
            this.student = ok
        })
      }
    })
    this.storageService.get('loggedIn').then(ok => {
      if (ok === 'true') {
        this.storageService.get('userProfile').then(ok => {
          if (ok)
            this.student = ok
        })
      }
    })
  }

  menu_loader(admin = false) {
    this.appPages = []
    const items = [
      {title: 'Home', url: '/', icon: 'home', visible: false},
      {title: 'Login', url: '/login', icon: 'log-in', visible: false},
      {title: 'Signup', url: '/signup', icon: 'person-circle', visible: false},
      {title: 'Profile', url: '/profile', icon: 'person-circle', visible: false},
      {title: 'Messages', url: '/messages', icon: 'chatbox-ellipses', visible: false},
      //{title: 'Blog', url: '/blog', icon: 'desktop', visible: false},
      //{title: 'Notices', url: '/notices', icon: 'alert-circle', visible: false},
      {title: 'Logout', url: '/login/logout', icon: 'log-out', visible: false},
      {title: 'About', url: '/about-app', icon: 'information-circle', visible: false}
    ]
    const adminItems = [
      {title: 'Home', url: '/', icon: 'home', visible: false},
      {title: 'Dashboard', url: '/admin/dashboard', icon: 'person-circle', visible: false},
      {title: 'Departments', url: '/admin/department', icon: 'dice', visible: false},
      {title: 'Admins', url: '/admin/list', icon: 'chatbox-ellipses', visible: false},
      //{title: 'Blog', url: '/admin/blog', icon: 'desktop', visible: false},
      //{title: 'Notices', url: '/admin/blog/notice', icon: 'alert-circle', visible: false},
      {title: 'Logout', url: '/admin/login/logout', icon: 'log-out', visible: false},
      {title: 'About', url: '/about-app', icon: 'information-circle', visible: false}
    ]
    this.storageService.init().then(() => {

      let mss = admin ? this.storageService.get('loggedInAdmin') : this.storageService.get('loggedIn')
      let profileData = null
      this.storageService.get('userProfile').then(f => {
        profileData = f
        this.student = profileData
      })

      this.storageService.get('loggedInAdmin').then(ok => {
        if (ok !== 'true') {
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
                  //console.log('nl', item.title)
                }
              } else {
                if (item.title === 'Login'
                  || item.title === 'Signup'
                ) {
                  continue
                }
                item.visible = true
                this.appPages.push(item)
                //console.log('lg', item.title)
              }
            }
          })
          return
        }
        for (const item of adminItems) {
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
              //console.log('nl', item.title)
            }
          } else {
            if (item.title === 'Login'
              || item.title === 'Signup'
              //@ts-ignore
              || (profileData && profileData.uni_per_id && profileData?.level != "S" && item.title == 'Admins')
            ) {
              continue
            }
            item.visible = true
            this.appPages.push(item)
            //console.log('lg', item.title)
          }
        }
      })
    })

  }

  routeLoading(event) {
    if (event instanceof NavigationStart) {
        this.loader.showLoader('', 2000)
    }
    else if (event instanceof NavigationEnd
      ||event instanceof NavigationCancel
      ||event instanceof NavigationError
    ) {
      this.loader.hideLoader()
    }
  }

  logout(admin = false) {
    console.log(this.router.url)
    const profile = new DataStudent()
    this.authService.logout(admin)
    this.storageService.remove('userProfile').then(ok => {
      this.events.publishEvent({'update_menu': true})
      this.events.publishEvent({'update_profile': profile})
      this.router.navigateByUrl('/homepage', {replaceUrl: true})
      console.log('logout ok')
    }, err => {

    })
  }
}
