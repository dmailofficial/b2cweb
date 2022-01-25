import MetaMaskWallet from './metaMask'
import PlugWallet from './plug'

class Wallet {
    constructor(props){
        return this.init(props);
    }

    init = (props)=>{
        console.log("Wallet init props:::", props, typeof props === "object")
        const wallets = {
            plug: PlugWallet,
            metamask: MetaMaskWallet
        }

        if(!props || typeof props === "string"){
            return new wallets[props]() || new MetaMaskWallet()
        }

        if(typeof props === "object"){
            const { walletName, accountChangeHandle } = props
            console.log("walletName::", walletName)
            let _p = {
                walletName : walletName || "metamask",
                accountChangeHandle : accountChangeHandle || function(){}
            }
            return new wallets[walletName](_p) || new MetaMaskWallet(_p)
        }

        
    }
}

export default Wallet;