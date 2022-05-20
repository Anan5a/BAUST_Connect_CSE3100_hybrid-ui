import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DepartmentPage} from './department.page';
import {AddDepartmentPage} from "./add-department.page";
import {EditDepartmentPage} from "./edit-department.page";
import {StudentListPage} from "../../global/student-list/student-list.page";
import {AdminGuard} from "../../../guards/admin.guard";
import {StudentPage} from "../student/student.page";

const routes: Routes = [
  {
    path: '',
    component: DepartmentPage,
  },
  {
    path: 'add',
    component: AddDepartmentPage,
    canLoad: [AdminGuard]
  },
  {
    path: 'edit/:id',
    component: EditDepartmentPage,
    canLoad: [AdminGuard]
  },
  {
    path: ':id/students',
    component: StudentPage,
    canLoad: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class DepartmentPageRoutingModule {
}
