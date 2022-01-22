import styled  from 'styled-components';
import successImg from '@/static/images/ambassador/success@2x.png'
import backImg from '@/static/images/ambassador/arrow-left@2x.png'
import searchIcon from '@/static/images/presale/search@2x.png'
import lockIcon from '@/static/images/presale/lock@x2.png'
import expiredIcon from '@/static/images/presale/expired@2x.png'


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
    margin: 0 32px 18px;
    height: calc(100vh - 67px - 95px - 18px);
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
        box-sizing: border-box;
    }
`

const Left = styled.div`
    .activityItem{
        width: 326px;
        height: 257px;
        margin: 23px auto 0;
        cursor: pointer;
        position: relative;
        background: #333335;
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
        .cover{
            width: 326px;
            height: auto;
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
    }
    .activityItem:last-child{
        margin-bottom: 24px;
    }
    .activityItem.active{
        width: 320px;
        box-shadow: 0px 8px 29px 0px rgba(0, 5, 58, 0.05);
        border: 3px solid #FF6633;
        .cover{
            width: 320px;
        }
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

    .statusFlag{
        width: 80px;
        height: 80px;
        float: left;
        position: relative;
        overflow: hidden;
        border-radius: 6px;
        margin-left: -68px;
        margin-top: -1px;
        .triangle{
            position: absolute;
            top: -60px;
            left: -60px;
            transform:rotate(-45deg);
            font-size: 0;
            width:0;height: 0;
            line-height: 0;
            border-width: 58px;
            border-style: solid;
            border-color: transparent transparent #6236FF transparent; 
        }
        img{
            position: absolute;
            width: 24px;
            height: 24px;
            top: 12px;
            left: 12px;
            z-index: 10;
        }
    }

    &.coming{
        .statusFlag{
            .triangle{
                border-color: transparent transparent  #FF9800 transparent; 
            }
            img{
                width: 16px;
                height: 16px;
                top: 16px;
                left: 16px;
            }
        }
    }

    &.closed{
        .statusFlag{
            .triangle{
                border-color: transparent transparent  #969696 transparent; 
            }
            img{
                width: 16px;
                height: 16px;
                top: 16px;
                left: 16px;
            }
        }
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
        height: 60px;
        margin-top: 49px;
        position: relative;
        .inputWrap{
            height: 60px;
            width: 100%;
            background: #343435;
            box-shadow: 0px 8px 29px 0px rgba(0, 5, 58, 0.05);
            border-radius: 8px;
            border: 1px solid #979797;
            box-sizing: border-box;
            padding: 6px;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            input{
                height: 48px;
                width: calc(100% - 16px - 46px - 110px - 40px);
                padding-left: 5px;
                border: none;
                outline: none;
                background: none;
                display: inline-block;
                font-size: 16px;
                font-family: Roboto-Regular, Roboto;
                font-weight: 400;
                color: #fff;
                line-height: 48px;
            }
            span{
                height: 46px;
                width: 46px;
                margin-left: 16px;
                background-image: url('${searchIcon}');
                background-size: 24px 24px;
                background-repeat: no-repeat;
                background-position: center;
                display: inline-block;
            }
            .searchBtn{
                width: 110px;
                height: 48px;
                display: inline-block;
                text-align: center;
                vertical-argin: middle;
                background: #FF6633;
                border-radius: 3px;
                font-size: 14px;
                font-family: Roboto-Regular, Roboto;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 48px;
                border: none;
                cursor: pointer;
            }
        }
        .errorTip{
            position: absolute;
            top: 70px;
            left: 0;
            p{
                font-size: 12px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #E02020;
                line-height: 17px;
                padding-left: 25px;
                span{
                    height: 16px;
                    width: 16px;
                    display: inline-block;
                    vertical-align: top;
                    margin-right: 10px;
                    background-image: url('${expiredIcon}');
                    background-size: 16px 16px;
                    background-repeat: no-repeat;
                    background-position: center center;
                }
            }
        }
        .successResult{
            position: absolute;
            top: 70px;
            left: 0;
            height: 72px;
            width: 100%;
            .arrow{
                position: absolute;
                top: -20px;
                left: 90px;
                width:0;
                height: 0;
                display: block;
                line-height: 0;
                border-width: 10px;
                border-style: solid;
                border-color: transparent transparent #FFF transparent;
            }
            .pannel{
                width: 100%;
                height: 60px;
                line-height: 60px;
                background: #FFFFFF;
                border-radius: 8px;
                box-shadow: 0px 16px 30px 0px rgba(0, 0, 0, 0.1);
                p{
                    padding-left: 60px;
                    font-size: 16px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: bold;
                    color: #000000;
                    img{
                        width: 14px;
                        height: 14px;
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 8px;
                    }
                    span{
                        color: #FF6633;
                    }
                    .lockBtn{
                        float: right;
                        height: 48px;
                        width: 130px;
                        text-align: center;
                        line-height: 48px;
                        display: inline-block;
                        background: #7ED321;
                        color: #fff;
                        box-shadow: 0px 8px 29px 0px rgba(0, 5, 58, 0.05);
                        border-radius: 3px;
                        margin: 6px;
                        cursor: pointer;
                    }
                }
                
            }
        }
    }
    .formWrap.disabled{
        
        .inputWrap{
            input{
                color: #8E8E8F;
            }
            span{
                opacity: 0.3;
            }
            .searchBtn{
                width: 149px;
                padding-left: 16px; 
                opacity: 1;
                background-image: url('${lockIcon}');
                background-size: 16px 16px;
                background-repeat: no-repeat;
                background-position: 36px center;
                background-color: #969696;
                color: #FFFFFF;
                font-weight: bold;
                box-sizing: border-box;
                cursor: not-allowed;
            }
        }
    }
    .formWrap.notStarted{
        .inputWrap{
            input{
                color: #8E8E8F;
            }
            span{
            }
            .searchBtn{
                width: 149px;
                background: #FF9800;
                cursor: not-allowed;
                font-weight: bold;
            }
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
                    cursor: pointer;
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


const ConfirmPannel = styled.div`
    height: calc(100vh - 67px - 95px - 38px - 48px);
    border-radius: 6px;
    background: #252527;
    border-radius: 6px;
    padding: 25px 32px;
    box-sizing: border-box;
    .backBtn{
        cursor: pointer;
       img{
           width: 24px;
           height: 24px;
           vertical-align: middle;
           margin-right: 8px;
       } 
       span{
            font-size: 20px;
            font-family: Roboto-Medium, Roboto;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 24px;
            height: 24px;
            display: inline-block;
            vertical-align: middle;
        }
    }

    .content{
        box-sizing: border-box;
        padding: 80px 0 0 104px;
        .domainImg{
            width: 250px;
            height: 398px;
            background: #1D1D1F;
            margin-right: 32px;
            float: left;
        }
        .orderDetail{
            margin-left: 282px;
            h3{
                font-size: 48px;
                font-family: Roboto-Medium, Roboto;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 60px;
            }
            .tip{
                font-size: 14px;
                font-family: Roboto-Regular, Roboto;
                font-weight: 400;
                color: #FF6633;
                line-height: 24px;
                margin: 8px 0 6px 0;
            }
            .info{
                .item{
                    width: 100%;
                    margin-top: 19px;
                    .label{
                        width: 200px;
                        display: inline-block;
                        vertical-align: top;
                        font-size: 16px;
                        font-family: Roboto-Regular, Roboto;
                        font-weight: 400;
                        color: rgba(255,255,255, .5);
                        line-height: 24px;
                    }
                    .value{
                        font-size: 16px;
                        font-family: Roboto-Regular, Roboto;
                        font-weight: 400;
                        color: #FFFFFF;
                        line-height: 24px;
                        padding-left: 30px;
                    }
                    .valueWrap{
                        display: inline-block;
                        padding-left: 30px;
                        .value{
                            padding-left: 0px;
                            span{
                                font-size: 24px;
                                color: #FF6633;
                                line-height: 32px;
                                margin-right: 24px;
                            }
                            span.small{
                                font-size: 14px; 
                            }
                            s{

                            }
                            font-size: 14px;
                            font-family: Roboto-Regular, Roboto;
                            font-weight: bold;
                            color: #FFFFFF;
                            line-height: 32px;
                        }
                    }
                }
                .multiline{
                    .label{
                        padding-top: 4px;
                    }
                }
                .radios{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    .radio{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 50px;
                        cursor: pointer;
                        .raInput{
                            width: 14px;
                            height: 14px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 14px;
                            border: 2px solid #9B9B9B;
                            margin-right: 10px;
                            span{
                                width: 8px;
                                height: 8px;
                                border-radius: 8px;
                                background-color: none;
                                display: inline-block;
                                vertical-align: middle;
                            }
                        }
                        img{
                            width: 12px;
                            height: 12px;
                            display: inline-block;
                            margin-right: 10px;
                        }
                        .raLabel{
                            font-size: 16px;
                            font-family: Roboto-Regular, Roboto;
                            font-weight: bold;
                            color: #9B9B9B;
                            line-height: 24px;
                        }
                    }
                    .radio.checked{
                        .raInput{
                            border: 2px solid #FF6633;
                            span{
                                background-color: #FF6633;
                            }
                        }
                        .raLabel{
                            color: #fff;
                        }
                    }
                }
                .btnWrap{
                    padding-top: 40px;
                    .confirmBtn{
                        width: 180px;
                        height: 48px;
                        display: inline-block;
                        background: #FF6633;
                        box-shadow: 0px 8px 29px 0px rgba(0, 5, 58, 0.05);
                        border-radius: 3px;
                        font-size: 16px;
                        font-family: Roboto-Regular, Roboto;
                        font-weight: bold;
                        color: #FFFFFF;
                        line-height: 48px;
                        text-align: center;
                        margin-right: 22px;
                        cursor: pointer;
                    }
                    .countDown{
                        font-size: 16px;
                        font-family: Roboto-Regular, Roboto;
                        font-weight: bold;
                        color: #FF6633;
                        line-height: 48px;
                    }
                }
                .notice{
                    font-size: 14px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #9B9B9B;
                    line-height: 16px;
                    margin-top: 12px;
                }
            }
        }
    }
    
`
const WalletWrap = styled.div`
    .walletItem{
        width: 100%;
        height: 72px;
        background: #F3F3F3;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        cursor: pointer;
        span{
            display: inline-block;
            font-size: 16px;
            font-family: Roboto-Medium, Roboto;
            font-weight: bold;
            color: #1D1D1F;
            line-height: 72px;
        }
        .walletLogo{
            width: 35px;
            height: auto;
            display: flex;
            align-items: center;
            img{
                width: 35px;
                height: 33px;
                display: inline-block;
            }
        }
    }
    .walletItem:nth-child(2){
        margin-top: 16px;
        img{
            width: 28px;
            height: 40px;
            display: inline-block;
        }
    }
`


const StepDialogWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: top;
    justify-content: space-around;
    .stepItem{
        width: 45%;
        box-sizing: border-box;
        // border: 1px solid #333;
        font-size: 0;
        p{
            font-size: 14px;
            font-family: Roboto-Medium, Roboto;
            font-weight: bold;
            color: #1D1D1F;
            line-height: 22px;
            margin-bottom: 8px;
            span{
                width: 22px;
                height: 22px;
                border-radius: 22px;
                display: inline-block;
                border: 2px solid #FF6633;
                font-size: 14px;
                font-family: Roboto-Regular, Roboto;
                font-weight: bold;
                color: #FF6633;
                line-height: 22px;
                text-align: center;
                margin-right: 12px;
            }
        }
        img{
            width: 100%;
            height: auto;
        }
    }
`

export {
    OperateBtn,
    ContentBox,
    Left,
    Mainpannel,
    ConfirmPannel,
    WalletWrap,
    StepDialogWrap
}