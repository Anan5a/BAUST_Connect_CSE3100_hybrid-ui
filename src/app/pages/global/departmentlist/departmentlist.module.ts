import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepartmentlistPageRoutingModule } from './departmentlist-routing.module';

import { DepartmentlistPage } from './departmentlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartmentlistPageRoutingModule
  ],
  declarations: [DepartmentlistPage]
})
export class DepartmentlistPageModule {}
