import { removeToken, goToLogin } from "@/utils/request/auth";
import { observable, action, makeAutoObservable } from "mobx";

export default class Global {
  constructor() {
    makeAutoObservable(this);
  }

  @observable username = "test";

  @action.bound setUsername(username: string) {
    this.username = username;
  }

  @action.bound logout() {
    removeToken();
  }
}
