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
  rhsTreeSelector = '.rhs-tree';
  rhsTreeNodeSelector = '.rhs-tree .node-wrapper';
  rhsTreeScrollDivSelector = '.rhs-tree tree-viewport';
  disableOkBtn = false;
  errorClass = 'alert-danger';
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
    this.commonFnService.colorTreeLater(this.rhsTreeNodeSelector);
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
      const target = $('#node-' + idStr);
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
    this.colorCurrentTree();
    this.saveTree();
    this.deleteProgress = false;
  }
  enableDisableMultiDeleteButton() {
    setTimeout(() => {
      $('.tree-node-checkbox').is(':checked') ? (this.enableDelete = true) : (this.enableDelete = false);
    }, 100);
  }
  onToggle($event) {
    this.enableDisableMultiDeleteButton();
    // if ($event.isExpanded) {
    //   setTimeout(() => {
    //     const children = [];
    //     for (let i = 0; i < $event.node.children.length; i++) {
    //       children.push($event.node.children[i]);
    //     }
      //   children.forEach( (child) => {
      //     const childDOM = $('#' + child.id);
      //     // console.log('onToggleExpanded', childDOM, child);
      //     this.highlightedSelected(childDOM, child);
      //   });
      // }, 100);
    // }
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
    if (this.selectedNode.data.datatype === 'DATE' || this.selectedNode.data.datatype === 'DATETIME') {
      const conditionVal = this.selectedNode.data.conditionvalue.split(' ');
      this.selectedNode.data.conditionvalueDate = conditionVal[0];
      this.selectedNode.data.conditionvalueTime = conditionVal[1];
    } else if (this.selectedNode.data.datatype === 'INTEGER' || this.selectedNode.data.datatype === 'LONG') {
      this.selectedNode.data.conditionvalueInt = this.selectedNode.data.conditionvalue;
    }  else if (this.selectedNode.data.datatype === 'DOUBLE') {
      this.selectedNode.data.conditionvalueDouble = this.selectedNode.data.conditionvalue;
    }
    setTimeout(() => {
      document.getElementById('open-edit-modal').click();
    }, 10);
  }
  savePropertyChanges() {
    if (this.selectedNode.data.datatype === 'DATE') {
      this.selectedNode.data.conditionvalue = this.selectedNode.data.conditionvalueDate;
    } else if (this.selectedNode.data.datatype === 'DATETIME') {
      this.selectedNode.data.conditionvalue = this.selectedNode.data.conditionvalueDate + ' ' + this.selectedNode.data.conditionvalueTime;
    } else if (this.selectedNode.data.datatype === 'INTEGER' || this.selectedNode.data.datatype === 'LONG') {
      this.selectedNode.data.conditionvalue = this.selectedNode.data.conditionvalueInt;
    } else if (this.selectedNode.data.datatype === 'DOUBLE') {
      this.selectedNode.data.conditionvalue = this.selectedNode.data.conditionvalueDouble;
    }
    delete this.selectedNode.data.conditionvalueDate;
    delete this.selectedNode.data.conditionvalueTime;
    delete this.selectedNode.data.conditionvalueInt;
    delete this.selectedNode.data.conditionvalueDouble;
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
  onFiltered(e) {
    this.colorCurrentTree();
  }
  scrollElement(toTop) {
    const element = document.querySelector(this.rhsTreeScrollDivSelector);
    this.commonFnService.scrollTopBottom(element, toTop);
  }
  allowOnlyNumbers(_event, dataType) { // on keydown event
    let enablePeriod = false;
    if (dataType === 'DOUBLE') {
      enablePeriod = true;
    }
    this.commonFnService.allowOnlyNumbers(_event, enablePeriod);
  }
  // TODO: value of invalid date/time gives empty string so we can't decide if user entered invalid data or
  // wanted to go with empty string as it is temporary we should consider empty data also
  validateOnChange(_event) { // on keyup/change event
    // const target = _event.target;
    // const val = target.value;
    // console.log('changed', val, this.selectedNode.data.dataType);
    // let isValid = true;
    // if (this.selectedNode.data.dataType === 'DOUBLE' && (val[val.length - 1] === '.')) {
    //   isValid = false;
    // } else if (this.selectedNode.data.dataType === 'DATE' && val === '') {
    //   isValid = false;
    // }
    // if (isValid || val === '') {
    //   $(target).addClass(this.errorClass);
    //   this.disableOkBtn = true;
    // } else {
    //   $(target).removeClass(this.errorClass);
    //   this.disableOkBtn = false;
    // }
  }
}

