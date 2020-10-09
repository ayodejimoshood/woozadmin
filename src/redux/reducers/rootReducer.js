
import { combineReducers}from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';


import auth from './auth'
import messages from './messages'

const persistConfig = {
  key: 'woozadmin',
  storage,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  auth,
  messages,
  toastr: toastrReducer
});

export default persistReducer(persistConfig, rootReducer)

