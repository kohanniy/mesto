export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _parseResponseFromServer(res) {
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
      return this._parseResponseFromServer(res);
    })
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      return this._parseResponseFromServer(res);
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
      return this._parseResponseFromServer(res);
    })
  }

  setUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      return this._parseResponseFromServer(res);
    })
  }

  setAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      return this._parseResponseFromServer(res);
    })
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._parseResponseFromServer(res);
    })
  }

  putLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => {
      return this._parseResponseFromServer(res);
    })
  }

  deleteLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._parseResponseFromServer(res);
    })
  }
}
