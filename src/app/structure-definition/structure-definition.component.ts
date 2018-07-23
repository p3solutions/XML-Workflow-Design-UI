import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, ITreeOptions } from 'angular-tree-component';
import { CommonFnService } from '../common-fn.service';

@Component({
  selector: 'app-structure-definition',
  templateUrl: './structure-definition.component.html',
  styleUrls: ['./structure-definition.component.css']
})
export class StructureDefinitionComponent implements OnInit {
  isChecked = true;
  isResult = true;
  draggedTarget: any;
  enableDelete = false;
  deleteProgress = false;
  @ViewChild('tree') sdTree;
  nodes = [{
    id: 1, // pagedata node delete option is hidden on this id basis, changing this will display the delete icon
    name: 'pagedata'
  }];
  options: ITreeOptions = {
    allowDrag: (node) => node.isLeaf,
    allowDrop: true,
    useCheckbox: true,
    useTriState: false,
    actionMapping: {
      mouse: {
        checkboxClick : (tree: TreeModel, node: TreeNode, $event: any) => {
          node.toggleSelected();
          // this.highlightedSelected($event.target, node);
          this.enableDisableMultiDeleteButton();
        },
        dragStart: (tree, node, $event) => {
          this.draggedTarget = $($event.target);
          this.draggedTarget.addClass('drag-view');
        },
        dragEnd: () => {
          this.draggedTarget.removeClass('drag-view');
          this.draggedTarget = null;
        },
        drop: (tree: TreeModel, node: TreeNode, $event: any, { from, to }: { from: any, to: any }) => {
          const copiedFrom: any = Object.assign({}, node);
          copiedFrom.id = Number(from.id);
          copiedFrom.name = String(from.name);
          copiedFrom.hasChildren = !!from.hasChildren;
          copiedFrom.children = Object.assign({}, from.children);
          copiedFrom.data = Object.assign({}, from.data);
          copiedFrom._getParentsChildren = from._getParentsChildren;
          copiedFrom.getIndexInParent = from.getIndexInParent;
          tree.copyNode(copiedFrom, to);
          tree.update();
          this.saveTree();
          this.expandNode(to.parent);
          this.colorCurrentTree();
        },
        dblClick: (tree, node, $event) => {
          if (node.hasChildren) {
            TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
            // this.highlightedSelected($event.target, node);
            this.enableDisableMultiDeleteButton();
          }
        }
      },
    },
  };
  deleteNode: any = {};
  selectedNode: any;
  selectedConditionList = new Map();
  selectedConditionArray = [];
  rhsTreeNodeSelector = '.rhs-tree .node-wrapper';
  constructor(
    private commonFnService: CommonFnService
  ) { }

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
  expandNode(node) {
    this.commonFnService.expandNode(node);
  }
  colorCurrentTree() {
    this.commonFnService.colorTree(this.rhsTreeNodeSelector);
  }
  onInitialized(_event) {
    this.commonFnService.onInitialized(_event, this.rhsTreeNodeSelector);
  }
  onCopyNode(_event) {
    const copiedNode = _event.treeModel.getNodeById(_event.node.id);
    this.expandNode(copiedNode.parent);
    this.colorCurrentTree();
  }

  handleSingleMultiDelete() {
    if (!this.deleteNode.node && this.enableDelete) {
      this.multiDelete();
    } else {
      this.deleteThenSave(true);
    }
  }
  confirmDelete(_event, node, tree) {
      const target = $(_event.target);
      this.deleteNode.targetNode = target.parents('tree-node')[0];
      this.deleteNode.targetNodeWrapper = target.parents('tree-node-wrapper');
      this.deleteNode.node = node;
      this.deleteNode.parentNode = node.realParent ? node.realParent : node.treeModel.virtualRoot;
      this.deleteNode.tree = tree.treeModel;
      this.openConfirmDeleteModal();
  }
  deleteThenSave(singleDelete) {
    if (this.deleteNode.node) {
      let index = 0;
      const children = this.deleteNode.parentNode.data.children;
      children.some((child, i) => {
        index = i;
        return child === this.deleteNode.node.data;
      });
      children.splice(index, 1);
      if (singleDelete) {
        this.deleteNode.tree.update();
      }
      if (this.deleteNode.node.parent.data.children.length === 0) {
        this.deleteNode.node.parent.data.hasChildren = false;
      }
      this.deleteNode.targetNodeWrapper.parent().slideUp();
      this.deleteNode.targetNode.remove();
      this.deleteNode = {};
      if (singleDelete) {
        this.saveTree();
        this.colorCurrentTree();
      }
    }
    this.enableDisableMultiDeleteButton();
  }
  multiDelete() {
    this.deleteProgress = true;
    const tree = this.sdTree.treeModel;
    const targetIdsArray = [];
    for (let key in tree.selectedLeafNodeIds) {
      if (tree.selectedLeafNodeIds.hasOwnProperty(key) && tree.selectedLeafNodeIds[key]) {
        targetIdsArray.push(key);
        key = null;
      }
    }
    targetIdsArray.forEach(idStr => {
      const target = $('#' + idStr);
      if (target.length > 0) {
        this.deleteNode.targetNode = target.parents('tree-node')[0];
        this.deleteNode.targetNodeWrapper = target.parents('tree-node-wrapper');
        const node = tree.getNodeById(Number(idStr));
        this.deleteNode.node = node;
        this.deleteNode.parentNode = node.realParent ? node.realParent : node.treeModel.virtualRoot;
        this.deleteNode.tree = tree;
        this.deleteThenSave(false);
      }
    });
    tree.update();
    this.saveTree();
    this.colorCurrentTree();
    this.deleteProgress = false;
  }
  enableDisableMultiDeleteButton() {
    setTimeout(() => {
      $('.tree-node-checkbox').is(':checked') ? (this.enableDelete = true) : (this.enableDelete = false);
    }, 100);
  }
  onToggle($event) {
    this.enableDisableMultiDeleteButton();
    if ($event.isExpanded) {
      setTimeout(() => {
        const children = [];
        for (let i = 0; i < $event.node.children.length; i++) {
          children.push($event.node.children[i]);
        }
        // children.forEach( (child) => {
        //   const childDOM = $('#' + child.id);
        //   // console.log('onToggleExpanded', childDOM, child);
        //   this.highlightedSelected(childDOM, child);
        // });
      }, 100);
    }
    this.colorCurrentTree();
  }
  highlightedSelected(target, node) {
    const targetDiv = $(target).parents('.tree-node')[0];
    // console.log('highlightedSelected', targetDiv, node.isSelected);
    if (node.isSelected) {
      $(targetDiv).addClass('selected-to-delete');
    } else {
      $(targetDiv).removeClass('selected-to-delete');
    }
  }
  openConfirmDeleteModal() {
    document.getElementById('confirm-delete').click();
  }

  openEditModal(node) {
    this.selectedNode = node;
    setTimeout(() => {
      document.getElementById('open-edit-modal').click();
    }, 10);
  }
  savePropertyChanges() {
    this.saveTree();
    this.selectedNode = null;
  }
  handleMin() {
    const selectedNodeMinValue  = $('#selected-node-min').is(':checked');
    if (selectedNodeMinValue) {
      this.selectedNode.data.minoccurance = '1';
    } else {
      this.selectedNode.data.minoccurance = '0';
    }
    this.saveTree();
  }
  handleMax() {
    const selectedNodeMinValue  = $('#selected-node-max').is(':checked');
    if (selectedNodeMinValue) {
      this.selectedNode.data.maxoccurance = 'unbound';
    } else {
      this.selectedNode.data.maxoccurance = '';
    }
    this.saveTree();
  }
  conditionalCheck($event) {
    const target = $event.target;
    const isChecked = target.checked;
    if (isChecked) {
      this.selectedConditionList.set(this.selectedNode.id, this.selectedNode.data.frompath);
    } else {
      this.selectedConditionList.delete(this.selectedNode.id);
    }
    this.selectedConditionArray = Array.from(this.selectedConditionList.values());
    this.saveTree();
  }
}

