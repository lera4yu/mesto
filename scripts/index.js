//импорты
import {Card} from './Card.js';
import { FormValidator } from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const configPopupValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__error_active'
};

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-btn');
const profileAddButton = profile.querySelector('.profile__add-btn');
const popupProfile = document.querySelector('#popup-profile');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-btn');
const profileName = profile.querySelector('.profile__name');
const profileCaption = profile.querySelector('.profile__caption');
const profileNameInput = popupProfile.querySelector('.popup__text_type_name');
const profileCaptionInput = popupProfile.querySelector('.popup__text_type_caption');
const popupProfileForm = popupProfile.querySelector('.popup__form');

const popupCard = document.querySelector('#popup-card');
const cardTitleInput = popupCard.querySelector('.popup__text_type_title-card');
const cardLinkInput = popupCard.querySelector('.popup__text_type_link-card');
const popupCardForm = popupCard.querySelector('.popup__form');
const popupCardCloseButton = popupCard.querySelector('.popup__close-btn');
const cardSubmitButton = popupCardForm.querySelector('.popup__submit-btn');

const popupImage = document.querySelector('#popup-image');
const popupImageCloseButton = popupImage.querySelector('.popup__close-btn');
// получаем переменные внутри попапа для дальнейшей записи в них значений из элемента
const popImg = popupImage.querySelector('.popup__image-element');
const popTitle = popupImage.querySelector('.popup__image-title');

const elementsBody = document.querySelector('.elements');

//добавление дефолтных карточек через js
initialCards.forEach((card) => {
  const newCard = new Card(card, '#element-template');
  const cardElement = newCard.createCard();
  elementsBody.append(cardElement);
});

//добавление слушателя на esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//добавления слушателя на оверлей
function closeByOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

// функция открытия формы
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  popupElement.addEventListener('click', closeByOverlayClick);
  document.addEventListener('keydown', closeByEscape);
}

// функция добавления введенной информации на страницу
function addInfo(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileCaption.textContent = profileCaptionInput.value;

  closePopup(popupProfile);
}

// функция закрытия формы
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  popupElement.removeEventListener('click', closeByOverlayClick);
}

// функция открытия попапа профиля
function openPopupProfile() {
  profileNameInput.value = profileName.textContent;
  profileCaptionInput.value = profileCaption.textContent;
  openPopup(popupProfile);
}

// функция добавления карточки и отправки формы попапа карточки
function submitPopupCard(evt) {
  evt.preventDefault();
  const newAddCard = new Card({name: cardTitleInput.value, link: cardLinkInput.value}, '#element-template');
  const newAddCardElement = newAddCard.createCard();
  elementsBody.prepend(newAddCardElement);
  closePopup(popupCard);

  //очищаем форму
  evt.target.reset();

  //принудительный toggle
  cardValidateItem.toggleButtonState(cardSubmitButton, popupCardForm.checkValidity());
}

//открытие попапов
profileEditButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', () => openPopup(popupCard));

//закрытие попапов
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupImageCloseButton.addEventListener('click', () => closePopup(popupImage));
popupCardCloseButton.addEventListener('click', () => closePopup(popupCard));

//отправка форм
popupProfileForm.addEventListener("submit", addInfo);

popupCardForm.addEventListener("submit", submitPopupCard);


//валидация через класс
const cardValidateItem = new FormValidator(configPopupValidation, popupCardForm);
cardValidateItem.enableValidation();
const profileValidateItem = new FormValidator(configPopupValidation, popupProfileForm);
profileValidateItem.enableValidation();

//экспорты
export {openPopup, popupImage, popImg, popTitle};