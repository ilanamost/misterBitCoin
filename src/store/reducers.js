import * as types from "./types";
import _ from "lodash";

const initState = {
  contacts: [],
  selectedContact: null
};

const initUserState = {
  loggedInUser: null
};

export function contactsReducer(state = initState, action) {
  console.log(action.type);
  let newState = _.cloneDeep(state);
  switch (action.type) {
    case types.ADD_CONTACT:
      newState.selectedContact = action.payload;
      newState.contacts.push(action.payload);
      console.log("newState.selectedContact", newState.selectedContact);

      return newState;

    case types.LOAD_CONTACTS:
      newState.contacts = action.payload;
      console.log("newState.contacts", newState.contacts);

      return newState;

    case types.GET_CONTACT_BY_ID:
      newState.selectedContact = action.payload;
      return newState;

    default:
      return state;
  }
}



export function usersReducer(state = initUserState, action) {
  console.log("initUserState", initUserState);

  let newState = _.cloneDeep(state);
  switch (action.type) {
    case types.LOAD_USER:
      if (!action.payload) {
        return null;
      }
      newState.loggedInUser = action.payload;
      console.log("newState", newState);
      return newState;

      case types.UPDATE_USER:
      if (!action.payload) {
        return null;
      }
      newState.loggedInUser = action.payload;
      console.log("newState", newState);
      return newState;

    default:
      return state;
  }
}

