import Header from '@/components/header'
import p1 from '@/static/images/p1.png'
import p2 from '@/static/images/p2.png'
import p3 from '@/static/images/p3.png'
import p4 from '@/static/images/p4.png'
import p5 from '@/static/images/p5.png'
import banner from '@/static/images/banner.png'
import mBanner from '@/static/images/m-banner.png'
import chunk1 from '@/static/images/chunk1.png'
import mChunk1 from '@/static/images/m-chunk1.png'
import chunk2 from '@/static/images/chunk2_2.png'

const Index = () => {
  const onSignClick = () => {
    setTimeout(() => {
      alert('Thanks! Email submitted.')
    }, 200)
  }

  return (
    <>
      <Header />
      <div className="banner">
        <img src={banner} alt="" />
        <img className="hide" src={mBanner} alt="" />
        <h2 className="hide">Use Web3 &nbsp; Not Gmail</h2>
        <div className="desc hide">
          Dmail makes it safe&private for you to communicate storage and transfer tokens&NFTs on Dfinity
        </div>
        <div className="note hide">Mail Interaction，Transfer Tokens&NFTs, DApp API，Airdrop&IMO，NFTs Market</div>
        <a rel="noopener noreferrer"  href="https://pyr3m-ciaaa-aaaai-qasua-cai.ic0.app/" className="demo"></a>
        <a rel="noopener noreferrer"  href="https://dmail.ai/Dmail_litepaper.pdf" target="_blank" className="docs"></a>
        <div className="build"><span>built on</span> DFINITY</div>
      </div>
      <div className="container">
        <div className="chunk chunk1">
          <h2 className="hide">The most convenient API tool you can access to Dfinity</h2>
          <img src={chunk1} alt="" />
          <img className="chunk1_img hide" src={mChunk1} alt="" />
          <div className="hide">
            Dmail network empowers users，developers, liquidity providers，governors，traders and DApp managers to participate
            in a financial marketplace that is open and accessible to all.
          </div>
        </div>
        <div className="chunk chunk2">
          <h2 className="hide">A suite of features powering the evolution of Dfinity ecosystem</h2>
          <img src={chunk2} alt="" />
          <ul>
            <li>
              <h3>Mailbox Communication</h3>
              <p>Ensure communication is safe and checkable</p>
            </li>
            <li>
              <h3>Enterprise Mailbox</h3>
              <p>A platform meets the various needs of work between teams</p>
            </li>
            <li>
              <h3>Tokens&NFTs Interaction</h3>
              <p>We’ve taken special care to make sure your tokens&NFTs look great</p>
            </li>
            <li>
              <h3>On-chain Storage</h3>
              <p>Store any of your data quickly and cheaply on Dfinity</p>
            </li>
            <li>
              <h3>Subscribe DApp</h3>
              <p>Open API interface allows more DApps to share traffic</p>
            </li>
            <li>
              <h3>NFTs Auction</h3>
              <p>Blind boxes with asset in each mailbox are obtained by Dutch auction</p>
            </li>
            <li>
              <h3>Friction-less Airdrop</h3>
              <p>Earn rewards by no effort required</p>
            </li>
            <li>
              <h3>Initial Mail Offering</h3>
              <p>Explore and support the launch of high-quality tokens</p>
            </li>
          </ul>
        </div>
        <div className="chunk email">
          <h2>Sign up and stay informed</h2>
          <div className="sign_up">
            <input type="text" placeholder="Your email address" />
            <a rel="noopener noreferrer"  onClick={onSignClick}>Sign up</a>
          </div>
        </div>
        <div className="chunk contact_us">
          <h2>Contact us</h2>
          <ul>
            <li>
              <a rel="noopener noreferrer"  className="img" href="https://twitter.com/dmailofficial"><img src={p1} alt="" /></a>
              <a rel="noopener noreferrer"  className="name" href="https://twitter.com/dmailofficial"><span>Twitter</span></a>
            </li>
            <li>
              <a rel="noopener noreferrer"  className="img" href="https://t.me/dmailofficial"><img src={p2} alt="" /></a>
              <a rel="noopener noreferrer"  className="name" href="https://t.me/dmailofficial"><span>Telegram</span></a>
            </li>
            <li>
              <a rel="noopener noreferrer"  className="img" href="https://medium.com/@dmail_official"><img src={p3} alt="" /></a>
              <a rel="noopener noreferrer"  className="name" href="https://medium.com/@dmail_official"><span>Medium</span></a>
            </li>
            <li>
              <a rel="noopener noreferrer"  className="img" href="https://github.com/dmailofficial"><img src={p4} alt="" /></a>
              <a rel="noopener noreferrer"  className="name" href="https://github.com/dmailofficial"><span>Github</span></a>
            </li>
            <li>
              <a rel="noopener noreferrer"  className="img" href="contact@dmail.ai"><img src={p5} alt="" /></a>
              <a rel="noopener noreferrer"  className="name" href="contact@dmail.ai"><span>Email</span></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer">
        <div className="footer_wrapper">
          <div className="left">
            <div className="logo"></div>
            <p>@Dmail Network Foundation LTD.</p>
          </div>
          <div className="right">
            <dl>
              <dt>About</dt>
              <dd>
                <p><a rel="noopener noreferrer"  href="https://pyr3m-ciaaa-aaaai-qasua-cai.ic0.app/">Demo</a></p>
                <p><a rel="noopener noreferrer"  href="https://dmail.ai/Dmail_litepaper.pdf">Litepaper</a></p>
                <p><a rel="noopener noreferrer" >Support</a></p>
                <p><a rel="noopener noreferrer" >FAQs</a></p>
              </dd>
            </dl>
            <dl>
              <dt>Procotrol</dt>
              <dd>
                <p><a rel="noopener noreferrer"  href="">Overview</a></p>
                <p><a rel="noopener noreferrer" >Mailbox</a></p>
                <p><a rel="noopener noreferrer" >NFTs</a></p>
                <p><a rel="noopener noreferrer" >DApps</a></p>
              </dd>
            </dl>
            <dl>
              <dt>Community</dt>
              <dd className="icons">
                <p><a rel="noopener noreferrer"  href="contact@dmail.ai">Email</a></p>
                <p><a rel="noopener noreferrer"  href="https://twitter.com/dmailofficial">Twitter</a></p>
                <p><a rel="noopener noreferrer"  href="https://t.me/dmailofficial">Telegram</a></p>
                <p><a rel="noopener noreferrer"  href="https://medium.com/@dmail_official">Medium</a></p>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
