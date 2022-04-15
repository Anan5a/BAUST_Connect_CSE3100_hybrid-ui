import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {UnauthenticatedGuard} from "./guards/unauthenticated.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path: 'homepage',
    loadChildren: () => import('./pages/global/homepage/homepage.module').then( m => m.HomepagePageModule)
  },
  /*{
    path: 'home/:id',
    loadChildren: () => import('./layout/folder.module').then(m => m.FolderPageModule)
  },*/
  {
    path: 'login',
    loadChildren: () => import('./pages/user/login/login.module').then( m => m.LoginPageModule),
    canLoad:[UnauthenticatedGuard]
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/user/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/user/profile/profile.module').then( m => m.ProfilePageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/user/chatlist/chatlist.module').then( m => m.ChatlistPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'departments',
    loadChildren: () => import('./pages/global/departmentlist/departmentlist.module').then( m => m.DepartmentlistPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'departments/:id/students',
    loadChildren: () => import('./pages/global/student-list/student-list.module').then( m => m.StudentListPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/user/signup/signup.module').then( m => m.SignupPageModule),
    canLoad:[UnauthenticatedGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
