import {popupPic, popupPicCaption, viewPic, openPopup} from './index.js';

export class Card {
  constructor(data, cardSelector) {
    this._placeName = data.name;
    this._pictureLink = data.link;
    this._cardSelector = cardSelector;
  }

  //получаем шаблон карточки
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.cards__item').cloneNode(true);

    return cardElement;
  }

  //создаем карточку
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.cards__image').src = this._pictureLink;
    this._element.querySelector('.cards__image').alt = this._placeName;
    this._element.querySelector('.cards__title').textContent = this._placeName;

    return this._element;
  }

  //подключаем обработчики к...
  _setEventListeners() {

    //кнопке удаления карточки
    this._element.querySelector('.cards__delete-btn').addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    //сердечку
    this._element.querySelector('.cards__heart').addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    //картинке
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._handleCardImageClick();
    });
  }

   //обработчик: удаляем карточку
  _handleDeleteButtonClick() {
    this._element.remove();
  };


  //обработчик: ставим и убираем лайк
  _handleLikeButtonClick() {
    this._element.querySelector('.cards__heart').classList.toggle('cards__heart_active');
  }

  //обработчик: открываем попап с картинкой карточки
  _handleCardImageClick() {
    openPopup(viewPic);
    popupPic.src = this._element.querySelector('.cards__image').src;
    popupPic.alt = this._element.querySelector('.cards__image').alt;
    popupPicCaption.textContent = this._element.querySelector('.cards__image').alt;
  }
}
