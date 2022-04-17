import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SitePostPageRoutingModule} from './site-post-routing.module';

import {SitePostPage} from './site-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SitePostPageRoutingModule
  ],
  declarations: [SitePostPage]
})
export class SitePostPageModule {
}
