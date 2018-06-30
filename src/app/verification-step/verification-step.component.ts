import { Component, OnInit } from '@angular/core';
import { ITreeOptions, TREE_ACTIONS } from 'angular-tree-component';

@Component({
  selector: 'app-verification-step',
  templateUrl: './verification-step.component.html',
  styleUrls: ['./verification-step.component.css']
})
export class VerificationStepComponent implements OnInit {
  nodes = [];
  options: ITreeOptions = {
    allowDrag: (node) => node.isLeaf,
    allowDrop: true,
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          if (node.hasChildren) {
            TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
            this.colorRHStree();
          }
        }
      },
    }
  };
  loader = false;
  constructor() { }

  ngOnInit() {
    const configuration = JSON.parse(localStorage.getItem('configuration'));
    if (configuration != null) {
      this.nodes = configuration;
    }
    this.handleNavigationBtn();
  }
  handleNavigationBtn() {
    const navBtn = document.getElementById('nav-btn-container');
    navBtn.classList.remove('hide-ok');
    navBtn.classList.remove('hide-prev');
    navBtn.classList.add('hide-next');
    const progressBar = document.getElementById('progress-bar');
    progressBar.classList.add('width-100');
    progressBar.classList.remove('width-66');
    const navProgress = document.querySelectorAll('#navbarNav li.nav-item');
    navProgress[2].classList.add('active');
  }

  downloadFile() {
    this.loader = true;
    const dataStr = localStorage.getItem('configuration');
    if (!dataStr || dataStr.length === 0) {
      console.log('Error! Can\'t find parsed data.');
      this.loader = false;
      return false;
    }
    const dataArray = JSON.parse(dataStr);
    const fileObj = { 'result': dataArray[0] };
    const jsonTree = JSON.stringify(fileObj, null, 2);
    const filename = 'output_workflow_file.json';
    const blob = new Blob([jsonTree], { type: 'text/json' });
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
    this.loader = false;
  }
  colorRHStree() {
    $('.node-wrapper').each((i, el) => {
      let color = '#FFFFFF';
      if (i % 2 === 0) {
              color = '#F7F7F7';
          }
      $(el).css({'background': color});
    });
  }
  onToggle() {
    setTimeout(this.colorRHStree, 10);
  }
  expandNode(node) {
    if (!node.isExpanded && node.hasChildren) {
      node.expand();
      node.setActiveAndVisible();
    }
  }
  onInitialized(_event) {
    setTimeout( () => {
    if (_event.treeModel && _event.treeModel.roots &&
      _event.treeModel.roots[0]) {
        this.expandNode(_event.treeModel.roots[0]);
      }
      this.colorRHStree();
    }, 100);
  }
}
