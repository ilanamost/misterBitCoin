import storageService from "./StorageService.js";
const USER_KEY = "userName";

function saveUser(user) {
    if (!storageService.load(USER_KEY)) {
      storageService.store(USER_KEY, user);
    }
    console.log("user in saveUser", user);
    return user;
}

function getUser() {
  let user = {};
  if (storageService.load(USER_KEY)) {
    user = storageService.load(USER_KEY);
  }
  console.log("user in getUser", user);
  return user;
}

function getEmptyUser() {
  return {
    name: "",
    balance: 100,
    moves: []
  };
}

function updateUser(user) {
    storageService.store(USER_KEY, user);
    console.log("user in updateUser", user);
    return user;
}

export default {
  saveUser,
  getUser,
  getEmptyUser,
  updateUser
};
