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
    })
    .then((res) => {
      return this._checkResponse(res);
    })
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
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
    })
    .then((res) => {
      return this._checkResponse(res);
    })
  }

  setAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      return this._checkResponse(res);
    })
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._checkResponse(res);
    })
  }

  putLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => {
      return this._checkResponse(res);
    })
  }

  deleteLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._checkResponse(res);
    })
  }
}
