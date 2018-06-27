import { Component, OnInit, Input, DoCheck, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { v4 } from 'uuid';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { TreeViewService } from './tree-view.service';
import { TreeViewModel } from './tree-model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

const actionMapping: IActionMapping = {
};

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit, OnChanges {
  nodes: TreeViewModel;
  options = {
    allowDrag: true,
    allowDrop: false,
  };
  tree: any;
  constructor(
    private route: ActivatedRoute,
    private treeViewService: TreeViewService
  ) { }

  ngOnInit() {
    this.expandRoot();
    this.getData();
  }

  getData() {
    this.tree = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log(params.get('name'));
        return this.treeViewService.getTree(params.get('name'));
      })
    );
    this.tree.subscribe(data => {
      console.log(data);
      this.nodes = data;
      console.log(this.nodes.data.treeview);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName) {
        console.log(changes[propName].currentValue);
      }
    }
  }
  expandRoot() {
    // const someNode = this.tree.treeModel.getNodeById('1');
    // someNode.expand();
  }
}
