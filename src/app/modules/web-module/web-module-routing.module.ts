import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './book-list/book-list.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { InsideBookComponent } from './inside-book/inside-book.component';
import { CartComponent } from './cart/cart.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { ReadingViewComponent } from './reading-view/reading-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },

  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'book-list',
    component: BookListComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'edit',
        component: EditProfileComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'book',
    component: InsideBookComponent,
    pathMatch: 'full'
  },
  {
    path: 'cart',
    component: CartComponent,
    pathMatch: 'full'
  },
  {
    path: 'my-books',
    component: MyBooksComponent,
    pathMatch: 'full'
  },
  {
    path: 'read',
    component: ReadingViewComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebModuleRoutingModule { }
