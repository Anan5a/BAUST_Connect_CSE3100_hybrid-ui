import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DepartmentPageRoutingModule} from './department-routing.module';

import {DepartmentPage} from './department.page';
import {AddDepartmentPage} from "./add-department.page";
import {EditDepartmentPage} from "./edit-department.page";
import {StudentPage} from "../student/student.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartmentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    DepartmentPage,
    AddDepartmentPage,
    EditDepartmentPage,
    StudentPage
  ]
})
export class DepartmentPageModule {
}
