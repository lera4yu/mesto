// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm 
//должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.

import Popup from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._popupInputs = this._popupElement.querySelectorAll('.popup__text');
    this._submitBtn = this._popupElement.querySelector('.popup__submit-btn');
    this._defaultTextBtn = this._submitBtn.textContent;
    this.setEventListeners();
  }

  _getInputValues() {
    this._formValues = {};
    this._popupInputs.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }

  //метод для вставки данных в инпуты, чтобы не искать эти инпуты в index.js
  setInputValues(data) {
    this._popupInputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  //визуализация процесса сохранения при отправке формы
  addSavingAnimation() {
    this._submitBtn.textContent = 'Сохранение...';
  }

  // Метод добавления стандартного текста кнопке
  returnDefaultTextBtn() {
    this._submitBtn.textContent = this._defaultTextBtn;
  }

  close() {
    this._popupForm.reset();
    if (this._postCloseHandler) {
      this._postCloseHandler();
    }
    super.close();
  }
}