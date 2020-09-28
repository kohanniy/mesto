export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileName = document.querySelector(profileNameSelector).textContent;
    this._profileDescription = document.querySelector(profileDescriptionSelector).textContent;
  }

  getUserInfo() {
    return {
      username: this._profileName,
      userDescription: this._profileDescription
    };
  }

  setUserInfo({ username, activity }) {
    this._profileName = username.value;
    this._profileDescription = activity.value;
  }
}
