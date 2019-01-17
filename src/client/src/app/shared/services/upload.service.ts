import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest} from "@angular/common/http";
import {last, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient) {
  }

  uploadFile(formData, type, progressCallback: (reqStatus: { event: HttpEvent<any>, percentDone: number }) => void | null) {
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/api/upload/${type}`,
      formData,
      {reportProgress: true}
    );

    return this.http.request(req).pipe(
      map((event: HttpEvent<any>) => this.getEventMessage(event, formData)),
      tap(reqStatus => progressCallback ? progressCallback(reqStatus) : null),
      last()
    )
  }

  deleteFile(filename) {
    const req = new HttpRequest(
      'DELETE',
      `${this.baseUrl}/api/upload/${filename}`
    );

    this.http.request(req).subscribe();
  }

  private getEventMessage(event: HttpEvent<any>, formData: FormData): { event: HttpEvent<any>, percentDone: number } {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return {event, percentDone};
      case HttpEventType.Response:
        return {event, percentDone: 100};
      default:
        return {event, percentDone: 0};
    }
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.error.message)
  }

}
