//импорты
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { popupImage, initialCards } from './utils/constants.js';
import { Section } from './Section.js';

import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';

// index.js
import './pages/index.css';

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
const popupProfileForm = popupProfile.querySelector('.popup__form');

const popupCard = document.querySelector('#popup-card');
const popupCardForm = popupCard.querySelector('.popup__form');
const popupCardCloseButton = popupCard.querySelector('.popup__close-btn');

const popupImageCloseButton = popupImage.querySelector('.popup__close-btn');

const popupImageItem = new PopupWithImage('#popup-image');

//функция создания элемента карточки из класса карточки по входным значениям
function renderCard(nameCard, linkCard) {
  const newAddCard = new Card({ name: nameCard, link: linkCard}, 
      '#element-template', () => popupImageItem.open(nameCard, linkCard));
  const newAddCardElement = newAddCard.createCard();
  return newAddCardElement
}

// Использование Section для добавления карточек на страницу
const cardInitialSection = new Section({
  items: initialCards.reverse(),
  renderer: (cardItem) => {
    cardInitialSection.addItem(renderCard(cardItem.name, cardItem.link));
  }
}, '.elements');

//добавление дефолтных карточек при помощи Section
cardInitialSection.renderItems();

// функция добавления введенной информации на страницу

function addInfo(obj) {

  const [profileNameValue, profileCaptionValue] = Object.values(obj);

  profileName.textContent = profileNameValue;
  profileCaption.textContent = profileCaptionValue;
}

//функция сабмита попапа карты

function submitPopupCard(obj) {

  const [cardTitleValue, cardLinkValue] = Object.values(obj);

  const cardInputSection = new Section({
    items: ([{ name: cardTitleValue, link: cardLinkValue }]),
    renderer: (cardItem) => {
      cardInitialSection.addItem(renderCard(cardItem.name, cardItem.link));
    }
  },
    '.elements');

  cardInputSection.renderItems();
}

//создание классов Popup

const popupProfileItem = new PopupWithForm({ popupSelector: '#popup-profile', handleFormSubmit: addInfo });

const popupCardItem = new PopupWithForm({ popupSelector: '#popup-card', handleFormSubmit: submitPopupCard })

//открытие попапов
profileEditButton.addEventListener('click', () => popupProfileItem.open());
profileAddButton.addEventListener('click', () => popupCardItem.open());

//закрытие попапов

popupProfileCloseButton.addEventListener('click', () => popupProfileItem.close());
popupImageCloseButton.addEventListener('click', () => popupImageItem.close());
popupCardCloseButton.addEventListener('click', () => popupCardItem.close());

//валидация через класс
const cardValidateItem = new FormValidator(configPopupValidation, popupCardForm);
cardValidateItem.enableValidation();
const profileValidateItem = new FormValidator(configPopupValidation, popupProfileForm);
profileValidateItem.enableValidation();