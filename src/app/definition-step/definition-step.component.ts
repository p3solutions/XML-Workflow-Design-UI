import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-definition-step',
  templateUrl: './definition-step.component.html',
  styleUrls: ['./definition-step.component.css']
})
export class DefinitionStepComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.handleNavigationBtn();
  }
  handleNavigationBtn() {
    const navBtn = document.getElementById('nav-btn-container');
    navBtn.classList.remove('hide-next');
    navBtn.classList.remove('hide-prev');
    navBtn.classList.add('hide-ok');
  }


}
