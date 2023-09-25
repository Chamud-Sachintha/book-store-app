import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/Book/book';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Review } from 'src/app/models/ClientReview/review';
import { Request } from 'src/app/models/Request/request';
import { Chapter } from 'src/app/models/Chapter/chapter';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBookList(requestBody: any): Observable<Book[]> {
    const path = environment.appUrl + "book-list";
    return this.http.post<Book[]>(path, requestBody);
  }

  getBookDetailsByBookId(requestBody: any): Observable<Book> {
    const path = environment.appUrl + "book";
    return this.http.post<Book>(path, requestBody);
  }

  submitClientReviewForBook(clientReviewInfo: Review) {
    const path = environment.appUrl + "create-feedback";
    return this.http.post(path, clientReviewInfo);
  }

  getPaidBooksList(requestBody: any) {
    const path = environment.appUrl + "paidBookList";
    return this.http.post(path, requestBody);
  }

  getChapterListOfBook(bookInfo: Request) {
    const path = environment.appUrl + "chapters";
    return this.http.post(path, bookInfo);
  }

  getChapterInfoById(requestBody: Request) {
    const path = environment.appUrl + "getChapterById";
    return this.http.post(path, requestBody);
  }

  checkBookPaidOrNot(bookInfo: Request) {
    const path = environment.appUrl + "verify-paid-book";
    return this.http.post(path, bookInfo);
  }

  getAllClientReviews(requestBody: Request) {
    const path = environment.appUrl + "feedback-list";
    return this.http.post(path, requestBody);
  }

  getPDFContent(requestBody: any) {
    const path = environment.fileServer + "getPdf" + "?pdfName=" + requestBody.pdfName;
    return this.http.get(path, {responseType: 'arraybuffer'});
  }
}
