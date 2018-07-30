import { Injectable } from '@angular/core';

@Injectable()
export class CommonFnService {
  bgColor = {
    primary: '#F7F7F7',
    secondary: '#FFFFFF'
  };
  backgroundAttr = 'background';
  currentTreeSelector = '';
  delayFn = (function() {
    let timer = 0;
    return function(callback, ms) {
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();
  defaultInterval = 1000;
  scrollSpeed = 'slow';
  constructor() { }

  expandNode(node) {
    if (!node.isExpanded && node.hasChildren) {
      node.expand();
      node.setActiveAndVisible();
    }
  }
  onInitialized(_event, selector) {
    const checkRoot = () => { // instantly root is not available hence using setTimeout
      if (_event.treeModel && _event.treeModel.nodes &&
        _event.treeModel.nodes[0].children.length > 0) {
        this.expandNode(_event.treeModel.roots[0]);
        clearInterval(intervalFnId);
        this.colorTreeWithDelay(selector, 10);
      }
    };
    const intervalFnId = setInterval(checkRoot, 100);
  }

  colorTreeLater(selector) {
    this.colorTreeWithDelay(selector, this.defaultInterval);
  }
  colorTreeWithDelay(selector, ms) {
    const bgColor = this.bgColor;
    const backgroundAttr = this.backgroundAttr;
    this.delayFn(() => {
      $(selector).each((i, el) => {
        let color = bgColor.secondary;
        if (i % 2 === 0) {
          color = bgColor.primary;
        }
        const styleObj = {};
        styleObj[backgroundAttr] = color;
        $(el).css(styleObj);
      });
    }, ms);
  }

  scrollTopBottom(element, toTop) {
    let scrollHeight = 0;
    if (!toTop) {
      scrollHeight = element.scrollHeight;
    }
    $(element).animate({
          scrollTop: scrollHeight
    }, this.scrollSpeed);
  }
}
