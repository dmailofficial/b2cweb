import React from 'react';
import styled  from 'styled-components';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import closeIcon from '@/static/images/presale/close@3x.png'

const DmailDialog = styled(Dialog)`
    
    .MuiDialog-container{
        .MuiDialogTitle-root{
            height: 24px;
            lineheight: 24px;
            img{
                width: 24px;
                height: 24px;
                float: right;
                vercital-align: middle;
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
        }
    }
`

class DDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        console.log("this.props.children:", this.props.children)
    }

    handleClose = () => {
        this.props.dialogClose();
    }

    render() {
        const {open, title, maxWidth, noHeader, operateBtton} = this.props

        return (
                <DmailDialog
                    open = {open}
                    className="DmailDialog"
                    fullWidth={true}
                    maxWidth={maxWidth || "sm"}
                >
                    {!noHeader ?
                        <DialogTitle>
                            <span>{title}</span>
                            <img src={closeIcon} onClick={this.handleClose}></img>
                        </DialogTitle>: null
                    }
                    <DialogContent>
                        {this.props.children}
                    </DialogContent>
                    {!noHeader ?
                        <DialogActions>

                        </DialogActions>: null
                    }
                </DmailDialog>
        );
    }
}


export default DDialog;
