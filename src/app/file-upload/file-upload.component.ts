import { Component, OnInit } from '@angular/core';
import { UploadFile } from 'ngx-file-drop';
import { FileUploadService } from './file-upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  public files: UploadFile[] = [];
  fileUploadForm: FormGroup;
  fileToUpload: File;

  constructor(
    private fileUploadService: FileUploadService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.fileUploadForm = this.formBuilder.group({
      files: ''
    });
  }

  onFileUpload(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fileUploadService.uploadFile(this.fileToUpload).subscribe(
      data => {
        console.log(data);
      }
    );
  }

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
