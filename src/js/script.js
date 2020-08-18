import { Api } from "./Api";
import { Card } from "./Card";
import { CardList } from "./CardList";
import { FormValidator } from "./FormValidation";
import { Popup } from "./Popup";
import { PopupImage } from "./PopupImage";
import { PopupLikes } from "./PopupLikes";
import { UserInfo } from "./UserInfo";
import { DragAndDrop } from "./DragAndDrop";
import "../pages/index.css";

("use strict");
const templateCard = document
  .querySelector("#template-card")
  .content.querySelector(".place-card");
const userData = document.querySelector(".user-info");
const userInfoName = document.querySelector(".user-info__name");
const userInfoJob = document.querySelector(".user-info__job");
const userPhoto = document.querySelector(".user-info__photo");
const placesList = document.querySelector(".places-list");

//Переменные для формы Новая карточка
const popUpForm = document.querySelector("#new-form");
const name = document.querySelector("#name");
const link = document.querySelector("#link");
const submitForm = document.querySelector("#submit");

//Переменные для формы Редактировать профиль
const popUpEdit = document.querySelector("#edit-form");
const userName = document.querySelector("#username");
const userAbout = document.querySelector("#about");
const submitEdit = document.querySelector("#submit-edit");

//Переменные для формы Аватар
const popUpAvatar = document.querySelector("#avatar-form");
const userAvatar = document.querySelector("#useravatar");
const submitAvatar = document.querySelector("#submit-ava");

//Переменные поп-апов.
const editButton = document.querySelector(".edit__button");
const cardButton = document.querySelector(".user-info__button");
const avatarButton = document.querySelector(".user-info__photo");

//Переменные для классов
const API_URL =
  NODE_ENV === "production" ? " https://nomoreparties.co" : " http://nomoreparties.co";
const api = new Api({
  baseUrl: `${API_URL}/cohort11`,
  headers: {
    authorization: "6f8e26e1-ac20-463f-a9ab-2e1466225421",
    "Content-Type": "application/json",
  },
});

const popUpWindowImage = new PopupImage(document.querySelector("#image"));
const popUpWindowLikes = new PopupLikes(document.querySelector("#likes"));
const dragAndDrop = new DragAndDrop(placesList);
const popUps = { popUpWindowImage, popUpWindowLikes, dragAndDrop };
const cardList = new CardList(
  placesList,
  templateCard,
  popUps,
  createNewCard,
  api
);

const userInfo = new UserInfo(userName, userAbout, userData, api);

const popUpWindow = new Popup(document.querySelector("#new"));

const popUpWindowEdit = new Popup(document.querySelector("#edit"));

const popUpWindowAvatar = new Popup(document.querySelector("#avatar"));

const formValidator = new FormValidator(popUpForm);
const formValidatorEdit = new FormValidator(popUpEdit);
const formValidatorAvatar = new FormValidator(popUpAvatar);


//Функция колбэк для создания карточки
function createNewCard(data, popUps, template, api) {
  const card = new Card(data, popUps, api);
  return card.createCard(template);
}

//Слушатели

popUpForm.addEventListener("submit", function (event) {

  submitForm.textContent = "Загрузка...";
  submitForm.classList.add("popup__button_font");

  api
    .postCard(name, link)
    .then((res) => {
      console.log(res);
      cardList.addCard(res.name, res.link, res._id, res.owner, res.likes);
    })
    .then(() => {
      popUpWindow.close();
    })
    .catch((error) => {
      console.log("Произошла ужасная ошбика:", error);
      return Promise.reject("Произошла ужасная ошбика:", error);
    })
    .finally(() => {
      submitForm.classList.remove("popup__button_font");
      submitForm.textContent = "+";
      formValidator.setSubmitButtonState(false);
    });
  event.preventDefault();

  popUpForm.reset();
});

popUpEdit.addEventListener("submit", function (event) {
  submitEdit.textContent = "Загрузка...";
  api
    .updateUserInfo(userName, userAbout)
    .then((result) => {
      (userInfoName.textContent = result.name),
        (userInfoJob.textContent = result.about);
    })
    .then(() => {
      popUpWindowEdit.close();
    })
    .catch((error) => {
      console.log("Произошла ужасная ошбика:", error);
      return Promise.reject("Произошла ужасная ошбика:", error);
    })
    .finally(() => {
      submitEdit.textContent = "Сохранить";
    });

  event.preventDefault();

  popUpEdit.reset();
});

popUpAvatar.addEventListener("submit", function (event) {
  submitAvatar.textContent = "Загрузка...";
  api
    .updateAvatar(userAvatar)
    .then((result) => {
      userPhoto.style.backgroundImage = `url(${result.avatar})`;
    })
    .then(() => {
      popUpWindowAvatar.close();
    })
    .catch((error) => {
      console.log("Произошла ужасная ошбика:", error);
      return Promise.reject("Произошла ужасная ошбика:", error);
    })
    .finally(() => {
      submitAvatar.textContent = "Сохранить";
    });

  event.preventDefault();

  popUpAvatar.reset();
});

editButton.addEventListener("click", () => {
  popUpWindowEdit.open();
  userInfo.setUserInfo();
  formValidatorEdit.resetInvalidState();
  formValidatorEdit.setSubmitButtonState(true);
});

cardButton.addEventListener("click", () => {
  popUpWindow.open();
  formValidator.resetInvalidState();
  formValidator.setSubmitButtonState(false);
});

avatarButton.addEventListener("click", () => {
  popUpWindowAvatar.open();
  formValidatorAvatar.resetInvalidState();
  formValidatorAvatar.setSubmitButtonState(false);
});

//Вызовы методов
api
  .getUserInfo()
  .then((result) => {
    (userInfoName.textContent = result.name),
      (userInfoJob.textContent = result.about),
      (userPhoto.style.backgroundImage = `url(${result.avatar})`);
  })
  .catch((error) => {
    console.log("Произошла ужасная ошбика:", error);
    return Promise.reject("Произошла ужасная ошбика:", error);
  });
api
  .getInitialCards()
  .then((result) => {
    console.log(result);
    cardList.render(result);
  })
  .catch((error) => {
    console.log("Произошла ужасная ошбика:", error);
    return Promise.reject(error);
  });

popUpWindow.setEventListeners();
popUpWindowEdit.setEventListeners();
popUpWindowImage.setEventListeners();
popUpWindowAvatar.setEventListeners();
formValidatorEdit.setValidationEventListeners();
formValidator.setValidationEventListeners();
formValidatorAvatar.setValidationEventListeners();
dragAndDrop.setEventListeners();
