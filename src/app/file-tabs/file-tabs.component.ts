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
      file = file.replace(/\\/g,'/');
      const fileName = file.substring(file.lastIndexOf('/') + 1);
      this.fileList.push(fileName);
    });
    const fn = () => {
      const lastFile: HTMLAnchorElement = document.querySelector('.hori-tab');
      if (lastFile) {
        lastFile.click();
        clearInterval(k);
      }
    };
    const k = setInterval(fn, 200);
  }

  activeTab(_event) {
    const horiTab = document.querySelectorAll('.hori-tab');
    for (let i = 0; i < horiTab.length; i++) {
      horiTab[i].classList.remove('active');
    }
    const target = _event.target;
    target.classList.add('active');
  }
}
