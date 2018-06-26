import { Component, OnInit } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';
import * as _ from 'lodash';

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
  };
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
    const dataStr = localStorage.getItem('configuration');
    if (!dataStr || dataStr.length === 0) {
      console.log('Error! Can\'t find parsed data.' );
      return false;
    }
    const dataArray = this.transformToTree(JSON.parse(dataStr));
    const fileObj = {'result': dataArray[0]};
    const jsonTree = JSON.stringify(fileObj, null, 2);
    const filename = 'output_workflow_file.json';
    const blob = new Blob([jsonTree], {type: 'text/json'});
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }

  transformToTree(arr) {
    const nodes = {};
    return arr.filter(function(obj) {
        const id = obj['name'];
        const  parentId = obj['parent'];
        nodes[id] = _.defaults(obj, nodes[id], { children: [] });
        if (parentId) {
          nodes[parentId] = (nodes[parentId] || { children: [] });
          const childArr = nodes[parentId]['children'];
          childArr.push(obj);
        }
        return !parentId;
    });
  }
}
