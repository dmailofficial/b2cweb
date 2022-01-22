import React from 'react';
import {ConfirmPannel } from './css'
import {getDetail, getIcpPrice} from './request'
import Toast from './toast'
import BigNumber from "bignumber.js";
import backArrow from '@/static/images/presale/arrow-left@2x.png'
import warnIcon from '@/static/images/presale/expired@2x.png'
import { CompatibleClassCountDown } from '@/components/countDown'

class orderConfirmDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioVal: "icp",
            errorToast: false,
            errorToastMsg: '',
            detail: {},
        };
    }

    componentWillMount(){
        this.getAddressDetail();
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

    handleRadioCheck = (type) => {
        this.setState({radioVal: type})
        if(type == "icp"){
            this.props.handleWallet("plug")
        }else{
            this.props.handleWallet("metamask")
        }
        
    }

    handleBack = () => {
        this.props.back();
    }

    poptoast = (txt) => {
        this.setState({
            errorToast: true,
            errorToastMsg: txt
        })

        setTimeout(()=>{
            this.setState({
                errorToast: false,
                errorToastMsg: ''
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
            jwt: this.props.loginInfo.jwt
        })
        if (!success) {
            this.poptoast(message)
            return
        }
        this.setState({
            detail: {
                ...this.state.detail,
                icpPrice: idata.price
            }
        })


        
        // const { id, name, price, exp_date, symbal } = data
        // setcurrentDetail({
        //   id, name, price, exp_date, symbal
        // })
    }
    

    toPay = async () => {
        const _wallet = this.props.wallet
        const { id, nonce, signmessage, email } = this.props.loginInfo
        const balance = await _wallet.getBalanceOf(this.props.account[0])
        const myAmount = balance.amount;

        if (myAmount < +this.state.detail.price) {
            this.poptoast("Confirm your assist is enough!")
            return
        }
        
        _wallet.transfer(0.1, signmessage)
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
                        <h3>{this.props.address}</h3>
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
                                <span className="confirmBtn" onClick={this.toPay}>Confirm</span>
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
                    type = "warn"
                    txt = {this.state.errorToastMsg}
                    noHeader = {true}
                >
                </Toast>
            </ConfirmPannel>
        );
    }
}


export default orderConfirmDetail;
