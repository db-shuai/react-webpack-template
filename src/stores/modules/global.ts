import { observable, action, makeAutoObservable } from "mobx";

export default class Global {
  constructor() {
    makeAutoObservable(this);
  }

  @observable collapsed = false;

  @action.bound toggleCollapsed(collapsed: boolean) {
    this.collapsed = collapsed ?? !this.collapsed;
  }
}
