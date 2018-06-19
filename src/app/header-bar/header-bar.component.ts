import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  fileUploadUrl = '/file-upload';
  verificationUrl = '/verification';
  definitionUrl = '/definition';
  constructor(
    private router: Router

  ) { }

  ngOnInit() {
  }

  gotoPrev() {
    if (this.router.url === this.definitionUrl) {
      // validateIsReadyToNavigate()
      this.router.navigate([this.fileUploadUrl]);
    } else if (this.router.url === this.verificationUrl) {
      // validateIsReadyToNavigate()
      this.router.navigate([this.definitionUrl]);
    }
  }

  gotoNext() {
    if (this.router.url === this.fileUploadUrl) {
      // validateIsReadyToNavigate()
      this.router.navigate([this.definitionUrl]);
    } else if (this.router.url === this.definitionUrl) {
      // validateIsReadyToNavigate()
      this.router.navigate([this.verificationUrl]);
    }
  }

  gotoOK() {
    // validate / verify / submit / messageOnSubmit
  }
}
