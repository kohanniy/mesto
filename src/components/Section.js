export default class Section {
  constructor({ renderer }, containerSelector, api) {
    // this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this.addItem = this.addItem.bind(this);
    this._api = api;
  }

  renderItems() {
    this._api.getInitialCards().then((data) => {
      data.forEach((item) => {
        this._renderer(item);
      });
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }

  // _saveItem(element) {
  //   this._api.addCard(element)
  //     .then((data) => )
  // }
}
