export class FileInfo {
    id: number;
    fileName: string;
    size: number;
    status: String;
    type: string;
}
export class FileUpload {
    data: Files;
}
export class Files {
    files: FileData;
}
export class FileData {
    name: String;
    filesPath: String[];
}
