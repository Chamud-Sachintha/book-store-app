import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IonModal, IonicModule } from '@ionic/angular';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { App as CapacitorApp } from '@capacitor/app';

@Component({
  selector: 'app-reading-view',
  templateUrl: './reading-view.component.html',
  styleUrls: ['./reading-view.component.scss'],
  standalone: true,
  imports: [IonicModule, PdfViewerModule]
})
export class ReadingViewComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  src: string = "";
  pageNumberType: number = 1;
  isModalOpen = false;
  isFullScreenModeOn = false;
  bookId!: number;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: Params) => this.bookId = params['bookId']);

    if (this.bookId == 1) {
      this.src = "../../../../assets/pdfs/1990.pdf";
    } else {
      this.src = "../../../../assets/pdfs/1992.pdf";
    }

    CapacitorApp.addListener('backButton', ({canGoBack}) => {
      this.location.back();
    })
  }

  onClickApplyFullScreen() {
    let elementImg: HTMLImageElement;
    const g = document.getElementById("testRTY");
    const e = document.getElementById("testPPP");
    const i = document.getElementById("testYYU");
    const pdf = document.getElementById("pdf");
    const icon = document.getElementById("fullScreenIcon");
    let exitIcon = document.getElementById("exitIcon");

    if (g !== null && e != null && i != null && pdf != null && icon != null && exitIcon != null) {
      g.style.display = 'none';
      e.style.display = 'none';
      i.style.display = 'none';
      pdf.style.height = "100vh";

      icon.style.display = "none";
      exitIcon.style.display = "";
    }
  }

  onClickExitFullScreen() {
    let elementImg: HTMLImageElement;
    const g = document.getElementById("testRTY");
    const e = document.getElementById("testPPP");
    const i = document.getElementById("testYYU");
    const pdf = document.getElementById("pdf");
    const icon = document.getElementById("fullScreenIcon");
    let exitIcon = document.getElementById("exitIcon");

    if (g !== null && e != null && i != null && pdf != null && icon != null && exitIcon != null) {
      g.style.display = '';
      e.style.display = '';
      i.style.display = '';
      pdf.style.height = "";

      icon.style.display = "";
      exitIcon.style.display = "none";
    }
  }

  onClickOpenModal(value: boolean) {
    this.isModalOpen = value;
  }

  onClickApplyBookmark(pageNumber: number) {
    this.pageNumberType = pageNumber;
    this.modalClose()
  }

  modalClose() {
    this.isModalOpen = false;
  }

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
