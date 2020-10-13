export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this.addItem = this.addItem.bind(this);
  }

  renderItems(items) {
    items.then((data) => {
      data.forEach((item) => {
        this._renderer(item);
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
