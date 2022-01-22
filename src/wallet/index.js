import MetaMaskWallet from './metaMask'

class Wallet {
    constructor(props){

        return this.init();
    }

    init = ()=>{
        console.log("init")
        // let account = MetaMaskWallet.requestAccounts();
        return MetaMaskWallet
    }
    
    testFn(){

    }
}

export default Wallet;