import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageBox } from '@fuse/components/message-box/message-box.provider';
import { Category } from 'app/modules/admin/model/category';

@Component({
    selector: 'app-formphanloai',
    templateUrl: './formphanloai.component.html',
    styleUrls: ['./formphanloai.component.scss']
})
export class FormphanloaiComponent implements OnInit {
    separatorExp: RegExp = /,| /;
    keys: string[] = [];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Category,
        public matDialogRef: MatDialogRef<FormphanloaiComponent>,
        private mb: MessageBox
    ) { }

    ngOnInit(): void {
        this.data.keys.forEach(element => {
            this.keys.push(element.key)
        })
    }

    saveAndClose(): void {
        this.matDialogRef.close(this.data);
    }

    close(): void {
        this.matDialogRef.close();
    }

    addChip(event) {
        this.data.keys.push({
            categoryId: this.data.id,
            key: event.value
        })
        console.log(this.data.keys);
        this.keys.push(event.value)
    }

    removeChip(event) {
        var index = this.data.keys.findIndex(element => {
            return element.key == event.value
        });
        if (index != -1) {
            this.data.keys.splice(index, 1);
            this.keys.slice(index, 1)
        }
    }
}
