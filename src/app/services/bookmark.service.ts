import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Bookmark } from './../models/bookmark.model';
import { Error } from './../models/error.model';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as fromApp from '../reducer/app.reducer';
import * as AppAction from '../actions/app.actions';
import { validateUrl, notEmpty } from '../utils/app.utils';

@Injectable({
  providedIn: 'root'
})

export class BookmarkService {
  constructor(
    private db: AngularFirestore, 
    private snackbar: MatSnackBar, 
    private store: Store<{app: fromApp.State}>) {}

  getBookmarks() {
    this.store.dispatch(new AppAction.StartLoading());
    this.db.collection('bookmarks')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map((doc:any) => {
            return {
              id: doc.payload.doc.id,
              edit: false,
              title: doc.payload.doc.data().title,
              protected: doc.payload.doc.data().protected,
              url: doc.payload.doc.data().url,
              description: doc.payload.doc.data().description,
            };
          });
        })
      ).subscribe((bookmarks: Bookmark[]) => {
        this.store.dispatch(new AppAction.SetBookmarks(bookmarks));
        this.store.dispatch(new AppAction.StopLoading());
      },(err) => {
        this.handleError(err);
      }
    )
  }

  createBookmark(data:Bookmark) {
    const newId = this.db.createId();
    return new Promise<any>((resolve, reject) =>{
      this.db
        .collection("bookmarks")
        .doc(newId)
        .set({...data, id: newId})
        .then(res => {resolve(res)}, err => {this.handleError(err); reject(err)});
    });
  }

  updateBookmark(data:Bookmark) {
    return new Promise<any>((resolve, reject) =>{
      this.db
        .collection("bookmarks")
        .doc(data.id)
        .set(data, { merge: false })
        .then(res => {resolve(res)}, err => {this.handleError(err); reject(err)});
    });
  }

  deleteBookmark(id:string) {
    return new Promise<any>((resolve, reject) =>{
      this.db
        .collection("bookmarks")
        .doc(id)
        .delete()
        .then(res => {resolve(res)}, err => {this.handleError(err); reject(err)});
    });
  }

  validateBookmark(bookmark:Bookmark) {
    if (!validateUrl(bookmark.url)) {
      this.handleError({message: 'You must enter a valid URL.'});
      return false;
    }
    if (!notEmpty(bookmark.title)) {
      this.handleError({message: 'Title cannot be empty.'});
      return false;
    }
    if(!notEmpty(bookmark.description)) {
      this.handleError({message: 'Description cannot be empty.'});
      return false;
    }
    return true;
  }

  handleError(err:Error) {
    this.snackbar.open(err.message, null, {duration: 3000});
  }

}
