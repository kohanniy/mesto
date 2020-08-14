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
