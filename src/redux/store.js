import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "redux-logger"
import { persistStore } from 'redux-persist'

import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
const userInfo = JSON.parse(localStorage.getItem("user1"))
const initialState = {userInfo};
const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export const store = createStore(
  rootReducer,
  initialState,
 composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store)

export default { store, persistStore };