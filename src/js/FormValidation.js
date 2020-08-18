import {errorMessages} from './data';
"use strict";
export class FormValidator {
  constructor(form) {
    this.form = form;
    this.submitButton = this.form.querySelector(".popup__button");
    
  }

  isFieldValid = (input) => {
    const valid = this.checkInputValidity(input);
    const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
    errorElem.textContent = input.validationMessage;
    return valid;
  };

  checkInputValidity = (input) => {
    input.setCustomValidity("");

    //Проверка на пустоту инпута
    if (input.validity.valueMissing) {
      input.setCustomValidity(errorMessages.empty);
      return false;
    }
    //Проверка на минимальное и максимальное количество символов в инпуте. В ссылке не применяется
    if (input.validity.tooShort) {
      input.setCustomValidity(errorMessages.wrongLength);
      return false;
    } else if (input.type !== "url" && input.value.length > 30) {
      input.setCustomValidity(errorMessages.wrongLength);
      return false;
    }
    //Проверка на ссылку в инпуте
    if (!input.validity.valid && input.type === "url") {
      input.setCustomValidity(errorMessages.wrongUrl);
      return false;
    }
    //Проверка на верность символов в инпутах
    if (!input.validity.valid) {
      input.setCustomValidity(errorMessages.wrongPattern);
      return false;
    }

    return input.checkValidity();
  };

  //Метод проверяет инпуты на валидность, активирует сабмит
  handlerInputForm = (event) => {
    const [...inputs] = event.currentTarget.elements;
    this.isFieldValid(event.target);

    if (inputs.every(this.checkInputValidity)) {
      this.setSubmitButtonState(true);
    } else {
      this.setSubmitButtonState(false);
    }
  };

  //Метод активации и деактивации кнопки при валидации
  setSubmitButtonState = (state) => {
    if (state) {
      this.submitButton.removeAttribute("disabled");
    } else {
      this.submitButton.setAttribute("disabled", "disabled");
    }
  };

  //Метод активирует слушатели для класса
  setValidationEventListeners = () => {
    this.form.addEventListener("input", (event) => {
      const input = event.target;
      this.checkInputValidity(input);
    });
    this.form.addEventListener("input", this.handlerInputForm, true);
  };

  //Метод сброса сообщения ошибки в инпутах
  resetInvalidState = () => {
    const errorElements = this.form.querySelectorAll(".popup__error-message");
    errorElements.forEach((item) => {
      item.textContent = "";
    });
  };
}
