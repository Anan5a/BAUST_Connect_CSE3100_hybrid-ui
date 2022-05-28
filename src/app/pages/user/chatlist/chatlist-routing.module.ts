import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ChatlistPage} from './chatlist.page';
import {ChatPage} from "./chat.page";

const routes: Routes = [
  {
    path: '',
    component: ChatlistPage
  },
  {
    path: ':id',
    component: ChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatlistPageRoutingModule {
}
