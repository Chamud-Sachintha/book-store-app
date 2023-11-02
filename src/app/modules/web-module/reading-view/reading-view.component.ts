import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertController, IonModal, IonicModule } from '@ionic/angular';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { App as CapacitorApp } from '@capacitor/app';
import { Chapter } from 'src/app/models/Chapter/chapter';
import { Request } from 'src/app/models/Request/request';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/models/Book/book';
import { environment } from 'src/environments/environment';
import { BookMark } from 'src/app/models/BookMarks/book-mark';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-reading-view',
  templateUrl: './reading-view.component.html',
  styleUrls: ['./reading-view.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class ReadingViewComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  chapterInfo = new Chapter();
  requestBody = new Request();
  bookMarkInfo = new BookMark();
  bookInfo = new Book();
  src!: any;
  pdfByteArr: string = '';
  pageNumberType: number = 1;
  isModalOpen = false;
  isFullScreenModeOn = false;
  bookId!: number;
  createBookMarkForm!: FormGroup;
  bookMarkList: BookMark[] = [];
  sortedBookmarkList: BookMark[] = [];
  userEmail!: any;
  zoomableContent: any;
  pdfZoomScale = 1;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private location: Location,
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private analyticService: AnalyticsService
  ) {}

  ngOnInit() {
    this.activateRoute.params.subscribe(
      (params: Params) => (this.bookId = params['bookId'])
    );
    this.initCreateBookMarksInfoForm();
    this.getChapterInfoById();

    const myTemplate = document.getElementById('myTemplate');
    myTemplate?.scrollIntoView();

    // screen.orientation.addEventListener("change", (e: any) =>  {
    //     if (e.target.type == "landscape-primary") {
    //       this.pdfZoomScale = 1;
    //     } else {
    //       this.pdfZoomScale = 1;
    //     }
    // });

    this.zoomableContent = document.getElementById('pdf');
    let initialTouchDistance = 0;
    let initialScale = 1;

    this.zoomableContent.addEventListener('touchstart', (event: any) => {
      if (event.touches.length === 2) {
        // Calculate the initial distance between the two fingers.
        initialTouchDistance = Math.hypot(
          event.touches[0].pageX - event.touches[1].pageX,
          event.touches[0].pageY - event.touches[1].pageY
        );

        // Store the initial scale.
        initialScale =
          this.zoomableContent.getBoundingClientRect().width /
          this.zoomableContent.offsetWidth;
      }
    });

    this.zoomableContent.addEventListener('touchmove', (event: any) => {
      if (event.touches.length === 2) {
        // Calculate the current distance between the two fingers.
        const currentTouchDistance = Math.hypot(
          event.touches[0].pageX - event.touches[1].pageX,
          event.touches[0].pageY - event.touches[1].pageY
        );

        // Calculate the scale factor based on the initial and current distances.
        const scaleFactor = currentTouchDistance / initialTouchDistance;

        // Update the scale of the content.
        // this.zoomableContent.style.transform = `scale(${initialScale * scaleFactor})`;

        if (initialTouchDistance > currentTouchDistance && (this.pdfZoomScale > 1)) {
          this.pdfZoomScale -= 0.5;
        } else {
          this.pdfZoomScale += 0.5;
        }
      }
    });

    this.zoomableContent.addEventListener('touchend', () => {
      // Clear the initial values.
      initialTouchDistance = 0;
      initialScale = 1;
      // this.pdfZoomScale = 0.5
    });
  }

  onClickRemoveBookMark(bookmarkId: string) {
    this.bookMarkInfo = new BookMark();
    this.bookMarkInfo.token = sessionStorage.getItem('authToken');
    this.bookMarkInfo.bookmarkId = bookmarkId;

    this.bookService.removeBookmarkById(this.bookMarkInfo).subscribe(
      (resp: any) => {
        if (resp.code === 1) {
          this.presentAlert('', 'Bookmark Deleted Successfully');
          this.setOpen(false);
        }
      },
      (err) => {
        this.presentAlert('Remove Bookmark', err.message);
      }
    );
  }

  openCreateBookmarkModal() {
    this.createBookMarkForm.controls['pageNumber'].setValue(
      this.chapterInfo.chapter
    );
  }

  onClickApplyBookmarkBtn(pageNumber: number) {
    // this.pageNumberType =  pageNumber;
    this.isModalOpen = false;
    setTimeout(() => {
      this.router.navigate(['read', pageNumber]);
    }, 1000);
  }

  onClickCancelBookmarkListModal() {
    this.isModalOpen = false;
  }

  setOpen(isOpen: boolean) {
    this.getBookMarkListByBookIdAndClientId();
    this.isModalOpen = isOpen;
  }

  getBookMarkListByBookIdAndClientId() {
    this.bookMarkList = [];
    this.bookMarkInfo.token = sessionStorage.getItem('authToken');
    this.bookMarkInfo.clientId = sessionStorage.getItem('clientId');
    this.bookMarkInfo.bookId = localStorage.getItem('mainBookId');

    this.bookService
      .getBookMarkListByBookIdAndClinetId(this.bookMarkInfo)
      .subscribe(
        (resp: any) => {
          const dataList = JSON.parse(JSON.stringify(resp));
          console.log(dataList.data[0].body);
          if (resp.code === 1) {
            dataList.data[0].body.forEach((eachBookmark: BookMark) => {
              this.requestBody.token = sessionStorage.getItem('authToken');
              this.requestBody.chapterId = eachBookmark.pageNumber;

              const createdDateNew =parseInt(eachBookmark.createdDate) * 1000;
              eachBookmark.createdDate = createdDateNew.toString();

              this.bookMarkList.push(eachBookmark)

            //   this.bookService
            //     .getChapterInfoById(this.requestBody)
            //     .subscribe((info) => {
            //       const chapterInfo = JSON.parse(JSON.stringify(info));

            //       eachBookmark.chapterName = chapterInfo.data[0].chapterName;

            //       const createdDateNew =
            //         parseInt(eachBookmark.createdDate) * 1000;
            //       eachBookmark.createdDate = createdDateNew.toString();

            //       this.bookMarkList.push(eachBookmark);
            //     });
            });

            // this.bookMarkList = dataList.data[0].body.sort(
            //   (a: BookMark, b: BookMark) =>
            //     Number(b.bookmarkId) - Number(a.bookmarkId)
            // );            
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
  }

  bblSort(arr: BookMark[]) {
    console.log(arr.length)
    console.log(arr)
    for (var i = 0; i < arr.length; i++) {
      // Last i elements are already in place
      for (var j = 0; j < arr.length - i - 1; j++) {
        console.log(arr[j].bookmarkId)
        // Checking if the item at present iteration
        // is greater than the next iteration
        if (arr[j].bookmarkId > arr[j + 1].bookmarkId) {
          // If the condition is true
          // then swap them
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }

    // Print the sorted array
    console.log(arr);
  }

  initCreateBookMarksInfoForm() {
    this.createBookMarkForm = this.formBuilder.group({
      pageNumber: ['', Validators.required],
      pageDescription: ['', Validators.required],
    });
  }

  onClickBackBtn() {
    this.router.navigate(['chapters', localStorage.getItem('mainBookId')]);
  }

  getChapterInfoById() {
    this.requestBody.token = sessionStorage.getItem('authToken');
    this.requestBody.chapterId = this.bookId;

    this.bookService.getChapterInfoById(this.requestBody).subscribe(
      (resp: any) => {
        const dataList = JSON.parse(JSON.stringify(resp));

        if (resp.code === 1) {
          this.bookInfo.bookName = dataList.data[0].bookName;
          this.chapterInfo.chapter = dataList.data[0].chapterName;
          this.pdfByteArr = dataList.data[0].pdfPath;

          this.userEmail = sessionStorage.getItem('emailAddress');
          this.analyticService.setUser(this.userEmail);
          this.analyticService.setScreenName(this.chapterInfo.chapter);

          const requestBody = {
            pdfName: this.pdfByteArr,
          };

          this.bookService.getPDFContent(requestBody).subscribe(
            (pdf) => {
              this.src = pdf;
            },
            (err) => {
              console.log(err.message);
            }
          );
        }
      },
      (err) => {
        console.log('ffff' + err.message);
      }
    );
  }

  onClickApplyFullScreen() {
    let elementImg: HTMLImageElement;
    const g = document.getElementById('testRTY');
    const e = document.getElementById('testPPP');
    const i = document.getElementById('testYYU');
    const pdf = document.getElementById('pdf');
    const icon = document.getElementById('fullScreenIcon');
    const goUpBtn = document.getElementById('goUp');
    let exitIcon = document.getElementById('exitIcon');

    const spaceDivSection = document.getElementById('spaceDiv');

    if (
      e != null &&
      i != null &&
      pdf != null &&
      icon != null &&
      exitIcon != null &&
      goUpBtn != null &&
      spaceDivSection != null
    ) {
      // g.style.display = 'none';
      e.style.display = 'none';
      i.style.display = 'none';
      pdf.style.height = '100vh';

      icon.style.display = 'none';
      exitIcon.style.display = '';

      goUpBtn.style.display = '';
      spaceDivSection.classList.remove('col-4');
      spaceDivSection.classList.add('col-2');
    }
  }

  onClickHideBookMarkSection() {
    const getBookMarkSection = document.getElementById('bookmarkSection');
    const getBookmarkDownSection = document.getElementById(
      'bookmarkSectionDown'
    );

    if (getBookMarkSection != null && getBookmarkDownSection != null) {
      getBookMarkSection.style.display = 'none';
      getBookmarkDownSection.style.display = '';
    }
  }

  onClickDownBookmarkSection() {
    const getBookMarkSection = document.getElementById('bookmarkSection');
    const getBookmarkDownSection = document.getElementById(
      'bookmarkSectionDown'
    );

    if (getBookMarkSection != null && getBookmarkDownSection != null) {
      getBookMarkSection.style.display = '';
      getBookmarkDownSection.style.display = 'none';
    }
  }

  onClickExitFullScreen() {
    let elementImg: HTMLImageElement;
    const g = document.getElementById('testRTY');
    const e = document.getElementById('testPPP');
    const i = document.getElementById('testYYU');
    const pdf = document.getElementById('pdf');
    const icon = document.getElementById('fullScreenIcon');
    let exitIcon = document.getElementById('exitIcon');

    if (
      e != null &&
      i != null &&
      pdf != null &&
      icon != null &&
      exitIcon != null
    ) {
      // g.style.display = '';
      e.style.display = '';
      i.style.display = '';
      pdf.style.height = '';

      icon.style.display = '';
      exitIcon.style.display = 'none';
    }
  }

  onClickApplyBookmark(pageNumber: number) {
    this.pageNumberType = pageNumber;
    this.modalClose();
  }

  modalClose() {
    this.isModalOpen = false;
  }

  onSubmitSaveBookMarkInfo() {
    // const pageNumber = this.createBookMarkForm.controls['pageNumber'].value;
    const pageNumber = this.bookId;
    const pageDescription =
      this.createBookMarkForm.controls['pageDescription'].value;

    if (pageNumber.toString() == '') {
      this.presentAlert('Empty Field Detected', 'Page Number is required');
    } else if (pageDescription == '') {
      this.presentAlert('Empty Field Detected', 'Page Description is Required');
    } else {
      this.bookMarkInfo.token = sessionStorage.getItem('authToken');
      this.bookMarkInfo.clientId = sessionStorage.getItem('clientId');
      this.bookMarkInfo.bookId = localStorage.getItem('mainBookId');
      this.bookMarkInfo.pageNumber = pageNumber;
      this.bookMarkInfo.pageDescription = pageDescription;

      this.bookService.createBookMarkInfo(this.bookMarkInfo).subscribe(
        (resp: any) => {
          if (resp.code === 1) {
            this.presentAlert('', 'Bookmark Saved Successfully');
          }
        },
        (err) => {
          this.presentAlert('Add Bookmark', err.message);
        }
      );
    }
  }

  async presentAlert(subHeader: string, alertMessage: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: subHeader,
      message: alertMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }

  onClickPreviousPage() {
    this.pageNumberType = this.pageNumberType - 1;
  }

  changePageNumber(pageNumber: any) {
    this.pageNumberType = pageNumber;
  }

  onClickProfileSection() {
    this.router.navigate(['/profile']);
  }

  onClickCartPage() {
    this.router.navigate(['/cart']);
  }
}
