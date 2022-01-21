import React from 'react';
import {Mainpannel } from './css'
import StepDialog from './stepDialog'

import logo from '@/static/images/logo@2x.png'
import inprogressIcon from '@/static/images/presale/inprogress@2x.png'
import comingIcon from '@/static/images/presale/time@2x.png'
import closedIcon from '@/static/images/presale/lock@x2.png'



class MainpannelComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 1,
            openStep: true,
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
                            <input value="asdasd" placeholder="Check the NFT domain account of your choice"></input>
                            <span className="searchBtn">Lock&Buy</span>
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
            </Mainpannel>
        );
    }
}


export default MainpannelComp;
