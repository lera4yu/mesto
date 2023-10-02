export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
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

  _setEventListeners(){
    this._changeLike(this._cloneElement.querySelector('.element__like-btn'));

    this._removeCard(this._cloneElement.querySelector('.element__trash-btn'));
    
    this._elementImage.addEventListener('click', () => this._handleCardClick());
  }

  createCard() {
    this._cloneElement = this._getTemplate();
    this._elementImage = this._cloneElement.querySelector('.element__image');

    this._cloneElement.querySelector('.element__title').textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._setEventListeners();

    return this._cloneElement;
  }
}