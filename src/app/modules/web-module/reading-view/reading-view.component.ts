import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IonModal, IonicModule } from '@ionic/angular';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { App as CapacitorApp } from '@capacitor/app';
import { Chapter } from 'src/app/models/Chapter/chapter';
import { Request } from 'src/app/models/Request/request';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/models/Book/book';

@Component({
  selector: 'app-reading-view',
  templateUrl: './reading-view.component.html',
  styleUrls: ['./reading-view.component.scss'],
  standalone: true,
  imports: [IonicModule, PdfViewerModule]
})
export class ReadingViewComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  chapterInfo = new Chapter();
  requestBody = new Request();
  bookInfo = new Book();
  src: string = "";
  pageNumberType: number = 1;
  isModalOpen = false;
  isFullScreenModeOn = false;
  bookId!: number;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private location: Location
              , private bookService: BookService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: Params) => this.bookId = params['bookId']);
  
    if (this.bookId == 1) {
      this.src = "../../../../assets/pdfs/1990.pdf";
    } else {
      this.src = "../../../../assets/pdfs/1992.pdf";
    }

    this.getChapterInfoById();
  }

  onClickBackBtn() {
    this.router.navigate(['chapters', localStorage.getItem("mainBookId")]);
  }

  getChapterInfoById() {
    this.requestBody.token = sessionStorage.getItem("authToken");
    this.requestBody.chapterId = this.bookId;

    this.bookService.getChapterInfoById(this.requestBody).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.bookInfo.bookName = dataList.data[0].bookName;
        this.chapterInfo.chapter = dataList.data[0].chapterName;
      }
    }, (err) => {

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

    if (e != null && i != null && pdf != null && icon != null && exitIcon != null) {
      // g.style.display = 'none';
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

    if (e != null && i != null && pdf != null && icon != null && exitIcon != null) {
      // g.style.display = '';
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
