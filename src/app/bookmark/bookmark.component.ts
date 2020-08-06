import { Component, OnInit, Input } from '@angular/core';
import { BookmarkService } from '../services/bookmark.service';
import { Bookmark } from '../models/bookmark.model';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  @Input() bookmark: Bookmark;
  edit: boolean = false;
  constructor(private bookmarkService: BookmarkService) {
    
  }

  ngOnInit() {

  }

  reset() {
    this.edit = false;
  }

  onToggleEdit() {
    this.edit = !this.edit;
  }

  onEdit() {
    this.reset();
    const value: Bookmark = {
      id: this.bookmark.id,
      title: this.bookmark.title,
      protected: this.bookmark.protected,
      url: this.bookmark.url,
      description: this.bookmark.description,
    };
    this.bookmarkService.updateBookmark(value);
  }

  onDelete(id: string) {
    this.bookmarkService.deleteBookmark(id);
  }




}
