import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-node',
  templateUrl: './search-node.component.html',
  styleUrls: ['./search-node.component.css']
})
export class SearchNodeComponent implements OnInit {

  keyword = '';
  nodeList = [];
  @Input() nodeArray;
  @Input() searchContainerSelector: string;
  @Input() commonNodeSelector: string;
  matchedNodeClass = 'alert-warning';
  matchedNodeArray: any;
  enterKeyCode = 13;
  containerDiv: any;
  constructor() { }

  ngOnInit() {
    if ($(this.searchContainerSelector).length === 0 ) {
      this.containerDiv = $('.node-wrapper').parent()[0];
    } else {
      this.containerDiv = $(this.searchContainerSelector);
    }
    if ($(this.commonNodeSelector).length === 0) {
      this.commonNodeSelector = '.node-wrapper .node-name';
    }
    console.log('init', this.nodeArray, this.containerDiv, this.commonNodeSelector);
  }
  toggleInputBox() {
    const isExpanded = $('#search-node-div').hasClass('expand');
    if (isExpanded) {
      $('#search-node-div').removeClass('expand');
      this.keyword = '';
    } else {
      $('#search-node-div').addClass('expand');
    }
  }
  resetSearchResult() {
    if (this.matchedNodeArray) {
      this.matchedNodeArray.each((i, el) => {
        $(el).removeClass(this.matchedNodeClass);
      });
    }
  }
  searchNode(_event, dropDownSelected) {
    const _component = this;
    if (_component.keyword.length > 0 && (_event.keyCode === _component.enterKeyCode || dropDownSelected)) {
      _event.preventDefault();
      _component.resetSearchResult();
      const regex = new RegExp(_component.keyword.toString(), 'i'); // ignoreCase
      _component.matchedNodeArray = $(_component.commonNodeSelector).filter(function () {
        const matchedNode = $(this);
        const matched = regex.test(matchedNode.text());
        if (matched) {
          matchedNode.addClass(_component.matchedNodeClass);
        }
        return matched;
      });
    }
  }

}
