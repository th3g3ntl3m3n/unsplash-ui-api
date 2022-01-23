import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from 'redux-thunk';
import listReducer from './lists';
import photoReducer from './photos';

const rootReducer = combineReducers({
    lists: listReducer,
    photos: photoReducer
})

const store = createStore(rootReducer, applyMiddleware(reduxThunk))

export default store;