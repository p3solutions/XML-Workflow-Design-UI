import { Component, OnInit, Input } from '@angular/core';
import { CommonFnService } from '../common-fn.service';

@Component({
  selector: 'app-scroll-top-bottom',
  templateUrl: './scroll-top-bottom.component.html',
  styleUrls: ['./scroll-top-bottom.component.css']
})
export class ScrollTopBottomComponent implements OnInit {

  @Input() scrollDivToTop: boolean;
  @Input() scrollDivSelector: string;
  constructor(
    private commonFnService: CommonFnService
  ) { }

  ngOnInit() {
  }

  scrollElement() {
    const element = document.querySelector(this.scrollDivSelector);
    this.commonFnService.scrollTopBottom(element, this.scrollDivToTop);
  }
}
