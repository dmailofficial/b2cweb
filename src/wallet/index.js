import MetaMaskWallet from './metaMask'
import PlugWallet from './plug'

class Wallet {
    constructor(props){
        return this.init(props);
    }

    init = (props)=>{
        console.log("init::", props)
        if(props == "plug"){
            return PlugWallet
        }else{
            return MetaMaskWallet
        }
    }
}

export default Wallet;