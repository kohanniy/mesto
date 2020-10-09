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

  // getUserInfo() {
  //   fetch('https://mesto.nomoreparties.co/v1/cohort-16/users/me', {
  //     method: 'GET',
  //     headers: {
  //       authorization: '1282f84b-7da3-48cb-b9e7-a66ba2d4bc54'
  //     }
  //   })
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((user) => {
  //     console.log(user);
  //   })
  //   .catch((rej) => {
  //     console.log('Ошибка');
  //   })
  // }

  // setUserInfo() {
  //   fetch('https://mesto.nomoreparties.co/v1/cohort-16/users/me', {
  //     method: 'PATCH',
  //     headers: {
  //       authorization: '1282f84b-7da3-48cb-b9e7-a66ba2d4bc54',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: 'Marie Skłodowska Curie',
  //       about: 'Physicist and Chemist'
  //     })
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((rej) => {
  //       console.log('ошибка');
  //     })
  // }

  // getInitialCards() {
  //   fetch('https://mesto.nomoreparties.co/v1/cohort-16/cards', {
  //     method: 'GET',
  //     headers: {
  //       authorization: '1282f84b-7da3-48cb-b9e7-a66ba2d4bc54'
  //     }
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((cards) => {
  //       console.log(cards);
  //     })
  //     .catch((rej) => {
  //       console.log('ошибка');
  //     })
  // }

  // addCard() {
  //   fetch('https://mesto.nomoreparties.co/v1/cohort-16/cards', {
  //     method: 'POST',
  //     headers: {
  //       authorization: '1282f84b-7da3-48cb-b9e7-a66ba2d4bc54',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: 'Байкал',
  //       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  //     })
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((rej) => {
  //       console.log('ошибка');
  //     })
  // }

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
