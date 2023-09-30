//Создайте класс PopupWithImage, который наследует от Popup. 
//Этот класс должен перезаписывать родительский метод open. 
//В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageElement = this._popupElement.querySelector('.popup__image-element');
    this._popupTitleElement = this._popupElement.querySelector('.popup__image-title');
    this.setEventListeners();
  }

  open(name, link) {
    super.open();
    this._popupImageElement.src = link;
    this._popupImageElement.alt = name;
    this._popupTitleElement.textContent = name;
  }
}
