import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalEventsService {

  private globalSubject = new Subject<any>();

  constructor() {
  }

  publishEvent(data: any) {
    this.globalSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.globalSubject;
  }
}
