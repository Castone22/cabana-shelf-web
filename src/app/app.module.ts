import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from "@angular/http";
import {RestService} from "./shared/services/rest.service";
import {BookBinderService} from "./shared/services/book-binder.service";
import { ShelfComponent } from './shelf/shelf.component';


@NgModule({
  declarations: [
    AppComponent,
    ShelfComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [RestService, BookBinderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
