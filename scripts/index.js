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

const popupImage = document.querySelector('#popup-image');
const popupImageCloseButton = popupImage.querySelector('.popup__close-btn');
// получаем переменные внутри попапа для дальнейшей записи в них значений из элемента
const popImg = popupImage.querySelector('.popup__image-element');
const popTitle = popupImage.querySelector('.popup__image-title');

const elementsBody = document.querySelector('.elements');
const template = document.querySelector('#element-template');

// функция лайка, принимает на вход переменную кнопки, так как лайков на странице несколько
function changeLike(item) {
  item.addEventListener('click', () => {
    item.classList.toggle('element__like-btn_active');
  });
}

//функция открытия попапа изображения
function openPopupImg(image) {
  openPopup(popupImage);

  // записываем значения из элемента в свойства popup-элементов
  popImg.src = image.src;
  popImg.alt = image.alt;
  popTitle.textContent = image.closest('.element').querySelector('.element__title').textContent;
}

//функция удаления карточки, принимает на вход переменную кнопки, так как кнопок удаления несколько
function removeCard(deleteButton) {
  deleteButton.addEventListener('click', function () {
    const cardRemove = this.closest('.element');
    cardRemove.remove();
  });
}

// функция создания карточки
function createCard(name, link) {
  const cloneElement = template.content.cloneNode(true);
  const elementTitle = cloneElement.querySelector('.element__title');
  const elementImage = cloneElement.querySelector('.element__image');
  const likeButton = cloneElement.querySelector('.element__like-btn');
  const deleteButton = cloneElement.querySelector('.element__trash-btn');

  elementTitle.textContent = name;
  elementImage.src = link;
  elementImage.alt = name;

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

  closePopup(popupProfile);
}

// функция закрытия формы
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
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
  elementsBody.prepend(createCard(cardTitleInput.value, cardLinkInput.value));
  closePopup(popupCard);

  //очищаем форму
  evt.target.reset();
}

//открытие попапов
profileEditButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', () => openPopup(popupCard));

//закрытие попапов
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupImageCloseButton.addEventListener('click', () => closePopup(popupImage));
popupCardCloseButton.addEventListener('click', () => closePopup(popupCard));