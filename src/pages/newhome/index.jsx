import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import { NewHome } from './css'
import ReactPageScroller from "./scroller/index";
import Header from '@/components/newheader';
import { subscribeNews } from './request';

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

import partnerIcon1 from '@/static/images/home/partner/logos/HASHKEY.png'
import partnerIcon2 from '@/static/images/home/partner/logos/CapAMINO.png'
import partnerIcon3 from '@/static/images/home/partner/logos/DraperDragon.png'
import partnerIcon4 from '@/static/images/home/partner/logos/outliers.png'
import partnerIcon5 from '@/static/images/home/partner/logos/parallelVentures.png'
import partnerIcon6 from '@/static/images/home/partner/logos/FBG.png'
import partnerIcon7 from '@/static/images/home/partner/logos/paka.png'
import partnerIcon8 from '@/static/images/home/partner/logos/sparkCap.png'
import partnerIcon9 from '@/static/images/home/partner/logos/TsingTingCap.png'
import partnerIcon10 from '@/static/images/home/partner/logos/kretosVentures.png'
import partnerIcon11 from '@/static/images/home/partner/logos/HG-ventures.png'
import partnerIcon12 from '@/static/images/home/partner/logos/DfinityCommunity.png'

import footerlogo from '@/static/images/home/footer/logo.png'
import footericon1 from '@/static/images/home/footer/twitter.png'
import footericon2 from '@/static/images/home/footer/telegram.png'
import footericon3 from '@/static/images/home/footer/medium.png'
import footericon4 from '@/static/images/home/footer/discord.png'

import successIcon from '@/static/images/home/toast/success.png'
import faildIcon from '@/static/images/home/toast/faild@3x.png'

import rocketIcon from '@/static/images/home/toast/rocket@2x.png'
import toTopIcon from '@/static/images/home/totop.png'
import { ToastWrap } from '../presale/css';


const Index = () => {
  const [curPage, setCurPage] = useState(0);
  const [scrolling, setScrolling] = useState(false)
  const [showFooter, setShowFooter] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [subMsg, setSubMsg] = useState('Subscription successfully!')
  const [toastIcon, setToastIcon] = useState(successIcon)
  const [comingToast, setComingToast] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)


  const gotoPostion = (top) => {
    document.documentElement.scrollTo({left: 0, top: top, behavior: "smooth"});
    document.body.scrollTo({left: 0, top: top, behavior: "smooth"});
  }

const handleScrollUnavailable = (i) => {
  
  // if(curPage == 5 && !showFooter){
  //   setShowFooter(true);
  //   setTimeout(()=>{
  //     gotoPostion(700)
  //   },10)
  // }
}

const gotoPage = (number) => {
  console.log("gottopage::", number)
  setCurPage(number)
}

const handlePageChange = number => {
  console.log("handlePageChange:",number)
  let _num = number;
  if(_num < 0){
    _num = 0;
    gotoPage(0);
  }
  if(_num > 7){
    _num = 7;
    gotoPage(7);
  }
  
  setCurPage(_num)
  // if(showFooter && _num !== 7){
  //   setShowFooter(false);
  // }
  return false;
};

const onBeforePageScroll = () => {
  // setShowFooter(false);
}




const onSignClick = async () => {
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,6})$/;
  if(!reg.test(value)){
    setError(true)
    return;
  }

  const {success, msg} = await subscribeNews(value)
  if(!success){
    setSubMsg('Network Error!')
    setToastIcon(faildIcon)
    setShowToast(true)
    setTimeout(()=>{
      setShowToast(false)
    }, 3000)
    return
  }
  setSubMsg('Subscription successfully!')
  setToastIcon(successIcon)
  setShowToast(true)
  setTimeout(()=>{
    setShowToast(false)
  }, 3000)
  setValue('')
}

const handleChange = (e) => {
  let _v = e.target.value

  setError(false)
  setValue(_v)
}

const onhandleClose = () => {
  setShowToast(false)
  setComingToast(false)
}

const onComingSoon = () => {
  setComingToast(true)
  setTimeout(()=>{
    setComingToast(false)
  }, 3000)
  return;
}
  

  return (
    <NewHome>
      <Header
        comingSoonHandle = {onComingSoon}
      />
      <ReactPageScroller
        handleScrollUnavailable = {handleScrollUnavailable}
        pageOnChange={handlePageChange}
        onBeforePageScroll = {onBeforePageScroll}
        customPageNumber={curPage}
        animationTimerBuffer = {300}
        animationTimer ={1500}
      >
      {/* <a href="#" id='anchor0'></a> */}
      <div className="pageWrap bannerBlock">
        <div className="contentWrap bannerContent">
            <div className="content">
              <p>Introducing Dmail</p>
              <h2>Construct DID in Web 3.0</h2>
              <h3>Not Just an Email </h3>
              <p className="desc">Dmail guarantees a safe & private environment for your<br></br> communication, storage, and tokens & NFTs transfer on the Web 3.0.</p>
              <a href="https://pyr3m-ciaaa-aaaai-qasua-cai.ic0.app/" target="_blank" className="launchBtn" >Launch Demo <img src={rightArrow}></img></a>
            </div>
            <div className="nextBtn" onClick={()=>{gotoPage(1)}}>
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
              <h2>What is Dmail ?</h2>
              {/* <p className="desc">In Web 3.0, every user and application coexist in a frame of open standards and protocols, which can connected each other freely and form the internet of everything.</p> */}
              <p className="desc">Utilizing Dfinity as the engine to realize decentralized storage and privacy protection, Dmail identifies user identity and User rights with NFT domain account, making connections between information, assets, storage and DApps. Dmail is striving to eliminate data barriers and become the most important interaction tool for the Web 3.0 era. </p>
              
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
            <div className="nextBtn" onClick={()=>{gotoPage(2)}}>
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
              <h2>How does Dmail Work？</h2>
              <p className="desc">
                Dmail is an on-chain E-mail tool with the function of Web 3.0 asset transfer. Deployed on Dfinity,  each Dmail mailbox corresponds to a private "canister". Dmail guarantees the safety of user information, and forms the fundamental decentralized identity (DID). With Dmail, users can access information, assets and DApps securely and seamlessly.
              </p>
            </div>
            <div className="nextBtn" onClick={()=>{gotoPage(3)}}>
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
              <h2>What’s unique about Dmail?</h2>
            </div>
            <div className="content">
              <div className="highlightItem">
                  <div className="item item1">
                    {/* <img src={highlightIcon1}></img> */}
                    <div>
                      <img src={highlightIcon1}></img>
                    </div>
                    <h3>Data Sovereignty</h3>
                    <p>Decentralized storage keeps data sovereignty under user’s control.</p>
                  </div>
                  <div className="item item2">
                    {/* <img src={highlightIcon2}></img> */}
                    <div>
                      <img src={highlightIcon2}></img>
                    </div>
                    <h3>Decentralized Identity</h3>
                    <p>The important component to form DID in Web 3.0</p>
                  </div>
                  <div className="item item3">
                    {/* <img src={highlightIcon3}></img> */}
                    <div>
                      <img src={highlightIcon3}></img>
                    </div>
                    <h3>Encrypted & Privacy</h3>
                    <p>VRF (measurable random function) + BLS (non-interactive threshold signature) + Container.</p>
                  </div>
              </div>
              <div className="highlightItem">
                  <div className="item item4">
                    {/* <img src={highlightIcon4}></img> */}
                    <div>
                      <img src={highlightIcon4}></img>
                    </div>
                    <h3>Multichain Assets</h3>
                    <p>Bind with multichain wallets, enables users to send & receive messages and assets seamlessly. </p>
                  </div>
                  <div className="item item5">
                    {/* <img src={highlightIcon5}></img> */}
                    <div>
                      <img src={highlightIcon5}></img>
                    </div>
                    <h3>Permanent Data Storage</h3>
                    <p>Data is stored on chain decentralized and Permanently.</p>
                  </div>
                  <div className="item item6">
                    {/* <img src={highlightIcon6}></img> */}
                    <div>
                      <img src={highlightIcon6}></img>
                    </div>
                    <h3>Tradable NFT Domain Account</h3>
                    <p>Build an NFT domain market, in which your e-mail can be an asset as well.</p>
                  </div>
              </div>
              <div className="highlightItem">
                  <div className="item item7">
                    {/* <img src={highlightIcon7}></img> */}
                    <div>
                      <img src={highlightIcon7}></img>
                    </div>
                    <h3>Message Notification API</h3>
                    <p>Open API to provide the messages interaction smoothly in Web 3.0 world</p>
                  </div>
                  <div className="item item8">
                    {/* <img src={highlightIcon8}></img> */}
                    <div>
                      <img src={highlightIcon8}></img>
                    </div>
                    <h3>Compatible with Web2 Emails</h3>
                    <p>Dmail's DID function will support logins through Web 2.0 emails</p>
                  </div>
                  <div className="item item9">
                    {/* <img src={highlightIcon9}></img> */}
                    <div>
                      <img src={highlightIcon9}></img>
                    </div>
                    <h3>Message Subscription</h3>
                    <p>Monitor new messages from projects or contract address in Dfinity ecosystem.</p>
                  </div>
              </div>
            </div>
            <div className="nextBtn" onClick={()=>{gotoPage(4)}}>
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
                    <p>Project kickoff<br></br>Dmail demo<br></br>Dfinty identity</p>
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
                    <p>Intialization core assets<br></br>DAO<br></br>Mainnet<br></br>API<br></br>More DApps</p>
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

      {/* <a href="#" id='anchor2'></a> */}
      <div className="pageWrap partnerBlock">
        <div className="contentWrap partnerContent">
            <div className="content">
              <h2>Partners</h2>
              <div className="partners">
                <div className="pitem">
                  <img src={partnerIcon1} alt="HASHKEY"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon2} alt="CapAMINO"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon3} alt="DraperDragon"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon4} alt="outliers"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon5} alt="parallelVentures"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon6} alt="FBG"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon7} alt="paka"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon8} alt="sparkCap"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon9} alt="TsingTingCap"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon10} alt="kretosVentures"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon11} alt="HG ventures"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon12} alt="DfinityCommunity"></img>
                </div>
              </div>
            </div>
           
        </div>
      </div>

      <div className="pageWrap footBlock footWrap" >
          <div className="signWrap">
              <p>Subscribe to our newsletter</p>
              <div className="inputWrap">
                {/* <input placeholder="Your email address" oninput={handleChange} onporpertychange={handleChange}></input> */}
                <TextField
                  className="input" 
                  placeholder="Please enter email address" 
                  variant="outlined" 
                  value = {value}
                  error = {error}
                  onChange={handleChange}
                />
                <span className="signBtn" onClick={onSignClick}>Send</span>
              </div>
          </div>
          <div className="footerInfo">
            <div className="footerLogo">
              <img src={footerlogo} alt="Dmail"></img>
              <p>@Dmail Network Foundation LTD.</p>
            </div>
            <div className="bref">
              <p>Dmail guarantees a safe & private environment for your communication, storage, tokens & NFTs transfer on Web 3.0</p>
              <p>contact@dmail.ai</p>
            </div>
            <div className="links">
              <ul>
                <li>Product</li>
                <li><a href="javascript:;" target="" onClick={onComingSoon}>Mailbox</a></li>
                <li><a href="javascript:;" target="" onClick={onComingSoon}>NFTs</a></li>
                <li><a href="javascript:;" target="" onClick={onComingSoon}>DApps</a></li>
              </ul>
              <ul>
                <li>Supprot</li>
                <li><a href="https://pyr3m-ciaaa-aaaai-qasua-cai.ic0.app/" target="_blank">Demo</a></li>
                <li><a href="https://dmail.ai/Dmail_litepaper.pdf" target="_blank">Litepaper</a></li>
                <li><a href="javascript:;" target="" onClick={onComingSoon}>Docs</a></li>
                <li><a href="javascript:;" target="" onClick={onComingSoon}>API</a></li>
              </ul>
              <ul>
                <li>Community</li>
                <li><a href="https://twitter.com/dmailofficial" target="_blank"><img src={footericon1}></img>Twitter</a></li>
                <li><a href="https://t.me/dmailofficial" target="_blank"><img src={footericon2}></img>Telegram</a></li>
                <li><a href="https://medium.com/@dmail_official" target="_blank"><img src={footericon3}></img>Medium</a></li>
                <li><a href="https://discord.gg/QbvaeqwMFg" target="_blank"><img src={footericon4}></img>Discord</a></li>
              </ul>
            </div>
          </div>
        </div> 
        
      </ReactPageScroller>
        <div className="toTop" onClick={()=>gotoPage(0)}>
          <img src={toTopIcon}></img>
        </div>
        
        {showToast ? 
            <div className="toastWrap">
              {/* <span className="closeBtn" onClick={onhandleClose}>
                <span></span>
                <span></span>
              </span> */}
              <div className="content">
                <img src={toastIcon}></img>
                <span className="tip">{subMsg}</span>
              </div>
            </div>
          : null}
          <div className={comingToast ? "toastWrap show": "toastWrap hidden"}>
              <div className="content">
                <img src={rocketIcon}></img>
                <span className="tip">Coming soon!</span>
              </div>
            </div>
          
    </NewHome>
    
  );
}

export default Index;
