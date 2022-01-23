import { makeAutoObservable, observable, computed, toJS } from 'mobx'
import CommonStore from './common.store'
import WalletStore from './wallet.store'
import PresaleStore from './pages/presale.store'

export class RootStore {
  common = new CommonStore()
  wallet = new WalletStore()
  presale = new PresaleStore()

  constructor() {
    makeAutoObservable(this)
  }
}

const rootStore = new RootStore()
export default rootStore
