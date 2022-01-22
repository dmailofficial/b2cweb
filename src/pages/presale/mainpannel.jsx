import React from 'react';
import {Mainpannel } from './css'
import {searchEmail, blockEmail} from './request'
import Dialog from './Dialog'
import StepDialog from './stepDialog'


import logo from '@/static/images/logo@2x.png'
import inprogressIcon from '@/static/images/presale/inprogress@2x.png'
import comingIcon from '@/static/images/presale/time@2x.png'
import closedIcon from '@/static/images/presale/lock@x2.png'
import successIcon from '@/static/images/presale/success@3x.png'




class MainpannelComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 1,
            openStep: false,
            email: "",
            setsearching: false,
            errorShow: false,
            formatError: false,
            occupError:false,
            apiErrorToast: false,
            apiErrorMsg: "",
            emailData: {}
        };
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

    resetErrorStatus = () => {
        this.setState({
            errorShow: false,
            formatError: false,
            occupError: false,
        })
    }

    poptoast = (txt) => {
        return (
            <Dialog
                open = {true}
                noHeader = {true}
            >{txt}</Dialog>
        )
    }

    onSearch = async () => {
        if (!this.state.email.trim().length) {
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
            this.setState({
                apiErrorToast : true,
                apiErrorMsg : msg
            });
            setTimeout(()=>{
                this.setState({apiErrorToast : false});
            }, 3000)
            return
        } else if (!data || !data.name) {
            this.setState({
                apiErrorToast : true,
                apiErrorMsg : 'something is error'
            });
            setTimeout(()=>{
                this.setState({apiErrorToast : false});
            }, 3000)
            return
        }
        // setEmailData(data)
        this.setState({emailData: data})
    }
    
    handleLock = async()=>{
        // const { code, success, msg, data } = await blockEmail(this.state.email)
        
        // if (!success) {
        //     this.setState({
        //         apiErrorToast : true,
        //         apiErrorMsg : msg
        //     });
        //     setTimeout(()=>{
        //         this.setState({apiErrorToast : false});
        //     }, 3000)
        //     return
        // } else if (!data || !data.name) {
        //     this.setState({
        //         apiErrorToast : true,
        //         apiErrorMsg : 'something is error'
        //     });
        //     setTimeout(()=>{
        //         this.setState({apiErrorToast : false});
        //     }, 3000)
        //     return
        // }

        this.props.toNextStep(this.state.email);
    }


    render() {
        return (
            <Mainpannel className={this.state.status == 1 ? "inprogress" : this.state.status == 2 ? "coming" : "closed"}>
                <div className="statusFlag">
                    <div className="triangle"></div>
                    <img src={this.state.status == 1 ? inprogressIcon : this.state.status == 2 ? comingIcon : closedIcon}></img>
                </div>
                <div className="bref">
                    <img src={logo}></img>
                    <h2>Dmail neT Domain Account {this.props.curId}</h2>
                    <p>Master your mailbox data sovereignty Each mail is NFT</p>
                </div>
                {this.state.status == 1 ?
                    <div className="formWrap">
                        <div className="inputWrap">
                            <span></span>
                            <input  value={this.state.email} onInput={this.onInput} placeholder="Check the NFT domain account of your choice"></input>
                            <span className="searchBtn" onClick={this.onSearch}>Search</span>
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
                        <div className="successResult">
                            <span className="arrow"></span>
                            <div className="pannel">
                                <p>
                                    <img src={successIcon}></img>
                                    <span>{this.state.email}</span> is available!
                                    <span className="lockBtn" onClick={this.handleLock}>Lock&Buy</span>
                                </p>
                            </div>
                        </div>
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
                {this.state.status == 2 ?
                    <div className="formWrap notStarted">
                        <div className="inputWrap">
                            <span></span>
                            <input value="Check 4-7 bits NFT domain account of your choice." disabled placeholder="Check the NFT domain account of your choice"></input>
                            <span className="searchBtn">Not Started</span>
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
                    <p>Follow <a href="" target="_blank">twitter</a> to be the first to get the latest notifications about the release.</p>
                    <p>What is DMAIL? Click to learn more from Medium articles <a href="#" target="_blank">https://medium.com/@dmailofficial</a></p>
                </div>
                <StepDialog
                    open = {this.state.openStep}
                    dialogClose = {this.handleStepClose}
                ></StepDialog>
               {this.state.apiErrorToast ? this.poptoast(this.state.apiErrorMsg) : null}

            </Mainpannel>
        );
    }
}


export default MainpannelComp;
