let popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let popupUserName = popup.querySelector('.popup__item_el_username');
let popupActivity = popup.querySelector('.popup__item_el_activity');

popupUserName.value = profileName.textContent;
popupActivity.value = profileDescription.textContent;

//Открытие попапа
let editButton = document.querySelector('.profile__edit-btn');

function openPopup() {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);

//Закрыть попапа
let popupCloseButton = popup.querySelector('.popup__close-btn');

function closePopup() {
  popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', closePopup);

//Измненение и сохранение информации о себе
let saveButton = popup.querySelector('.popup__save-btn');

let popupContainer = popup.querySelector('.popup__container');

function popupContainerSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupUserName.value;
  profileDescription.textContent = popupActivity.value;
  closePopup();
}

popupContainer.addEventListener('submit', popupContainerSubmitHandler);
