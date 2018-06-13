import { Component, OnInit } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemFileEntry } from 'ngx-file-drop';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FileUploadService } from './file-upload.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  public files: UploadFile[] = [];
  fileUploadForm: FormGroup;
  fileToUpload: File;
  private formData = new FormData;

  constructor(
    private fileUploadService: FileUploadService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.fileUploadForm = this.formBuilder.group({
      fileUpload: ''
    });
  }

  onFileUpload(files: FileList) {
    console.log(files.item(0));
    console.log(files.item(1));
    this.fileToUpload = files.item(0);
  }

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          // You could upload it like this:
          this.formData.append('xml', file, droppedFile.relativePath);
          console.log(this.formData);
          this.fileUploadService.uploadFile(this.formData).subscribe(
            data => {
              console.log(data);
            },
            (err: HttpErrorResponse) => {
              console.log(err);
            }
          );

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        // const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        // console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

}
