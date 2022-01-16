import React, {useEffect, useState} from 'react';
import { NewHome } from './css'
import ReactPageScroller from "./scroller/index";
import Header from '@/components/newheader'

import arrow from '@/static/images/home/banner/arrow@2x.png'
import rightArrow from '@/static/images/home/banner/arrow-right@2x.png'
import dmailEmail from '@/static/images/home/what_is_dmail/email@2x.png'
import dmailCloud from '@/static/images/home/what_is_dmail/decentralized_icon@2x.png'
import dmailAsset from '@/static/images/home/what_is_dmail/asset@2x.png'
import dmailDapp from '@/static/images/home/what_is_dmail/dapplibrary@2x.png'

import highlightIcon1 from '@/static/images/home/highlights/data_sovereign/icon@2x.png'
import highlightIcon2 from '@/static/images/home/highlights/decentralizedIdentity/icon@2x.png'
import highlightIcon3 from '@/static/images/home/highlights/encryptedPrivacy/icon@2x.png'
import highlightIcon4 from '@/static/images/home/highlights/multichain/icon@2x.png'
import highlightIcon5 from '@/static/images/home/highlights/dataStorage/icon@2x.png'
import highlightIcon6 from '@/static/images/home/highlights/exchangeableNFT/icon@2x.png'
import highlightIcon7 from '@/static/images/home/highlights/messageNotification/icon@2x.png'
import highlightIcon8 from '@/static/images/home/highlights/compatibleWeb2/icon@2x.png'
import highlightIcon9 from '@/static/images/home/highlights/messageSubscription/icon@2x.png'


const Index = () => {
  const [curPage, setCurPage] = useState(0);
  const [scrolling, setScrolling] = useState(false)
  console.log("asdfasdas:")
  const gotoTop = () => {
    document.documentElement.scrollTo({left: 0, top: 0, behavior: "smooth"});
  }

  const scrollToAnchor = (anchorName) => {
    console.log("name:", anchorName)
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        console.log("element:", anchorElement)
        if(anchorElement) {
            anchorElement.scrollIntoView(
                {behavior: 'smooth'}
            );
        }
    }
  }

const scrollToPre =  () =>{
    if(scrolling){return}
    console.log("scrollToPre:",curPage)
    setScrolling(true)
    console.log("scrollToPre scrolling:",scrolling)
    setScrolling(true)
    if(curPage > 0){
       setCurPage(curPage-1);
    }
    
    let _anchor = "anchor"+curPage;
    scrollToAnchor(_anchor)   
    
    
    // setTimeout(()=>{
    //   setScrolling(false)
    // }, 3000)
}

const scrollToNext =  () =>{
  if(scrolling){return}
  console.log("scrollToNext11:",curPage)
   setScrolling(true)
    console.log("scrollToNext scrolling:",scrolling)
    // setScrolling(true)
    let _c = curPage
  if(curPage < 4){
    _c = _c+1;
    console.log("ccc:",_c)
     setCurPage(_c);
  }
  console.log("scrollToNext:",curPage)
  // setScrolling(true)
  
  let _anchor = "anchor"+_c;
  scrollToAnchor(_anchor)

  // setTimeout(()=>{
  //   setScrolling(false)
  // }, 3000)   
}

const windowAddMouseWheel = () => {
    const scrollFunc = function (e) {
        e = e || window.event;
        console.log("scrolling:",scrolling)
        if(scrolling){return}

        if (e.wheelDelta) {
            
            if (e.wheelDelta > 0) {
              scrollToPre()
            }
            if (e.wheelDelta < 0) {
              scrollToNext()
            }
        } else if (e.detail) {  //Firefox
            if (e.detail> 0) {
              scrollToPre()
            }
            if (e.detail< 0) {
              scrollToNext()
            }
        }
    };

    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }

    window.onmousewheel = document.onmousewheel = scrollFunc;
}

// useEffect(()=>{
//   scrollToAnchor("anchor0");
//   windowAddMouseWheel();
// }, [])

  

  return (
    <NewHome>
      <Header />
      <ReactPageScroller>
      {/* <a href="#" id='anchor0'></a> */}
      <div className="pageWrap bannerBlock">
        <div className="contentWrap bannerContent">
            <div className="content">
              <p>Introducing Dmail</p>
              <h2>Construct DID in Web 3.0</h2>
              <h3>Not Just an Email </h3>
              <p className="desc">Dmail guarantees a safe&private environment for your<br></br> communication, storage, and tokens&NFTs transfer on the web 3.0</p>
              <span className="launchBtn" >Launch Demo <img src={rightArrow}></img></span>
            </div>
            <div className="nextBtn" onClick={()=>{scrollToAnchor("anchor1")}}>
                <img src={arrow}></img>
                <span className="txt">Scroll down to explore more</span>
            </div>
        </div>
      </div>

      {/* <a href="#" id='anchor1'></a> */}
      <div className="pageWrap dmailBlock">
        <div className="contentWrap dmailContent">
            <div className="content">
              <p>Introducing Dmail</p>
              <h2>What is Dmail</h2>
              <p className="desc">Utilizing Dfinity as the engine to realize decentralized storage and privacy protection, Dmail identifies user identity and interests with NFT domain account, accomplishes the connection among message, asset, storage, and DApp, eliminates the data silos, and becomes an important information interaction tool in Web3 era.</p>
              
              <div className="dmailItem">
                  <div className="item item1">
                    <div>
                      <img src={dmailEmail}></img>
                    </div>
                    <span className="txt">Email </span>
                  </div>
                  <div className="item item2">
                    <div>
                      <img src={dmailCloud}></img>
                    </div>
                    <span className="txt">Decentralized cloud</span>
                  </div>
                  <div className="item item3">
                    <div>
                      <img src={dmailAsset}></img>
                    </div>
                    <span className="txt">Asset </span>
                  </div>
                  <div className="item item4">
                    <div>
                      <img src={dmailDapp}></img>
                    </div>
                    <span className="txt">DApp library</span>
                  </div>
              </div>
            </div>
            <div className="nextBtn" onClick={()=>{scrollToAnchor("anchor2")}}>
                <img src={arrow}></img>
                <span className="txt">Scroll down to explore more</span>
            </div>
        </div>
      </div>

      {/* <a href="#" id='anchor2'></a> */}
      <div className="pageWrap workBlock">
        <div className="contentWrap workContent">
            <div className="content">
            <p>Introducing Dmail</p>
              <h2>How to work</h2>
              <p className="desc">
                The feature of asset delivery reflects the characteristic of Dmail and blockchain. Since Dmail deploys on Dfinity, every mailbox in Dmail corresponds to a private Canister. Meanwhile, with the help of Dfinity Digital Signature System, user’s information stored in Canister could be kept in privacy. Every time, mailing activity means the interaction between Canisters, which are equivalent to smart contracts. In the process of interaction, token assets, coding in the canister, can be transferred with email as an attachment, while the principle ID in each canister, a representative of DID, allows each user to interact with all kinds of  DApps without hindrance.
              </p>
            </div>
            <div className="nextBtn" onClick={()=>{scrollToAnchor("anchor3")}}>
                <img src={arrow}></img>
                <span className="txt">Scroll down to explore more</span>
            </div>
        </div>
      </div>

      {/* <a href="#" id='anchor3'></a> */}
      <div className="pageWrap highlightBlock">
        <div className="contentWrap highlightContent">
            <div className="title">
              <p>Dmail</p>
              <h2>Highlights</h2>
            </div>
            <div className="content">
              <div className="highlightItem">
                  <div className="item item1">
                    {/* <img src={highlightIcon1}></img> */}
                    <div>
                      <img src={highlightIcon1}></img>
                    </div>
                    <h3>Data sovereign</h3>
                    <p>Decentralized storage formation keeps the data sovereign under users’ control</p>
                  </div>
                  <div className="item item2">
                    {/* <img src={highlightIcon2}></img> */}
                    <div>
                      <img src={highlightIcon2}></img>
                    </div>
                    <h3>Decentralized identity</h3>
                    <p>The important component to form DID in Web3</p>
                  </div>
                  <div className="item item3">
                    {/* <img src={highlightIcon3}></img> */}
                    <div>
                      <img src={highlightIcon3}></img>
                    </div>
                    <h3>Encrypted&Privacy</h3>
                    <p>The combination of "VRF (measurable random function) + BLS (non-interactive threshold signature) + container" ensure the user`s information encrypted and privacy protection</p>
                  </div>
              </div>
              <div className="highlightItem">
                  <div className="item item4">
                    {/* <img src={highlightIcon4}></img> */}
                    <div>
                      <img src={highlightIcon4}></img>
                    </div>
                    <h3>Multichain assets</h3>
                    <p>Conveniently send/receive messages and token assets, binding with multichain wallets</p>
                  </div>
                  <div className="item item5">
                    {/* <img src={highlightIcon5}></img> */}
                    <div>
                      <img src={highlightIcon5}></img>
                    </div>
                    <h3>Data storage permanently</h3>
                    <p>Data in decentralized form stores on chain permanently</p>
                  </div>
                  <div className="item item6">
                    {/* <img src={highlightIcon6}></img> */}
                    <div>
                      <img src={highlightIcon6}></img>
                    </div>
                    <h3>Exchangeable NFT domain account</h3>
                    <p>Building NFT domain account exchange system defines the mailbox as a new asset</p>
                  </div>
              </div>
              <div className="highlightItem">
                  <div className="item item7">
                    {/* <img src={highlightIcon7}></img> */}
                    <div>
                      <img src={highlightIcon7}></img>
                    </div>
                    <h3>Message Notification API</h3>
                    <p>Open API to provide the messages interaction smoothly in web3 world</p>
                  </div>
                  <div className="item item8">
                    {/* <img src={highlightIcon8}></img> */}
                    <div>
                      <img src={highlightIcon8}></img>
                    </div>
                    <h3>Compatible with web2 emails</h3>
                    <p>Various types of emails can be login through Dmail APP, realizing a part of DID functions</p>
                  </div>
                  <div className="item item9">
                    {/* <img src={highlightIcon9}></img> */}
                    <div>
                      <img src={highlightIcon9}></img>
                    </div>
                    <h3>Message subscription</h3>
                    <p>Monitor new messages from projects or contract address in Dfinity ecosystem</p>
                  </div>
              </div>
            </div>
            <div className="nextBtn" onClick={()=>{scrollToAnchor("anchor4")}}>
                <img src={arrow}></img>
                <span className="txt">Scroll down to explore more</span>
            </div>
        </div>
      </div>

      {/* <a href="#" id='anchor4'></a> */}
      <div className="pageWrap roadmapBlock">
        <div className="contentWrap roadmapContent">
            <div className="content">
              <p>Introducing Dmail</p>
              <h2>Product Roadmap</h2>
            </div>
            <div className="roadMap">
                <div className="line"></div>
                <div className="item item1">
                    <h3>2021 Q2</h3>
                    <p>Start project<br></br>Dmail demo<br></br>Dfinty identity</p>
                    <span className="line"></span>
                    <span className="circle"></span>
                 </div>
                 <div className="item item2 bottom">
                    <h3>2021 Q4</h3>
                    <p>Website<br></br>Mailbox base<br></br>Testnet<br></br>Bounty<br></br>Community AMA<br></br>NFTs account presale</p>
                    <span className="line"></span>
                    <span className="circle"></span>
                 </div>
                 <div className="item item3">
                    <h3>2022 Q1</h3>
                    <p>NFT<br></br>Wallet assets<br></br>DApp<br></br>Group push</p>
                    <span className="line"></span>
                    <span className="circle"></span>
                 </div>
                 <div className="item item4 bottom">
                    <h3>2022 Q2</h3>
                    <p>Intialization core assets<br></br>DAO<br></br>Mainnet<br></br>API<br></br>More Dapps</p>
                    <span className="line"></span>
                    <span className="circle"></span>
                 </div>
                 <div className="item item5">
                    <h3>2022 Q3</h3>
                    <p>News<br></br>Mail business version<br></br>Dfinity core exchange</p>
                    <span className="line"></span>
                    <span className="circle"></span>
                 </div>
                 <div className="item item6 bottom">
                    <h3>2022 Q4</h3>
                    <p>Assets exchange<br></br>More cross-chain</p>
                    <span className="line"></span>
                    <span className="circle"></span>
                 </div>
            </div>
        </div>
      </div>

      </ReactPageScroller>
      
    </NewHome>
  );
}

export default Index;
