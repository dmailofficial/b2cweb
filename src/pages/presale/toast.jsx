import React , {useState} from 'react'
import Dialog from './Dialog'
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

function Toast(params) {
    const {open , type, txt} = params;

    

    return (
        <Dialog
            open = {open}
            noHeader = {true}
        >
            <ToastWrap>
                
                <img 
                    src = { icons[type] || warnIcon} 
                    className = {type == "loading" ? "animate" : ""}
                ></img>
                <p>{txt}</p>
            </ToastWrap>
        </Dialog>
    )
}

export default Toast
