import React , {useState} from 'react'
import Dialog from './Dialog'
import { StepDialogWrap} from './css'

import step1 from '@/static/images/presale/guide/step1@2x.png'
import step2 from '@/static/images/presale/guide/step2@2x.png'
import step3 from '@/static/images/presale/guide/step3@2x.png'
import step4 from '@/static/images/presale/guide/step4@2x.png'
import step5 from '@/static/images/presale/guide/step5@2x.png'
import step6 from '@/static/images/presale/guide/step6@2x.png'


function StepDialog(params) {
    const {open , dialogClose} = params;
    
    const handleClose = () => {
        dialogClose();
    }

    return (
        
        <Dialog
            open = { open }
            dialogClose = {handleClose}
            maxWidth = "md"
        >
            <StepDialogWrap>
                <div className="stepItem">
                    <p><span>1</span>Find the Dmail NFT Domain Account of your choice</p>
                    <img src={step1}></img>
                </div>
                <div className="stepItem">
                    <p><span>2</span>Proceed the payment </p>
                    <img src={step2}></img>
                </div>
                <div className="stepItem">
                    <p><span>3</span>Claim your NFT</p>
                    <img src={step3}></img>
                </div>
                <div className="stepItem">
                    <p><span>4</span>Enter Principal ID</p>
                    <img src={step4}></img>
                </div>
                <div className="stepItem">
                    <p><span>5</span>Wait for NFT release</p>
                    <img src={step5}></img>
                </div>
                <div className="stepItem">
                    <p><span>6</span>Login to bind the account with Dmail</p>
                    <img src={step6}></img>
                </div>

            </StepDialogWrap>
        </Dialog>
    )
}

export default StepDialog
