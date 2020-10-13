export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject('Произошла ошибка');
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      return this._checkResponse(res);
    })
  }

  addCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      this._checkResponse(res);
    })
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      return this._checkResponse(res);
    })
  }

  setUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      this._checkResponse(res);
    })
  }

  // deleteCard() {
  //   fetch('https://mesto.nomoreparties.co/v1/cohortId/cards/cardId', {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: '1282f84b-7da3-48cb-b9e7-a66ba2d4bc54'
  //     }
  //   })
  // }

  // putLike() {
  //   fetch('https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId', {
  //     method: 'PUT',
  //     headers: {
  //       authorization: '1282f84b-7da3-48cb-b9e7-a66ba2d4bc54'
  //     }
  //   })
  // }

  // deleteLike() {
  //   fetch('https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId', {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: '1282f84b-7da3-48cb-b9e7-a66ba2d4bc54'
  //     }
  //   })
  // }

  // updateAvatar() {
  //   fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar', {
  //     method: 'PATCH',
  //     headers: {
  //       authorization: '1282f84b-7da3-48cb-b9e7-a66ba2d4bc54'
  //     },
  //     body: JSON.stringify({
  //       avatar: ''
  //     })
  //   })
  // }
}
