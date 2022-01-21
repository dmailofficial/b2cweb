import React from 'react';
import {ConfirmPannel } from './css'
import backArrow from '@/static/images/presale/arrow-left@2x.png'

class orderConfirmDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioVal: "icp"
        };
    }

    handleRadioCheck = (type) => {
        console.log(type);
        this.setState({radioVal: type})
    }

    handleBack = () => {
        this.props.back();
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
                        <h3>asdfsdfaasdf@dmail.ai</h3>
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
                                    <p className="value"><span>9.9</span> USDT</p>
                                    <p className="value"><b>≈ </b><span className="small">9.9</span> ICP</p>
                                </div>
                            </div>
                            <div className="btnWrap">
                                <span className="confirmBtn">Confirm</span>
                                <span className="countDown">00:29:30</span>
                            </div>
                            <p className="notice">Please claim your NFT domain account on the orders when the payment is done.</p>
                        </div>
                    </div>
                </div>
            </ConfirmPannel>
        );
    }
}


export default orderConfirmDetail;
