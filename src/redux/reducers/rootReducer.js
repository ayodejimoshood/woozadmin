
import { combineReducers}from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';


import auth from './auth'
import messages from './messages'
import users from './users'
import merchant from './merchant'
import verticals from './verticals'
import socials from './socials'

const persistConfig = {
  key: 'woozadmin',
  storage,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  auth,
  messages,
  users,
  merchant,
  verticals,
  socials,
  toastr: toastrReducer
});

export default persistReducer(persistConfig, rootReducer)

