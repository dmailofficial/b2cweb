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
        float: left;
        height: calc(100vh - 67px - 95px - 38px);
        background: #252527;
        border-radius: 6px 0px 0px 6px;
        overflow-y: scroll;
    }
    .leftWrap { overflow: -moz-scrollbars-none; }
    .leftWrap { -ms-overflow-style: none; }
    .leftWrap::-webkit-scrollbar { width: 0 !important }
    .main{
        margin-left: 374px;
        height: calc(100vh - 67px - 95px - 38px);
        padding: 24px;
    }
`

const Left = styled.div`
    .activityItem{
        width: 320px;
        height: 257px;
        margin: 23px auto 0;
        cursor: pointer;
        position: relative;
        background: #333335;
        border: 3px solid #333335;
        box-shadow: 0px 8px 29px 0px rgba(0, 5, 58, 0.05);
        border-radius: 6px;
        .label{
            position: absolute;
            left: 16px;
            top: 16px;
            font-size: 16px;
            font-family: Roboto-Medium, Roboto;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 24px;

        }
        .info{
            position: absolute;
            bottom: 0;
            left: 0;
            height: 112px;
            box-sizing: border-box;
            padding: 16px;
            h3{
                font-size: 16px;
                font-family: Roboto-Medium, Roboto;
                font-weight: bold;
                color: #FFFFFF;
                line-height: 24px;
            }
            .statusInfo{
                display: flex;
                align-item: center;
                justify-content: space-between;
                margin-top: 9px;
                .time{
                    font-size: 14px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #9A9A9A;
                    line-height: 24px;
                }
                .status{
                    min-width: 62px;
                    height: 24px;
                    display: inline-block;
                    padding: 0 10px;
                    font-size: 12px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 24px;
                    text-align: center;
                    border-radius: 4px;
                    background-color: #6236FF; 
                }
            }
        }
    }
    .activityItem.coming{
        .info{
            .status{
                background-color: #FF9800;
            }
        }
    }
    .activityItem.closed{
        background: #333335;
        .info{
            .status{
                background-color: #969696;
            }
        }
    }
    .activityItem:hover{
        background: rgba(255, 102, 51, 0.15);
        border: 3px solid rgba(255, 102, 51, 0);
    }
    .activityItem:last-child{
        margin-bottom: 24px;
    }
    .activityItem.active{
        width: 320px;
        box-shadow: 0px 8px 29px 0px rgba(0, 5, 58, 0.05);
        border: 3px solid #FF6633;
    }
`

const Mainpannel = styled.div`
    height: calc(100vh - 67px - 95px - 38px - 48px);
    border-radius: 6px;
    background: #252527;
    border-radius: 6px;
    padding: 0 67px;
    &.inprogress{
        box-shadow: 0px 8px 11px 0px rgba(0, 0, 0, 0.02);
        border: 1px solid #6236FF;
    }
    &.coming{
        box-shadow: 0px 8px 11px 0px rgba(0, 0, 0, 0.02);
        border: 1px solid #FF9800;
    }
    &.closed{
        box-shadow: 0px 8px 11px 0px rgba(0, 0, 0, 0.02);
        border: 1px solid #969696;
    }

    .bref{
        padding-top: 45px;
        text-align: center;
        img {
            height: 72px;
            width: auto;
        }
        h2{
            font-size: 24px;
            font-family: Roboto-Medium, Roboto;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 32px;
            margin: 24px 0 4px;
        }
        p{
            font-size: 14px;
            font-family: Roboto-Medium, Roboto;
            font-weight: 500;
            color: rgb(255,255,255, .5);
            line-height: 24px;
        }
    }

    .formWrap{
        height: 48px;
        margin-top: 49px;
        display: flex;
        align-item: top;
        justify-content: space-between;
        .inputWrap{
            flex: 8;
            height: 48px;
            background: #343435;
            box-shadow: 0px 8px 29px 0px rgba(0, 5, 58, 0.05);
            border-radius: 6px;
            padding-right: 12px;
            border: 1px solid #979797;
            display: flex;
            align-item: top;
            justify-content: space-between;
            margin-right: 24px;
            input{
                height: 46px;
                width: 100%;
                padding-left: 63px;
                border: none;
                outline: none;
                background: none;
            }
            span{
                height: 46px;
                width: 46px;
                display: inline-block;
                border: 1px solid #fff;
            }
        }
        .searchBtn{
            flex: 1;
            width: 110px;
            height: 48px;
            display: inline-block;
            text-align: center;
            background: #FF6633;
            border-radius: 3px;
            font-size: 14px;
            font-family: Roboto-Regular, Roboto;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 48px;
        }
    }

    .info{
        min-height: 209px;
        margin-top: 44px;
        display: flex;
        align-item: top;
        justify-content: space-between;
        .item{
            width: 48%;
            padding: 16px;
            display: inline-block;
            background: #1D1D1F;
            border-radius: 3px;
            box-sizing: border-box;
            .item-header{
                font-size: 16px;
                font-family: Roboto-Medium, Roboto;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 24px;
                padding: 0 0 8px 14px;
                display: flex;
                align-item: top;
                justify-content: space-between;
                span{
                    font-size: 14px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #4C72FF;
                    line-height: 24px;
                }
            }
            p{
                font-size: 14px;
                font-family: Roboto-Regular, Roboto;
                font-weight: 400;
                color: rgba(255,255,255, .5);
                line-height: 24px;
                span{
                    width: 6px;
                    height: 6px;
                    border-radius: 6px;
                    display: inline-block;
                    vertical-align: middle;
                    border: 1px solid #FF6633;
                    margin-right: 8px;
                }
            }
        }
    }
    .con_footer{
        margin-top: 16px;
        font-size: 14px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #9F9FA0;
        line-height: 24px;
        text-align: center;
    }
`


export {
    OperateBtn,
    ContentBox,
    Left,
    Mainpannel
}