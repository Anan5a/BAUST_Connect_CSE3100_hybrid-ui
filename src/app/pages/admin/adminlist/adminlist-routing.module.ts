import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminlistPage } from './adminlist.page';
import {AddAdminPage} from "./add-admin.page";

const routes: Routes = [
  {
    path: '',
    component: AdminlistPage
  },
  {
    path: 'new',
    component: AddAdminPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminlistPageRoutingModule {}
