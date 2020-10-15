import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup__button');
    this._handleSubmit = handleSubmit;
  }

  // getData(element, data) {
  //   console.log(data);
  //   return { element, data };
  // }

  open(element, data) {
    super.open();
    this._element = element;
    this._data = data;
    console.log(data);
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {
      console.log(this._data);
      this._handleSubmit(this._element, this._data);
    });
  }
}
