import { makeAutoObservable, observable, computed, toJS } from 'mobx';
// import * as api from '@/requests/common';

export default class WalletStore {
  info = null
  walletName = null

  constructor() {
    makeAutoObservable(this)
  }

  setWalletInfo (info) {
    this.info = info
  }
  setWalletName (wallet){
    this.walletName = wallet
  }
}
