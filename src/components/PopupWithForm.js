import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.form = this._popup.querySelector('.popup__form');
    this.defaultButton = this._popup.querySelector('.popup__button_default');
    this.isLoadingButton = this._popup.querySelector('.popup__button_isLoading');
  }

  _getInputValues() {
    this._inputList = this.form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this.form.reset();
  }
}
