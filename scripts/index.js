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

const userForm = editProfile.querySelector('.user-form');

const username = userForm.querySelector('.username');

const activity = userForm.querySelector('.activity');

const editProfileCloseButton = editProfile.querySelector('.popup__close-btn_for_edit-profile');

const userFormSubmitButton = userForm.querySelector('.popup__button');

const addCard = document.querySelector('.popup_type_add-card');

const addCardOpenButton = profile.querySelector('.profile__add-btn');

const addCardCloseButton = addCard.querySelector('.popup__close-btn_for_add-card');

const cardTemplate = document.querySelector('#cardItemTemplate').content;

const cardsList = document.querySelector('.cards__list');

const placeForm = addCard.querySelector('.place-form');

const placeName = placeForm.querySelector('.place-name');

const pictureLink = placeForm.querySelector('.picture-link');

const placeFormSubmitButton = placeForm.querySelector('.popup__button');

const viewPic = document.querySelector('.popup_type_view-pic');

const popupPic = viewPic.querySelector('.popup__pic');

const popupPicCaption = viewPic.querySelector('.popup__pic-caption');

const viewPicCloseButton = viewPic.querySelector('.popup__close-btn_for_view-pic');

const popups = document.querySelectorAll('.popup');

//Обработчик для закрытия попапа по клику на Esc
const closePopupByEscHandler = (evt) => {
  const activePopup = Array.from(popups).find((popup) => {
    return popup.classList.contains('popup_opened');
  });

  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
};

//Функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.body.addEventListener('keydown', closePopupByEscHandler);
};

//Функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.body.removeEventListener('keydown', closePopupByEscHandler);
};

//Функция очистки ошибок полей ввода
const clearInputErrors = (popup) => {
  const popupInputs = popup.querySelectorAll('.popup__input');
  const popupInputErrors = popup.querySelectorAll('.popup__input-error');

  popupInputs.forEach((popupInput) => {
    if (popupInput.classList.contains('popup__input_type_error')) {
      popupInput.classList.remove('popup__input_type_error');
    }
  });

  popupInputErrors.forEach((popupInputError) => {
    if (popupInputError.textContent !== '') {
      popupInputError.textContent = ''
    }
  });
};

//Обработчик формы редактирования данных профиля
const userFormSubmitHandler = () => {
  profileName.textContent = username.value;
  profileDescription.textContent = activity.value;

  closePopup(editProfile);
};

//Функция создания карточки
const createCard = (placeName, pictureLink) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__image');
  const cardTitle = cardElement.querySelector('.cards__title');
  const likeButton = cardElement.querySelector('.cards__heart');
  const deleteButton = cardElement.querySelector('.cards__delete-btn');

  cardImage.src = pictureLink;
  cardImage.alt = placeName
  cardTitle.textContent = placeName;

  //Открываем попап с картинкой
  cardImage.addEventListener('click', () => {
    openPopup(viewPic);
    popupPic.src = cardImage.src;
    popupPic.alt = cardTitle.textContent;
    popupPicCaption.textContent = cardTitle.textContent;
  });

  //Ставим и убираем лайк
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('cards__heart_active');
  });

  //Удалем карточку
  deleteButton.addEventListener('click', () => {
    deleteButton.closest('.cards__item').remove();
  });

  return cardElement;
};

//Функция добавления карточки на сайт
const addCardToList = (placeName, pictureLink) => {
  cardsList.prepend(createCard(placeName, pictureLink));
}

//Обработчик формы добавления карточки на сайт
const placeFormSubmitHandler = () => {
  addCardToList(placeName.value, pictureLink.value);

  closePopup(addCard);
};

//Добавить на сайт карточки из заданного массива
initialCards.forEach((item) => {
  addCardToList(item.name, item.link);
});

//Добавить слушатели на кнопки и формы
editProfileOpenButton.addEventListener('click', () => {
  if (!editProfile.classList.contains('popup_opened')) {
    username.value = profileName.textContent;
    activity.value = profileDescription.textContent;
    userFormSubmitButton.classList.remove('popup__button_disabled');
    userFormSubmitButton.removeAttribute('disabled', true);
    clearInputErrors(editProfile);
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
    placeFormSubmitButton.classList.add('popup__button_disabled');
    placeFormSubmitButton.setAttribute('disabled', true);
    clearInputErrors(addCard);
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

//Добавляем слушатель каждому попапу, чтобы закрывались по клику на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});
