import Popup from './Popup.js';

export class PopupWithAction extends Popup {
  constructor({ popupSelector, handler }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._handler = handler;
    this.setEventListeners();
  }

  open(cardItem) {
    super.open();
    this._cardItem = cardItem;
  }

  close() {
    this._cardItem = undefined;
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handler(this._cardItem);
      this.close();
    })
  }
}