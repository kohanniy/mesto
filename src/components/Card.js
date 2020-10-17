export default class Card {
  constructor({ data, handleDeleteIconClick, handleLikeClick, handleCardClick }, userId, cardSelector) {
    this._data = data;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
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
    const someLike = this._data.likes.some((like) => {
      return like._id === this._userId;
    })
    this._setEventListeners();

    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    this._title.textContent = this._data.name;
    this._numberLikes.textContent = this._data.likes.length;
    if (this._userId === this._data.owner._id) {
      this._deleteIcon.style.display = 'block';
    }
    if (someLike === true) {
      this._likeIcon.classList.add('cards__heart_active');
    }

    return this._card;
  }

  _setEventListeners() {
    this._deleteIcon.addEventListener('click', () => {
      this._handleDeleteIconClick(this._card);
    });

    this._likeIcon.addEventListener('click', (evt) => {
      this._handleLikeClick(evt, this._data, this._numberLikes);
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }
}
