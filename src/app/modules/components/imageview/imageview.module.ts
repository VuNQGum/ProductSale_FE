import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageviewComponent } from './imageview.component';
import { ImageModule } from 'primeng/image';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ImageviewComponent
  ],
  imports: [
    CommonModule,
    ImageModule,
    FormsModule
  ],
  exports: [
    ImageviewComponent
  ]
})
export class ImageviewModule { }
