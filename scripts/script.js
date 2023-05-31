let profile = document.querySelector(".profile");
let profileEdit = profile.querySelector(".profile__edit-btn");
let popup = document.querySelector(".popup");
let popupContainer = popup.querySelector(".popup__container");
let popupClose = popupContainer.querySelector(".popup__close-btn");
let profileName = profile.querySelector(".profile__name");
let profileCaption = profile.querySelector(".profile__caption");
let popupSubmit = popupContainer.querySelector(".popup__submit-btn");

let profileNameInput = popupContainer.querySelector('.popup__text_type_name');
let profileCaptionInput = popupContainer.querySelector('.popup__text_type_caption');

let likeButtons = document.querySelectorAll(".element__like-btn");

for (i = 0; i < likeButtons.length; i += 1) {
  let item = likeButtons[i];
  function changeLike(evt) {
    evt.preventDefault();
    likeButtonImage.classList.toggle('element__like-btn__img_type_active');
    likeButtonImage.classList.toggle('element__like-btn__img_type_disabled');
  }

  let likeButtonImage = item.querySelector(".element__like-btn__img");
  item.addEventListener("click", changeLike);
}

function openPopup() {
  popup.classList.add("popup_opened");

  profileNameInput.value = profileName.textContent;
  profileCaptionInput.value = profileCaption.textContent;
}

profileEdit.addEventListener("click", openPopup);

function addInfo(evt) {
  evt.preventDefault();
  
  profileName.textContent = profileNameInput.value;
  profileCaption.textContent = profileCaptionInput.value;
  popup.classList.remove("popup_opened");
}

popupSubmit.addEventListener("click", addInfo);

function closePopup(evt) {
  evt.preventDefault();
  popup.classList.remove("popup_opened");
}

popupClose.addEventListener("click", closePopup);


