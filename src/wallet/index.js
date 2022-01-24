import MetaMaskWallet from './metaMask'
import PlugWallet from './plug'

class Wallet {
    constructor(props){
        return this.init(props);
    }

    init = (props)=>{
        console.log("init::", props)
        const wallets = {
            plug: PlugWallet,
            metamask: MetaMaskWallet
        }
        
        return wallets[props] || MetaMaskWallet
    }
}

export default Wallet;