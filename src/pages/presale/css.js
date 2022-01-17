import styled  from 'styled-components';
import successImg from '@/static/images/ambassador/success@2x.png'
import backImg from '@/static/images/ambassador/arrow-left@2x.png'

const mainColor = "#FF6633";
const mainGray = "#9A9A9A";

const OperateBtn = styled.div`
    text-align: right;
    margin: 0 32px;
    padding: 24px 0;
    .connectBtn, .ownBtn{
        width: 180px;
        height: 48px;
        display: inline-block;
        margin-left: 24px;
        line-height: 48px;
        box-shadow: 0px 8px 29px 0px rgba(0, 5, 58, 0.05);
        border-radius: 3px;
        font-size: 14px;
        font-family: Roboto-Regular, Roboto;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
    }
    .connectBtn{
        background: #FF6633;
        color: #FFFFFF;
    }
    .ownBtn{
        width: 90px;
        border: 2px solid #FF6633;
        color: #FF6633;
    }
`
const ContentBox = styled.div`
    margin: 0 32px 32px;
    height: calc(100vh - 67px - 95px - 38px);
    background: #1D1D1F;
    border-radius: 6px;
    border: 1px solid #979797;
    .leftWrap{
        width: 374px;
        height: calc(100vh - 67px - 95px - 38px);
        background: #252527;
        border-radius: 6px 0px 0px 6px;
    }
`

const Left = styled.div`

`


export {
    OperateBtn,
    ContentBox,
    Left
}