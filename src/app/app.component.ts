import { Component } from '@angular/core';

import { BookBinderService } from "./shared/services/book-binder.service";
import { BookData } from './shared/models';
import { RestService } from "./shared/services/rest.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  endpoints = environment.endpoints;

  constructor(){

  }


}
