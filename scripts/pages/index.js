import Card from '../components/Card.js';

import {initialCards, formObj} from '../utils/constants.js';

import FormValidator from '../components/FormValidator.js';

//Переменные для профиля
const profile = document.querySelector('.profile');

const profileName = profile.querySelector('.profile__name');

const profileDescription = profile.querySelector('.profile__description');

const buttonOpenEditProfile = profile.querySelector('.profile__edit-btn');

const buttonOpenAddCard = profile.querySelector('.profile__add-btn');

//Контейнер для карточек
const cardsList = document.querySelector('.cards__list');

//Переменные для попапа с формой редактирования профиля

const editProfilePopup = document.querySelector('.popup_type_edit-profile');

const userForm = editProfilePopup.querySelector('.user-form');

const username = userForm.querySelector('.username');

const activity = userForm.querySelector('.activity');

const buttonCloseEditProfilePopup = userForm.querySelector('.popup__close-btn_for_edit-profile');

//Переменные для попапа с формой добавления карточки
const addCardPopup = document.querySelector('.popup_type_add-card');

const placeForm = addCardPopup.querySelector('.place-form');

const placeName = placeForm.querySelector('.place-name');

const pictureLink = placeForm.querySelector('.picture-link');

const buttonCloseAddCardPopup = placeForm.querySelector('.popup__close-btn_for_add-card');

//Переменные для попапа с картинкой
export const viewPicPopup = document.querySelector('.popup_type_view-pic');

export const popupPic = viewPicPopup.querySelector('.popup__pic');

export const popupPicCaption = viewPicPopup.querySelector('.popup__pic-caption');

const buttonCloseViewPicPopup = viewPicPopup.querySelector('.popup__close-btn_for_view-pic');

//Валидаторы для форм
const userFormValidator = new FormValidator(formObj, userForm);

const placeFormValidator = new FormValidator(formObj, placeForm);

//Функция: открываем попапы и добавляем обработчики на закрытие по клику на Esc и оверлей
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.body.addEventListener('keydown', closePopupByEscHandler);
  popup.addEventListener('click', closePopupByOverlayHandler);
}

//Функция: закрываем попапы и удаляем обработчики на закрытие по клику на Esc и оверлей
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.body.removeEventListener('keydown', closePopupByEscHandler);
  popup.removeEventListener('click', closePopupByOverlayHandler);
}

//Обработчик: закрываем попап по клику на Esc
const closePopupByEscHandler = (evt) => {
  const activePopup = document.querySelector('.popup_opened');

  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
};

//Обработчик: закрываем попап по клику на оверлей
const closePopupByOverlayHandler = (evt) => {
  const activePopup = document.querySelector('.popup_opened');

  if (evt.target === activePopup) {
    closePopup(activePopup);
  }
};

//Добавляем обработчики на кнопки открытия попапов с формами
buttonOpenEditProfile.addEventListener('click', () => {
  if (!editProfilePopup.classList.contains('popup_opened')) {
    username.value = profileName.textContent;
    activity.value = profileDescription.textContent;
    userFormValidator.hideErrors();
    userFormValidator.enableSubmitButton();
  }

  openPopup(editProfilePopup);
});

buttonOpenAddCard.addEventListener('click', () => {
  if (!addCardPopup.classList.contains('popup_opened')) {
    placeName.value = '';
    pictureLink.value = '';
    placeFormValidator.hideErrors();
    placeFormValidator.disableSubmitButton();
  }

  openPopup(addCardPopup);
});

//Добавляем обработчики на кнопки закрытия попапов
buttonCloseEditProfilePopup.addEventListener('click', () => {
  closePopup(editProfilePopup);
});

buttonCloseAddCardPopup.addEventListener('click', () => {
  closePopup(addCardPopup);
});

buttonCloseViewPicPopup.addEventListener('click', () => {
  closePopup(viewPicPopup);
});

//Обработчики для форм
const userFormSubmitHandler = () => {
  profileName.textContent = username.value;
  profileDescription.textContent = activity.value;
  closePopup(editProfilePopup);
};

const placeFormSubmitHandler = () => {
  const userData = {
    name: placeName.value,
    link: pictureLink.value
  };

  createAndAddCard(userData);
  closePopup(addCardPopup);
};

//Добавляем на сайт карточки из заданного массива
initialCards.forEach((item) => {
  createAndAddCard(item);
});

function createAndAddCard(data) {
  const card = new Card(data, '#cardItemTemplate');
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
}

//Добавляем формам обработчики
placeForm.addEventListener('submit', placeFormSubmitHandler);

userForm.addEventListener('submit', userFormSubmitHandler);

//Вызываем функцию валидации для форм
userFormValidator.enableValidation();

placeFormValidator.enableValidation();
