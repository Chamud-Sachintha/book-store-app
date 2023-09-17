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
import { SupportComponent } from './support/support.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ChaptersComponent } from './chapters/chapters.component';
import { TypeMailComponent } from './type-mail/type-mail.component';
import { ValidateOtpComponent } from './validate-otp/validate-otp.component';
import { ChangePwComponent } from './change-pw/change-pw.component';

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
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'book/:bookId',
    component: InsideBookComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'my-books',
    component: MyBooksComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'read/:bookId',
    component: ReadingViewComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'chapters/:bookId',
    component: ChaptersComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'support-page',
    component: SupportComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'forgot-pw',
    component: TypeMailComponent,
    pathMatch: 'full'
  },
  {
    path: 'validate-otp',
    component: ValidateOtpComponent,
    pathMatch: 'full'
  },
  {
    path: 'change-pw',
    component: ChangePwComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebModuleRoutingModule { }
