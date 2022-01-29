import React , {useState} from 'react'
import styled  from 'styled-components';
// import Dialog from './Dialog'
import Dialog from '@mui/material/Dialog';
import { ToastWrap} from './css'

import warnIcon from '@/static/images/presale/expired@2x.png'
import successIcon from '@/static/images/presale/success@3x.png'
import payingIcon from '@/static/images/presale/paying@3x.png'
import faildIcon from '@/static/images/presale/faild@3x.png'

const icons = {
    warn: warnIcon,
    success: successIcon,
    faild: faildIcon,
    loading: payingIcon
}

const DmailDialog = styled(Dialog)`
    .MuiDialog-paper{
        width: auto;
        line-height: 24px;
        padding: 20px;
    }

`


function Toast(params) {
    const {open , type, txt, tipimg} = params;

    return (
        
            <DmailDialog
                open = {open}
            >
                <ToastWrap>
                    <img 
                        src = { icons[type] || warnIcon} 
                        className = {type == "loading" ? "animate" : ""}
                    ></img>
                    <p>
                        {txt}
                    </p>
                    {tipimg ? <img className="tipimg" src = {tipimg}></img>:null}
                </ToastWrap>
            </DmailDialog>
        
    )
}

export default Toast
