import React from 'react';
import { useHistory } from "react-router-dom";
import {ConfirmPannel } from './css'
import {getDetail, getIcpPrice, detectTransferIsSuccess} from './request'
import Toast from './toast'
import backArrow from '@/static/images/presale/arrow-left@2x.png'
import icpIcon from '@/static/images/presale/ICP@3x.png'
import usdtIcon from '@/static/images/presale/USDT@3x.png'
import { CompatibleClassCountDown } from '@/components/countDown'
import axios from '@/utils/axios';
import { baseUrl } from './utils'
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

        // {address,jwt}
        const { success: isuccess , message, data: idata } = await getIcpPrice({
            address: this.props.loginInfo.address,
            jwt: this.props.loginInfo.jwt,
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
    

    toPay = async () => {
        if(this.state.paying || this.state.walletSwitching){return}
        const _wallet = this.props.wallet
        // const { id, nonce, signmessage, email } = this.props.loginInfo
        if(!_wallet.getBalanceOf){
            this.props.handleWallet();
            return;
        }

        this.setState({paying: true})
        this.poptoast("Payment processing","loading", true)
        const balance = await _wallet.getBalanceOf(this.props.account)
        console.log("assist:::",  balance)
        const myAmount = balance.amount;
        let curPrice = 0;
        if(this.props.walletStore.walletName == "plug"){
            console.log("to pay plug::", this.props.walletStore.walletName, this.state.detail.icpPrice)
            curPrice = this.state.detail.icpPrice
        }else{
            curPrice = this.state.detail.price
        }
        
        console.log("assist:::", curPrice, Number(myAmount));
        if (myAmount < +curPrice) {
            this.closePoptoast();
            this.poptoast("Confirm your assist is enough!")
            return
        }
        
        console.log("to pay xxxxxx::", this.props.walletStore.walletName, curPrice)

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
            this.poptoast(msg, 'success')
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
                    url: `${baseUrl}/timer/${this.state.xxxxxxxxxxx}`,
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

    componentDidMount() {
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
            </ConfirmPannel>
        );
    }
}


export default orderConfirmDetail;
