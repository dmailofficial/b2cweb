import { makeAutoObservable, observable, computed, toJS } from 'mobx';
import Cookies from 'js-cookie'

export default class PresaleStore {
  triggerReload = 0
  curPresale = {}
  channelId = 999

  constructor() {
    makeAutoObservable(this)
  }

  triggerListReload () {
    this.triggerReload += 1
  }
  setCurPresale(presale){
    this.curPresale = presale
  }
  setChannelId(channelId){
    this.channelId = channelId
    try {
      // 3 days expires
      Cookies.set('channelId', channelId, { expires: 3 })
    } catch (error) {
      //
    }

  }
}
