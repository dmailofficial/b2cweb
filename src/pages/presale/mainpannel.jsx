import React from 'react';
import { observer, inject } from "mobx-react";

import {Mainpannel } from './css'
import {searchEmail, blockEmail, login} from './request'
import Dialog from './Dialog'
import StepDialog from './stepDialog'
import Toast from './toast'
import logo from '@/static/images/presale/dmail-logo@3x.png'
import axios from '@/utils/axios';
import { baseUrl } from './utils'

import { CompatibleClassCountDown } from '@/components/countDown'
import inprogressIcon from '@/static/images/presale/inprogress@2x.png'
import comingIcon from '@/static/images/presale/time@2x.png'
import closedIcon from '@/static/images/presale/lock@x2.png'
import successIcon from '@/static/images/presale/success@3x.png'

class MainpannelComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 2,
            openStep: false,
            email: "",
            setsearching: false,
            errorShow: false,
            formatError: false,
            occupError:false,
            errorToast: false,
            errorToastMsg: "",
            emailchecksuccess: false,
            emailData: {},
            countDownSeconds: 0,
            
        };
    }

    componentWillReceiveProps(props){
        this.setState({
            status: props.activity.status
        })
    }

    handleStepClose = () => {
        this.setState({
            openStep: false
        })
    }

    handleStepShow = () => {
        this.setState({
            openStep: true
        })
    }

    onInput = (ev) => {
        const value = ev.target.value
        let reg = /^[a-zA-Z0-9]{4,11}$/
        if(value.trim() && !reg.test(value)){
            this.setState({
                errorShow: true,
                formatError: true,
                occupError: false,
            })
        }else if(!value.trim() || reg.test(value)){
            this.resetErrorStatus();
        }
        this.setState({
            email:value,
            emailchecksuccess: false
        })
    }

    onFocusHandle = () => {
        this.setState({
            emailchecksuccess: false
        })
    }

    onKeyDownchange = (e)=>{
        if(e.keyCode == 13){
            this.onSearch()
        }
    }

    resetErrorStatus = () => {
        this.setState({
            errorShow: false,
            formatError: false,
            occupError: false,
        })
    }

    poptoast = (msg) => {
        this.setState({
            errorToast : true,
            errorToastMsg : msg
        });

        setTimeout(()=>{
            this.setState({
                errorToast : false,
                errorToastMsg : ""
            });
        }, 3000)
    }

    onSearch = async () => {
        if (!this.state.email.trim().length || this.state.errorShow || this.state.setsearching) {
            return
        }
        // const _loginInfo = await this.props.handleWallet("search")
        console.log(this.props.wallet)
        
        this.setState({setsearching:true})
        const { code, success, msg, data } = await searchEmail(this.state.email)

        this.setState({setsearching:false})
        if (!success) {
            this.setState({
                errorShow: true,
                formatError: false,
                occupError: true
            })
            return
        } else if (!data || !data.name) {
            this.poptoast('something is error')
            return
        }
        this.setState({
            mailData: data,
            emailchecksuccess: true
        });
    }
    
    handleLock = async()=>{
        // if(!this.props.loginInfo?.address){
        //     this.props.handleWallet("search")
        //     return
        // }
        let params = {
            // address: this.props.loginInfo.address,
            product_name: this.state.email,
            // jwt: this.props.loginInfo.jwt
        }
        const { code, success, msg, data } = await blockEmail(params)
        
        if (!success) {
            this.poptoast(msg)
            return
        }

        this.props.toNextStep(this.state.email);
    }

    handleEndCallback = () => {
        console.log('countDown end')
    }

    correctRequest = () => {
        return new Promise(async(resolve) => {
            try {
                const res = await axios({
                    url: `${baseUrl}/project/timer`,
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
            <Mainpannel className={this.props.presaleStore.curPresale?.status === 0 ? "coming" : this.props.presaleStore.curPresale?.status === 1 ? "inprogress" : "closed"}>
                <div className="statusFlag">
                    <div className="triangle"></div>
                    <img src={this.props.presaleStore.curPresale?.status === 1 ? inprogressIcon : this.props.presaleStore.curPresale?.status === 0 ? comingIcon : closedIcon}></img>
                </div>
                {this.props.presaleStore.curPresale?.status === 0 && this.state.countDownSeconds > 0 ? (
                    <div className="count-down">
                        <i></i>
                        <span>
                            <CompatibleClassCountDown endCallback={this.handleEndCallback} correctRequest={this.correctRequest} second={this.state.countDownSeconds} />
                        </span>
                    </div>
                ): null}
                <div className="bref">
                    <img src={logo}></img>
                    <h2>{this.props.activity.title}</h2>
                    <p>{this.props.activity.subtitle}</p>
                </div>
                {this.props.presaleStore.curPresale?.status === 0 ?
                    <div className="formWrap notStarted">
                        <div className="inputWrap">
                            <span></span>
                            <input value="Check for 4-11digits NFT Domain Account availability" disabled placeholder="Check for 4-11digits NFT Domain Account availability"></input>
                            <span className="searchBtn">Not Started</span>
                        </div>
                    </div>:null
                }
                {this.props.presaleStore.curPresale?.status === 1 ?
                    <div className="formWrap">
                        <div className="inputWrap">
                            <span></span>
                            <input  
                                value={this.state.email} 
                                onInput={this.onInput} 
                                onFocus = {this.onFocusHandle}
                                onKeyDown={this.onKeyDownchange} 
                                placeholder="Check for 4-11digits NFT Domain Account availability"
                            ></input>
                            <span className="searchBtn" onClick={this.onSearch}>Search</span>
                            <div className={`email-suffix ${this.state.email.length ? 'show' : ''}`}>
                                <p>{this.state.email}</p>
                                <div className="email-suffix-text">@dmail.ai</div>
                            </div>
                        </div>
                        {this.state.errorShow ?
                            <div className="errorTip">
                                {this.state.occupError ? 
                                    <p><span></span>Try another one, this NFT Domain Account is occupied.</p>:null
                                }
                                {this.state.formatError ?
                                    <p><span></span>Format error ! Only 4-11 bits domain account without special characters allowed.</p> : null
                                }
                            </div>: null
                        }
                        {this.state.emailchecksuccess ?
                            <div className="successResult">
                                <span className="arrow"></span>
                                <div className="pannel">
                                    <p>
                                        <img src={successIcon}></img>
                                        <span>{this.state.email}@dmail.ai</span> is available!
                                        <span className="lockBtn" onClick={this.handleLock}>Lock & Buy</span>
                                    </p>
                                </div>
                            </div>:null
                        }
                    </div>:null
                }
                {this.props.presaleStore.curPresale?.status === 9 ?
                    <div className="formWrap disabled">
                        <div className="inputWrap">
                            <span></span>
                            <input value="The event has ended." disabled placeholder="Check for 4-11digits NFT Domain Account availability"></input>
                            <span className="searchBtn">Closed</span>
                        </div>
                    </div>:null
                }
                <div className="info">
                    <div className="item">
                        <div className="item-header">
                            <h3>Presale process</h3>
                            <span onClick={this.handleStepShow}>View tutorial -&gt;</span>
                        </div>
                        <p><span></span>Find the Dmail NFT Domain Account of your choice</p>
                        <p><span></span>Check out</p>
                        <p><span></span>Receive NFT in My orders</p>
                        <p><span></span>Click on "Receive NFT" in "My Orders". Type in Principal ID</p>
                        <p><span></span>Wait for NFT release</p>
                        <p><span></span>Login to bind the account with Dmail after  receiving NFT</p>
                    </div>
                    <div className="item">
                        <div className="item-header">
                            <h3>Account opening status</h3>
                        </div>
                        <p><span></span>1-3 digits: Open in sale during NFT Domain Accounts auction</p>
                        <p className='active'><span></span>4-7 digits: Partially open<img src={successIcon} /></p>
                        <p className='active'><span></span>8-11 digits: Partially open<img src={successIcon} /></p>
                        <br />
                        <div className="item-header">
                            <h3>Supported Payment Methods</h3>
                        </div>
                        <p><span></span>USDT - Ethereum/BNB Chain</p>
                        <p><span></span>BUSD - BNB Chain</p>
                        <p><span></span>ICP - Dfinity</p>
                    </div>
                </div>
                <div className="con_footer">
                    <p>Follow <a rel="noopener noreferrer"  href="https://twitter.com/dmailofficial" target="_blank">twitter</a> to get the latest updates about the release.</p>
                    <p>What is DMAIL? Click to learn more <a rel="noopener noreferrer"  href="https://medium.com/@dmail_official" target="_blank">https://medium.com/@dmail_official</a></p>
                </div>
                <StepDialog
                    open = {this.state.openStep}
                    dialogClose = {this.handleStepClose}
                ></StepDialog>
               <Toast
                    open = {this.state.errorToast}
                    type = "warn"
                    txt = {this.state.errorToastMsg}
                    noHeader = {true}
                ></Toast>

            </Mainpannel>
        );
    }
}


export default MainpannelComp;
