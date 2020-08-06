import { Component, OnInit } from '@angular/core';
import { BookmarkService } from './services/bookmark.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Bookmark } from './models/bookmark.model';
import { PageEvent } from '@angular/material/paginator';
import * as fromApp from './reducer/app.reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  id: string = null;
  title: string = '';
  url: string = '';
  description: string = '';
  protected: boolean = false;
  lowValue: number = 0;
  highValue: number = 20;
  isLoading$: Observable<boolean>;
  bookmarks$: Observable<Bookmark[]>;

  constructor(
    private bookmarkService: BookmarkService, 
    private store:Store<{app: fromApp.State}>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromApp.selectLoading);
    this.bookmarks$ = this.store.select(fromApp.selectBookmarks);
    this.bookmarkService.getBookmarks();
  }

  reset() {
    this.id = null;
    this.title= '';
    this.url = '';
    this.description = '';
    this.protected = false;
  }
  
  onCreate() {
    const value: Bookmark = {
      id: null,
      title: this.title,
      protected: this.protected,
      url: this.url,
      description: this.description,
    };

    if (this.bookmarkService.validateBookmark(value)) {
      this.bookmarkService.createBookmark(value);
      this.reset();
    }
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

}