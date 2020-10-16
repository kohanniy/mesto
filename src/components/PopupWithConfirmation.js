import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this.button = this._popup.querySelector('.popup__button');
    this._handleSubmit = handleSubmit;
  }

  open(element, data) {
    super.open();
    this._element = element;
    this._data = data;
  }

  setEventListeners() {
    super.setEventListeners();
    this.button.addEventListener('click', () => {
      this._handleSubmit(this._element, this._data);
    });
  }
}
