import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const fileUpload = [
      { id: 1, fileName: 'file1.xml', size: 123456, status: 100, type: 'application/pdf' },
      { id: 2, fileName: 'file2.xml', size: 123456, status: 100, type: 'application/pdf' }
    ];
    return { fileUpload };
  }
  constructor() { }
}
