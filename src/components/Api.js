export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this.addCard = this.addCard.bind(this);
    this._checkResponse = this._checkResponse.bind(this);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      return this._checkResponse(res);
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

  getDataForRendered() {
    return Promise.all([ this.getInitialCards(), this.getUserInfo() ])
  }

  addCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      return this._checkResponse(res);
    })
  }

  setUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      return this._checkResponse(res);
    })
  }

  setAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      return this._checkResponse(res);
    })
  }

  deleteCard(data) {
    return fetch(`${this._url}cards/${data}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      return this._checkResponse(res);
    })
  }

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
