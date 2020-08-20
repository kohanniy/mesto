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

const profileName = profile.querySelector('.profile__name');

const profileDescription = profile.querySelector('.profile__description');

const editButton = profile.querySelector('.profile__edit-btn');

const addCardButton = profile.querySelector('.profile__add-btn')

const editProfile = document.querySelector('.edit-profile');

const userForm = editProfile.querySelector('.user-form');

const username = userForm.querySelector('.username');

const activity = userForm.querySelector('.activity');

const addCard = document.querySelector('.add-card');

const placeForm = addCard.querySelector('.place-form');

const placeName = placeForm.querySelector('.place-name');

const pictureLink = placeForm.querySelector('.picture-link')

const popups = document.querySelectorAll('.popup');

const cardsList = document.querySelector('.cards__list');

const viewPic = document.querySelector('.view-pic');

const popupPic = viewPic.querySelector('.popup__pic');

const popupPicCaption = viewPic.querySelector('.popup__pic-caption');

const cardTemplate = document.querySelector('#cardItemTemplate').content;

//Функция добавления и удаления карточки и лайков, открытия попапа с картинкой карточки
const addCardToList = (placeName, pictureLink) => {

  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.cards__title').textContent = placeName;
  cardElement.querySelector('.cards__image').src = pictureLink;

  //добавление и удаление лайка
  const likeButton = cardElement.querySelector('.cards__heart');
  likeButton.addEventListener('click', evt => {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('cards__heart_active');
  });

  //удаление карточки
  const deleteButton = cardElement.querySelector('.cards__delete-btn');
  deleteButton.addEventListener('click', evt => {
    const cardsItem = evt.target.closest('.cards__item');
    cardsItem.remove();
  });

  //открытие попапа с картинкой карточки
  const cardsImage = cardElement.querySelector('.cards__image');
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
  const placeName = item.name;
  const pictureLink = item.link;

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
  const closeButton = popup.querySelector('.popup__close-btn');

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
