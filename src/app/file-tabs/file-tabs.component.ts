import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-tabs',
  templateUrl: './file-tabs.component.html',
  styleUrls: ['./file-tabs.component.css']
})
export class FileTabsComponent implements OnInit {
  fileList = [];
  constructor() { }

  ngOnInit() {
    let files = localStorage.getItem('files');
    files = files.substring(0, files.lastIndexOf(','));
    const filesList = files.split(',');
    filesList.forEach(file => {
      const fileName = file.substring(file.lastIndexOf('/') + 1);
      this.fileList.push(fileName);
    });
  }

}
