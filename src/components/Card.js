export class Card {
  constructor(data, profileId, templateSelector, handleCardClick, deleteCardClick) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = data.owner._id;
    this._profileId = profileId;
    this._cardId = data.cardId;
    this._handleCardClick = handleCardClick;
    this._deleteCardClick = deleteCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  _likesCounter() {
    const likeCountElement = this._cloneElement.querySelector('.element__like-count');
    if (this._likes.length > 0) {
      likeCountElement.classList.add('element__like-count_opened');
      likeCountElement.textContent = this._likes.length;
    }
    else {
      likeCountElement.textContent = '';
    }
  }

  _changeLike(likeButton) {
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('element__like-btn_active');
    });
  }

  _removeCard(deleteButton) {
    deleteButton.addEventListener('click', (evt) => this._deleteCardClick(this));
  }

  deleteCard() {
    this._cloneElement.remove();
    this._cloneElement = null;
  }

  _setEventListeners() {
    this._changeLike(this._cloneElement.querySelector('.element__like-btn'));
    this._trashBtnElement = this._cloneElement.querySelector('.element__trash-btn');

    if (this._userId == this._profileId) {
      this._removeCard(this._trashBtnElement);
    } else {
      this._trashBtnElement.remove();
    }

    this._elementImage.addEventListener('click', () => this._handleCardClick());

    this._likesCounter();
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