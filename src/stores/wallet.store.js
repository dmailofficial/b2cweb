import { makeAutoObservable, observable, computed, toJS } from 'mobx';
// import * as api from '@/requests/common';

export default class WalletStore {
  info = null

  constructor() {
    makeAutoObservable(this)
  }

  setWalletInfo (info) {
    this.info = info
  }
}
