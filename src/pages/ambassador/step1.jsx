import {Step1} from './css'
import p1 from '@/static/images/ambassador/about@2x.png'
import p2 from '@/static/images/ambassador/finance@2x.png'
import p3 from '@/static/images/ambassador/joinUS@2x.png'
import icon1 from '@/static/images/ambassador/about_icon@2x.png'
import icon2 from '@/static/images/ambassador/financ_icon@2x.png'
import icon3 from '@/static/images/ambassador/join_icon@2x.png'


const Step1Component = (param) => {
  

  return (
    <Step1>
      <div className="banner">
        <h1>Dmail Ambassador Program</h1>
        <p>
          By applying for this program, we will add you to the waiting list as Ambassador Candidates.<br></br>
          This is a volunteer program for true fans who are passionate about what we do.
        </p>
        <span className="applyBtn" onClick={()=>{param.nextStep("next")}}>Apply Now</span>
      </div>
      <div className="culture">
        {/* <div className="cheader">
            <span>Dmail</span>
            <h2>Culture & Mission</h2>
        </div> */}
        <div className="citem">
            <div className="img h5"><img src={p1}></img></div>
            <div className="desc">
              {/* <span>Dmail</span> */}
              <h3><img src={icon1}></img>About Dmail</h3>
              <p>Dmail Network is the first Decentralized Mailbox based on Dfinity. Every Dmail Account is an NFT, DID to the blockchain world, and a gateway to Web 3.0.</p>
            </div>
            <div className="img pc"><img src={p1}></img></div>
        </div>
        <div className="citem">
          <div className="img"><img src={p2}></img></div>
          <div className="desc">
              {/* <span>Dmail</span> */}
              <h3><img src={icon2}></img>Financing</h3>
              <p>Dmail has raised a seed round of funding at 10 million USD valuation. Funding investments is from : @Amino_capital @CapitalHashkey @DraperDragon and 10+ global leading VCs. 10,000 users have participated in the first Round of Dmail testnet and NFT domain accounts presale. The 2nd round will be hosted soon.</p>
          </div>
        </div>
        <div className="citem">
            <div className="img h5"><img src={p3}></img></div>
            <div className="desc">
              {/* <span>Dmail</span> */}
              <h3><img src={icon3}></img>Join us</h3>
              <p>Dmail is recruiting global ambassadors to promote decentralized mailbox to replace traditional centralized mailboxes. If you are also looking to be a part of the most influential company in the blockchain & Web 3.0 industry and contribute to the revolution that is changing the world, welcome to join us!</p>
            </div>
            <div className="img pc"><img src={p3}></img></div>
        </div>
      </div>
      <div className="criteria">
        <div className="cheader">
            <span>Dmail</span>
            <h2> Guidelines</h2>
            <p>Location: Global (Remote Online Work)<br></br>
          Selection Criteria: Passionate about blockchain and Web 3.0; Great knowledge of Dfinity.</p>
        </div>
        <div className="content">
          <div className="citem">
            <h3>Criteria</h3>
            <p><span className="icon"></span>Having a passion of Web 3.0, our vision and mission.</p>
            <p><span className="icon"></span>Very active and enraging on Discord, Telegram, and Twitter.</p>
            <p><span className="icon"></span>Experience of community engagement on social media & meetups.</p>
            <p><span className="icon"></span>Experience of working with Dfinity ecosystem.</p>
            <p><span className="icon"></span>Content creation skills.</p>
          </div>

          <div className="citem">
            <h3>Benefits</h3>
            <p><span className="icon"></span>Competitive salary and rewards incentives.</p>
            <p><span className="icon"></span>Commission from the Dmail presale in your area.</p>
            <p><span className="icon"></span>Invitations to our events as a privileged guest organizer.</p>
            <p><span className="icon"></span>Access to Dmail Network alums.</p>
            <p><span className="icon"></span>You may visit any of our offices at any time.</p>
            <p><span className="icon"></span>Your feedback has a chance to be written to the Dmail Roadmap.</p>
            <p><span className="icon"></span>Limited edition swags.</p>
          </div>

          <div className="citem">
            <h3>Evaluation & Priority</h3>
            <p><span className="icon"></span>We will observe your engagement on Discord, or Telegram.</p>
            <p><span className="icon"></span>We will evaluate your attitude towards people.</p>
            <p><span className="icon"></span>We value the size of your community that you can reach.</p>
            <p><span className="icon"></span>We value the quality of your future referrals.</p>
          </div>
        </div>
      </div>
    </Step1>
  );
}

export default Step1Component;
