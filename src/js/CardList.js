("use strict");
export class CardList {
  constructor(place, template, popUps, callback, api) {
    this.place = place;
    this.template = template;
    this.popUps = popUps;
    this.callback = callback;
    this.api = api;
  }

  //Метод добавления карточки
  addCard = (name, link, id, owner, likes) => {
    const data = { name, link, id, owner, likes };
    const card = this.callback(data, this.popUps, this.template, this.api);
    this.place.appendChild(card);
  };

  //Метод проходит по массиву и добавляет карточки в общую обёртку
  render = (array) => {
    array.forEach((item) => {
      // Раскомментировать if для показа только собственных карточек
      // if (item.owner._id === "3c7b1e670d15a41a86af9d64") {
      this.addCard(item.name, item.link, item._id, item.owner, item.likes);
      //  }
    });
  };
}
