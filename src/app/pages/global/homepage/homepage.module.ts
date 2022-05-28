import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HomepagePageRoutingModule} from './homepage-routing.module';

import {HomepagePage} from './homepage.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomepagePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [HomepagePage]
})
export class HomepagePageModule {
}
