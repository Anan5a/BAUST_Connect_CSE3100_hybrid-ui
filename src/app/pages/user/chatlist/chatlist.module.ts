import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ChatlistPageRoutingModule} from './chatlist-routing.module';

import {ChatlistPage} from './chatlist.page';
import {ChatPage} from "./chat.page";
import {ScrollingModule} from "@angular/cdk/scrolling";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        ChatlistPageRoutingModule,
        ScrollingModule
    ],
  declarations: [ChatlistPage, ChatPage]
})
export class ChatlistPageModule {
}
