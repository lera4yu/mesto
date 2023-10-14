export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  };

  getInitialCards() {
    // ...
  }

  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: 'cd6216f4-847a-4421-99d4-0436178223c8',
    'Content-Type': 'application/json'
  }
});