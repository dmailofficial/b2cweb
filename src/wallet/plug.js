const PlugAbiMap = {
  toAddress: '567to-2ufhs-rzv5c-2wnbb-6y34z-kzi7q-nvwcv-ulekn-2esk4-kyggc-iae',
}

class PlugWallet {
    constructor(){

    }

    getChainInfo = async () => {
      return PlugAbiMap
    }

    requestAccounts = async () => {
      if (window.ic && window.ic.plug) {
        try {
          // Canister Ids
          const nnsCanisterId = 'pyr3m-ciaaa-aaaai-qasua-cai'
          // Whitelist
          const whitelist = [
            nnsCanisterId,
        ];
          const res = await window.ic.plug.requestConnect({
              whitelist,
              // host: 'http://localhost:3000',
          });

          const principalId = await window.ic.plug.agent.getPrincipal();
          const sIndentity = principalId.toString();
          console.log("plug: ", sIndentity)
          return sIndentity
        } catch (error) {
          // denied
          console.log('plugAuth', error)
          return {
            code: 1,
            msg:  error
          }
        }
      } else {
        this._install();
        return {
          code: 2,
          msg: 'Please install Plug!'
        }
      }
    }

    _install = () => {
        const install = 'https://chrome.google.com/webstore/detail/plug/cfbfdhimifdmdehjmkdobpcjfefblkjm'
        window.open(install)
    }

    initContract = () => {
        return null;
    }

    listenerAccountsChanged = (handleCallback) => {
      handleCallback && handleCallback() 
      
  }

    getBalanceOf = async (address) => {
        const result = await window.ic.plug.requestBalance();
        let _icp = null;
        console.log("plug::", result)
        if(result.length > 0){
          console.log("plug::", result)
          result.map((item)=>{
            if(item.name == "ICP"){
              _icp = {...item}
            }
          })
        }else{
          console.log("plug:: empty")
          _icp = {}
        }
        return _icp;
    }

    transfer = async (price, successcallback, failedcallback) => {
      console.log("plug wallet transfer....")
      const chainInfo = await this.getChainInfo();
      const { toAddress } = chainInfo
      try {
        console.log("plug wallet transfer....:", price)
        const result = await window.ic.plug.requestTransfer({
          to: toAddress,
          // amount: 4000000 * price,
          amount: 100000000 * price,
          // opts: {
          //   fee: '',
          //   memo,
          //   from_subaccount: ''
          // }
        });
        console.log('requestTransfer', result);
        successcallback && successcallback(toAddress, result.height)
        return result;
      } catch (error) {
        console.log("plug:::", error)
        failedcallback && failedcallback(error)
      }
      
    }
}

export default new PlugWallet();