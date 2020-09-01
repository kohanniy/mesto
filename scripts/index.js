const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profile = document.querySelector('.profile');

const editProfile = document.querySelector('.popup_type_edit-profile');

const editProfileOpenButton = profile.querySelector('.profile__edit-btn');

const profileName = profile.querySelector('.profile__name');

const profileDescription = profile.querySelector('.profile__description');

const username = editProfile.querySelector('.username');

const activity = editProfile.querySelector('.activity');

const editProfileCloseButton = editProfile.querySelector('.popup__close-btn_for_edit-profile');

const userForm = editProfile.querySelector('.user-form');

const addCard = document.querySelector('.popup_type_add-card');

const addCardOpenButton = profile.querySelector('.profile__add-btn');

const addCardCloseButton = addCard.querySelector('.popup__close-btn_for_add-card');

const cardTemplate = document.querySelector('#cardItemTemplate').content;

const cardsList = document.querySelector('.cards__list');

const placeForm = addCard.querySelector('.place-form');

const placeName = placeForm.querySelector('.place-name');

const pictureLink = placeForm.querySelector('.picture-link');

const viewPic = document.querySelector('.popup_type_view-pic');

const popupPic = viewPic.querySelector('.popup__pic');

const popupPicCaption = viewPic.querySelector('.popup__pic-caption');

const viewPicCloseButton = viewPic.querySelector('.popup__close-btn_for_view-pic');

//Функция, которая открывает нужный попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

//Функция, которая закрывает нужный попап
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

//Функция, которая добавляет изменения в данные профиля
const userFormSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = username.value;
  profileDescription.textContent = activity.value;
  closePopup(editProfile);
};

//Функция, которая создает карточку
const createCard = (placeName, pictureLink) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__image');
  const cardTitle = cardElement.querySelector('.cards__title');
  const likeButton = cardElement.querySelector('.cards__heart');
  const deleteButton = cardElement.querySelector('.cards__delete-btn');

  //Функция, которая добавляет и удаляет лайк карточке
  const addOrCancelLike = () => {
    likeButton.classList.toggle('cards__heart_active');
  };

  //Функция, которая удаляет карточку
  const deleteCard = (evt) => {
    evt.target.closest('.cards__item').remove();
  };

  //Функция, которая открывает попап с картинкой в полном размере
  const openViewPic = () => {
    openPopup(viewPic);
    popupPic.src = cardImage.src;
    popupPicCaption.textContent = cardTitle.textContent;
  };

  cardImage.src = pictureLink;
  cardTitle.textContent = placeName;

  //Ставим и убираем лайк
  likeButton.addEventListener('click', addOrCancelLike);

  //Удаляем карточку
  deleteButton.addEventListener('click', deleteCard);

  //Открываем попап с картинкой в полном размере
  cardImage.addEventListener('click', openViewPic);

  return cardElement;
};

//Функция, которая добавляет карточку на сайт
const addCardToList = (placeName, pictureLink) => {
  cardsList.prepend(createCard(placeName, pictureLink));
}

//Функция, которая позволяет пользователю добавить карточку на сайт
const placeFormSubmitHandler = (evt) => {
  evt.preventDefault();
  addCardToList(placeName.value, pictureLink.value);
  closePopup(addCard);
  placeName.value = '';
  pictureLink.value = '';
};

//Функция, которая открывает попап для редактирования данных профиля
const openEditProfile = () => {
  if (!editProfile.classList.contains('popup_opened')) {
    username.value = profileName.textContent;
    activity.value = profileDescription.textContent;
  }
  openPopup(editProfile);
};

//Функция, которая закрывает попап для редактирования данных профиля
const closeEditProfile = () => {
  closePopup(editProfile);
};

//Функция, которая открывает попап для добавления карточки на сайт
const openAddCard = () => {
  openPopup(addCard);
};

//Функция, которая закрывает попал для добавления карточки на сайт
const closeAddCard = () => {
  closePopup(addCard);
};

//Функция, которая закрывает попап с картинкой в полном размере
const closeViewPic = () => {
  closePopup(viewPic);
};

//Открываем попап для редактирования данных профиля
editProfileOpenButton.addEventListener('click', openEditProfile);

//Закрываем попап для редактирования данных профиля
editProfileCloseButton.addEventListener('click', closeEditProfile);

//Редактируем данные профиля
userForm.addEventListener('submit', userFormSubmitHandler);

//Открываем попап для добавления карточки на сайт
addCardOpenButton.addEventListener('click', openAddCard);

//Закрываем попап для добавления карточки на сайт
addCardCloseButton.addEventListener('click', closeAddCard);

//Добавляем карточки из заданного массива
initialCards.forEach((item) => {
  addCardToList(item.name, item.link);
});

//Добавляем свои карточки
placeForm.addEventListener('submit', placeFormSubmitHandler);

//Закрываем попап с картинкой в полном размере
viewPicCloseButton.addEventListener('click', closeViewPic);
