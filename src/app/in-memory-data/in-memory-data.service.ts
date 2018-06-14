import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const fileUpload = [
    ];
    return { fileUpload };
  }
  constructor() { }
}
