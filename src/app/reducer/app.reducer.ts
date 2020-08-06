import { Bookmark } from '../models/bookmark.model';
import { AppActions, SET_BOOKMARKS, START_LOADING, STOP_LOADING } from './../actions/app.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface State {
    loading: boolean;
    bookmarks: Bookmark[]
}

const initialState: State = {
    loading: true,
    bookmarks: []
}

export function appReducer(state = initialState, action: AppActions) {
    switch(action.type) {
        case START_LOADING:
            return {
                ...state,
                loading: true
            };
        case STOP_LOADING:
            return {
                ...state,
                loading: false
            };
        case SET_BOOKMARKS:
            return {
                ...state,
                bookmarks: action.payload
            }
        default: 
            return state;
    }
}


const getBookmarks = (state: State) => state.bookmarks;
const getLoading = (state: State) => state.loading;

export const getAppState = createFeatureSelector<State>('app');
export const selectBookmarks = createSelector(getAppState, getBookmarks);
export const selectLoading = createSelector(getAppState, getLoading);
