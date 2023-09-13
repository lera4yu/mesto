export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showError(inputElement, errorElement) {
    errorElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideError(inputElement, errorElement) {
    errorElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _checkInputValidity(inputElement) {
    inputElement.setCustomValidity("");

    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    const isInputValid = inputElement.validity.valid;

    if (!isInputValid) {
      this._showError(inputElement, errorElement);
    } else {
      this._hideError(inputElement, errorElement);
    }
  }

  _disabledButton(buttonElement) {
    buttonElement.disabled = "disabled";
    buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  _enabledButton(buttonElement) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(this._config.inactiveButtonClass);
  }

  toggleButtonState(buttonElement, isActive) {
    if (!isActive) {
      this._disabledButton(buttonElement);
    } else {
      this._enabledButton(buttonElement);
    }
  }

  _setEventListener() {
    const inputList = this._formElement.querySelectorAll(this._config.inputSelector);
    const submitButtonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    [...inputList].forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        console.log(submitButtonElement);
        console.log(this._formElement.checkValidity());
        console.log(this._formElement);
        this.toggleButtonState(submitButtonElement, this._formElement.checkValidity());
        this._checkInputValidity(inputElement);
      });
    });
  }

  enableValidation() {
    const formsList = document.querySelectorAll(this._config.formSelector);

    [...formsList].forEach(() => {
      this._setEventListener();
    });
  }
}