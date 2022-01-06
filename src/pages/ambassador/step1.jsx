import {Step1} from './css'
import p1 from '@/static/images/ambassador/culture@2x.png'
import p2 from '@/static/images/ambassador/mission@2x.png'
import p3 from '@/static/images/p3.png'
import p4 from '@/static/images/p4.png'
import p5 from '@/static/images/p5.png'

const Step1Component = () => {
  

  return (
    <Step1>
      <div className="banner">
        <h1>Dmail Ambassador Program</h1>
        <p>
          By applying for this program, we will add you to the waiting list as Ambassador Candidates. 
        </p>
        <p>This is a volunteer program for true fans who are passionate about what we do.</p>
        <span className="applyBtn">Apply Now</span>
      </div>
      <div className="culture">
        <div className="cheader">
            <span>Dmail</span>
            <h2>Culture & Mission</h2>
        </div>
        <div className="citem">
            <div className="img"><img src={p1}></img></div>
            <div className="desc">
              <span>Dmail</span>
              <h3>Our Culture</h3>
              <p>The enforcer of Web3</p>
            </div>
            
        </div>
        <div className="citem">
        <div className="img"><img src={p2}></img></div>
          <div className="desc">
              <span>Dmail</span>
              <h3>Our Mission</h3>
              <p> control his/her own data,</p>
              <p>from a true decentralized identity(DID), </p>
              <p>and build a gateway to the Web3</p>
            </div>
        </div>
      </div>
      <div className="criteria">
        <div className="cheader">
            <span>Dmail</span>
            <h2>Criteria & Benefits</h2>
        </div>
        <div className="content">
          <div className="citem">
            <h3>Criteria</h3>
            <p>Having a passion of web3,our vision and mission.</p>
            <p>Very active and enraging on Discord, Telegram, and Twitter.</p>
            <p>Experience of community engagement on social media & meetups.</p>
            <p>Experience of Dfinity ecosystem.</p>
            <p>Content creation skills.</p>
          </div>

          <div className="citem">
            <h3>Benefits</h3>
            <p>We will promote your cognitive on web3, and Dfinity from our resources.</p>
            <p>We will secure a spot for you in the official ambassador district! That is a special area on the network.</p>
            <p>You will get an 1-3bits NFT domain account from us.</p>
          </div>

          <div className="citem">
            <h3>Evaluation & Priority</h3>
            <p>We will observe your engagement on Discord, or Telegram.</p>
            <p>We will evaluate your attitude towards people.</p>
            <p>We value the size of your community that you can reach.</p>
            <p>We value the quality of your future referrals.</p>
          </div>
        </div>
      </div>
    </Step1>
  );
}

export default Step1Component;
