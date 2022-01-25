import React from 'react';
import { useHistory } from "react-router-dom";
import {ConfirmPannel } from './css'
import {getDetail, getIcpPrice, detectTransferIsSuccess, checkProductLockInfo} from './request'
import Toast from './toast'
import backArrow from '@/static/images/presale/arrow-left@2x.png'
import icpIcon from '@/static/images/presale/ICP@3x.png'
import usdtIcon from '@/static/images/presale/USDT@3x.png'
import { CompatibleClassCountDown } from '@/components/countDown'
import axios from '@/utils/axios';
import { baseUrl } from './utils'
import Wallet from '@/wallet/index'
import Dialog from './Dialog'

import nftcover from '@/static/images/presale/nftcover.png'

class orderConfirmDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioVal: "usdt",
            errorToast: false,
            errorToastMsg: '',
            detail: {},
            errorToastType: "warn",
            paying: false,
            walletSwitching: false,
            countDownSeconds: 0,
            accountChangeDialog: false,
        };
    }

    componentWillMount(){
        this.getAddressDetail();
        if(this.props.walletStore.walletName == "plug"){
            this.setState({
                radioVal: "icp"
            })
        }else{
            this.setState({
                radioVal: "usdt"
            })
        }
    }
    
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.walletStore.walletName == this.props.walletStore.walletName){
            return true
        }
        if(nextProps.walletStore.walletName == "plug"){
            this.setState({
                radioVal: "icp"
            })
        }else{
            this.setState({
                radioVal: "usdt"
            })
        }
        return true
    }

    handleEndCallback = () => {
        console.log('countDown end')
    }

    correctRequest = () => {
        return new Promise(async(resolve) => {
            await new Promise((resolve) => setTimeout(resolve, 600))
            resolve(8)
        })
    }

    handleRadioCheck = async (type) => {
        return;
        if(this.state.walletSwitching || this.state.radioVal != type){return;}
        this.setState({
            radioVal: type,
            walletSwitching: true
        })
        if(type == "icp"){
           await this.props.handleWallet("plug")
        }else{
           await this.props.handleWallet("metamask")
        }

        this.setState({
            walletSwitching: false
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
        const { success, msg, data } = await getDetail(this.props.email)
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
        console.log("_checkResult_checkResult_checkResult::", _checkResult)
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
        if(this.state.paying || this.state.walletSwitching){return}
        
        // change account in wallet app but has no sign --- backup
        console.log("toPay:",this.props.walletStore.walletName)
        if(this.props.walletStore.walletName){
            let _prewallet = new Wallet(this.props.walletStore.walletName);
            let _walletAccount
            try {
                _walletAccount = await _prewallet.requestAccounts();
            } catch (error) {
                return {
                    code: 2,
                    error: error
                }
            }

            if(_walletAccount != this.props.walletStore.info?.address){
                if(this.props.walletStore.walletName == "plug"){
                    console.log("_walletAccount: plug::::", _walletAccount)
                    this.props.walletStore.setWalletInfo({
                    ...this.props.walletStore.info,
                    address: _walletAccount
                    })
                }
                // this.setState({accountChangeDialog : true})
                // return;
            }
        }
        

        // chexck product lock status -----backup
        // const _checkResult = await this.checkProductLock(this.state.detail.name)
        
        // if(_checkResult.ttl > 0 && _checkResult.address != this.props.walletStore.info?.address){
        //     this.setState({accountChangeDialog : true})
        //     return
        // }
        console.log("this.props.walletStore.walletName:::", this.props.walletStore.walletName);
        let _wallet = this.props.wallet
        if(!_wallet.getBalanceOf){
            if(!this.props.walletStore.walletName){
                this.props.handleWallet("orderpay");
                return;
            }else{
                _wallet = new Wallet(this.props.walletStore.walletName);
            }
        }
        this.setState({paying: true})
        this.poptoast("Payment processing","loading", true)
        console.log("this.props.walletStore.walletName:::", this.props.walletStore.info.address);

        const balance = await _wallet.getBalanceOf(this.props.walletStore.info.address)
        const myAmount = balance.amount;
        let curPrice = 0;

        if(this.props.walletStore.walletName == "plug"){
            curPrice = this.state.detail.icpPrice
        }else{
            curPrice = this.state.detail.price
        }
        console.log("curPrice:::", curPrice, myAmount)
        if (myAmount < +curPrice) {
            this.closePoptoast();
            this.poptoast("Confirm your assist is enough!")
            this.setState({paying: false})
            return
        }
        
        await _wallet.transfer(curPrice, this.paysuccess, this.payfaild)
        this.setState({paying: false})
        
    }

    paysuccess = async (from, hash) => {
        this.closePoptoast();
        const successMsg = 'Payment successful'
        const _wallet = this.props.wallet
        const { chainId } = await _wallet.getChainInfo();
        let curPrice = 0;
        if(this.props.walletStore.walletName == "plug"){
            curPrice = this.state.detail.icpPrice
        }else{
            curPrice = this.state.detail.price
        }
        const { success, msg, data } = await detectTransferIsSuccess(hash, from, curPrice, this.state.detail.name, this.props.loginInfo.jwt, chainId)
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
        const userReject = 'MetaMask Message Signature: User rejected message signature!'
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
                    // TODO: xxxxxxxxxxx need to replace
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

    accountConfirmHandle = () =>{
        this.setState({accountChangeDialog : false})
        this.handleBack()
    }

    componentDidMount() {
        this.props.onRef(this)
        this.correctRequest().then((countDownSeconds) => {
            countDownSeconds > 0 && this.setState({
                countDownSeconds
            });
        })
    }

    render() {
        return (
            <ConfirmPannel>
                <div className="backBtn" onClick = {this.handleBack}>
                    <img src={backArrow}></img><span>Back</span>
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
                                <span className="label">Owner：</span>
                                <span className="value">None</span>
                            </div>
                            <div className = "item">
                                <span className="label">Expiration Date:</span>
                                <span className="value">Permanent</span>
                            </div>
                            <div className = "item multiline">
                                <span className="label">Select payment method:</span>
                                <div className="valueWrap">
                                    <div className="radios">
                                        <div 
                                            className={this.state.radioVal == "icp" ? "radio checked" : "radio disabled"}
                                            onClick={()=>{this.handleRadioCheck("icp")}}
                                        >
                                            <span className="raInput"><span></span></span>
                                            <img className="icp" src={icpIcon}></img>
                                            <span className="raLabel">ICP</span>
                                        </div>

                                        <div 
                                            className={this.state.radioVal == "usdt" ? "radio checked" : "radio disabled"}
                                            onClick={()=>{this.handleRadioCheck("usdt")}}
                                        >
                                            <span className="raInput"><span></span></span>
                                            <img src={usdtIcon}></img>
                                            <span className="raLabel">USDT</span>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className = "item multiline">
                                <span className="label">Registiation price to pay:</span>
                                <div className="valueWrap">
                                    <p className="value"><span>{this.state.detail.price}</span> USDT</p>
                                    <p className="value"><b>≈ </b><span className="small">{this.state.detail.icpPrice}</span> ICP</p>
                                </div>
                            </div>
                            <div className="btnWrap">
                                <span className="confirmBtn" onClick={this.toPay}>{this.state.walletSwitching ? "Wallet switching" : "Confirm"}</span>
                                {this.state.countDownSeconds > 0 ? (
                                    <div className="countDown">
                                        <i></i>
                                        <span><CompatibleClassCountDown endCallback={this.handleEndCallback} correctRequest={this.correctRequest} second={this.state.countDownSeconds} /></span>
                                    </div>
                                ) : null}
                                
                            </div>
                            <p className="notice">Please claim your NFT domain account on the orders when the payment is done.</p>
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
            </ConfirmPannel>
        );
    }
}


export default orderConfirmDetail;
