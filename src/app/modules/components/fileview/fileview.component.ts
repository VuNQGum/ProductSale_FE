import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonApiService } from 'app/services/commonHttp';
import { AppUltil } from 'app/shared/AppUtils';
import FileSaver from 'file-saver';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-fileview',
  templateUrl: './fileview.component.html',
  styleUrls: ['./fileview.component.scss']
})
export class FileviewComponent implements OnInit {
  fileBase64: any;
  filePreview: any;
  is_Pdf: boolean = false;
  is_Image: boolean = false;
  is_Doc: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<FileviewComponent>,
    private http: CommonApiService,
    private sanitizer: DomSanitizer
  ) {
    pdfDefaultOptions.renderInteractiveForms = false;
  }
  ngOnInit(): void {
    console.log(this.data);

    if (!this.data || !this.data.fileContent) {
      return;
    }
    this.fileBase64 = this.data.fileContent;
    if (this.data &&
      (this.data?.fileId.toUpperCase().includes('PDF') ||
        this.data?.fileExtend.toUpperCase().includes('PDF'))) {
      this.is_Pdf = true;
      this.filePreview = AppUltil.base64ToBlob(this.fileBase64);

    } else if (this.data.fileExtend.toUpperCase().includes('IMAGE')) {
      this.is_Image = true;
      if (this.fileBase64.startsWith('data:image'))
        this.fileBase64 = this.fileBase64.split(',')[1];
      this.filePreview = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.fileBase64}`);
      // this.filePreview = this.fileBase64;
    } else if (this.data?.fileId.toUpperCase().includes('DOCX') ||
    this.data?.fileId.toUpperCase().includes('DOC') ){
        this.is_Doc = true
    }
  }


  saveAndClose(): void {
    this.matDialogRef.close();
  }

  close(): void {
    this.matDialogRef.close();
  }

  downloadAttachmentFile() {
    const blob = AppUltil.base64ToBlob(this.fileBase64);
    FileSaver.saveAs(blob, this.data.fileName);

  }
}
