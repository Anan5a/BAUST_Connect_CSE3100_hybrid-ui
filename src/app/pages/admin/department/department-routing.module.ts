import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DepartmentPage} from './department.page';
import {AddDepartmentPage} from "./add-department.page";
import {EditDepartmentPage} from "./edit-department.page";

const routes: Routes = [
  {
    path: '',
    component: DepartmentPage,
    children: [
      {
        path: 'add',
        component: AddDepartmentPage
      },
      {
        path: 'edit/:id',
        component: EditDepartmentPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class DepartmentPageRoutingModule {
}
