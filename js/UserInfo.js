"use strict";
class UserInfo {
  constructor(nameInput, dataInput, userData, api) {
    this.nameInput = nameInput;
    this.dataInput = dataInput;
    this.userData = userData;
    this.userName = this.userData.querySelector(".user-info__name");
    this.userJob = this.userData.querySelector(".user-info__job");
    this.api = api;
  }
  //Метод устанавливает начальное значение в инпутах
  setUserInfo = () => {
    this.nameInput.defaultValue = this.userName.textContent;
    this.dataInput.defaultValue = this.userJob.textContent;
  };
}
