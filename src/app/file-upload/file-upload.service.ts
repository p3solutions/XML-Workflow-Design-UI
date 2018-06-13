import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FileInfo } from '../file-info';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private fileUploadUrl = environment.apiUrl + 'fileUpload';
  constructor(private http: HttpClient) { }
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post<FileInfo[]>(this.fileUploadUrl, formData, { headers: this.headers });
  }
}
