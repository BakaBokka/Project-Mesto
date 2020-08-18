"use strict";
export class DragAndDrop {
  constructor(cardList) {
    this.cardList = cardList;
    this.card = this.cardList.querySelector('.place-card');
  }



  //Метод определяет следующий элемента для Drug&Drop
  getNextCard = (cursorPosition, currentCard) => {
    const currentCardCoord = currentCard.getBoundingClientRect();
    const currentCardCenter = currentCardCoord.x + currentCardCoord.width / 2;

    const nextCard =
      cursorPosition < currentCardCenter
        ? currentCard
        : currentCard.nextElementSibling;
    console.log(nextCard);
    return nextCard;
  };

  //Метод добавляет карточке класс selected
  selectCard = (event) => {
    event.target.classList.add("selected");
    this.activeCard = this.cardList.querySelector(".selected");
  };

  //Метод убирает с  карточки класс selected
  deselectCard = (event) => {
    event.target.classList.remove("selected");
  };

  //Метод вставляет взятую карточку
  insertCard = (activeCard, nextCard) => {
    this.cardList.insertBefore(activeCard, nextCard);
  };

  //Метод завершает перенос карточки
  dragAndDropCard = (event) => {
    event.preventDefault();

    this.currentCard = event.target.parentNode;

    const isMoveable =
      this.activeCard !== this.currentCard &&
      this.currentCard.classList.contains("place-card");

    if (!isMoveable) {
      return;
    }

    this.nextCard = this.getNextCard(event.clientX, this.currentCard);

    if (
      (this.nextCard &&
        this.activeCard === this.nextCard.previousElementSibling) ||
      this.activeCard === this.nextCard
    ) {
      return;
    }

    this.insertCard(this.activeCard, this.nextCard);
  };

  //Метод активирует слушатели
  setEventListeners = () => {
    this.cardList.addEventListener("dragstart", this.selectCard);

    this.cardList.addEventListener("dragstart", this.deselectCard);

    this.cardList.addEventListener("dragover", this.dragAndDropCard);
  };


}
