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

let addCardToContainer = item => {
  let cardTemplate = document.querySelector('#cardItemTemplate').content;

  let cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.cards__title').textContent = item.name;

  cardElement.querySelector('.cards__image').src = item.link;

  cardsListContainer.prepend(cardElement);
}

initialCards.forEach(addCardToContainer);

// initialCards.forEach(item => {
//   let templateInitialCard = `
//     <li class="cards__item">
//       <div style="background-image: url(${item.link})" class="cards__image"></div>
//       <button type="button" aria-label="Удалить" class="cards__delete-btn"></button>
//       <div class="cards__rating">
//         <h2 class="cards__title">${item.name}</h2>
//         <button type="button" aria-label="Поставить лайк" class="cards__heart"></button>
//       </div>
//     </li>
//   `
//   cardsListContainer.insertAdjacentHTML('afterbegin', templateInitialCard)
// })



let popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__name');

let profileDescription = document.querySelector('.profile__description');

let popupUserName = popup.querySelector('.popup__item_element_username');

let popupActivity = popup.querySelector('.popup__item_element_activity');

let editButton = document.querySelector('.profile__edit-btn');

let popupCloseButton = popup.querySelector('.popup__close-btn');

let saveButton = popup.querySelector('.popup__save-btn');

let popupContainer = popup.querySelector('.popup__container');

//Функция открытия и закрытия попапа
function popupOpenClose() {
  if (!popup.classList.contains('popup_opened')) {
    popupUserName.value = profileName.textContent;
    popupActivity.value = profileDescription.textContent;
  }
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', popupOpenClose);

popupCloseButton.addEventListener('click', popupOpenClose);

//Измненение и сохранение информации о себе
function popupContainerSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupUserName.value;
  profileDescription.textContent = popupActivity.value;
  popupOpenClose();
}

popupContainer.addEventListener('submit', popupContainerSubmitHandler);
