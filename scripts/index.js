import {Card} from './Card.js';

import {initialCards, formObj} from './constants.js';

import {disabledSubmitButton, clearErrors} from './validate.js';

const profile = document.querySelector('.profile');

const editProfile = document.querySelector('.popup_type_edit-profile');

const editProfileOpenButton = profile.querySelector('.profile__edit-btn');

const profileName = profile.querySelector('.profile__name');

const profileDescription = profile.querySelector('.profile__description');

const userForm = editProfile.querySelector('.user-form');

const username = userForm.querySelector('.username');

const activity = userForm.querySelector('.activity');

const editProfileCloseButton = editProfile.querySelector('.popup__close-btn_for_edit-profile');

const userFormSubmitButton = userForm.querySelector('.popup__button');

const addCard = document.querySelector('.popup_type_add-card');

const addCardOpenButton = profile.querySelector('.profile__add-btn');

const addCardCloseButton = addCard.querySelector('.popup__close-btn_for_add-card');

const cardsList = document.querySelector('.cards__list');

const placeForm = addCard.querySelector('.place-form');

const placeName = placeForm.querySelector('.place-name');

const pictureLink = placeForm.querySelector('.picture-link');

const placeFormSubmitButton = placeForm.querySelector('.popup__button');

export const viewPic = document.querySelector('.popup_type_view-pic');

export const popupPic = viewPic.querySelector('.popup__pic');

export const popupPicCaption = viewPic.querySelector('.popup__pic-caption');

const viewPicCloseButton = viewPic.querySelector('.popup__close-btn_for_view-pic');

const popups = document.querySelectorAll('.popup');

//Добавляем на сайт карточки из заданного массива
initialCards.forEach((item) => {
  const card = new Card(item, '#cardItemTemplate');

  const cardElement = card.generateCard();

  cardsList.prepend(cardElement);
});

//Обработчик: закрываем попап по клику на Esc
const closePopupByEscHandler = (evt) => {
  const activePopup = Array.from(popups).find((popup) => {
    return popup.classList.contains('popup_opened');
  });

  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
};

//открываем попап и добавляем обработчик на закрытие по клику на Esc
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.body.addEventListener('keydown', closePopupByEscHandler);
}

//закрываем попап и убираем обработчик на закрытие
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.body.removeEventListener('keydown', closePopupByEscHandler);
};

//Обработчик: даем возможность пользователю редактировать свой профиль
const userFormSubmitHandler = () => {
  profileName.textContent = username.value;
  profileDescription.textContent = activity.value;

  closePopup(editProfile);
};


//Обработчик: даем пользователю возможность добавлять карточки на сайт
const placeFormSubmitHandler = () => {
  const userData = {
    name: placeName.value,
    link: pictureLink.value
  };

  const card = new Card(userData, '#cardItemTemplate');

  const cardElement = card.generateCard();

  cardsList.prepend(cardElement);

  closePopup(addCard);
};


//Добавляем слушатели на кнопки и формы
editProfileOpenButton.addEventListener('click', () => {
  if (!editProfile.classList.contains('popup_opened')) {
    username.value = profileName.textContent;
    activity.value = profileDescription.textContent;
    includedSubmitButton(userFormSubmitButton, formObj);
    clearErrors(userForm, formObj);
  }
  openPopup(editProfile);
});

editProfileCloseButton.addEventListener('click', () => {
  closePopup(editProfile);
});

addCardOpenButton.addEventListener('click', () => {
  if (!editProfile.classList.contains('popup_opened')) {
    placeName.value = '';
    pictureLink.value = '';
    disabledSubmitButton(placeFormSubmitButton, formObj);
    clearErrors(placeForm, formObj);
  }

  openPopup(addCard);
});

addCardCloseButton.addEventListener('click', ()=> {
  closePopup(addCard);
});

viewPicCloseButton.addEventListener('click', () => {
  closePopup(viewPic);
});

placeForm.addEventListener('submit', placeFormSubmitHandler);

userForm.addEventListener('submit', userFormSubmitHandler);

//Добавляем каждому попапу обработчик, который закрывает его по клику на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});
