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

let cardsListContainer = document.querySelector('.cards__list');

let editProfile = document.querySelector('.edit-profile');

let profile = document.querySelector('.profile');

let profileName = profile.querySelector('.profile__name');

let profileDescription = profile.querySelector('.profile__description');

let profileEditButton = profile.querySelector('.profile__edit-btn');

let username = editProfile.querySelector('.username');

let activity = editProfile.querySelector('.activity');

let addPhoto = document.querySelector('.add-photo');

let addPhotoButton = profile.querySelector('.profile__add-btn');

let popups = document.querySelectorAll('.popup');


//Функция открытия попапа для редактирования профиля
let editProfileOpen = () => {
  if (!editProfile.classList.contains('popup_opened')) {
    username.value = profileName.textContent;
    activity.value = profileDescription.textContent;
  }

  editProfile.classList.add('popup_opened');
};

//Функция открытия попапа для добавления фото
let addPhotoOpen = () => {
  addPhoto.classList.add('popup_opened')
};

//Функция добавления фото из представленного массива при загрузке странице
let addCardToContainer = item => {
  let cardTemplate = document.querySelector('#cardItemTemplate').content;

  let cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.cards__title').textContent = item.name;

  cardElement.querySelector('.cards__image').src = item.link;

  cardsListContainer.prepend(cardElement);
}

//Открытие попапов
document.addEventListener('click', (evt) => {
  let elementTarget = evt.target;
  if (elementTarget.classList.contains('profile__edit-btn')) {
    editProfileOpen();
  } else if (elementTarget.classList.contains('profile__add-btn')) {
      addPhotoOpen();
    }
  return;
});

//Закрытие попапов
popups.forEach((popup) => {
  let popupClose = () => {
    popup.classList.remove('popup_opened');
  };
  let closeButton = popup.querySelector('.popup__close-btn');
  closeButton.addEventListener('click', popupClose);
});

//Добавление фото при загрузке страницы
initialCards.forEach(addCardToContainer);


// let editProfile = document.querySelector('.popup_type_profile');

// let profileName = document.querySelector('.profile__name');

// let profileDescription = document.querySelector('.profile__description');

// let userName = editProfile.querySelector('.popup__item_element_username');

// let userActivity = editProfile.querySelector('.popup__item_element_activity');

// let editButton = document.querySelector('.profile__edit-btn');

// let popupCloseButton = editProfile.querySelector('.popup__close-btn');

// let saveButton = editProfile.querySelector('.popup__save-btn');

// let popupContainer = editProfile.querySelector('.popup__container');





//Измненение и сохранение информации о себе
function popupContainerSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupUserName.value;
  profileDescription.textContent = popupActivity.value;
  popupOpenClose();
}

popupContainer.addEventListener('submit', popupContainerSubmitHandler);
