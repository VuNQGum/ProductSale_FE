import { Component, Inject } from "@angular/core";
import { Buttons, Button } from "./common";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject } from "rxjs";

@Component({
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent {

  title = "Thông báo";
  message = '';
  buttons: Buttons = Buttons.Ok;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title ? data.title: "Thông báo";
    this.message = data.message
    this.buttons = data.buttons;
  }

  dialogResultSubject = new Subject<Button>();
  dialogResult$ = this.dialogResultSubject.asObservable();

  public get Buttons(): typeof Buttons {
    return Buttons;
  }

  public get Button(): typeof Button {
    return Button;
  }

  click(button: Button) {
    this.dialogResultSubject.next(button);
  }
  
}
