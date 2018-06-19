import { Component, OnInit, Input } from '@angular/core';
import { v4 } from 'uuid';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { TreeViewService } from './tree-view.service';
import { TreeViewModel } from './tree-model';

const actionMapping: IActionMapping = {
};

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  @Input() name: string;
  nodes: TreeViewModel;
  options = {
    allowDrag: (node) => node.isLeaf,
    allowDrop: false,
    getNodeClone: (node) => ({
      ...node.data,
      id: v4(),
      name: `copy of ${node.data.name}`
    }),
  };
  constructor(
    private treeViewService: TreeViewService
  ) { }

  ngOnInit() {
    this.treeViewService.getTree(this.name).subscribe(data => {
      console.log(data);
      this.nodes = data;
      console.log(this.nodes);
      console.log(this.nodes.data.treeview.fileValue.tree);
    });
  }

}
