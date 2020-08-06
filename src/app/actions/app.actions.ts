import { Action } from '@ngrx/store';
import { Bookmark } from '../models/bookmark.model';

export const START_LOADING = 'Start Loading';
export const STOP_LOADING = 'Stop Loading';
export const SET_BOOKMARKS = 'Set Bookmarks';

export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export class SetBookmarks implements Action {
    readonly type = SET_BOOKMARKS;

    constructor(public payload: Bookmark[]) {}
}

export type AppActions = StartLoading | StopLoading | SetBookmarks;
