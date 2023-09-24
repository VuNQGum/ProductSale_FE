import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanliphanloaiComponent } from './quanliphanloai.component';
import { Route, RouterModule } from '@angular/router';
import { DanhsachplComponent } from './danhsachpl/danhsachpl.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { FormphanloaiComponent } from './danhsachpl/formphanloai/formphanloai.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TreeSelectModule } from 'primeng/treeselect';
export const routes: Route[] = [
    {
        path     : '',
        component: QuanliphanloaiComponent,
        children: [
            {
                path: '',
                component: DanhsachplComponent
            },
        ]
    }
];
@NgModule({
  declarations: [
    QuanliphanloaiComponent,
    DanhsachplComponent,
    FormphanloaiComponent
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
    ChipsModule,
    TreeTableModule,
    InputSwitchModule,
    TreeSelectModule
  ]
})
export class QuanliphanloaiModule { }
