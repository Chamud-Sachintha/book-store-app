import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/Book/book';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBookList($requestBody: any): Observable<Book[]> {
    const path = environment.appUrl + "book-list";
    return this.http.post<Book[]>(path, $requestBody);
  }

  getBookDetailsByBookId($requestBody: any): Observable<Book> {
    const path = environment.appUrl + "book";
    return this.http.post<Book>(path, $requestBody);
  }
}
