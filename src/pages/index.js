import './index.css';

import {
  cardsContainerSelector,
  profileSection,
  popupShowImageSelector,
  popupEditProfileSelector,
  popupUpdateAvatarSelector,
  profileNameSelector,
  profileDescriptionSelector,
  avatarSelector,
  formObj,
  popupAddCardSelector,
  popupDeleteConfirmSelector
} from '../utils/constants.js';

import Card from '../components/Card.js';

import FormValidator from '../components/FormValidator.js';

import Section from '../components/Section.js';

import PopupWithImage from '../components/PopupWithImage.js';

import PopupWithForm from '../components/PopupWithForm.js';

import UserInfo from '../components/UserInfo.js';

import Api from '../components/Api.js';

import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

// const popupShowImage = new PopupWithImage(popupShowImageSelector);

const userInfo = new UserInfo({ profileNameSelector, profileDescriptionSelector, avatarSelector });

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, handleProfileFormSubmit);

const popupUpdateAvatar = new PopupWithForm(popupUpdateAvatarSelector, handleAvatarFormSubmit);

const popupDeleteConfirm = new PopupWithConfirmation(popupDeleteConfirmSelector, handleDeleteConfirmSubmit);

const profileFormValidator = new FormValidator(formObj, popupEditProfile.form);

const avatarFormValidator = new FormValidator(formObj, popupUpdateAvatar.form);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/',
  headers: {
    authorization: '1282f84b-7da3-48cb-b9e7-a66ba2d4bc54',
    'Content-Type': 'application/json'
  }
});

//Отправляем запрос на получение данных для загрузки страницы
api.getDataForRendered()
  .then((data) => {
    const [ cardsData, userData ] = data;

    const userId = userData._id;

    const cardsList = new Section({
      renderer: (item) => {
        renderedCard(item, userId);
      }
    }, cardsContainerSelector);

    //Отрисовываем профиль
    userInfo.renderProfileInfo(userData);
    userInfo.renderAvatar(userData);
    cardsList.renderItems(cardsData, userId);

    //Создание и добавление карточки
    function renderedCard(cardData, userId) {
      const card = new Card({
        data: cardData,
        handleDeleteIconClick: (cardElement) => {
          popupDeleteConfirm.open(cardElement, cardData._id);
        },
        handleLikeClick: () => {
          console.log('456');
        },
        handleCardClick: () => {
          console.log('789');
        },
      }, userId, '#cardItemTemplate');

      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    }

    return { renderedCard, userId };
  })
  //Отрисовка карточки, добавленной пользователем
  .then(({ renderedCard, userId }) => {
    const popupAddCard = new PopupWithForm(popupAddCardSelector, handleCardFormSubmit);

    const cardFormValidator = new FormValidator(formObj, popupAddCard.form);

    //Обработчик для отправки формы с карточкой
    function handleCardFormSubmit(data) {
      api.addCard(data)
        .then((data) => {
          renderedCard(data, userId);
          popupAddCard.close();
        })
        .catch((err) => {
          rejectPromise(err);
        })
    }

    //Открываем попап с формой для добавления карточки
    function handlePopupAddCardOpen() {
      popupAddCard.open();
      cardFormValidator.hideErrors();
      cardFormValidator.disableSubmitButton();
    }

    cardFormValidator.enableValidation();
    popupAddCard.setEventListeners();
    profileSection.querySelector('.profile__add-btn').addEventListener('click', handlePopupAddCardOpen);
  })
  .catch((err) => {
    rejectPromise(err);
  })
  .finally(() => {
    //Вешаем обработчики на кнопки профиля
    profileSection.querySelector('.profile__edit-btn').addEventListener('click', handlePopupEditProfileOpen);
    profileSection.querySelector('.profile__avatar-btn').addEventListener('click', handlePopupUpdateAvatarOpen);

    //Включаем валидацию форм
    profileFormValidator.enableValidation();
    avatarFormValidator.enableValidation();

    //Добавляем попапам обработчики
    popupEditProfile.setEventListeners();
    popupUpdateAvatar.setEventListeners();
    popupDeleteConfirm.setEventListeners();
  });

function handleDeleteConfirmSubmit(cardElement, cardData) {
  api.deleteCard(cardData)
    .then(() => {
      cardElement.remove();
      cardElement = null;
      popupDeleteConfirm.close();
    })
    .catch((err) => {
      rejectPromise(err);
    })
}

function rejectPromise(err) {
  console.log(err);
}

function handleProfileFormSubmit(data) {
  api.setUserInfo(data)
    .then((data) => {
      userInfo.renderProfileInfo(data);
      popupEditProfile.close();
    })
    .catch((err) => {
      rejectPromise(err);
    })
}

function handleAvatarFormSubmit(data) {
  api.setAvatar(data)
    .then((data) => {
      userInfo.updateAvatar(data);
      popupUpdateAvatar.close();
    })
    .catch((err) => {
      rejectPromise(err);
    })
}

//Обработчики открытия попапов с формой
function handlePopupEditProfileOpen() {
  const profileData = userInfo.getUserInfo();
  popupEditProfile.form.name.value = profileData.name;
  popupEditProfile.form.about.value = profileData.about;
  popupEditProfile.open();
  profileFormValidator.hideErrors();
  profileFormValidator.enableSubmitButton();
}

function handlePopupUpdateAvatarOpen() {
  popupUpdateAvatar.form.avatar.value = userInfo.getUserInfo().avatar;
  popupUpdateAvatar.open();
  avatarFormValidator.hideErrors();
  avatarFormValidator.enableSubmitButton();
}

// //Колбэк для класса Card: открывает попап с картинкой
// function handleCardClick(data) {
//   popupShowImage.open(data);
// }


// popupShowImage.setEventListeners();
