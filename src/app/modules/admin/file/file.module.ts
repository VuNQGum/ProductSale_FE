import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent } from './file.component';
import { TableModule } from 'primeng/table';
import { Route, RouterModule } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { FileviewModule } from 'app/modules/components/fileview/fileview.module';
export const routes: Route[] = [
    {
        path     : '',
        component: FileComponent,
    }
];
@NgModule({
  declarations: [
    FileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    FileUploadModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    FileviewModule
  ]
})
export class FileModule { }
