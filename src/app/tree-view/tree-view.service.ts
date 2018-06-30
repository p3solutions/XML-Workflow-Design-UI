import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeViewService {
  // environment.apiUrl + 'fileUpload';
  constructor(private http: HttpClient) { }
  getTree(name: string): Observable<any> {
    let fileUploadUrl = environment.apiUrl + 'tree/files/';
    fileUploadUrl = fileUploadUrl.concat(name);
    console.log(fileUploadUrl);
    return this.http.get(fileUploadUrl);
  }
}
