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
    this._cardImage = this._card.querySelector('.cards__image');
    this._cardTitle = this._card.querySelector('.cards__title');
    this._setEventListeners();

    this._cardImage.src = this._pictureLink;
    this._cardImage.alt = this._placeName;
    this._cardTitle.textContent = this._placeName;

    return this._card;
  }

  //подключаем обработчики к...
  _setEventListeners() {

    //кнопке удаления карточки
    this._card.querySelector('.cards__delete-btn').addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    //сердечку
    this._card.querySelector('.cards__heart').addEventListener('click', (evt) => {
      this._handleLikeButtonClick(evt);
    });

    //картинке
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._placeName, this._pictureLink);
    });
  }

   //обработчик: удаляем и обнуляем карточку
  _handleDeleteButtonClick() {
    this._card.remove();
    this._card = null;
  };

  //обработчик: ставим и убираем лайк
  _handleLikeButtonClick(evt) {
    evt.target.classList.toggle('cards__heart_active');
  }
}
