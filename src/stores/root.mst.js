import { makeAutoObservable, observable, computed, toJS } from 'mobx'
import CommonStore from './common.store'
import WalletStore from './wallet.store'
// import IndexStore from './pages/index.mst'
// import BookStore from './pages/book.mst'
// import RouterStoreInstance from './router.store'

export class RootStore {
  common = new CommonStore()
  wallet = new WalletStore()
  // index = new IndexStore()
  // types = new TypesStore()
  // router = RouterStoreInstance

  constructor() {
    makeAutoObservable(this)
  }
}

const rootStore = new RootStore()
export default rootStore
