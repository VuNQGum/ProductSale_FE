import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from './message-box.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    MessageBoxComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ]
})
export class MessageBoxModule { }
