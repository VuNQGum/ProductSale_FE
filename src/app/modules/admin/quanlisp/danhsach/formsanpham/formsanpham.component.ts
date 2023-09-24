import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'app/modules/admin/model/product';
import { MessageBox } from '@fuse/components/message-box/message-box.provider';
import { Buttons } from '@fuse/components/message-box/common';
import { FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'app-formsanpham',
    templateUrl: './formsanpham.component.html',
    styleUrls: ['./formsanpham.component.scss']
})
export class FormsanphamComponent implements OnInit {
    uploadedFiles: any[] = [];
    _fileForm: any;
    insertFile: any[] = []

    separatorExp: RegExp = /,| /;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Product,
        public matDialogRef: MatDialogRef<FormsanphamComponent>,
        private mb: MessageBox
    ) { }

    ngOnInit(): void {
    }

    saveAndClose(): void {
        this.matDialogRef.close(this.data);
    }

    close(): void {
        this.matDialogRef.close();
    }

    async myUploader(event, fileForm) {
        this.uploadedFiles.push(event);
        this._fileForm = fileForm;
        const files = this.uploadedFiles[this.uploadedFiles.length - 1].currentFiles;
    }

    blobToBase64(blob: Blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    deleteFile(file) {
        let dialog = this.mb.showDefault(
            'Bạn có muốn hủy phiếu đang tạo mới không?',
            Buttons.YesNo
        );
        dialog.dialogResult$.subscribe(async (result) => {
            if (result) {
                file.isdeleted = true;
            }
        });
    }

    removeFile(item: any, uploader: FileUpload, event: Event) {
        const index = uploader.files.indexOf(item);
        this.insertFile = this.insertFile.filter((element) => { return element.fileName != item.name });
        uploader.remove(event, index);
        this.uploadedFiles.push(event);
    }
}
