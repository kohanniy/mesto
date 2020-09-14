import {popupPic, popupPicCaption, viewPicPopup, openPopup} from './index.js';

export class Card {
  constructor(data, cardSelector) {
    this._placeName = data.name;
    this._pictureLink = data.link;
    this._cardSelector = cardSelector;
  }

  //получаем шаблон карточки
  _getTemplate() {
    const card = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.cards__item').cloneNode(true);

    return card;
  }

  //создаем карточку
  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector('.cards__image').src = this._pictureLink;
    this._card.querySelector('.cards__image').alt = this._placeName;
    this._card.querySelector('.cards__title').textContent = this._placeName;

    return this._card;
  }

  //подключаем обработчики к...
  _setEventListeners() {

    //кнопке удаления карточки
    this._card.querySelector('.cards__delete-btn').addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    //сердечку
    this._card.querySelector('.cards__heart').addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    //картинке
    this._card.querySelector('.cards__image').addEventListener('click', () => {
      this._handleCardImageClick();
    });
  }

   //обработчик: удаляем и обнуляем карточку
  _handleDeleteButtonClick() {
    this._card.remove();
    this._card = null;
  };


  //обработчик: ставим и убираем лайк
  _handleLikeButtonClick() {
    this._card.querySelector('.cards__heart').classList.toggle('cards__heart_active');
  }

  //обработчик: открываем попап с картинкой карточки
  _handleCardImageClick() {
    openPopup(viewPicPopup);
    popupPic.src = this._card.querySelector('.cards__image').src;
    popupPic.alt = this._card.querySelector('.cards__image').alt;
    popupPicCaption.textContent = this._card.querySelector('.cards__image').alt;
  }
}
