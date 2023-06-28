function showError(inputElement, errorElement, config) {
  errorElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {
  errorElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function chekInputValidity(inputElement, formElement, config) {
  inputElement.setCustomValidity("");

  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  const isInputValid = inputElement.validity.valid;

  if (!isInputValid) {
    showError(inputElement, errorElement, config);
  } else {
    hideError(inputElement, errorElement, config);
  }
}

function disabledButton(buttonElement, config) {
  buttonElement.disabled = "disabled";
  buttonElement.classList.add(config.inactiveButtonClass);
}

function enabledButton(buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}

function toggleButtonState(buttonElement, isActive, config) {
  if (!isActive) {
    disabledButton(buttonElement, config);
  } else {
    enabledButton(buttonElement, config);
  }
}

function setEventListener(formElement, config, onSubmit) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(
    config.submitButtonSelector
  );

  [...inputList].forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
      chekInputValidity(inputElement, formElement, config);
    });
  });

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (!formElement.checkValidity()) return;
    onSubmit(evt);
  });
}

function enableValidation(config) {
  const formProfile = document.querySelector('#popup-profile .popup__form');
  const formCard = document.querySelector('#popup-card .popup__form');

  [[formProfile, addInfo], [formCard, submitPopupCard]].forEach(function ([formElement, onSubmit]) {
    setEventListener(formElement, config, onSubmit);
  });
}

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__error_active'
};

enableValidation(config);