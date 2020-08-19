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

let addPhotoButton = profile.querySelector('.profile__add-btn')

let editProfile = document.querySelector('.edit-profile');

let userForm = editProfile.querySelector('.user-form');

let username = userForm.querySelector('.username');

let activity = userForm.querySelector('.activity');

let addPhoto = document.querySelector('.add-photo');

let placeForm = addPhoto.querySelector('.place-form');

let placeName = placeForm.querySelector('.place-name');

let pictureLink = placeForm.querySelector('.picture-link')

let popups = document.querySelectorAll('.popup');

let cardsList = document.querySelector('.cards__list');

let cardTemplate = document.querySelector('#cardItemTemplate').content;

//Функция добавления фото из представленного массива при загрузке страницы
let addCardToList = item => {

  let cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.cards__title').textContent = item.name;

  cardElement.querySelector('.cards__image').src = item.link;

  cardsList.prepend(cardElement);
}

initialCards.forEach(addCardToList);

//Открытие попапа с формой для редактирования профиля
editButton.addEventListener('click', () => {
  if (!editProfile.classList.contains('popup_opened')) {
    username.value = profileName.textContent;
    activity.value = profileDescription.textContent;
  }

  editProfile.classList.add('popup_opened');
});

//Открытие попапа с формой для добавления фотографии места
addPhotoButton.addEventListener('click', () => {
  addPhoto.classList.add('popup_opened');
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

//Добавление собственной фотографии места
placeForm.addEventListener('submit', evt => {
  evt.preventDefault();

  let cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.cards__title').textContent = placeName.value;
  cardElement.querySelector('.cards__image').src = pictureLink.value;

  cardsList.prepend(cardElement);

  addPhoto.classList.remove('popup_opened');
});
