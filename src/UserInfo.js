//Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
//Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
//Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
//Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
//Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

export class UserInfo {
  constructor({nameSelector, captionSelector}) {
    this._name = document.querySelector(nameSelector);
    this._caption = document.querySelector(captionSelector);
  }

  getUserInfo() {
    return {name: this._name.textContent, caption: this._caption.textContent};
  }

  setUserInfo(nameInput, captionInput) {
    this._name.textContent = nameInput;
    this._caption.textContent = captionInput;
  }
}