import { Action, createReducer, on } from '@ngrx/store';


export interface State {
  apiError: string;
}

const initialState: State = {
  apiError: ''
}

export const appReducer = createReducer(
  initialState
)

