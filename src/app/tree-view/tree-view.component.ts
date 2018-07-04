import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TREE_ACTIONS } from 'angular-tree-component';
import { TreeViewService } from './tree-view.service';
import { TreeViewModel } from './tree-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit, OnChanges {
  nodes: TreeViewModel;
  draggedTarget: any;
  options = {
    allowDrag: true,
    allowDrop: false,
    actionMapping: {
      mouse: {
        dragStart: (tree, node, $event) => {
          this.draggedTarget = $($event.target);
          this.draggedTarget.addClass('drag-view');
        },
        dragEnd: () => {
          this.draggedTarget.removeClass('drag-view');
          this.draggedTarget = null;
        },
        dblClick: (tree, node, $event) => {
          if (node.hasChildren) {
            TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
            this.colorRHStree();
          }
        }
      },
    }
  };
  tree: any;
  constructor(
    private route: ActivatedRoute,
    private treeViewService: TreeViewService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.tree = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log(params.get('name'));
        return this.treeViewService.getTree(params.get('name'));
      })
    );
    this.tree.subscribe(data => {
      console.log(data);
      this.nodes = data;
      console.log(this.nodes.data.treeview);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName) {
        console.log(changes[propName].currentValue);
      }
    }
  }
  colorRHStree() {
    $('.lhs-tree .node-wrapper').each((i, el) => {
      let color = '#FFFFFF';
      if (i % 2 === 0) {
        color = '#F7F7F7';
      }
      $(el).css({ 'background': color });
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
    setTimeout(() => { // instantly root is not available hence using setTimeout
      if (_event.treeModel && _event.treeModel.roots &&
        _event.treeModel.roots[0]) {
        this.expandNode(_event.treeModel.roots[0]);
      }
      this.colorRHStree();
    }, 100);
  }
}
