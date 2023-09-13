import {openPopup, popImg, popTitle, popupImage} from "./index.js";

export class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  _changeLike(likeButton) {
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('element__like-btn_active');
    });
  }

  _removeCard(deleteButton) {
    deleteButton.addEventListener('click', () => this._cloneElement.remove());
  }

  _openPopupImg() {
    openPopup(popupImage);

    popImg.src = this._link;
    popImg.alt = this._name;
    popTitle.textContent = this._name;
  }


  createCard() {
    this._cloneElement = this._getTemplate();
    const elementImage = this._cloneElement.querySelector('.element__image');

    this._cloneElement.querySelector('.element__title').textContent = this._name;
    elementImage.src = this._link;
    elementImage.alt = this._name;

    this._changeLike(this._cloneElement.querySelector('.element__like-btn'));

    this._removeCard(this._cloneElement.querySelector('.element__trash-btn'));

    elementImage.addEventListener('click', () => this._openPopupImg());

    return this._cloneElement;
  }
}