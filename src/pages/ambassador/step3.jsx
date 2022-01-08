import {Step3} from './css'

const Step3Component = (param) => {

  return (
    <Step3>
      <div className="content">
        <h2>Thank you! Your response has been submitted.</h2>
        <p>Due to the high demand, we will endeavor to evaluate your application as soon as possible.</p>
        <p className="mt20">Best Regards,</p>
        <p><b>Dmail Network Team</b></p>
        <div className="btnWrap"><span className="backBtn" onClick={()=>{param.preStep("pre")}}>Back</span></div>
      </div>
      

    </Step3>
  );
}

export default Step3Component;
