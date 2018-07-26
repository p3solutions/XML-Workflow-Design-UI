import { Component, OnInit, Input } from '@angular/core';
import { CommonFnService } from '../common-fn.service';

@Component({
  selector: 'app-search-node',
  templateUrl: './search-node.component.html',
  styleUrls: ['./search-node.component.css']
})
export class SearchNodeComponent implements OnInit {
  // mandatory input decorators
  @Input() nodeTree: any; // the tree on which it will execute
  @Input() searchContainerSelector: string; // parent's class-selector
  constructor( ) { }

  ngOnInit() { }

  filterNodes(value, e) {
    const keyToFilter = value.trim();
    this.nodeTree.treeModel.filterNodes(keyToFilter);
  }
}
