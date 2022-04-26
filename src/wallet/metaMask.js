import Web3 from "web3"
import { Contract, ethers } from 'ethers'
import BigNumber from "bignumber.js";
import { BSC_abi, ERC_abi } from './abis'
import { setNumber } from './setByNumber'

const MetaMaskChainAbiMap = {
    '1': {
      contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      abi: ERC_abi,
      // toAddress: '0xeC4B76ef0F79bc8FEeE9c5C10bc711EEe1e423D2',
      decimals: 6,
      chainId: "1"
    },
    '56': {
      contractAddress: '0x55d398326f99059fF775485246999027B3197955',
      abi: BSC_abi,
      // toAddress: '0xeC4B76ef0F79bc8FEeE9c5C10bc711EEe1e423D2',
      decimals: 18,
      chainId: "56"
    },
}

class MetaMaskWallet {
    constructor(props){
      this.walletName = props?.walletName || ""
      this.accountChangeHandle = props?.accountChangeHandle || function(){}
    }

    _getChainId = () => {
        return new Promise((resolve, reject) => {
            // https://docs.metamask.io/guide/ethereum-provider.html#ethereum-networkversion-deprecated
            window.ethereum.request({ method: 'eth_chainId' }).then((chainId) => {
                resolve(Web3.utils.hexToNumber(chainId))
            })
        })
    }

    getChainInfo = async () => {
        let chainId = ''
        let chainInfo = null
          try {
            chainId = await this._getChainId()
          } catch (error) {
            return null
          }
          if (chainId && chainId in MetaMaskChainAbiMap) { // if the chain already has 
            return MetaMaskChainAbiMap[chainId]
          } else {
            // help to switch chain
            try {
              if (window.ethereum) {
                return await window.ethereum
                  .request({
                    method: 'wallet_switchEthereumChain',
                    params: [
                      {
                        chainId: '0x1'
                      },
                    ],
                  }).then((res) => {
                    return MetaMaskChainAbiMap['1']
                  }).catch((error)=>{
                    console.log("wallet_switchEthereumChain error : ", error)
                    return error
                  })
                // need to click to pay again
                // return null
              } else {
                this._install();
                return null
              }
            } catch (error) {
              console.log(error)
              return null
            }
          }
    }

    requestAccounts = async () => {
      if (window.ethereum) {
          try {
          // https://docs.metamask.io/guide/accessing-accounts.html
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          this.listenerAccountsChanged(this.accountChangeHandle);
          return accounts[0]
          
          } catch (error) {
              return {
                  code: 1,
                  msg: 'User denied account access!'
              }
          }
      } else {
          this._install();
          return {
              code: 2,
              msg: 'Please install MetaMask!'
          }
      }
    }

    listenerAccountsChanged = (handleCallback) => {
        window.ethereum.on('accountsChanged', async (accounts) => {
            handleCallback && await handleCallback(accounts[0])
          });
    }

    _install = () => {
        const install = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
        window.open(install)
    }

    initContract = async () => {
        const chainInfo = await this.getChainInfo();
        console.log("getChainInfo:::::, getChainInfo::::::---", chainInfo.code)
        if(chainInfo.code){
          return chainInfo
        }
        const {abi, contractAddress} = chainInfo
        try {  
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new Contract(contractAddress, abi, signer);
            return contract;
            
        } catch (error) {
            console.error("initContract: ", error)
        }
        
    }

    getBalanceOf = async (address) => {
        const contract = await this.initContract();
        if(contract.code){
          return contract
        }
        const balance = await contract.balanceOf(address);
        console.log("getBalanceOf:::::",balance)
        const chainId = await this._getChainId()
        let powNum = chainId == 1 ? 6 : 18;
        const amount = (new BigNumber(balance._hex, 16)).toNumber() / Math.pow(10, powNum)
        
        return {amount: amount};
    }
    
    transfer = async (toAddress, address ,price, successcallback, failedcallback) => {
        const contract = await this.initContract();
        if(contract.code){
          failedcallback && failedcallback(contract)
          return contract
        }
        const chainInfo = await this.getChainInfo();
        if(chainInfo.code){
          failedcallback && failedcallback(contract)
          return chainInfo
        }
        
        const { decimals } = chainInfo
        // const signRes = await this.sign(sign)
        // // sign failed
        // if (!Array.isArray(signRes)) {
        //     if (signRes && signRes.code === 2) {
        //         // showPop(signRes.msg)
        //         console.error(signRes.msg)
        //     }
        //     return false
        // }
        try {
            return contract.transfer(toAddress, setNumber(+price, decimals)).then((res)=>{
                const {
                    from,
                    hash,
                  } = res
                  console.log("from::hash::::", from, hash)
                  successcallback && successcallback(from, hash)
            }).catch((error)=>{
                if (error.code == 4001) {
                    failedcallback && failedcallback(error)
                    console.log('MetaMask Message Signature: User rejected message signature!')
                    return
                  }
                  failedcallback && failedcallback(error)
                  console.log(error.message || 'Confirm your wallet is properly connected! Confirm your assist is enough!')
                  return
            })
        } catch (error) {
            failedcallback && failedcallback(error)
            console.error("transfer: ",error)
            return error
        }
    }
    sign = async (sign) => {
        if (!sign) {
          return {
            code: 1,
            msg: 'The sign is missing!'
          }
        }
        if (window.ethereum) {
          // if (window.ethereum) {
          try {
            // https://codesandbox.io/s/react-eth-metamask-signatures-ibuxj?file=/src/SignMessage.js:42-74
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const signature = await signer.signMessage(sign);
            return [signature, signer]
          } catch (error) {
            return {
              code: 2,
              msg: error.message
            }
          }
        } else {
            this._install();
          return {
            code: 2,
            msg: 'Please install MetaMask!'
          }
        }
      }
}

export default MetaMaskWallet;