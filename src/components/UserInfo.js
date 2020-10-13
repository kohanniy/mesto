export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector, avatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(profileDescriptionSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  renderProfile(data) {
    data.then((userData) => {
      this._profileName.textContent = userData.name;
      this._profileDescription.textContent = userData.about;
      this._profileAvatar.src = userData.avatar;
    })
  }

  getUserInfo() {
    return {
      username: this._profileName.textContent,
      activity: this._profileDescription.textContent,
      avatar: this._profileAvatar.src
    };
  }

  updateUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.about;
  }

  updateAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}
