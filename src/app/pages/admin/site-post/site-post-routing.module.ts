import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SitePostPage} from './site-post.page';

const routes: Routes = [
  {
    path: '',
    component: SitePostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitePostPageRoutingModule {
}
