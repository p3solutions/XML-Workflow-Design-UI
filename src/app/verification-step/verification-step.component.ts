import { Component, OnInit } from '@angular/core';
import { ITreeOptions, TREE_ACTIONS } from 'angular-tree-component';
import { FileUploadService } from '../file-upload/file-upload.service';

@Component({
  selector: 'app-verification-step',
  templateUrl: './verification-step.component.html',
  styleUrls: ['./verification-step.component.css']
})
export class VerificationStepComponent implements OnInit {
  nodes = [];
  options: ITreeOptions = {
    allowDrag: false,
    allowDrop: false,
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
  jsonLoader = false;
  pdiLoader = false;
  jsonOutputFileName = 'output_workflow_file.json';
  xsdFileName = 'pdi-schema.xsd';
  jsonFileType = 'text/json';
  xsdFileType = 'text/xml';
  constructor(
    private fileUploadService: FileUploadService
  ) { }

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
    navProgress[1].classList.add('active');
    navProgress[2].classList.add('active');
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
  downloadFile(content, fileName, fileType) {
    const type = fileType || 'text';
    const blob = new Blob([content], { type: type });
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');
    a.download = fileName || 'output.txt';
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = [type, a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }
  getJsonFileObj(loader, fileName, type) {
    const dataStr = localStorage.getItem('configuration');
    if (!dataStr || dataStr.length === 0) {
      console.log('Error! Can\'t find parsed data.');
      loader = false;
      return false;
    }
    const dataArray = JSON.parse(dataStr);
    const fileObj = { 'result': dataArray[0] };
    const jsonTree = JSON.stringify(fileObj, null, 2);
    const name = fileName || 'output_workflow_file.json';
    const fileType = type || 'text/json';
    const jsonFileObj: any = {
      data: jsonTree,
      name: name,
      type: fileType
    };
    return jsonFileObj;
  }
  downloadJSONfile() {
    this.jsonLoader = true;
    const jsonFileObj = this.getJsonFileObj(this.jsonLoader, this.jsonOutputFileName, this.jsonFileType);
    this.downloadFile(jsonFileObj.data, jsonFileObj.name, jsonFileObj.type);
    this.jsonLoader = false;
  }
  downloadPDIfile() {
    this.pdiLoader = true;
    const jsonFileObj = this.getJsonFileObj(this.pdiLoader, this.jsonOutputFileName, this.jsonFileType);
    this.fileUploadService.generatePDI(new File([jsonFileObj.data], jsonFileObj.name)).subscribe( res => {
      this.fileUploadService.getPDIfile().subscribe(blob => {
        this.downloadFile(blob, this.xsdFileName, this.xsdFileType);
        this.pdiLoader = false;
      });
    }, (e) => {
      console.log('ERROR', e);
    });
  }
}
