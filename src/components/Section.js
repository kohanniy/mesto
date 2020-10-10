export default class Section {
  constructor(renderer, containerSelector, api) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._api = api;
    this.addItem = this.addItem.bind(this);
  }

  renderItems() {
    this._api.getInitialCards()
      .then((items) => {
        items.forEach((item) => {
          this._renderer(item);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
