import {Popup} from './Popup';
"use strict";
export class PopupLikes extends Popup {
  constructor(popupContainer) {
    super(popupContainer);
  }

  //Метод открытия поп-апа картинки
  open = (likes) => {
    const likesPop = this.popupContainer.querySelector(".popup__likes");
    likesPop.textContent = likes.join(" \n");
    super.open();
  };
}
