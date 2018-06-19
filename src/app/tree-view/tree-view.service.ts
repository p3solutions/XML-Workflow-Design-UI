import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileInfo } from '../file-info';

@Injectable({
  providedIn: 'root'
})
export class TreeViewService {

  private fileUploadUrl = 'http://localhost:9000/api/tree/files/CFW_DeceasedCase.xml';
  // environment.apiUrl + 'fileUpload';
  constructor(private http: HttpClient) { }
  getTree(name: string): Observable<any> {
    return this.http.get(this.fileUploadUrl);
  }
}
