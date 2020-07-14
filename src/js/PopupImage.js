import {Popup} from './Popup';
"use strict";
export class PopupImage extends Popup {
  constructor(popupContainer) {
    super(popupContainer);
  }

  //Метод открытия поп-апа картинки
  open = (url) => {
    const imagePop = this.popupContainer.querySelector(".popup__image");
    imagePop.src = url;
    super.open();
  };
}
