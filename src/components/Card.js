export class Card {
  constructor(data, profileId, templateSelector, handleCardClick, deleteCardClick, addLikeClick, deleteLikeClick) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = data.owner._id;
    this._profileId = profileId;
    this._cardId = data.cardId;
    this._handleCardClick = handleCardClick;
    this._deleteCardClick = deleteCardClick;
    this._addLikeClick = addLikeClick;
    this._deleteLikeClick = deleteLikeClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  _likesCounter() {
    if (this._likes.length > 0) {
      this._likeCountElement.classList.add('element__like-count_opened');

      this._likes.forEach((like) => {
        if ((like._id === this._profileId) && !(this._likeBtn.classList.contains('element__like-btn_active'))) {
          this._likeBtn.classList.add('element__like-btn_active');
        }
      });
      this._likeCountElement.textContent = this._likes.length;
    } else {
      this._likeCountElement.classList.remove('element__like-count_opened');
      this._likeCountElement.textContent = '';
    }
  }

  updatelikesCounter(newLikes) {
    this._likes = newLikes;
    this._likesCounter();
  }

  _changeLike(likeButton) {
    if (likeButton.classList.contains('element__like-btn_active')) {
      this._deleteLikeClick(this)
        .then((res) => likeButton.classList.remove('element__like-btn_active'));
    } else {
      this._addLikeClick(this)
        .then((res) => likeButton.classList.add('element__like-btn_active'));
    }
  };

  _removeCard(deleteButton) {
    deleteButton.addEventListener('click', (evt) => this._deleteCardClick(this));
  }

  deleteCard() {
    this._cloneElement.remove();
    this._cloneElement = null;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', (evt) => this._changeLike(this._likeBtn));

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
    this._likeCountElement = this._cloneElement.querySelector('.element__like-count');
    this._likeBtn = this._cloneElement.querySelector('.element__like-btn');
    this._trashBtnElement = this._cloneElement.querySelector('.element__trash-btn');
    this._elementImage = this._cloneElement.querySelector('.element__image');

    this._cloneElement.querySelector('.element__title').textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._setEventListeners();

    return this._cloneElement;
  }
}