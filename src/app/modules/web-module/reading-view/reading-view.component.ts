import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-reading-view',
  templateUrl: './reading-view.component.html',
  styleUrls: ['./reading-view.component.scss'],
  standalone: true,
  imports: [IonicModule, PdfViewerModule]
})
export class ReadingViewComponent  implements OnInit {

  src: string = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  pageNumberType: number = 1;

  constructor(private router: Router) { }

  ngOnInit() {}

  onClickNextPage() {
    this.pageNumberType += 1;
  }

  onClickPreviousPage() {
    this.pageNumberType = this.pageNumberType - 1;
  }

  changePageNumber(pageNumber: any) {
    this.pageNumberType = pageNumber
  }

  onClickProfileSection() {
    this.router.navigate(['/profile'])
  }

  onClickCartPage() {
    this.router.navigate(['/cart'])
  }

}
