import { CommonModule, Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IonicModule, NavController, Platform } from '@ionic/angular';
import { Book } from 'src/app/models/Book/book';
import { Chapter } from 'src/app/models/Chapter/chapter';
import { Request } from 'src/app/models/Request/request';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ChaptersComponent  implements OnInit {

  requestModel = new Request();
  chapterList: Chapter[] = [];
  bookId!: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private bookService: BookService, 
    private platform: Platform, private navCtrl: NavController) { 
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => this.bookId = params['bookId']);

    this.getAllChaptersOfBook();
  }

  onClickBackBtn() {
    this.navCtrl.back();
  }

  getAllChaptersOfBook() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.bookId = this.bookId;

    this.bookService.getChapterListOfBook(this.requestModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));
      console.log(dataList.data[0])
      if (resp.code === 1) {
        dataList.data[0].forEach((chapter: Chapter) => {
          this.chapterList.push(chapter);
        })
      }
    }, (err) => {

    })
  }

  onClickBookChapter(bookId: number) {
    this.router.navigate(['/read', bookId]);
  }

  onClickCartPage() {
    this.router.navigate(['/cart']);
  }

  onClickProfileSection() {
    this.router.navigate(['/profile']);
  }

}
