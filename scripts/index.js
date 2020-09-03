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
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      closePopup(popup);
    });
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

  cardElement.querySelector('.cards__image').src = pictureLink;
  cardElement.querySelector('.cards__title').textContent = placeName;

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

//Обработчик кнопки открытия формы для редактирования данных профиля
const openEditProfileHandler = () => {
  if (!editProfile.classList.contains('popup_opened')) {
    username.value = profileName.textContent;
    activity.value = profileDescription.textContent;
  }
  openPopup(editProfile);
};

//Обработчик кнопки закрытия формы для редактирования данных профиля
const closeEditProfileHandler = () => {
  closePopup(editProfile);
};

//Обработчик кнопки открытия формы для добавления карточки на сайт
const openAddCardHandler = () => {
  openPopup(addCard);
};

//Обработчик кнопки закрытия формы для добавления карточки на сайт
const сloseAddCardHandler = () => {
  closePopup(addCard);
  placeForm.reset();
};

//Обработчик кнопки закрытия попапа с картинкой
const closeViewPicHandler = () => {
  closePopup(viewPic);
};

//Обработчик событий по добавлению и удалению лайка, удалению карточки и открытию попапа с картинкой
const cardListHandler = (evt) => {
  if (evt.target.classList.contains('cards__heart')) {
    evt.target.classList.toggle('cards__heart_active');
  } else if (evt.target.classList.contains('cards__delete-btn')) {
      evt.target.closest('.cards__item').remove();
    } else if (evt.target.classList.contains('cards__image')) {
        const card = evt.target.closest('.cards__item');
        const cardTitle = card.querySelector('.cards__title');

        popupPic.src = evt.target.src;
        popupPicCaption.textContent = cardTitle.textContent;

        openPopup(viewPic);
      }
};

//Добавить на сайт карточки из заданного массива
initialCards.forEach((item) => {
  addCardToList(item.name, item.link);
});

//Добавить слушатели на кнопки и формы
editProfileOpenButton.addEventListener('click', openEditProfileHandler);

editProfileCloseButton.addEventListener('click', closeEditProfileHandler);

userForm.addEventListener('submit', userFormSubmitHandler);

addCardOpenButton.addEventListener('click', openAddCardHandler);

addCardCloseButton.addEventListener('click', сloseAddCardHandler);

placeForm.addEventListener('submit', placeFormSubmitHandler);

viewPicCloseButton.addEventListener('click', closeViewPicHandler);

cardsList.addEventListener('click', cardListHandler);

//Добавляем слушатель каждому попапу, чтобы закрывались по клику на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});




// popups.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target === popup) {
//       closePopup(popup);
//     }
//   });
// });






