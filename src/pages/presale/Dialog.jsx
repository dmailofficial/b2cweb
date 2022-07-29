import React from 'react';
import styled  from 'styled-components';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import closeIcon from '@/static/images/presale/close@3x.png'
import warnIcon from '@/static/images/presale/expired@2x.png'

const DmailDialog = styled(Dialog)`
    
    .MuiDialog-container{
        .MuiDialogTitle-root{
            height: 24px;
            lineheight: 24px;
            img{
                width: 24px;
                height: 24px;
                float: right;
                cursor: pointer;
                transition: transform 0.6s ease;
                &:hover {
                    transform: rotate(180deg);
                }
            }
            span{
                display: inline-block;
                font-size: 16px;
                font-family: Roboto-Medium, Roboto;
                font-weight: 500;
                color: #1D1D1F;
                line-height: 24px;
                float: left;
                cursor: pointer;
            }
            span.warn{
                img{
                    width: 14px;
                    height: 14px; 
                    display: inline-block;
                    vertical-align: bottom;
                    margin: 4px 8px 0 0;
                    float:left;
                }
                color: #C82727;
            }
        }
        .MuiDialogActions-root{
            justify-content: center;
            .primary{
                width: 100px;
                height: 32px;
                display: inline-block;
                line-height: 32px;
                font-size: 14px;
                font-family: Roboto-Regular, Roboto;
                font-weight: bold;
                color: #FFFFFF;
                text-align: center;
                background-color: #FF6633;
                box-shadow: 0px 8px 29px 0px rgba(0, 5, 58, 0.05);
                border-radius: 3px;
                cursor: pointer;
            }
        }
    }
`

class DDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        // console.log("this.props.children:", this.props.children)
    }

    handleClose = () => {
        this.props.dialogClose();
    }

    confirmHandle = () => {
        this.props.confirmHandle();
    }

    render() {
        const {open, title, type, maxWidth, noHeader, operateBtton ,fullWidth} = this.props

        return (
                <DmailDialog
                    open = {open}
                    className="DmailDialog"
                    fullWidth={fullWidth || true}
                    maxWidth={maxWidth || "sm"}
                >
                    {!noHeader ?
                        <DialogTitle>
                            <span className={type == "warn" ? "warn" : null}>
                                {type == "warn" ? <img src={warnIcon}></img> : null}
                                {title}
                            </span>
                            <img src={closeIcon} onClick={this.handleClose}></img>
                        </DialogTitle>: null
                    }
                    <DialogContent>
                        {this.props.children}
                    </DialogContent>
                    {!noHeader ?
                        <DialogActions>
                           { operateBtton == "confirm" ? <span className="primary" onClick={this.confirmHandle}>Confirm</span> : null}
                        </DialogActions>: null
                    }
                </DmailDialog>
        );
    }
}


export default DDialog;
