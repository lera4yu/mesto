//импорты
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { popupImage, initialCards} from './utils/constants.js';
import { openPopup, closePopup } from './utils/utils.js';

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

const popupImageCloseButton = popupImage.querySelector('.popup__close-btn');
// получаем переменные внутри попапа для дальнейшей записи в них значений из элемента

const elementsBody = document.querySelector('.elements');

//функция создания элемента карточки из класса карточки по входным значениям

function renderCard(nameCard, linkCard) {
  const newAddCard = new Card({ name: nameCard, link: linkCard }, '#element-template');
  const newAddCardElement = newAddCard.createCard();
  return newAddCardElement
}

//добавление дефолтных карточек через js
initialCards.forEach((card) => {
  elementsBody.append(renderCard(card.name, card.link));
});

// функция добавления введенной информации на страницу
function addInfo(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileCaption.textContent = profileCaptionInput.value;

  closePopup(popupProfile);
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
  elementsBody.prepend(renderCard(cardTitleInput.value, cardLinkInput.value));
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