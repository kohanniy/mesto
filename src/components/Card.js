export default class Card {
  constructor({ data, handleDeleteIconClick, handleLikeClick, handleCardClick }, userID, cardSelector) {
    this._data = data;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;
    this._userId = userID;
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
    this._image = this._card.querySelector('.cards__image');
    this._title = this._card.querySelector('.cards__title');
    this._deleteIcon = this._card.querySelector('.cards__delete-btn');
    this._likeIcon = this._card.querySelector('.cards__heart');
    this._numberLikes = this._card.querySelector('.cards__hearts-number');
    this._setEventListeners();

    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    this._title.textContent = this._data.name;
    this._numberLikes.textContent = this._data.likes.length;
    if (this._userId === this._data.owner._id) {
      this._deleteIcon.style.display = 'block';
    }

    return this._card;
  }

  //подключаем обработчики к...
  _setEventListeners() {

    //кнопке удаления карточки
    this._deleteIcon.addEventListener('click', () => {
      this._handleDeleteIconClick(this._card);
    });

    //сердечку
    this._likeIcon.addEventListener('click', (evt) => {
      this._handleLikeClick(evt);
    });

    //картинке
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

   //обработчик: удаляем и обнуляем карточку
  // _handleDeleteButtonClick() {
  //   this._card.remove();
  //   this._card = null;
  // };

  // //обработчик: ставим и убираем лайк
  // _handleLikeButtonClick(evt) {
  //   evt.target.classList.toggle('cards__heart_active');
  // }
}
