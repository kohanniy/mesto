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

//Обработчик формы редактирования данных профиля
const userFormSubmitHandler = (evt) => {
  evt.preventDefault();

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

  //Обработчик событий по добавлению и удалению лайка, удалению карточки и открытию попапа с картинкой
  const cardsListHandler = (evt) => {
    if (evt.target === likeButton) {
      likeButton.classList.toggle('cards__heart_active');
    } else if (evt.target === deleteButton) {
        deleteButton.closest('.cards__item').remove();
      } else if (evt.target === cardImage) {
          openPopup(viewPic);
          popupPic.src = cardImage.src;
          popupPic.alt = cardTitle.textContent;
          popupPicCaption.textContent = cardTitle.textContent;
        }
  };

  //Делегируем события на родительский элемент
  cardsList.addEventListener('click', cardsListHandler);

  return cardElement;
};

//Функция добавления карточки на сайт
const addCardToList = (placeName, pictureLink) => {
  cardsList.prepend(createCard(placeName, pictureLink));
}

//Обработчик формы добавления карточки на сайт
const placeFormSubmitHandler = (evt) => {
  evt.preventDefault();

  addCardToList(placeName.value, pictureLink.value);

  closePopup(addCard);

  placeForm.reset();
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
  }
  openPopup(editProfile);
});

editProfileCloseButton.addEventListener('click', () => {
  closePopup(editProfile);
});

addCardOpenButton.addEventListener('click', () => {
  openPopup(addCard);
});

addCardCloseButton.addEventListener('click', ()=> {
  closePopup(addCard);
  placeForm.reset();
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






