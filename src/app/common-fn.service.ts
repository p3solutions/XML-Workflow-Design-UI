import { Injectable } from '@angular/core';

@Injectable()
export class CommonFnService {
  bgColor = {
    primary: '#F7F7F7',
    secondary: '#FFFFFF'
  };
  backgroundAttr = 'background';

  constructor() { }

  colorTree(selector) {
    setTimeout( () => {
      $(selector).each((i, el) => {
        let color = this.bgColor.secondary;
        if (i % 2 === 0) {
          color = this.bgColor.primary;
        }
        const styleObj = {};
        styleObj[this.backgroundAttr] = color;
        $(el).css(styleObj);
      });
    }, 100);
  }
  expandNode(node) {
    if (!node.isExpanded && node.hasChildren) {
      node.expand();
      node.setActiveAndVisible();
    }
  }
  onInitialized(_event, selector) {
    const checkRoot = () => { // instantly root is not available hence using setTimeout
      if (_event.treeModel && _event.treeModel.roots &&
        _event.treeModel.roots.length > 0) {
        this.expandNode(_event.treeModel.roots[0]);
        clearInterval(intervalFnId);
        this.colorTree(selector);
      }
    };
    const intervalFnId = setInterval(checkRoot, 100);
  }

  getAllNodes(tree) {
    console.log('getAllNodes', tree);
    return tree;
  }
}
