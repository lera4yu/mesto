export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  };

  //находим информацию о дефолтных карточках через API
  getInitialCards() {
    return this._checkStatus(
      fetch(`${this._url}/cards`, {
        headers: this._headers,
        method: "GET"
      }))
  };

  //находим информацию о юзере через API
  getUserInfo() {
    return this._checkStatus(
      fetch(`${this._url}/users/me`, {
        headers: this._headers,
        method: "GET"
      }))
  };

  //функция для хэндлера попапа удаления карточки
  deleteCard(cardId) {
    return this._checkStatus(
      fetch(`${this._url}/cards/${cardId}`, {
        headers: this._headers,
        method: "DELETE"
      }))
  };

  //обновление информации о пользователе на сервере 
  updateUserInfo(userInfo) {
    return this._checkStatus(
      fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userInfo.name,
          about: userInfo.caption
        })
      }))
  };

  //добавление новой карточки на сервер
  addNewCard({ titlePopup, linkPopup }) {
    return this._checkStatus(
      fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: titlePopup,
          link: linkPopup
        })
      }))
  };

  //проверка статуса

  _checkStatus(promiseResult) {
    return promiseResult.then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  };
}