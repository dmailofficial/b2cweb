import React from 'react';
import { useHistory } from "react-router-dom";
import {ConfirmPannel } from './css'
import {getEmailInfo, getIcpPrice, detectTransferIsSuccess, checkProductLockInfo} from './request'
import Toast from './toast'
import backArrow from '@/static/images/presale/arrow-left@2x.png'
import icpIcon from '@/static/images/presale/ICP@3x.png'
import usdtIcon from '@/static/images/presale/USDT@3x.png'
import busdIcon from '@/static/images/presale/busd.png'
import { CompatibleClassCountDown } from '@/components/countDown'
import axios from '@/utils/axios';
import { baseUrl } from './utils'
import Wallet from '@/wallet/index'
import { getAddress } from '@/wallet/utils'
import Dialog from './Dialog'

import nftcover from '@/static/images/presale/nftcover2.png'

class orderConfirmDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            errorToast: false,
            errorToastMsg: '',
            detail: {},
            errorToastType: "warn",
            paying: false,
            walletSwitching: false,
            countDownSeconds: 0,
            accountChangeDialog: false,
            expiredDialog: false,
            toPayAddress: {},
        };
        this.timer = null;
        this.paying = false;
    }

    componentWillMount(){
        this.getAddressDetail();
        if(this.props.walletStore.walletName == "plug"){
            this.setState({
                token: "icp"
            })
        }else{
            this.setState({
                token: "usdt"
            })
        }
    }
    
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.walletStore.walletName == this.props.walletStore.walletName){
            return true
        }
        if(nextProps.walletStore.walletName == "plug"){
            this.setState({
                token: "icp"
            })
        }else{
            this.setState({
                token: "usdt"
            })
        }
        return true
    }

    handleRadioCheck = async (token, disabled) => {
        if (disabled) {
            return;
        }
        let wallet = this.props.wallet
        if(!wallet.getChainInfo){
            wallet = new Wallet(this.props.walletStore.walletName);
        }
        const chainId = await wallet._getChainId();
        if (token === 'busd') {
            if (chainId !== 56) {
                const res = await wallet.switchChain(56, token)
                if (!res) {
                    return false;
                }
            }
            this.setState({
                token
            })
            
        } else if (token === 'usdt') {
            let _chainId = chainId
            if (![1, 56].includes(chainId)) {
                _chainId = 1
                const res = await wallet.switchChain(_chainId, token)
                if (!res) {
                    return false;
                }
            }
        }
        this.setState({
            token
        })
    }

    handleBack = () => {
        this.props.back();
    }

    poptoast = (txt,type, isInfinite) => {
        this.setState({
            errorToast: true,
            errorToastMsg: txt,
            errorToastType: type || "warn"
        })

        setTimeout(()=>{
            if(isInfinite){return}
            this.closePoptoast()
        }, 3000)
    }
    closePoptoast = () =>{
        this.setState({
            errorToast: false,
            errorToastMsg: '',
            errorToastType: "warn"
        })
    }

    getAddressDetail = async () => {
        const { success, msg, data } = await getEmailInfo(this.props.email)
        if (!success) {
            this.poptoast(msg)
            return
        }
        
        this.setState({
            detail: {...data}
        })

        // {address,jwt} --backup
        const { success: isuccess , message, data: idata } = await getIcpPrice({
            // address: this.props.loginInfo.address,
            // jwt: this.props.loginInfo.jwt,
            product_name: this.props.email
        })
        if (!success) {
            this.poptoast(message)
            return
        }
        this.setState({
            detail: {
                ...this.state.detail,
                icpPrice: idata?.price
            }
        })
    }

    getIcpPriceInterval = () => {

    }
    
    checkProductLock = async (product_name) => {
        const _checkResult = await checkProductLockInfo(product_name)
        // console.log("_checkResult_checkResult_checkResult::", _checkResult)
        const { address, code, message, success, ttl } = await checkProductLockInfo(product_name)
        if(!success){
            this.poptoast(message, 'faild')
            return false;
        }
        return {
            address,
            ttl
        }
    }

    toPay = async () => {
        // console.log("state paying111:::", this.state.paying)
        if(this.state.paying || this.paying || this.state.walletSwitching){
            return
        }

        // this.paying = true
        // await this.setState({paying: true})

        let toPayAddress = this.state.toPayAddress
        // console.log('topay', this.props.loginInfo.jwt, toPayAddress)
        // if (this.props.loginInfo.jwt) {
        //     if (!toPayAddress) {
        //         const res = await getAddress(this.props.loginInfo.jwt)
        //         if (res) {
        //             toPayAddress = res
        //             this.setState({
        //                 toPayAddress: res
        //             })
        //         }
        //     }
        // } else {
        //     this.props.handleWallet("orderpay")
        //     return
        // }

        this.paying = true
        await this.setState({paying: true})

        // change account in wallet app but has no sign --- backup
        // console.log("toPay:",this.props.walletStore.walletName)
        if(this.props.walletStore.walletName){
            let _prewallet = new Wallet(this.props.walletStore.walletName);
            let _walletAccount
            try {
                _walletAccount = await _prewallet.requestAccounts();
            } catch (error) {
                _walletAccount = null
                this.setState({paying: false})
                this.paying = false
                return {
                    code: 2,
                    error: error
                }
            }

            if(!!_walletAccount && _walletAccount != this.props.walletStore.info?.address){
                if(this.props.walletStore.walletName == "plug" && !_walletAccount.code){
                    // console.log("_walletAccount: plug::::", _walletAccount)
                    this.props.walletStore.setWalletInfo({
                    ...this.props.walletStore.info,
                    address: _walletAccount
                    })
                }
                // this.setState({accountChangeDialog : true})
                // return;
            }
        }
        

        // chexck product lock status
        // const _checkResult = await this.checkProductLock(this.state.detail.name)
        
        // if(_checkResult.ttl  ){
        //     this.setState({accountChangeDialog : true})
        //     return
        // }
        await this.getAddressDetail();
        // if(!_checkResult.success){  
        //     this.poptoast(_checkResult.message)
        //     return
        // }
        // console.log("this.props.walletStore.walletName:::", this.props.walletStore.walletName, this.props.wallet);
        let _wallet = this.props.wallet
        if(!_wallet.getBalanceOf){
            if(!this.props.walletStore.walletName){
                // console.log("!this.props.walletStore.walletName , getBalanceOf:")
                this.props.handleWallet("orderpay");
                this.setState({paying: false})
                this.paying = false
                return;
            }else{
                _wallet = new Wallet(this.props.walletStore.walletName);
            }
        }        
        this.poptoast("Payment processing","loading", true)
        // setTimeout(()=>{
        //     this.closePoptoast();
        // }, 18*1000)
        // console.log("this.props.walletStore.walletName:::", this.props.walletStore.info.address);

        const balance = await _wallet.getBalanceOf(this.props.walletStore.info.address, this.state.token)
        if(balance.code){
            this.payfaild(balance)
        }
        const myAmount = balance.amount;
        let curPrice = 0;

        if(this.props.walletStore.walletName == "plug"){
            curPrice = this.state.detail.icpPrice
        }else{
            curPrice = this.state.detail.price
        }

        // console.log("curPrice:::", curPrice, myAmount)
        if (this.props.walletStore.walletName == "metamask" && myAmount < +curPrice) {
            this.closePoptoast();
            this.poptoast("Please make sure there’re sufficient funds.")
            this.setState({paying: false})
            this.paying = false
            return
        }
        try {
            // just metamask and plug, no support tron and others
            const toAddress = toPayAddress ? toPayAddress[this.props.walletStore.walletName == "metamask" ? 'erc' : 'icp'] : ''
            // this.setState({paying: false})
            // console.log("this.state.paying::", this.state.paying)
            await _wallet.transfer(toAddress, this.props.walletStore.info.address, curPrice, this.paysuccess, this.payfaild, this.state.token)
        } catch (error) {
            this.closePoptoast();
            console.log("transfer faild:::::---:", error)
        }
        
        
    }

    paysuccess = async (from, hash) => {
        this.closePoptoast();
        this.setState({paying: false})
        this.paying = false
        const successMsg = 'Payment successful'
        let _wallet = this.props.wallet
        if(!_wallet.getChainInfo){
            _wallet = new Wallet(this.props.walletStore.walletName);
        }
        let { chainId } = await _wallet.getChainInfo();
        let curPrice = 0;
        if(this.props.walletStore.walletName == "plug"){
            curPrice = this.state.detail.icpPrice
            chainId = 998
        }else{
            curPrice = this.state.detail.price
        }
        if ( this.state.token === 'busd' ) {
            chainId = 5656
        }
        const { success, msg, data } = await detectTransferIsSuccess(hash, from, curPrice, this.state.detail.name, this.props.loginInfo.jwt, chainId, this.props.presaleStore.channelId, `of_${this.props.walletStore.walletName}`)
        if(!success){
            this.poptoast(msg, 'faild')
            return
        }

        this.poptoast(successMsg, 'success')
        setTimeout(()=>{
            this.props.toOwn()
        }, 3000)
    }

    payfaild = (error) => {
        this.closePoptoast();
        this.paying = false
        this.setState({paying: false})
        const userReject = 'User rejected message signature!'
        if(error.code == 4001){
            this.poptoast(userReject)
            return
        }
        this.poptoast(' Payment failure ', "faild")
        return
    }
    correctRequest = () => {
        return new Promise(async(resolve) => {
            try {
                const res = await axios({
                    url: `${baseUrl}/timer/${this.props.email}`,
                    method: 'get',
                })
                const { code, ttl, message, success } = res.data
                if (success) {
                    resolve(['string', 'number'].includes(typeof ttl) ? +ttl : 0)
                } else {
                    resolve(0)
                }
            } catch (error) {
                  
            }
        })
    }

    correctLockTime = () => {
        this.correctRequest().then((countDownSeconds) => {
            countDownSeconds > 0 && this.setState({
                countDownSeconds
            });
            if(countDownSeconds < 0 ){
                clearInterval(this.timer)
            }
        })
    }

    accountConfirmHandle = () =>{
        this.setState({accountChangeDialog : false})
        this.handleBack()
    }

    handleEndCallback = () => {
        // console.log('countDown end')
        // this.state.expiredDialog = true;
        this.setState({expiredDialog : true})
    }

    expiredDialogHandle = () => {
        this.setState({expiredDialog : false})
        this.handleBack()
    }
    
    componentDidMount() {
        window.ethereum && window.ethereum.on('chainChanged', (res) => {
            const chainId = parseInt(res)
            console.log('chainChanged~~', chainId)
            let token = this.state.token
            if (chainId === 1) {
                token = "usdt"
            } else if (chainId === 56) {
                !token && (token = "usdt")
            } else {
                token = ""
            }
            this.setState({
                token
            })
        });

        this.props.onRef(this)
        this.hiddenProperty = 'hidden' in document ? 'hidden' :    
                'webkitHidden' in document ? 'webkitHidden' :    
                'mozHidden' in document ? 'mozHidden' :  null;
        this.visibilityChangeEvent = this.hiddenProperty.replace(/hidden/i, 'visibilitychange');
        this.onVisibilityChange = () => {
            if (!document[this.hiddenProperty]) {    
            }else{
                this.correctLockTime();
            }
        }
        document.addEventListener(this.visibilityChangeEvent, this.onVisibilityChange);
        
        this.correctLockTime();
        this.timer = setInterval(()=>{
            this.correctLockTime();
        }, 1000*30)

        // if (this.props.loginInfo.jwt) {
            // getAddress(this.props.loginInfo.jwt).then((res) => {
            //     if (res) {
            //         this.setState({
            //             toPayAddress: res
            //         })
            //     }
            // })
        // }
    }

    componentWillUnmount(){
        clearInterval(this.timer)
        const hiddenProperty = 'hidden' in document ? 'hidden' :    
                'webkitHidden' in document ? 'webkitHidden' :    
                'mozHidden' in document ? 'mozHidden' :  null;
        const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
        
        document.removeEventListener(this.visibilityChangeEvent, this.onVisibilityChange);
    }

    render() {
        const { walletName } = this.props.walletStore
        const { token } = this.state
        console.log(walletName, token)

        return (
            <ConfirmPannel>
                <div className="backBtn">
                    <img onClick = {this.handleBack} src={backArrow}></img><span  onClick = {this.handleBack}>Back</span>
                </div>
                <div className="content">
                    <div className="domainImg">
                        <img src={nftcover}></img>
                    </div>
                    <div className="orderDetail">
                        <h3>{this.props.email}@dmail.ai</h3>
                        <p className="tip">Dmail NFT Domain Account is locked, please complete payment </p>
                        <div className = "info">
                            <div className = "item">
                                <span className="label">Owner:</span>
                                <span className="value">None</span>
                            </div>
                            <div className = "item">
                                <span className="label">Expiration Date:</span>
                                <span className="value">Permanent</span>
                            </div>
                            <div className = "item payTypes">
                                <span className="label">Select payment method:</span>
                                <div className="valueWrap">
                                    <div className="radios" style={{ flexFlow: 'column', alignItems: 'start'}}>
                                        <div style={{display: "flex"}}>
                                            <div 
                                                className={`radio ${walletName !== "metamask" ? 'disabled' : ''} ${walletName == "metamask" && token === "usdt" ? 'checked' : ''}`}
                                                onClick={()=>{this.handleRadioCheck("usdt", walletName !== "metamask")}}
                                            >
                                                <span className="raInput"><span></span></span>
                                                <img src={usdtIcon}></img>
                                                <span className="raLabel">USDT</span>
                                            </div>
                                            <div 
                                                className={`radio ${walletName !== "metamask" ? 'disabled' : ''} ${walletName == "metamask" && token === "busd" ? 'checked' : ''}`}
                                                style={{marginRight: 0}}
                                                onClick={()=>{this.handleRadioCheck("busd", walletName !== "metamask")}}
                                            >
                                                <span className="raInput"><span></span></span>
                                                <img src={busdIcon} className="busd" />
                                                <span className="raLabel">BUSD</span>
                                            </div>
                                        </div>
                                        <div 
                                            className={walletName == "plug" ? "radio checked" : "radio disabled"}
                                            style={{marginTop: '8px'}}
                                            onClick={()=>{this.handleRadioCheck("icp", walletName !== "plug")}}
                                        >
                                            <span className="raInput"><span></span></span>
                                            <img className="icp" src={icpIcon}></img>
                                            <span className="raLabel">ICP</span>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className = "item multiline">
                                <span className="label">Registiation price to pay:</span>
                                <div className="valueWrap">
                                    <p className="value"><span>{this.state.detail.price}</span> USDT/BUSD</p>
                                    <p className="value"><b>≈ </b><span className="small">{this.state.detail.icpPrice}</span> ICP</p>
                                </div>
                            </div>
                            <div className="btnWrap">
                                {!this.state.paying ? 
                                    <span className="confirmBtn" onClick={this.toPay}>{this.state.walletSwitching ? "Wallet switching" : "Confirm"}</span>
                                    : 
                                    <span className="confirmBtn disabled">{this.state.walletSwitching ? "Wallet switching" : "Confirm"}</span>
                                }
                                {this.state.countDownSeconds > 0 ? (
                                    <div className="countDown">
                                        <i></i>
                                        <span><CompatibleClassCountDown endCallback={this.handleEndCallback} correctRequest={this.correctRequest} second={this.state.countDownSeconds} /></span>
                                    </div>
                                ) : null}
                            </div>
                            <p className="notice">Please claim your NFT Domain Account on My Orders when the payment is done.</p>
                        </div>
                    </div>
                </div>
                <Toast
                    open = {this.state.errorToast}
                    type = {this.state.errorToastType}
                    txt = {this.state.errorToastMsg}
                    noHeader = {true}
                >
                </Toast>
                <Dialog
                    type = {"warn"}
                    title = "Account changes"
                    open = {this.state.accountChangeDialog}
                    operateBtton = "confirm"
                    maxWidth = "xs"
                    confirmHandle = {this.accountConfirmHandle}
                    dialogClose = {this.accountConfirmHandle}
                >
                    <p>Account changes,Please return to the home page to repurchase</p>
                </Dialog>

                <Dialog
                    type = {"warn"}
                    title = "Expired"
                    open = {this.state.expiredDialog}
                    operateBtton = "confirm"
                    maxWidth = "xs"
                    confirmHandle = {this.expiredDialogHandle}
                    dialogClose = {this.expiredDialogHandle}
                >
                    <p>Timeout has expired and the order has not been paid for.<br></br>Dmail NFT Domain Account has been released.<br></br> Please return to the home page to repurchase.</p>
                </Dialog>
            </ConfirmPannel>
        );
    }
}

export default orderConfirmDetail;
