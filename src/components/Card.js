export default class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteButtonClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
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
    this._cardLikes = this._card.querySelector('.cards__hearts-number');
    this._setEventListeners();

    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._cardTitle.textContent = this._data.name;
    this._cardLikes.textContent = this._data.likes.length;

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
      this._handleCardClick(this._data);
    });
  }

   //обработчик: удаляем и обнуляем карточку
  // _handleDeleteButtonClick() {
  //   this._card.remove();
  //   this._card = null;
  // };

  //обработчик: ставим и убираем лайк
  _handleLikeButtonClick(evt) {
    evt.target.classList.toggle('cards__heart_active');
  }
}
