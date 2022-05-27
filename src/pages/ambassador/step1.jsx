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
          After applying for this program, you'll be added to the waiting list of Ambassador Candidates.<br></br>
          This is a volunteer program for true fans who are passionate about what we do.
        </p>
        <span className="applyBtn" onClick={()=>{param.nextStep("next")}}>Apply Now</span>
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
            <p><span className="icon"></span>Very active and engaging on Discord, Telegram, and Twitter.</p>
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
