import { Component, OnInit } from '@angular/core';
import { v4 } from 'uuid';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-structure-definition',
  templateUrl: './structure-definition.component.html',
  styleUrls: ['./structure-definition.component.css']
})
export class StructureDefinitionComponent implements OnInit {
  nodes = [
    {
      id: 1,
      name: 'configuration',
    }
  ];
  options = {
    allowDrag: (node) => node.isLeaf,
    allowDrop: true,
    actionMapping: {
      mouse: {
        drop: (tree: TreeModel, node: TreeNode, $event: any, { from, to }: { from: any, to: any }) =>
          tree.copyNode(from, to)
      }
    },
  };
  constructor() { }

  ngOnInit() {
  }

}
