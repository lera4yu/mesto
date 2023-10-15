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
    const likeCountElement = this._cloneElement.querySelector('.element__like-count');
    if (this._likes.length > 0) {
      likeCountElement.classList.add('element__like-count_opened');

      this._likes.forEach((like) => {
        if ((like._id === this._profileId) && !(this._likeBtn.classList.contains('.element__like-btn_active'))) {
          this._likeBtn.classList.add('element__like-btn_active');
        }
      });
      likeCountElement.textContent = this._likes.length;
    } else {
      likeCountElement.classList.remove('element__like-count_opened');
      likeCountElement.textContent = '';
    }
  }

  updatelikesCounter(newLikes) {
    this._likes = newLikes;
    this._likesCounter();
  }

  _changeLike(likeButton) {
    likeButton.classList.toggle('element__like-btn_active');
    if (likeButton.classList.contains('element__like-btn_active')) {
      this._addLikeClick(this);
    } else {
      this._deleteLikeClick(this);
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