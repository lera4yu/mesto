//импорты
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  configPopupValidation, profileEditButton, profileAddButton, popupProfileForm, popupCardForm, profileAvatarEditButton, popupAvatarForm
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
const userInfoProfile = new UserInfo({
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

//находим информацию о юзере через API и выносим эти данные в переменную
let userApiInfo;

try {
  userApiInfo = await api.getUserInfo();

  //задаем первичные имя и описание профилю юзера
  userInfoProfile.setUserInfo({ nameInput: userApiInfo.name, captionInput: userApiInfo.about });

  //задаем первичный аватар
  userInfoProfile.setUserAvatar(userApiInfo.avatar);
}
catch {
  console.log(`Получение информации о пользователе привело к ошибке ${err}`);
};

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
    (card) => {
      return api.addLike(idCard)
        .then((res) => card.updatelikesCounter(res.likes))
        .catch((err) => {
          console.log(`Добавление лайка привело к ошибке ${err}`);
        })
    },
    (card) => {
      return api.deleteLike(idCard)
        .then((res) => card.updatelikesCounter(res.likes))
        .catch((err) => {
          console.log(`Удаление лайка привело к ошибке ${err}`);
        })
    });
  const newAddCardElement = newAddCard.createCard();
  return newAddCardElement
}

//находим информацию о дефолтных карточках через API и выносим эти данные в переменную
let cardsApi;

//определяем переменную секции с карточками вне промиса
let cardInitialSection;

try {
  cardsApi = await api.getInitialCards();

  // Использование Section для добавления карточек на страницу с использованием карточек API
  cardInitialSection = new Section({
    items: cardsApi.reverse(),
    renderer: (cardItem) => {
      cardInitialSection.addItem(renderCard(cardItem.name, cardItem.link, cardItem.likes, cardItem.owner, cardItem._id, userApiInfo._id));
    }
  }, '.elements');

  //добавление дефолтных карточек при помощи Section
  cardInitialSection.renderItems();
}
catch {
  console.log(`Получение информации о карточках на сервере привело к ошибке ${err}`);
}

//функция сабмита попапа карты
function submitPopupCard(obj) {
  popupCardItem.addSavingAnimation();
  api.addNewCard(obj)
    .then((res) => cardInitialSection.addItem(renderCard(res.name, res.link, res.likes, userApiInfo, res._id, userApiInfo._id)))
    .then((res) => popupCardItem.close())
    .catch((err) => {
      console.log(`Добавление новой карточки привело к ошибке ${err}`);
    })
    .finally(() => { popupCardItem.returnDefaultTextBtn() });
}

//создание класса для попапа открытия картинки
const popupImageItem = new PopupWithImage('#popup-image');

const popupDeleteCard = new PopupWithAction({
  popupSelector: '#popup-delete-card',
  handler: (cardItem) => {
    api.deleteCard(cardItem._cardId)
      .then((res) => {
        if (res) cardItem.deleteCard()
      })
      .then((res) => popupDeleteCard.close())
      .catch((err) => {
        console.log(`Удаление карточки привело к ошибке ${err}`);
      })
  }
});

// функция добавления введенной информации на страницу с использованием класса UserInfo
function addInfo(obj) {
  popupProfileItem.addSavingAnimation();
  api.updateUserInfo({ name: obj.namePopup, caption: obj.captionPopup })
    .then((res) => userInfoProfile.setUserInfo({ nameInput: obj.namePopup, captionInput: obj.captionPopup }))
    .then((res) => popupProfileItem.close())
    .catch((err) => {
      console.log(`Обновление информации о пользователе привело к ошибке ${err}`);
    })
    .finally(() => { popupProfileItem.returnDefaultTextBtn() });
}

//функция обновления аватара профиля
function updateAvatar(obj) {
  popupAvatar.addSavingAnimation();
  api.updateAvatar(obj.linkPopupAvatar).then((res) => userInfoProfile.setUserAvatar(obj.linkPopupAvatar))
    .then((res) => popupAvatar.close())
    .catch((err) => {
      console.log(`Обновление аватара пользователя привело к ошибке ${err}`);
    })
    .finally(() => { popupAvatar.returnDefaultTextBtn() });
}

//создание классов Popup

const popupProfileItem = new PopupWithForm({ popupSelector: '#popup-profile', handleFormSubmit: addInfo });

const popupCardItem = new PopupWithForm({ popupSelector: '#popup-card', handleFormSubmit: submitPopupCard });

const popupAvatar = new PopupWithForm({ popupSelector: '#popup-avatar', handleFormSubmit: updateAvatar })

//открытие попапа добавления данных профиля с использованием класса UserInfo
profileEditButton.addEventListener('click', () => {
  popupProfileItem.open();
  popupProfileItem.setInputValues(userInfoProfile.getUserInfo());
});

//открытие попапа обновления аватара профиля
profileAvatarEditButton.addEventListener('click', () => { popupAvatar.open(), avatarValidateItem.toggleButtonState() });

//добавляем открытие попапа добавляения карточки, а также принудительный тоггл во время открытия
profileAddButton.addEventListener('click', () => { popupCardItem.open(), cardValidateItem.toggleButtonState() });

//валидация попапов через классы
const cardValidateItem = new FormValidator(configPopupValidation, popupCardForm);
cardValidateItem.enableValidation();

const profileValidateItem = new FormValidator(configPopupValidation, popupProfileForm);
profileValidateItem.enableValidation();

const avatarValidateItem = new FormValidator(configPopupValidation, popupAvatarForm);
avatarValidateItem.enableValidation();