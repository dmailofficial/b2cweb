import Web3 from "web3"
import { Contract, ethers } from 'ethers'
import { BSC_abi, ERC_abi } from './abis'
import { setByNumber, setNumber } from './setByNumber'

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

    transfer = async (price) => {
      const chainInfo = await this.getChainInfo();
      const { toAddress } = chainInfo
      const result = await window.ic.plug.requestTransfer({
        to: toAddress,
        amount: 4000000 * price,
        // opts: {
        //   fee: '',
        //   memo,
        //   from_subaccount: ''
        // }
      });
      console.log('requestTransfer', result);
      return result;
    }
}

export default new PlugWallet();