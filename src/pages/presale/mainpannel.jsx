import React from 'react';
import {Mainpannel } from './css'
import logo from '@/static/images/logo@2x.png'


class MainpannelComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Mainpannel className="inprogress">
                <div className="bref">
                    <img src={logo}></img>
                    <h2>Dmail neT Domain Account {this.props.curId}</h2>
                    <p>Master your mailbox data sovereignty Each mail is NFT</p>
                </div>
                <div className="formWrap">
                    <div className="inputWrap">
                        <input value="" placeholder="Check the NFT domain account of your choice"></input>
                        <span></span>
                    </div>
                    <span className="searchBtn">Lock&Buy</span>
                </div>
                <div className="info">
                    <div className="item">
                        <div className="item-header">
                            <h3>Presale process</h3>
                            <span>view picture -></span>
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
            </Mainpannel>
        );
    }
}


export default MainpannelComp;
