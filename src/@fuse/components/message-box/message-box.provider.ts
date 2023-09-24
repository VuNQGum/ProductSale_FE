import { MatDialog } from "@angular/material/dialog";
import { Button, Buttons } from "./common";
import { Observable, Subject } from "rxjs";
import { MessageBoxComponent } from "./message-box.component";
import { Injectable } from "@angular/core";

@Injectable()
export class MessageBox {
    constructor(private dialog: MatDialog) {
    }

    private dialogResultSubject!: Subject<boolean>;
    dialogResult$!: Observable<boolean>;

    show(message: string, title?: string, buttons?: Buttons): MessageBox {

        let dialogRef = this.dialog.open(MessageBoxComponent, {
            data: {
                message,
                title,
                buttons: buttons ?? Buttons.Ok
            },
            disableClose: true
        }
        );

        this.dialogResultSubject = new Subject<boolean>();
        this.dialogResult$ = this.dialogResultSubject.asObservable()

        dialogRef.componentInstance.dialogResult$.subscribe(pressedButton => {
            const value = pressedButton === 1 ? true : false;
            this.dialogResultSubject.next(value);
            this.dialogResultSubject.complete();
            dialogRef.close();
        });

        return this;
    }

    showDefault(message: string, buttons?: Buttons): MessageBox {

        let dialogRef = this.dialog.open(MessageBoxComponent, {
            data: {
                message,
                buttons: buttons ?? Buttons.Ok
            },
            disableClose: true
        }
        );

        this.dialogResultSubject = new Subject<boolean>();
        this.dialogResult$ = this.dialogResultSubject.asObservable()

        dialogRef.componentInstance.dialogResult$.subscribe(pressedButton => {
            const value = pressedButton === 1 ? true : false;
            this.dialogResultSubject.next(value);
            this.dialogResultSubject.complete();
            dialogRef.close();
        });

        return this;
    }
}