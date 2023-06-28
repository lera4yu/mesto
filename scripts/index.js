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

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const popupCloseButton = popupContainer.querySelector('.popup__close-btn');
const profileName = profile.querySelector('.profile__name');
const profileCaption = profile.querySelector('.profile__caption');
const profileNameInput = popupContainer.querySelector('.popup__text_type_name');
const profileCaptionInput = popupContainer.querySelector('.popup__text_type_caption');
const popupForm = popupContainer.querySelector('.popup__form');

const popupCard = document.querySelector('.popup-card');
const elementTitleInput = popupCard.querySelector('.popup__text_type_title-card');
const elementLinkInput = popupCard.querySelector('.popup__text_type_link-card');
const popupCardForm = popupCard.querySelector('.popup__form');
const popupCardCloseButton = popupCard.querySelector('.popup__close-btn');
const profileAddButton = profile.querySelector('.profile__add-btn');
const popupImage = document.querySelector('.popup-img');
const popupImageCloseButton = popupImage.querySelector('.popup__close-btn');

const elementsBody = document.querySelector('.elements');
const template = document.querySelector('#element-template');

// массив кнопок лайков, которые уже есть в html
let likeButtons = document.querySelectorAll('.element__like-btn');

// массив кнопок удаления, которые уже есть в html
let deleteButtons = document.querySelectorAll('.element__trash-btn');

let elementImages = document.querySelectorAll('.element__image');

// функция лайка, принимает на вход переменную кнопки, так как лайков на странице несколько
function changeLike(item) {
  item.addEventListener('click', () => {
    item.classList.toggle('element__like-btn_active');
  });
}

//функция удаления карточки, принимает на вход переменную кнопки, так как кнопок удаления несколько

function removeCard(deleteButton) {
  deleteButton.addEventListener('click', function () {
    const cardRemove = this.closest('.element');
    cardRemove.remove();
  });
}

//функция добавления дефолтных карточек через js
initialCards.forEach((card) => addCard(card.name, card.link));

function addCard(name, link) {
  const cloneElement = template.content.cloneNode(true);
  const elementTitle = cloneElement.querySelector("h2");
  const elementImage = cloneElement.querySelector("img");
  const likeButton = cloneElement.querySelector('.element__like-btn');
  const deleteButton = cloneElement.querySelector('.element__trash-btn');

  elementTitle.textContent = name;
  elementImage.src = link;
  elementImage.alt = name;
  elementsBody.prepend(cloneElement);
  // навешивание функции лайка на новый добавленный элемент
  changeLike(likeButton);
  // навешивание функции удаления на новый добавленный элемент
  removeCard(deleteButton);
  //навешивание функции открытия попапа для изображения
  elementImage.addEventListener('click', () => openPopupImg(elementImage));

  return cloneElement;
}

//добавление дефолтных карточек через js
initialCards.forEach((card) => elementsBody.append(createCard(card.name, card.link)));

//добавление слушателя на esc
function addEscListener(popupElement) {
  function onEscape({ key }) {
    if (key === 'Escape') {
      closePopup(popupElement);
      window.removeEventListener('keyup', onEscape);
    }
  }
  window.addEventListener('keyup', onEscape);
}

//добавления слушателя на оверлей
function addOverlayClickListener(popupElement) {
  function onOverlayClick(evt) {
    if (evt.target == popupElement) {
      closePopup(popupElement);
      popupElement.removeEventListener('click', onOverlayClick);
    }
  }
  popupElement.addEventListener('click', onOverlayClick);
}

// функция открытия формы
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  addEscListener(popupElement);
  addOverlayClickListener(popupElement);

  //принудительный toggle после сета значений
  const formElement = popupElement.querySelector(config.formSelector);
  if (formElement) {
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
  }
}

// функция добавления введенной информации на страницу
function addInfo(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileCaption.textContent = profileCaptionInput.value;

  closePopup();
}

// функция закрытия формы
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

//функция добавления инпутных значений картинок
function addInfo(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileCaption.textContent = profileCaptionInput.value;

  closePopup(popup);
}

// функция открытия попапа профиля
function openPopupProfile() {
  profileNameInput.value = profileName.textContent;
  profileCaptionInput.value = profileCaption.textContent;
  openPopup(popupProfile);
}

// функция добавления карточки и отправки формы попапа карточки
function addCardSubmit(evt) {
  evt.preventDefault();

  addCard(elementTitleInput.value, elementLinkInput.value);
  closePopup(popupCard);
  elementTitleInput.value = '';
  elementLinkInput.value = '';
}

popupForm.addEventListener('submit', addInfo);
profileEditButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', () => openPopup(popupCard));
popupCloseButton.addEventListener('click', () => closePopup(popup));
popupCardCloseButton.addEventListener('click', () => closePopup(popupCard));
popupCardForm.addEventListener('submit', addCardSubmit);

//перебор кнопок удаления и навешивание на них функции удаления
deleteButtons.forEach((deleteButton) => removeCard(deleteButton));

// перебор лайков и навешивание на них функции лайка
likeButtons.forEach((likeButton) => changeLike(likeButton));

// перебор изображений в элементах и навешивание на них функции открытия попапа изображения
elementImages.forEach((image) => image.addEventListener('click', () => openPopupImg(image)));

//функция для закрытия попапа изображения
popupImageCloseButton.addEventListener('click', () => closePopup(popupImage));
popupCardCloseButton.addEventListener('click', () => closePopup(popupCard));