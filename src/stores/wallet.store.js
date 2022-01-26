import { makeAutoObservable, observable, computed, toJS } from 'mobx';
import { encode, decode } from 'js-base64';
import Cookies from 'js-cookie'
export default class WalletStore {
  info = null
  walletName = null
  walletAccountChange = false

  constructor() {
    makeAutoObservable(this)
  }

  setWalletInfo (info) {
    this.info = info
    try {
      // 3 days expires
      Cookies.set('account', encode(JSON.stringify(info)), { expires: 3 })
    } catch (error) {
      //
    }
  }
  setWalletName (wallet){
    this.walletName = wallet
    try {
      // 3 days expires
      Cookies.set('walletname', encode(JSON.stringify(wallet)), { expires: 3 })
    } catch (error) {
      //
    }
  }
  setWalletAccountChange(bl){
    this.walletAccountChange = bl
  }
}
