export class TreeViewModel {
    data: TreeViewObject;
}
export class TreeViewObject {
    treeview: FileInfoObject;
}
export class FileInfoObject {
    fileName: string;
    fileValue: JsonTree;
}
export class JsonTree {
    tree: any;
}
