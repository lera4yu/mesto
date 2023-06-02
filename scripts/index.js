let profile = document.querySelector('.profile');
let profileEdit = profile.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let popupClose = popupContainer.querySelector('.popup__close-btn');
let profileName = profile.querySelector('.profile__name');
let profileCaption = profile.querySelector('.profile__caption');
let profileNameInput = popupContainer.querySelector('.popup__text_type_name');
let profileCaptionInput = popupContainer.querySelector('.popup__text_type_caption');
let popupForm = popupContainer.querySelector('.popup__form');

// функция открытия формы
function openPopup() {
  popup.classList.add('popup_opened');

  profileNameInput.value = profileName.textContent;
  profileCaptionInput.value = profileCaption.textContent;

}

// функция добавления введенной информации на страницу
function addInfo(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileCaption.textContent = profileCaptionInput.value;

  closePopup();
}

// функция закрытия формы
function closePopup() {
  popup.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', addInfo);
profileEdit.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);


