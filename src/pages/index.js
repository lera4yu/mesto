//импорты
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  initialCards, configPopupValidation, profileEditButton, profileAddButton, popupProfileName,
  popupProfileCaption, popupProfileForm, popupCardForm
} from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

// index.js
import './index.css';

//создание класса информации по профилю юзера: имени и описания
const UserInfoProfile = new UserInfo({ nameSelector: '.profile__name', captionSelector: '.profile__caption' });

//создание класса для попапа открытия картинки
const popupImageItem = new PopupWithImage('#popup-image');

//функция создания элемента карточки из класса карточки по входным значениям
function renderCard(nameCard, linkCard) {
  const newAddCard = new Card({ name: nameCard, link: linkCard },
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

// функция добавления введенной информации на страницу с использованием класса UserInfo
function addInfo(obj) {
  UserInfoProfile.setUserInfo({ nameInput: obj.namePopup, captionInput: obj.captionPopup });
}

//функция сабмита попапа карты
function submitPopupCard(obj) {
  cardInitialSection.addItem(renderCard(obj.titlePopup, obj.linkPopup));
}

//создание классов Popup

const popupProfileItem = new PopupWithForm({ popupSelector: '#popup-profile', handleFormSubmit: addInfo });

const popupCardItem = new PopupWithForm({ popupSelector: '#popup-card', handleFormSubmit: submitPopupCard });

//открытие попапа добавления данных профиля с использованием класса UserInfo
profileEditButton.addEventListener('click', () => {
  popupProfileItem.open();

  popupProfileName.value = UserInfoProfile.getUserInfo().name;
  popupProfileCaption.value = UserInfoProfile.getUserInfo().caption;
});

//добавляем открытие попапа добавляения карточки, а также принудительный тоггл во время открытия
profileAddButton.addEventListener('click', () => { popupCardItem.open(), cardValidateItem.toggleButtonState() });

//валидация попапов через классы
const cardValidateItem = new FormValidator(configPopupValidation, popupCardForm);
cardValidateItem.enableValidation();

const profileValidateItem = new FormValidator(configPopupValidation, popupProfileForm);
profileValidateItem.enableValidation();