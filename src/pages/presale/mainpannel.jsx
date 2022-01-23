import React from 'react';
import { observer, inject } from "mobx-react";

import {Mainpannel } from './css'
import {searchEmail, blockEmail, login} from './request'
import Dialog from './Dialog'
import StepDialog from './stepDialog'
import Toast from './toast'
import logo from '@/static/images/presale/dmail-logo@3x.png'

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
            emailData: {}
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
        let reg = /^[a-zA-Z0-9]{4,7}$/
        if(value.trim() && !reg.test(value)){
            this.setState({
                errorShow: true,
                formatError: true,
                occupError: false,
            })
        }else if(!value.trim() || reg.test(value)){
            this.resetErrorStatus();
        }
        this.setState({email:value})
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
        alert(msg)
        this.setState({
            errorToast : true,
            errorToastMsg : msg
        });

        setTimeout(()=>{
            this.setState({
                errorToast : true,
                errorToastMsg : ""
            });
        }, 3000)
    }

    onSearch = async () => {
        if (!this.state.email.trim().length || this.state.errorShow) {
            return
        }
        this.props.handleWallet()
        console.log(this.props.wallet)
        
        this.setState({setsearching:true})
        const { code, success, msg, data } = await searchEmail(this.state.email)

        this.setState({setsearching:false})
        if (code === 90) {
            this.setState({
                errorShow: true,
                formatError: false,
                occupError: true
            })
            return
        }
        if (!success) {
            this.poptoast(msg)
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
        let params = {
            address: this.props.loginInfo.address,
            product_name: this.state.email,
            jwt: this.props.loginInfo.jwt
        }
        const { code, success, message, data } = await blockEmail(params)
        
        if (!success) {
            this.poptoast(message)
            return
        }

        this.props.toNextStep(this.state.email);
    }

    handleEndCallback = () => {
        console.log('countDown end')
    }

    correctRequest = () => {
        return new Promise(async(resolve) => {
            await new Promise((resolve) => setTimeout(resolve, 600))
            resolve(3 * 24 * 3600)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('main', prevProps, prevState)
    }


    render() {
        return (
            <Mainpannel className={this.state.status == 1 ? "coming" : this.state.status == 2 ? "inprogress" : "closed"}>
                <div className="statusFlag">
                    <div className="triangle"></div>
                    <img src={this.state.status == 1 ? inprogressIcon : this.state.status == 2 ? comingIcon : closedIcon}></img>
                </div>
                {this.state.status !== 2 ? null : (
                    <div className="count-down">
                        <i></i>
                        <span>
                            <CompatibleClassCountDown endCallback={this.handleEndCallback} correctGap={10} correctRequest={this.correctRequest} hour={3 * 24} />
                        </span>
                    </div>
                )}
                <div className="bref">
                    <img src={logo}></img>
                    <h2>{this.props.activity.name}</h2>
                    <p>{this.props.activity.desc}</p>
                </div>
                {this.state.status == 1 ?
                    <div className="formWrap notStarted">
                        <div className="inputWrap">
                            <span></span>
                            <input value="Check 4-7 bits NFT domain account of your choice." disabled placeholder="Check the NFT domain account of your choice"></input>
                            <span className="searchBtn">Not Started</span>
                        </div>
                    </div>:null
                }
                {this.state.status == 2 ?
                    <div className="formWrap">
                        <div className="inputWrap">
                            <span></span>
                            <input  value={this.state.email} onInput={this.onInput} onKeyDown={this.onKeyDownchange} placeholder="Check the NFT domain account of your choice"></input>
                            <span className="searchBtn" onClick={this.onSearch}>Search</span>
                            <div className={`email-suffix ${this.state.email.length ? 'show' : ''}`}>
                                <p>{this.state.email}</p>
                                <div className="email-suffix-text">@dmail.ai</div>
                            </div>
                        </div>
                        {this.state.errorShow ?
                            <div className="errorTip">
                                {this.state.occupError ? 
                                    <p><span></span>Try another one, this NFT Domain Acccount id occupied.</p>:null
                                }
                                {this.state.formatError ?
                                    <p><span></span>Format error ! Only 4-7 bits domain account without special characters allowed.</p> : null
                                }
                            </div>: null
                        }
                        {this.state.emailchecksuccess ?
                            <div className="successResult">
                                <span className="arrow"></span>
                                <div className="pannel">
                                    <p>
                                        <img src={successIcon}></img>
                                        <span>{this.state.email}</span> is available!
                                        <span className="lockBtn" onClick={this.handleLock}>Lock&Buy</span>
                                    </p>
                                </div>
                            </div>:null
                        }
                    </div>:null
                }
                {this.state.status == 3 ?
                    <div className="formWrap disabled">
                        <div className="inputWrap">
                            <span></span>
                            <input value="The event has ended." disabled placeholder="Check the NFT domain account of your choice"></input>
                            <span className="searchBtn">Closed</span>
                        </div>
                    </div>:null
                }
                <div className="info">
                    <div className="item">
                        <div className="item-header">
                            <h3>Presale process</h3>
                            <span onClick={this.handleStepShow}>view picture -></span>
                        </div>
                        <p><span></span>Find the Dmail NFT Domain Account of your choice.</p>
                        <p><span></span>Purchase and pay.</p>
                        <p><span></span>Receive NFT in own.</p>
                        <p><span></span>Enter Principal ID.</p>
                        <p><span></span>wait for NFT release.</p>
                        <p><span></span>login to bind the account with Dmail after NFT released.</p>
                    </div>
                    <div className="item">
                        <div className="item-header">
                            <h3>Current opening progress</h3>
                        </div>
                        <p><span></span>1-3 bits will open in NFT domain accounts auction;</p>
                        <p><span></span>4-7 bits partially open.</p>
                        <p><span></span>8 bits and above, will open after mainnet releases.</p>
                    </div>
                </div>
                <div className="con_footer">
                    <p>Follow <a href="https://twitter.com/dmailofficial" target="_blank">twitter</a> to be the first to get the latest notifications about the release.</p>
                    <p>What is DMAIL? Click to learn more from Medium articles <a href="https://medium.com/@dmailofficial" target="_blank">https://medium.com/@dmailofficial</a></p>
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
