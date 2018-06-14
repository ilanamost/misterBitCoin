import * as types from "./types";

import ContactService from "../services/ContactService.js";
import UserService from "../services/UserService.js";

export function getContactById(id) {
  // return { type: types.ADD_CONTACT, payload: newContact };

  return dispatch => {
    ContactService.getContactById(id).then(contact => {
      console.log("inside getContactById");

      dispatch({ type: types.GET_CONTACT_BY_ID, payload: contact });
    });
  };
}

export function addContact(newContact) {
  return dispatch => {
    ContactService.saveContact(newContact).then(id => {
      console.log("inside addContact");
      dispatch(loadContacts());
    });
  };
}

export function deleteContact(id) {
  return dispatch => {
    ContactService.deleteContact(id).then(contacts => {
      dispatch(loadContacts());
    });
  };
}

export function loadContacts(filter) {
  // We return a function instead of an action object
  return dispatch => {
    ContactService.getContacts(filter).then(contacts => {
      console.log("contacts", contacts);

      dispatch({
        type: types.LOAD_CONTACTS,
        payload: contacts
      });
    });
  };
}

export function loadUser() {
  return dispatch => {
    var user = UserService.getUser();

    dispatch({
      type: types.LOAD_USER,
      payload: user
    });
  };
}

export function updateUser(user) {
  return dispatch => {
    UserService.updateUser(user);
    dispatch(loadUser());
    // UserService.updateUser(user).then(user => {
    //   console.log("inside updateUser");
    //   dispatch(loadUser());
    // });
  };
}
