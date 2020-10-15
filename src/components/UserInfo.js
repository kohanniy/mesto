export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector, avatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(profileDescriptionSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  renderProfileInfo(data) {
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.about;
  }

  renderAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
      avatar: this._profileAvatar.src
    };
  }
}
