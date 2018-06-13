import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-tabs',
  templateUrl: './file-tabs.component.html',
  styleUrls: ['./file-tabs.component.css']
})
export class FileTabsComponent implements OnInit {
  fileList = ['File 1', 'File 2', 'File 3'];
  constructor() { }

  ngOnInit() {
  }

}
