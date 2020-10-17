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
  popupDeleteConfirmSelector,
} from '../utils/constants.js';

import {
  rejectPromise,
  renderLoading
} from '../utils/utils.js';

import Card from '../components/Card.js';

import FormValidator from '../components/FormValidator.js';

import Section from '../components/Section.js';

import PopupWithImage from '../components/PopupWithImage.js';

import PopupWithForm from '../components/PopupWithForm.js';

import UserInfo from '../components/UserInfo.js';

import Api from '../components/Api.js';

import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/',
  headers: {
    authorization: '1282f84b-7da3-48cb-b9e7-a66ba2d4bc54',
    'Content-Type': 'application/json'
  }
});

const popupShowImage = new PopupWithImage(popupShowImageSelector);

const userInfo = new UserInfo({ profileNameSelector, profileDescriptionSelector, avatarSelector });

//Обработчик для попапа с подтверждением удаления карточки
const handleDeleteConfirmSubmit = (cardElement, cardId) => {
  renderLoading(popupDeleteConfirm, true)
  api.deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      cardElement = null;
      popupDeleteConfirm.close();
    })
    .catch((err) => {
      rejectPromise(err);
    })
    .finally(() => {
      renderLoading(popupDeleteConfirm, false)
    })
}

//Обработчик для формы добавления информации о пользователе
const handleProfileFormSubmit = (data) => {
  renderLoading(popupEditProfile, true);
  api.setUserInfo(data)
    .then((data) => {
      userInfo.renderProfileInfo(data);
      popupEditProfile.close();
    })
    .catch((err) => {
      rejectPromise(err);
    })
    .finally(() => {
      renderLoading(popupEditProfile, false);
    })
}

//Обработчик для формы добавления аватара
const handleAvatarFormSubmit = (data) => {
  renderLoading(popupUpdateAvatar, true);
  api.setAvatar(data)
    .then((data) => {
      userInfo.renderAvatar(data);
      popupUpdateAvatar.close();
    })
    .catch((err) => {
      rejectPromise(err);
    })
    .finally(() => {
      renderLoading(popupUpdateAvatar, false);
    })
}

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, handleProfileFormSubmit);

const popupUpdateAvatar = new PopupWithForm(popupUpdateAvatarSelector, handleAvatarFormSubmit);

const popupDeleteConfirm = new PopupWithConfirmation(popupDeleteConfirmSelector, handleDeleteConfirmSubmit);

const profileFormValidator = new FormValidator(formObj, popupEditProfile.form);

const avatarFormValidator = new FormValidator(formObj, popupUpdateAvatar.form);

//Обработчик для кнопки, открывающий попап с формой добавления информации о пользователе
const handlePopupEditProfileOpen = () => {
  const profileData = userInfo.getUserInfo();
  popupEditProfile.form.name.value = profileData.name;
  popupEditProfile.form.about.value = profileData.about;
  popupEditProfile.open();
  profileFormValidator.hideErrors();
  profileFormValidator.enableSubmitButton();
}

//Обработчик для кнопки, открывающий попап с формой добавления аватара
const handlePopupUpdateAvatarOpen = () => {
  popupUpdateAvatar.form.avatar.value = userInfo.getUserInfo().avatar;
  popupUpdateAvatar.open();
  avatarFormValidator.hideErrors();
  avatarFormValidator.enableSubmitButton();
}

//Отправляем запрос на получение данных для загрузки страницы
api.getDataForRendered()
  .then((data) => {
    const [ cardsData, userData ] = data;

    //Добавление лайка
    const putLike = (evt, data, numberLikes) => {
      api.putLike(data._id)
        .then((res) => {
          evt.target.classList.add('cards__heart_active');
          numberLikes.textContent = res.likes.length;
        })
        // .catch((err) => {
        //   rejectPromise(err);
        // })
    }

    //Удаление лайка
    const deleteLike = (evt, data, numberLikes) => {
      api.deleteLike(data._id)
        .then((res) => {
          evt.target.classList.remove('cards__heart_active');
          numberLikes.textContent = res.likes.length;
        })
        // .catch((err) => {
        //   rejectPromise(err);
        // })
    }

    //Создание и добавление карточки
    const renderedCard = (cardData) => {
      const card = new Card({
        data: cardData,
        handleDeleteIconClick: (cardElement) => {
          popupDeleteConfirm.open(cardElement, cardData._id);
        },
        handleLikeClick: (evt, data, numberLikes) => {
          const findUserLike = data.likes.find((like) => {
            return like._id === userData._id;
          })

          if (findUserLike === undefined) {
            putLike(evt, data, numberLikes);
          } else {
              deleteLike(evt, data, numberLikes);
            }
        },
        handleCardClick: (data) => {
          popupShowImage.open(data);
        },
      }, userData._id, '#cardItemTemplate');

      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    }

    //Обработчик для формы добавления карточки
    const handleCardFormSubmit = (data) => {
      renderLoading(popupAddCard, true);
      api.addCard(data)
        .then((res) => {
          renderedCard(res);
          popupAddCard.close();
        })
        .catch((err) => {
          rejectPromise(err);
        })
        .finally(() => {
          renderLoading(popupAddCard, false);
        })
    }

    const popupAddCard = new PopupWithForm(popupAddCardSelector, handleCardFormSubmit);
    const cardFormValidator = new FormValidator(formObj, popupAddCard.form);

    //Обработчик для кнопки, открывающей попап с формой добавления карточки
    const handlePopupAddCardOpen = () => {
      popupAddCard.open();
      cardFormValidator.hideErrors();
      cardFormValidator.disableSubmitButton();
    }

    const cardsList = new Section({
      renderer: (item) => {
        renderedCard(item);
      }
    }, cardsContainerSelector);

    //Отрисовываем данные профиля и картинки
    userInfo.renderProfileInfo(userData);
    userInfo.renderAvatar(userData);
    cardsList.renderItems(cardsData, userData._id);

    //Включаем валидацию формы добавления карточки
    cardFormValidator.enableValidation();

    //Подключаем обработчики к попапу с формой добавления карточки и кнопке, открывающей попап
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
    popupShowImage.setEventListeners();
  });
