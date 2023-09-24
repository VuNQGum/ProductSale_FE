import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileviewComponent } from './fileview.component';
import { HttpClientModule } from '@angular/common/http';
import { AgVirtualScrollModule } from 'ag-virtual-scroll';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageviewModule } from '../imageview/imageview.module';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import {MatButtonModule} from '@angular/material/button';
import { NgxDocViewerModule } from 'ngx-doc-viewer'


@NgModule({
  declarations: [
    FileviewComponent
  ],
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    HttpClientModule,
    AgVirtualScrollModule,
    MatDialogModule,
    ImageviewModule,
    ImageModule,
    FormsModule,
    MatButtonModule,
    NgxDocViewerModule
  ]
})
export class FileviewModule { }
