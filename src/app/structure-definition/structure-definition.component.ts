import { Component, OnInit } from '@angular/core';
import { v4 } from 'uuid';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-structure-definition',
  templateUrl: './structure-definition.component.html',
  styleUrls: ['./structure-definition.component.css']
})
export class StructureDefinitionComponent implements OnInit {
  isChecked = true;
  isResult = true;
  nodes = [];
  options: ITreeOptions = {
    allowDrag: (node) => node.isLeaf,
    allowDrop: true,
    actionMapping: {
      mouse: {
        drop: (tree: TreeModel, node: TreeNode, $event: any, { from, to }: { from: any, to: any }) => {
          tree.copyNode(from, to);
          console.log($event);
          this.saveTree();
        }
      }
    },
  };
  constructor() { }

  ngOnInit() {
    const configuration = JSON.parse(localStorage.getItem('configuration'));
    if (configuration != null) {
      this.nodes = configuration;
    }
  }

  saveTree() {
    localStorage.setItem('configuration', JSON.stringify(this.nodes));
  }

  search(event: Event) {
    console.log(event);
  }
  result(event: Event) {
    console.log(event);
  }
  dataType(event: Event) {
    console.log(event);
  }

}
