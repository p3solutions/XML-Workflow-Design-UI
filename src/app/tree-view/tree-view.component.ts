import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TREE_ACTIONS } from 'angular-tree-component';
import { TreeViewService } from './tree-view.service';
import { TreeViewModel } from './tree-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CommonFnService } from '../common-fn.service';

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
          }
        }
      },
    }
  };
  treeSeed: any;
  lhsTreeNodeSelector = '.lhs-tree .node-wrapper';
  constructor(
    private route: ActivatedRoute,
    private treeViewService: TreeViewService,
    private commonFnService: CommonFnService
  ) {}

  ngOnInit() {
      this.getData();
  }

  getData() {
    this.treeSeed = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.treeViewService.getTree(params.get('name'));
      })
    );
    this.treeSeed.subscribe(data => {
      this.nodes = data;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName) {
        console.log('ngOnChanges', changes[propName].currentValue);
      }
    }
  }
  onInitialized(_event) {
    this.commonFnService.onInitialized(_event, this.lhsTreeNodeSelector);
  }
  colorCurrentTree() {
    this.commonFnService.colorTreeLater(this.lhsTreeNodeSelector);
  }
  onToggle() {
    this.colorCurrentTree();
  }
  onFiltered() {
    this.colorCurrentTree();
  }
}
