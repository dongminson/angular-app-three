import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './reducer/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    BookmarkComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot({app:appReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
