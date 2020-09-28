import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { data }) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
    this._image = super._popup.queryelector('.popup__pic');
    this._caption = super._popup.queryelector('.popup__pic-caption');
  }

  open() {
    super.open();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._caption.textContent = this._name;
  }
}
