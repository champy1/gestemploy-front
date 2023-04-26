import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) {
  }
 // @ts-ignore
  download(file: string | undefined): Observable<Blob> {
     // @ts-ignore
    return this.http.get(`${environment.apiUrl}/v1/files/${file}`, {
      responseType: 'blob'
    });
  }
}