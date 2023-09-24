import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-imageview',
  templateUrl: './imageview.component.html',
  styleUrls: ['./imageview.component.scss']
})
export class ImageviewComponent implements OnInit {
  @Input('source') imageSource: string;
  @Input('type') type: string;
  @Input('width') width: number;
  @Input('height') height: number;
  imageSrc: any;
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit (): void {

  }

  ngOnChanges(): void {
    if (this.imageSource) {
      if (this.type.toUpperCase() === 'URL') {
        this.imageSrc = this.imageSource;
      } else if (this.type.toUpperCase() === 'BASE64') {
        if(this.imageSource.startsWith('data:image'))
          this.imageSource = this.imageSource.split(',')[1];
        this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.imageSource}`);
      }
    }
  }
}
