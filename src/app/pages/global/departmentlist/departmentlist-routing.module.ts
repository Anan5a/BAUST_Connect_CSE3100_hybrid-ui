import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentlistPage } from './departmentlist.page';

const routes: Routes = [
  {
    path: '',
    component: DepartmentlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentlistPageRoutingModule {}
