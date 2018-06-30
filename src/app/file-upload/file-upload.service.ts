import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
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
