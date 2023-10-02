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

  toggleButtonState() {
    if (!this._formElement.checkValidity()) {
      this._disabledButton(this._submitButtonElement);
    } else {
      this._enabledButton(this._submitButtonElement);
    }
  }

  _setEventListener() {
    this._inputList = this._formElement.querySelectorAll(this._config.inputSelector);
    this._submitButtonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    [...this._inputList].forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  }

  enableValidation() {
      this._setEventListener();
  }
}