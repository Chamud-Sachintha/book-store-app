import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebModuleRoutingModule } from './web-module-routing.module';
import { HomeComponent } from './home/home.component';
 

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    WebModuleRoutingModule
  ]
})
export class WebModuleModule { }
