"use strict";
export class Api {
  constructor(options) {
    this.options = options;
  }

  //Метод принимает карточки с сервера
  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Произошла ужасная ошибка: ${res.status}`);
    });
  }

  //Метод отправки карточки на сервер
  postCard = (name, link) => {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        name: `${name.value}`,
        link: `${link.value}`,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Произошла ужасная ошибка: ${res.status}`);
    });
  };

  //Метод удаления карточки с сервера
  deleteCard = (id) => {
    return fetch(`${this.options.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Произошла ужасная ошибка: ${res.status}`);
    });
  };

  //Метод принимает с сервера начальные значения для тесковых полей с именем, профессией и аваторкой пользователя
  getUserInfo = () => {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Произошла ужасная ошибка: ${res.status}`);
    });
  };
  //Метод совмещает данные пользователся с текстовыми элементами
  updateUserInfo = (nameInput, aboutInput) => {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        name: `${nameInput.value}`,
        about: `${aboutInput.value}`,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Произошла ужасная ошибка: ${res.status}`);
    });
  };

  updateAvatar = (link) => {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: `${link.value}`,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Произошла ужасная ошибка: ${res.status}`);
    });
  };

  likeCard = (id) => {
    return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
      method: "PUT",
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Произошла ужасная ошибка: ${res.status}`);
    });
  };

  disLikeCard = (id) => {
    return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
      method: "DELETE",
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Произошла ужасная ошибка: ${res.status}`);
    });
  };
}
