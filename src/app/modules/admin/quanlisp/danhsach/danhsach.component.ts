import { Component, OnInit } from '@angular/core';
import { A_ProductURL } from 'app/services/admin/productUrl';
import { CommonApiService } from 'app/services/commonHttp';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { FormsanphamComponent } from './formsanpham/formsanpham.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector: 'app-danhsach',
    templateUrl: './danhsach.component.html',
    styleUrls: ['./danhsach.component.scss']
})
export class DanhsachComponent implements OnInit {
    products = [
        {
            id: '1000',
            code: 'f230fh0g3',
            name: 'Bamboo Watch',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 65,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
    ]

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private http: CommonApiService,
        private _matDialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.http
            .get(
                A_ProductURL.getListProduct()
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
                if (!res) return;
                this.products = res.data;
            });
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }

    add(): void {
        const dialogRef = this._matDialog.open(FormsanphamComponent, {
          width: '900px',
          disableClose: true,
          data: {}
        });

        dialogRef.afterClosed()
          .subscribe((result) => {
            if (result) {
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
