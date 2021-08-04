import {Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'elbit';
  // @ts-ignore
  layouts:Observable<string[]>

  constructor(private api: ApiService) {
  }

  async ngOnInit() {
    this.layouts = this.api.layouts.asObservable() as Observable<string[]>

  }


}
