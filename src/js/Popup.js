"use strict";
export class Popup {
  constructor(popupContainer) {
    this.popupContainer = popupContainer;
    this.form = this.popupContainer.querySelector(".popup__form");
  }

  //Методы открытия/закрытия поп-апов

  open() {
    this.popupContainer.classList.add("popup_is-opened");
  }

  close() {
    this.popupContainer.classList.remove("popup_is-opened");
  }

  //Метод активирует слушатели
  setEventListeners = () => {
    this.popupContainer
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.close();

        if (this.form) {
          this.form.reset();
        }
      });

    document.addEventListener("keydown", (event) => {
      if (event.keyCode == 27) {
        this.close();
      }
    });
  };
}
