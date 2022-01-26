import { makeAutoObservable, observable, computed, toJS } from 'mobx';
// import * as api from '@/requests/common';

export default class PresaleStore {
  triggerReload = 0
  curPresale = {}

  constructor() {
    makeAutoObservable(this)
  }

  triggerListReload () {
    this.triggerReload += 1
  }
  setCurPresale(presale){
    this.curPresale = presale
  }
}
