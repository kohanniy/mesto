export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._placeName = data.name;
    this._pictureLink = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

    const cardImage = this._card.querySelector('.cards__image');
    const cardTitle = this._card.querySelector('.cards__title');

    cardImage.src = this._pictureLink;
    cardImage.alt = this._placeName;
    cardTitle.textContent = this._placeName;

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
      this._handleCardClick(this._placeName, this._pictureLink);
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
}
