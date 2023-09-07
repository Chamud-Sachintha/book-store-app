import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, IonicModule } from '@ionic/angular';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-reading-view',
  templateUrl: './reading-view.component.html',
  styleUrls: ['./reading-view.component.scss'],
  standalone: true,
  imports: [IonicModule, PdfViewerModule]
})
export class ReadingViewComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  src: string = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  pageNumberType: number = 1;
  isModalOpen = false;
  isFullScreenModeOn = false;

  constructor(private router: Router) { }

  ngOnInit() {}

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
