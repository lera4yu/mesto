export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupElementBtn = this._popupElement.querySelector('.popup__close-btn');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
    this._popupElementBtn.addEventListener('click', () => this.close());
  }
}
