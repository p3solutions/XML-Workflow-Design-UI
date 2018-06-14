import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileInfo } from '../file-info';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private fileUploadUrl = 'http://localhost:9000/api/upload/multi';
  // environment.apiUrl + 'fileUpload';
  constructor(private http: HttpClient) { }
  uploadFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.set('files', fileToUpload, fileToUpload.name);
    console.log(formData);
    return this.http.post(this.fileUploadUrl, formData);
  }
}
