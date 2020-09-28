export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleOverlayClose);
    this._popup.querySelector('.popup__close-btn').addEventListener('click', this.close);
    document.addEventListener('keydown', this._handleEscClose);
  }

  removeEventListeners() {
    this._popup.removeEventListener('click', this._handleOverlayClose);
    this._popup.querySelector('.popup__close-btn').removeEventListener('click', this.close);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
