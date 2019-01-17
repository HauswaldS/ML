import {Injectable} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private msg: NzMessageService) {
  }

  public handle<T>(operation: string, errorMsg: string, result: T = {type: 'NO_ACTION'}) {
    return (error: any): Observable<T> => {
      this.msg.error(errorMsg);
      return of(result);
    }
  }

}
