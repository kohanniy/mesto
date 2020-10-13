import './index.css';

import {
  cardsContainerSelector,
  popupShowImageSelector,
  popupEditProfileSelector,
  popupUpdateAvatarSelector,
  profileNameSelector,
  profileDescriptionSelector,
  avatarSelector,
  formObj,
  popupAddCardSelector
} from '../utils/constants.js';

import Card from '../components/Card.js';

import FormValidator from '../components/FormValidator.js';

import Section from '../components/Section.js';

import PopupWithImage from '../components/PopupWithImage.js';

import PopupWithForm from '../components/PopupWithForm.js';

import UserInfo from '../components/UserInfo.js';

import Api from '../components/Api.js';

const popupShowImage = new PopupWithImage(popupShowImageSelector);

const userInfo = new UserInfo({ profileNameSelector, profileDescriptionSelector, avatarSelector });

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, handleProfileFormSubmit);

const popupAddCard = new PopupWithForm(popupAddCardSelector, handleCardFormSubmit);

const popupUpdateAvatar = new PopupWithForm(popupUpdateAvatarSelector, handleAvatarFormSubmit)

const profileFormValidator = new FormValidator(formObj, popupEditProfile.form);

const cardFormValidator = new FormValidator(formObj, popupAddCard.form);

const avatarFormValidator = new FormValidator(formObj, popupUpdateAvatar.form)

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/',
  headers: {
    authorization: '1282f84b-7da3-48cb-b9e7-a66ba2d4bc54',
    'Content-Type': 'application/json'
  }
});

const initialCards = api.getInitialCards();

const userInfoFromServer = api.getUserInfo();

const cardsList = new Section({
  renderer: (item) => {
    rendererCard(item);
  }
}, cardsContainerSelector);

//Создаем и добавляем карточку на страницу
function rendererCard(cardData) {
  const card = new Card(cardData, '#cardItemTemplate', handleCardClick);
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

// Колбэк сабмита формы добавления карточки
function handleCardFormSubmit(data) {
  api.addCard(data)
    .then(() => {
      rendererCard(data);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
}

//Колбэк сабмита формы профиля
function handleProfileFormSubmit(userData) {
  api.setUserInfo(userData)
    .then(() => {
      userInfo.updateUserInfo(userData);
      popupEditProfile.close();
    });
}

//Колбэк сбамита формы с аватаром
function handleAvatarFormSubmit(data) {
  api.setAvatar(data)
    .then(() => {
      userInfo.updateAvatar(data);
      popupUpdateAvatar.close();
    })
}

//Обработчик открытия попапов с формой
function handlePopupEditProfileOpen() {
  const profileData = userInfo.getUserInfo();
  popupEditProfile.form.name.value = profileData.username;
  popupEditProfile.form.about.value = profileData.activity;
  popupEditProfile.open();
  profileFormValidator.hideErrors();
  profileFormValidator.enableSubmitButton();
}

function handlePopupAddCardOpen() {
  popupAddCard.open();
  cardFormValidator.hideErrors();
  cardFormValidator.disableSubmitButton();
}

function handlePopupUpdateAvatarOpen() {
  popupUpdateAvatar.form.avatar.value = userInfo.getUserInfo().avatar;
  popupUpdateAvatar.open();
  avatarFormValidator.hideErrors();
  avatarFormValidator.enableSubmitButton();
}

//Колбэк для класса Card: открывает попап с картинкой
function handleCardClick(data) {
  popupShowImage.open(data);
}

//Отрисовываем на странице карточки с сервера
cardsList.renderItems(initialCards);

//Отображаем данные профиля
userInfo.renderProfile(userInfoFromServer);

//Добавляем обработчики кнопкам открытия попапов с формой
document.querySelector('.profile__edit-btn').addEventListener('click', handlePopupEditProfileOpen);
document.querySelector('.profile__add-btn').addEventListener('click', handlePopupAddCardOpen);
document.querySelector('.profile__avatar-btn').addEventListener('click', handlePopupUpdateAvatarOpen);

//Включаем валидацию форм
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

//Добавляем попапам обработчики
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupShowImage.setEventListeners();
popupUpdateAvatar.setEventListeners();
