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
    this.setEventListeners();
  }

  _getInputValues() {
    this._popupInput = this._popupElement.querySelectorAll('.popup__text');

    this._formValues = {};
    this._popupInput.forEach(input => this._formValues[input.name] = input.value);
    
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

  close() {
    this._popupForm.reset();
    super.close();
  }
}

//example
// export default class SubmitForm {
//   constructor({ selector, handleFormSubmit }) {
//     this._selector = selector;
//     this._handleFormSubmit = handleFormSubmit;
//   }

//   _getElement() {
//   	const formElement = document
//       .querySelector(this._selector)
//       .content
//       .querySelector('.form')
//       .cloneNode(true);

//     return formElement;
//   }

//   _setEventListeners() {
//     this._element.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//       this._handleFormSubmit(this._getInputValues());

//       this._element.reset();
//     })
//   }

//   _getInputValues() {
//     this._inputList = this._element.querySelectorAll('.form__input');
    
//     this._formValues = {};
//     this._inputList.forEach(input => this._formValues[input.name] = input.value);
    
//     return this._formValues;
//   }

//   generate() {
//     this._element = this._getElement();
//     this._setEventListeners();

//   	return this._element;
//   }
// }