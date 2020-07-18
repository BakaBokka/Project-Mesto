"use strict";
export class Card {
  constructor(data, popUps, api) {
    this.popUps = popUps;
    this.api = api;
    this.data = data;
  }

  //Метод собирает карточку по темплейту
  createCard(template) {
    const newCard = template.cloneNode(true);
    newCard.querySelector(".place-card__name").textContent = this.data.name;
    newCard.querySelector(
      ".place-card__image"
    ).style.backgroundImage = `url(${this.data.link})`;
    this.placeCard = newCard;
    this.likeIcon = this.placeCard.querySelector(".place-card__like-icon");
    this.deleteIcon = this.placeCard.querySelector(".place-card__delete-icon");
    this.cardImage = this.placeCard.querySelector(".place-card__image");
    this.likeCounter = this.placeCard.querySelector(
      ".place-card__like-counter"
    );

    this.setEventListeners();
    this.showDeleteIcon();
    this.showlikeCount(this.data.likes);
    this.setLikeIcons(this.data.likes);
    return newCard;
  }

  //Метод ставит  лайки на карточки

  like = () => {
    if (this.likeIcon.classList.contains("place-card__like-icon_liked")) {
      this.api
        .disLikeCard(this.data.id)
        .then((res) => {
          this.likeIcon.classList.remove("place-card__like-icon_liked");
          this.showlikeCount(res.likes);
          
        })

        .catch((error) => {
          console.log("Произошла ужасная ошбика:", error);
          return Promise.reject("Произошла ужасная ошбика:", error);
        });
    } else {
      console.log(this.data.likes);
      this.api
        .likeCard(this.data.id)
        .then((res) => {
          this.likeIcon.classList.add("place-card__like-icon_liked");
          this.showlikeCount(res.likes);
          
        })

        .catch((error) => {
          console.log("Произошла ужасная ошбика:", error);
          return Promise.reject("Произошла ужасная ошбика:", error);
        });
    }
  };

  //Метод отрисовывает сердечко на лайкнутых карточках

  setLikeIcons = (likes) => {
    likes.forEach((owner) => {
      if (owner._id === "3c7b1e670d15a41a86af9d64") {
        this.likeIcon.classList.add("place-card__like-icon_liked");
      }
    });
  };

  //Метод удаляет карточки

  remove = (event) => {
    if (window.confirm("Не надо, пожалуйста!")) {
      this.removeEventListeners();
      this.api.deleteCard(this.data.id).catch((error) => {
        console.log("Произошла ужасная ошбика:", error);
        return Promise.reject("Произошла ужасная ошбика:", error);
      });
      this.placeCard.remove();
      this.placeCard = null;
    }
    event.stopPropagation();
  };

  //Метод открывает поп-ап картинки
  openImage = (event) => {
    this.popUps.popUpWindowImage.open(this.data.link);
    event.stopPropagation();
  };

  //Метод показывает иконку удаления на своих карточках
  showDeleteIcon = () => {
    if (this.data.owner._id === "3c7b1e670d15a41a86af9d64") {
      this.deleteIcon.classList.add("place-card__delete-icon_is-shown");
    }
  };

  //Метод показывает количество лайков
  showlikeCount = (array) => {
    this.likeCounter.textContent = array.length;
  };

  //Метод показывает список лайков
  showLikeList = () => {
    const likes = this.data.likes.map((item, index) => {
      return `${index + 1}` + ". " + item.name;
    });

    this.popUps.popUpWindowLikes.open(likes);
  };

  closeLikeList = () => {
    this.popUps.popUpWindowLikes.close();
  };

  setEventListeners() {
    this.likeIcon.addEventListener("click", this.like);

    this.deleteIcon.addEventListener("click", this.remove);

    this.cardImage.addEventListener("click", this.openImage);
    this.likeCounter.addEventListener("mouseenter", this.showLikeList);
    this.likeCounter.addEventListener("mouseleave", this.closeLikeList);
  }

  removeEventListeners() {
    this.deleteIcon.removeEventListener("click", this.remove);
    this.likeIcon.removeEventListener("click", this.like);

    this.cardImage.removeEventListener("click", this.openImage);
    this.likeCounter.removeEventListener("mouseenter", this.showLikeList);
    this.likeCounter.removeEventListener("mouseleave", this.closeLikeList);
  }
}
