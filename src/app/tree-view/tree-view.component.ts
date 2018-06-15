import { Component, OnInit } from '@angular/core';
import { v4 } from 'uuid';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

const actionMapping: IActionMapping = {
};

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];
  options = {
    allowDrag: (node) => node.isLeaf,
    allowDrop: false,
    getNodeClone: (node) => ({
      ...node.data,
      id: v4(),
      name: `copy of ${node.data.name}`
    }),
  };
  constructor() { }

  ngOnInit() {
  }

}
