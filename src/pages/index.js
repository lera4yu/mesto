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

// index.js
import './index.css';

//создание класса информации по профилю юзера: имени и описания
const UserInfoProfile = new UserInfo({
  nameSelector: '.profile__name',
  captionSelector: '.profile__caption',
  avatarSelector: '.profile__avatar'
});

//находим информацию о юзере через API и выносим эти данные в константу
const userApiInfo = await fetch('https://mesto.nomoreparties.co/v1/cohort-77/users/me', {
  headers: {
    authorization: 'cd6216f4-847a-4421-99d4-0436178223c8'
  },
  method: "GET"
})
  .then(res => res.json())
  .then((result) => {
    return result;
  });

//задаем первичные имя и описание профилю юзера
UserInfoProfile.setUserInfo({ nameInput: userApiInfo.name, captionInput: userApiInfo.about });

//задаем первичный аватар
UserInfoProfile.setUserAvatar(userApiInfo.avatar);

//находим информацию о дефолтных карточках через API и выносим эти данные в константу
const cardsApi = await fetch('https://mesto.nomoreparties.co/v1/cohort-77/cards', {
  headers: {
    authorization: 'cd6216f4-847a-4421-99d4-0436178223c8'
  },
  method: "GET"
})
  .then(res => res.json())
  .then((result) => {
    return result;
  });

//создание класса для попапа открытия картинки
const popupImageItem = new PopupWithImage('#popup-image');

const popupDeleteCard = new PopupWithAction({
  popupSelector: '#popup-delete-card',
  handler: ((cardItem) => {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-77/cards/${cardItem._cardId}`, {
      headers: {
        authorization: 'cd6216f4-847a-4421-99d4-0436178223c8'
      },
      method: "DELETE"
    }).then(((res) => cardItem.deleteCard()));
  })
});

//функция создания элемента карточки из класса карточки по входным значениям
function renderCard(nameCard, linkCard, likesCard, ownerCard, idCard, userApiInfoId) {
  const newAddCard = new Card({
    name: nameCard,
    link: linkCard,
    likes: likesCard,
    owner: ownerCard,
    cardId: idCard
  }, userApiInfoId,
    '#element-template', () => popupImageItem.open(nameCard, linkCard), (card) => popupDeleteCard.open(card));
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
  UserInfoProfile.setUserInfo({ nameInput: obj.namePopup, captionInput: obj.captionPopup });

  //обновление инфы в серваке 
  fetch('https://mesto.nomoreparties.co/v1/cohort-77/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'cd6216f4-847a-4421-99d4-0436178223c8',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: UserInfoProfile.getUserInfo().name,
      about: UserInfoProfile.getUserInfo().caption
    })
  });
}

//функция сабмита попапа карты
function submitPopupCard(obj) {
  //добавление новой карточки 
  fetch('https://mesto.nomoreparties.co/v1/cohort-77/cards', {
    method: 'POST',
    headers: {
      authorization: 'cd6216f4-847a-4421-99d4-0436178223c8',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: obj.titlePopup,
      link: obj.linkPopup
    })
  }).then((res) => res.json()).then(obj => { console.log(obj); return obj })
    .then((obj) => cardInitialSection.addItem(renderCard(obj.name, obj.link, obj.likes, obj._id, userApiInfo, userApiInfo._id)));
}

//функция удаления карточки через Popup


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