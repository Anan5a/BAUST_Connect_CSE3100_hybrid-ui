import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {LoaderService} from "../../../services/loader.service";
import {DataStudent} from "../../../dataclass/DataStudent";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../../services/chat.service";
import {DataChatItem} from "../../../dataclass/DataChatItem";
import {interval, Observable, ReplaySubject, Subject, timer} from "rxjs";
import {retry, share, switchMap, takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {
  messages: DataChatItem[] = []
  receiver: DataStudent = new DataStudent()
  profile_full_body: any;
  from: DataStudent
  message_box: FormGroup;
  rxjs_interval: any
  private stopPolling = new Subject();
  force_disable:boolean = false

  constructor(
    private authService: AuthenticationService,
    private loaderService: LoaderService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private chatService: ChatService
  ) {
    /**
     * Periodic refresh to fetch new messages
     * 2 sec
     */
    this.rxjs_interval = timer(1, 2000).pipe(
      //switchMap(() => this.receive("fetch msg")),
      retry(),
      share(),
      takeUntil(this.stopPolling)
    );

  }

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    //load receiver
    this.authService.getProfileFromServer(id).subscribe(profile => {
      if (profile && profile.status == 'ok') {
        this.receiver = profile.data.info
        this.profile_full_body = profile.data
        this.loadOldMessages()
      }
    })
    this.authService.getProfile().then(profile => {
      this.from = profile
    })
    //load old messages

    this.message_box = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(249)]],
    })

    this.rxjs_interval.subscribe(fnx => this.receive("fetch msg: " + fnx))

  }

  send() {
    //console.log(this.from,this.receiver)
    this.force_disable = true
    this.chatService.send({to: this.receiver?.id, content: this.message_box.value?.content}).subscribe(ok => {
      if (ok && ok.status == 'ok') {
        this.pushToList(ok.data,true)
        //this.messages.push(ok.data)
        //console.log(this.messages)
        this.message_box.reset()
      }
    })
    this.force_disable = false
  }

  receive(msg = null) {
    //if (msg)
    //console.log(msg)

    let _id = this.messages?.length > 0 ? this?.messages[this.messages?.length - 1]?.id : null;
    this.chatService.receive({to: this.receiver?.id, msg_id: _id}).subscribe(ok => {
      if (ok && ok.status == 'ok') {
        for (let item of ok.data) {
          if (msg)
            this.pushToList(item,true)
          else
            this.pushToList(item,false)
        }
        //this.message_box.reset()
      }
    })
    return new ReplaySubject(1)
  }

  loadOldMessages() {
    this.receive();
  }

  ngOnDestroy() {
    //console.log("stopping msg polling")
    this.stopPolling.next()
  }
  pushToList(item, end=false){
    for (let msg of this.messages){
      if (msg.id == item.id)
        return
    }
    if (end){
      this.messages.push(item)
    }else {
      this.messages.unshift(item)
    }
  }
}
