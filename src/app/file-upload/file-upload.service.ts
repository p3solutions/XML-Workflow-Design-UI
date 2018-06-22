import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileInfo } from '../file-info';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  // private headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private fileUploadUrl = environment.apiUrl + 'upload/multi';
  constructor(private http: HttpClient) { }
  uploadFile(fileToUpload: File[]): Observable<any> {
    const formData: FormData = new FormData();
    fileToUpload.forEach(file => {
      formData.append('files', file, file.name);
    });
    return this.http.post(this.fileUploadUrl, formData);
  }
}
