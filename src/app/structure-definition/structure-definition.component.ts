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
  nodes = [{
    id: 1, // pagedata node delete option is hidden on this id basis, changing this will display the delete icon
    name: 'pagedata'
  }];
  options: ITreeOptions = {
    allowDrag: (node) => node.isLeaf,
    allowDrop: true,
    // useCheckbox: true,
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
  deleteNode: any = {};
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

  confirmDelete(_event, node, tree) {
    const target = $(_event.target);
    this.deleteNode.targetNode = target.parents('tree-node')[0];
    this.deleteNode.targetNodeWrapper = target.parents('tree-node-wrapper');
    this.deleteNode.node = node;
    this.deleteNode.parentNode = node.realParent ? node.realParent : node.treeModel.virtualRoot;
    this.deleteNode.tree = tree;
    document.getElementById('confirm-delete').click();
  }
  deleteThenSave() {
    if (this.deleteNode.node) {
      let index = 0;
      const children = this.deleteNode.parentNode.data.children;
      children.some((child, i) => {
        index = i;
        return child === this.deleteNode.node.data;
      });
      children.splice(index, 1);
      this.deleteNode.tree.treeModel.update();
      if (this.deleteNode.node.parent.data.children.length === 0) {
        this.deleteNode.node.parent.data.hasChildren = false;
      }
      this.deleteNode.targetNodeWrapper.parent().slideUp();
      this.deleteNode.targetNode.remove();
      this.deleteNode = {};
      this.saveTree();
    }
  }
  // selectionForDelete(node, _event) {
  //   if ($(_event.target).is (':checked')) {
  //     node.delete = true;
  //   } else {
  //     node.delete = false;
  //   }
  // }
}
