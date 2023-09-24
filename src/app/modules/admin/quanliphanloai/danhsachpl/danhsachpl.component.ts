import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonApiService } from 'app/services/commonHttp';
import { Subject, takeUntil } from 'rxjs';
import { FormphanloaiComponent } from './formphanloai/formphanloai.component';
import { A_CategoryURL } from 'app/services/admin/categoryUrl';
import { MessageService } from 'app/shared/message.services';

@Component({
    selector: 'app-danhsachpl',
    templateUrl: './danhsachpl.component.html',
    styleUrls: ['./danhsachpl.component.scss']
})
export class DanhsachplComponent implements OnInit {
    category: any[]
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private http: CommonApiService,
        private _matDialog: MatDialog,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
    }

    add(): void {
        const dialogRef = this._matDialog.open(FormphanloaiComponent, {
            width: '900px',
            disableClose: true,
            data: {keys: []}
        });

        dialogRef.afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.http
                    .post(A_CategoryURL.save(), result)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((result) => {
                        if (!result || !result.state) {
                            this.messageService.showErrorMessage(
                                'Hệ thống',
                                'Tạo mới không thành công'
                            );
                            return;
                        }
                        this.messageService.showSuccessMessage(
                            'Hệ thống',
                            'Thêm mới thành công'
                        );
                    });
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

}
