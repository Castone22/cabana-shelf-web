import {AfterViewChecked, AfterViewInit, Component} from '@angular/core';

import {environment} from "../environments/environment";
import 'jquery'
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  endpoints = environment.endpoints;

  constructor(){

  }

  ngAfterViewInit() {
    setTimeout(()=> {
      $('.collapsible').collapsible();
      }, 2000 );
  }

}
