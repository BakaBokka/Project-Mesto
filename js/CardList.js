"use strict";
class CardList {
  constructor(place, template, popupCard, callback, api) {
    this.place = place;
    this.popupCard = popupCard;
    this.callback = callback;
    this.template = template;
    this.api = api;
  }

  //Метод добавления карточки
  addCard = (name, link, id, owner, likes) => {
    const data = { name, link, id, owner, likes };
    const card = this.callback(data, this.popupCard, this.template, api);
    this.place.appendChild(card);
  };

  //Метод проходит по массиву и добавляет карточки в общую обёртку
  render = (array) => {
    array.forEach((item) => {
      // if (item.owner._id === "3c7b1e670d15a41a86af9d64") {
        this.addCard(item.name, item.link, item._id, item.owner, item.likes);
      //  }
    });
  };
}
