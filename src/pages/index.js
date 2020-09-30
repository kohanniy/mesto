import './index.css';

import {
  initialCards,
  cardsContainerSelector,
  popupShowImageSelector,
  popupEditProfileSelector,
  profileNameSelector,
  profileDescriptionSelector,
  formObj,
  popupAddCardSelector
} from '../utils/constants.js';

import Card from '../components/Card.js';

import FormValidator from '../components/FormValidator.js';

import Section from '../components/Section.js';

import PopupWithImage from '../components/PopupWithImage.js';

import PopupWithForm from '../components/PopupWithForm.js';

import UserInfo from '../components/UserInfo.js';

const popupShowImage = new PopupWithImage(popupShowImageSelector);

const userInfo = new UserInfo({ profileNameSelector, profileDescriptionSelector });

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, handleProfileFormSubmit);

const popupAddCard = new PopupWithForm(popupAddCardSelector, handleCardFormSubmit);

const profileFormValidator = new FormValidator(formObj, popupEditProfile.form);

const cardFormValidator = new FormValidator(formObj, popupAddCard.form);

const initialCardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#cardItemTemplate', handleCardClick);
    const cardElement = card.generateCard();
    initialCardsList.addItem(cardElement);
  }
}, cardsContainerSelector);

//Отрисовываем на странице заданные карточки
initialCardsList.renderItems();

//Добавляем обработчики кнопкам открытия попапов с формой
document.querySelector('.profile__edit-btn').addEventListener('click', handlePopupEditProfileOpen);
document.querySelector('.profile__add-btn').addEventListener('click', handlePopupAddCardOpen);

//Включаем валидацию форм
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

//Добавляем попам обработчики
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupShowImage.setEventListeners();

//Колбэк сабмита формы профиля
function handleProfileFormSubmit(userData) {
  userInfo.setUserInfo(userData);
  popupEditProfile.close();
}

//Колбэк сабмита формы добавления карточки
function handleCardFormSubmit(userData) {
  const userCard = new Card(userData, '#cardItemTemplate', handleCardClick);
  const cardElement = userCard.generateCard();
  const cardList = document.querySelector(cardsContainerSelector);
  cardList.prepend(cardElement);
  popupAddCard.close();
}

//Обработчик открытия формы профиля
function handlePopupEditProfileOpen() {
  const profileData = userInfo.getUserInfo();
  popupEditProfile.form.username.value = profileData.username;
  popupEditProfile.form.activity.value = profileData.activity;
  popupEditProfile.open();
  profileFormValidator.hideErrors();
  profileFormValidator.enableSubmitButton();
}

//Обработчик открытия формы добавления карточки
function handlePopupAddCardOpen() {
  popupAddCard.open();
  cardFormValidator.hideErrors();
  cardFormValidator.disableSubmitButton();
}

//Колбэк для класса Card: открывает попап с картинкой
function handleCardClick (name, link) {
  popupShowImage.open(name, link);
}
