import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verification-step',
  templateUrl: './verification-step.component.html',
  styleUrls: ['./verification-step.component.css']
})
export class VerificationStepComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.handleNavigationBtn();
  }
  handleNavigationBtn() {
    const navBtn = document.getElementById('nav-btn-container');
    navBtn.classList.remove('hide-ok');
    navBtn.classList.remove('hide-prev');
    navBtn.classList.add('hide-next');
    const progressBar = document.getElementById('progress-bar');
    progressBar.classList.add('width-100');
    progressBar.classList.remove('width-66');
    const navProgress = document.querySelectorAll('#navbarNav li.nav-item');
    navProgress[2].classList.add('active');
  }

}
