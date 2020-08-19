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

let profile = document.querySelector('.profile');

let profileName = profile.querySelector('.profile__name');

let profileDescription = profile.querySelector('.profile__description');

let editButton = profile.querySelector('.profile__edit-btn');

let addCardButton = profile.querySelector('.profile__add-btn')

let editProfile = document.querySelector('.edit-profile');

let userForm = editProfile.querySelector('.user-form');

let username = userForm.querySelector('.username');

let activity = userForm.querySelector('.activity');

let addCard = document.querySelector('.add-card');

let placeForm = addCard.querySelector('.place-form');

let placeName = placeForm.querySelector('.place-name');

let pictureLink = placeForm.querySelector('.picture-link')

let popups = document.querySelectorAll('.popup');

let cardsList = document.querySelector('.cards__list');

let viewPic = document.querySelector('.view-pic');

let popupPic = viewPic.querySelector('.popup__pic');

let popupPicCaption = viewPic.querySelector('.popup__pic-caption');

//Функция добавления и удаления карточки и лайков, открытия попапа с картинкой карточки
let addCardToList = (placeName, pictureLink) => {
  let cardTemplate = document.querySelector('#cardItemTemplate').content;

  let cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.cards__title').textContent = placeName;
  cardElement.querySelector('.cards__image').src = pictureLink;

  //добавление и удаление лайка
  let likeButton = cardElement.querySelector('.cards__heart');
  likeButton.addEventListener('click', evt => {
    let eventTarget = evt.target;
    eventTarget.classList.toggle('cards__heart_active');
  });

  //удаление карточки
  let deleteButton = cardElement.querySelector('.cards__delete-btn');
  deleteButton.addEventListener('click', evt => {
    let cardsItem = evt.target.closest('.cards__item');
    cardsItem.remove();
  });

  //открытие попапа с картинкой карточки
  let cardsImage = cardElement.querySelector('.cards__image');
  cardsImage.addEventListener('click', evt => {
    viewPic.classList.add('popup_opened');
    popupPic.src = evt.target.src;
    popupPicCaption.textContent = evt.target.parentElement.querySelector('.cards__title').textContent;
  });

  //добавление карточки на сайт
  cardsList.prepend(cardElement);
};

//Добавление карточек из массива
initialCards.forEach(item => {
  let placeName = item.name;
  let pictureLink = item.link;

  addCardToList(placeName, pictureLink);
});

//Открытие попапа с формой для редактирования профиля
editButton.addEventListener('click', () => {
  if (!editProfile.classList.contains('popup_opened')) {
    username.value = profileName.textContent;
    activity.value = profileDescription.textContent;
  }

  editProfile.classList.add('popup_opened');
});

//Открытие попапа с формой для добавления карточки
addCardButton.addEventListener('click', () => {
  addCard.classList.add('popup_opened');
});

//Закрытие каждого попапа
popups.forEach(popup => {
  let closeButton = popup.querySelector('.popup__close-btn');

  closeButton.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
  });
});

//Изменение и сохранение данных профиля
userForm.addEventListener('submit', evt => {
  evt.preventDefault();

  profileName.textContent = username.value;
  profileDescription.textContent = activity.value;

  editProfile.classList.remove('popup_opened');
});

//Добавление карточки пользователем
placeForm.addEventListener('submit', evt => {
  evt.preventDefault();

  addCardToList(placeName.value, pictureLink.value)

  addCard.classList.remove('popup_opened');
});
