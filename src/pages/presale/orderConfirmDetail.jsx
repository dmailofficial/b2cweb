import React from 'react';
import { useHistory } from "react-router-dom";
import {ConfirmPannel } from './css'
import {getDetail, getIcpPrice, detectTransferIsSuccess} from './request'
import Toast from './toast'
import backArrow from '@/static/images/presale/arrow-left@2x.png'
import { CompatibleClassCountDown } from '@/components/countDown'

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
            walletSwitching: false
        };
    }

    componentWillMount(){
        this.getAddressDetail();
        if(this.props.walletName == "plug"){
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
        if(nextProps.walletName == this.props.walletName){
            return true
        }
        if(nextProps.walletName == "plug"){
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
        if(this.state.walletSwitching){return;}
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

    poptoast = (txt,type) => {
        this.setState({
            errorToast: true,
            errorToastMsg: txt,
            errorToastType: type || "warn"
        })

        setTimeout(()=>{
            this.setState({
                errorToast: false,
                errorToastMsg: '',
                errorToastType: "warn"
            })
        }, 3000)
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
        this.setState({paying: true})

        const _wallet = this.props.wallet
        const { id, nonce, signmessage, email } = this.props.loginInfo
        
        console.log("topay:", signmessage );
        
        const balance = await _wallet.getBalanceOf(this.props.account)
        const myAmount = balance.amount;

        if (myAmount < +this.state.detail.price) {
            this.poptoast("Confirm your assist is enough!")
            return
        }
        await _wallet.transfer(0.1, this.paysuccess, this.payfaild)
        this.setState({paying: false})
        
    }

    paysuccess = async (from, hash) => {
        const successMsg = 'Congratulations, you have successfully participated in the DMAIL NFT Domain Account pre-sale!'
        const _wallet = this.props.wallet
        const { chainId } = await _wallet.getChainInfo();
        const { success, msg, data } = await detectTransferIsSuccess(hash, from, this.state.detail.price, this.state.detail.name, this.props.loginInfo.jwt, chainId)
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
        const userReject = 'MetaMask Message Signature: User rejected message signature!'
        if(error.code == 4001){
            this.poptoast(userReject)
            return
        }
        this.poptoast(error.message || 'Confirm your wallet is properly connected! Confirm your assist is enough!')
        return
    }

    render() {
        console.log(">>>>>>>>props:", this)
        return (
            <ConfirmPannel>
                <div className="backBtn" onClick = {this.handleBack}>
                    <img src={backArrow}></img><span>Back</span>
                </div>
                <div className="content">
                    <div className="domainImg">

                    </div>
                    <div className="orderDetail">
                        <h3>{this.props.email}</h3>
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
                                            className={this.state.radioVal == "icp" ? "radio checked" : "radio"}
                                            onClick={()=>{this.handleRadioCheck("icp")}}
                                        >
                                            <span className="raInput"><span></span></span>
                                            <img src={backArrow}></img>
                                            <span className="raLabel">ICP</span>
                                        </div>

                                        <div 
                                            className={this.state.radioVal == "usdt" ? "radio checked" : "radio"}
                                            onClick={()=>{this.handleRadioCheck("usdt")}}
                                        >
                                            <span className="raInput"><span></span></span>
                                            <img src={backArrow}></img>
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
                                <div className="countDown">
                                    <i></i>
                                    <span><CompatibleClassCountDown endCallback={this.handleEndCallback} correctRequest={this.correctRequest} second={5} min={30} /></span>
                                </div>
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
