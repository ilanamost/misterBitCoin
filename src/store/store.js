import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { contactsReducer } from "./reducers";
import { usersReducer } from "./reducers";

const allReducers = combineReducers({
  contactsReducer,
  usersReducer
});

export default function configStore() {
  return createStore(allReducers, applyMiddleware(thunk));
}
