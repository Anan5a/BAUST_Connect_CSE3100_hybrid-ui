import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Login', url: '/login', icon: 'log-in' },
    { title: 'Profile', url: '/profile', icon: 'person-circle' },
    { title: 'Departments', url: '/departments', icon: 'dice' },
    { title: 'Student List', url: '/departments/id/students', icon: 'people-circle' },
    { title: 'Messages', url: '/messages', icon: 'chatbox-ellipses' },
    { title: 'Blog', url: '/blog', icon: 'desktop' },
    { title: 'Notices', url: '/notices', icon: 'alert-circle' },
    {title: 'Logout', url: '/',icon: 'log-out'}
  ];
  constructor() {}
}
