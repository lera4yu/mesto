//импорты
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  configPopupValidation, profileEditButton, profileAddButton, popupProfileName,
  popupProfileCaption, popupProfileForm, popupCardForm
} from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithAction } from '../components/PopupWithAction.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

// index.js
import './index.css';

//создание класса информации по профилю юзера: имени и описания
const UserInfoProfile = new UserInfo({
  nameSelector: '.profile__name',
  captionSelector: '.profile__caption',
  avatarSelector: '.profile__avatar'
});

//создание элемента класса API для подключения страницы к серверу

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: 'cd6216f4-847a-4421-99d4-0436178223c8',
    'Content-Type': 'application/json'
  }
});

//находим информацию о юзере через API и выносим эти данные в константу
const userApiInfo = await api.getUserInfo();

//задаем первичные имя и описание профилю юзера
UserInfoProfile.setUserInfo({ nameInput: userApiInfo.name, captionInput: userApiInfo.about });

//задаем первичный аватар
UserInfoProfile.setUserAvatar(userApiInfo.avatar);

//находим информацию о дефолтных карточках через API и выносим эти данные в константу
const cardsApi = await api.getInitialCards();

//создание класса для попапа открытия картинки
const popupImageItem = new PopupWithImage('#popup-image');

const popupDeleteCard = new PopupWithAction({
  popupSelector: '#popup-delete-card',
  handler: (cardItem) => {api.deleteCard(cardItem._cardId).then(((res) => cardItem.deleteCard()));
  }});

//функция создания элемента карточки из класса карточки по входным значениям
function renderCard(nameCard, linkCard, likesCard, ownerCard, idCard, userApiInfoId) {
  const newAddCard = new Card({
    name: nameCard,
    link: linkCard,
    likes: likesCard,
    owner: ownerCard,
    cardId: idCard
  }, userApiInfoId,
    '#element-template', 
    () => popupImageItem.open(nameCard, linkCard), 
    (card) => popupDeleteCard.open(card), 
    (card) => {api.addLike(idCard).then((res) => card.updatelikesCounter(res.likes))},
    (card) => {api.deleteLike(idCard).then((res) => card.updatelikesCounter(res.likes))});
  const newAddCardElement = newAddCard.createCard();
  return newAddCardElement
}

// Использование Section для добавления карточек на страницу с использованием карточек API
const cardInitialSection = new Section({
  items: cardsApi.reverse(),
  renderer: (cardItem) => {
    cardInitialSection.addItem(renderCard(cardItem.name, cardItem.link, cardItem.likes, cardItem.owner, cardItem._id, userApiInfo._id));
  }
}, '.elements');

//добавление дефолтных карточек при помощи Section
cardInitialSection.renderItems();

// функция добавления введенной информации на страницу с использованием класса UserInfo
function addInfo(obj) {
  api.updateUserInfo({name: obj.namePopup, caption: obj.captionPopup})
  .then((res) => UserInfoProfile.setUserInfo({ nameInput: obj.namePopup, captionInput: obj.captionPopup }))
}

//функция сабмита попапа карты
function submitPopupCard(obj) {
  //добавление новой карточки 
  api.addNewCard(obj)
    .then((res) => cardInitialSection.addItem(renderCard(res.name, res.link, res.likes, userApiInfo, res._id, userApiInfo._id)));
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