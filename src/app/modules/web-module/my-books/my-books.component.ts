import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class MyBooksComponent  implements OnInit {

  constructor(private router: Router, private bookService: BookService) { }

  ngOnInit() {
    this.getMyPaidBookList();
  }

  getMyPaidBookList() {
    const requestBody = {
      token: sessionStorage.getItem("authToken"),
      clientId: sessionStorage.getItem("clientId")
    }

    this.bookService.getPaidBooksList(requestBody).subscribe((resp) => {
      console.log(resp);
    }, (err) => {

    })
  }

  onClickReadBook() {
    this.router.navigate(['/read']);
  }

  onClickCartPage() {
    this.router.navigate(['/cart']);
  }

  onClickProfileSection() {
    this.router.navigate(['/profile']);
  }
}
