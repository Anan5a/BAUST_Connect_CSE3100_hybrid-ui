import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstant} from "../GlobalConstant";
import {DataDepartment} from "../dataclass/DataDepartment";
import {catchError, map} from "rxjs/operators";
import {HttpConfigInterceptor} from "../interceptor/httpconfig.interceptor";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiRoot = GlobalConstant.apiUrl
  private path = 'department'
  private completePath: string

  constructor(private httpClient: HttpClient, private httpconfig: HttpConfigInterceptor) {
    this.completePath = this.apiRoot + this.path
  }

  getDepartments() {
    return this.httpClient.get<{ data: DataDepartment[] }>(this.completePath).pipe(
      //tap(department=>console.log(department)),
      map((_) => _.data),
      catchError(this.httpconfig.handleError<DataDepartment[]>('Get all departments'))
    );
  }

}
