export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this.addItem = this.addItem.bind(this);
  }

  renderItems() {
    // Promise.all(this._renderedItems)
    //   .then((result) => {
    //     this._renderer(result);
    //   })
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

  // _saveItem(element) {
  //   this._api.addCard(element)
  //     .then((data) => )
  // }
}
