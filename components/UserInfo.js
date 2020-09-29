export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(profileDescriptionSelector);
  }

  getUserInfo() {
    return {
      username: this._profileName.textContent,
      activity: this._profileDescription.textContent
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.username;
    this._profileDescription.textContent = data.activity;
  }
}
