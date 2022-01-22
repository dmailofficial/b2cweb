import React , {useState} from 'react'
import Dialog from './Dialog'
import { ToastWrap} from './css'

import warnIcon from '@/static/images/presale/expired@2x.png'
import successIcon from '@/static/images/presale/success@3x.png'

function Toast(params) {
    const {open , type, txt} = params;

    return (
        <Dialog
            open = {open}
            noHeader = {true}
        >
            <ToastWrap>
                <img src = {
                    type == "warn" ? warnIcon : successIcon
                }></img>
                <p>{txt}</p>
            </ToastWrap>
        </Dialog>
    )
}

export default Toast
