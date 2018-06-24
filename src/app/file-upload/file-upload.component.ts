import { Component, OnInit } from '@angular/core';
import { UploadFile, UploadEvent } from 'ngx-file-drop';
import { FileUploadService } from './file-upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileInfo, FileUpload } from '../file-info';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  public files: UploadFile[] = [];
  fileUploadForm: FormGroup;
  fileToUpload: File[] = [];
  fileUpload: FileUpload = new FileUpload();
  fileInfoList: FileInfo[] = [];
  dtOptions: DataTables.Settings = {};
  table = true;

  constructor(
    private fileUploadService: FileUploadService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.handleNavigationBtn();
    this.dtOptions = {
      language: {
        emptyTable: '',
        zeroRecords: ''
      }
    };
  }
  handleNavigationBtn() {
    const navBtn = document.getElementById('nav-btn-container');
    navBtn.classList.remove('hide-next');
    navBtn.classList.add('hide-ok');
    navBtn.classList.add('hide-prev');
    const progressBar = document.getElementById('progress-bar');
    progressBar.classList.add('width-33');
    progressBar.classList.remove('width-66');
    progressBar.classList.remove('width-100');
    const navProgress = document.querySelectorAll('#navbarNav li.nav-item');
    navProgress[1].classList.remove('active');
    navProgress[2].classList.remove('active');
  }
  createForm() {
    this.fileUploadForm = this.formBuilder.group({
      fileUpload: ''
    });
  }

  onFileUpload(files: FileList) {
    for (let index = 0; index < files.length; index++) {
      this.fileToUpload.push(files.item(index));
      const fileInfo: FileInfo = new FileInfo();
      fileInfo.fileName = files.item(index).name;
      fileInfo.size = files.item(index).size;
      fileInfo.type = files.item(index).type;
      fileInfo.status = 'Uploaded';
      this.fileInfoList.push(fileInfo);
      this.table = false;
    }
    this.fileUploadService.uploadFile(this.fileToUpload).subscribe(
      data => {
        this.fileUpload = data;
        let file = '';
        this.fileUpload.data.files.filesPath.forEach(filePath => {
          file = file.concat(filePath.toString(), ',');
        });
        const prevFiles = localStorage.getItem('files');
        if (prevFiles != null) {
          file = file.concat(prevFiles, file);
        }
        localStorage.setItem('files', file);
      }
    );
  }

  // onFileDropped(event: UploadEvent) {
  //   this.files = event.files;
  //   for (const file in event.files) {
  //     if (file.fileEntry)
  //   }
  // }

  // public dropped(event: UploadEvent) {
  //   this.files = event.files;
  //   for (const droppedFile of event.files) {

  //     // Is it a file?
  //     if (droppedFile.fileEntry.isFile) {
  //       const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //       fileEntry.file((file: File) => {

  //         // Here you can access the real file
  //         console.log(droppedFile.relativePath, file);
  //         // You could upload it like this:
  //         this.formData.append('xml', file, droppedFile.relativePath);
  //         console.log(this.formData);
  //         this.fileUploadService.uploadFile(this.formData).subscribe(
  //           data => {
  //             console.log(data);
  //           },
  //           (err: HttpErrorResponse) => {
  //             console.log(err);
  //           }
  //         );

  //       });
  //     } else {
  //       // It was a directory (empty directories are added, otherwise only files)
  //       // const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
  //       // console.log(droppedFile.relativePath, fileEntry);
  //     }
  //   }
  // }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

}
