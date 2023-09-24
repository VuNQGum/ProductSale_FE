import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanlispComponent } from './quanlisp.component';
import { Route, RouterModule } from '@angular/router';
import { DanhsachComponent } from './danhsach/danhsach.component';
import {MatIconModule} from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsanphamComponent } from './danhsach/formsanpham/formsanpham.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DropdownModule } from 'primeng/dropdown';
import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import {ChipsModule} from 'primeng/chips';

export const routes: Route[] = [
    {
        path     : '',
        component: QuanlispComponent,
        children: [
            {
                path: '',
                component: DanhsachComponent
            },
        ]
    }
];
@NgModule({
  declarations: [
    QuanlispComponent,
    DanhsachComponent,
    FormsanphamComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    TableModule,
    ButtonModule,
    MatDialogModule,
    DropdownModule,
    MatButtonModule,
    FontAwesomeModule,
    InputTextModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CheckboxModule,
    InputTextareaModule,
    FileUploadModule,
    ChipsModule
  ]
})
export class QuanlispModule { }
