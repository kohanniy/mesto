import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this.defaultButton = this._popup.querySelector('.popup__button_default');
    this.isLoadingButton = this._popup.querySelector('.popup__button_isLoading');
    this._handleSubmit = handleSubmit;
  }

  open(element, data) {
    super.open();
    this._element = element;
    this._data = data;
  }

  setEventListeners() {
    super.setEventListeners();
    this.defaultButton.addEventListener('click', () => {
      this._handleSubmit(this._element, this._data);
    });
  }
}
