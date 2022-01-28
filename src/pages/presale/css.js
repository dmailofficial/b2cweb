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
    padding: 14px 0;
    .connectBtn, .ownBtn{
        width: 180px;
        height: 48px;
        display: inline-block;
        margin-left: 24px;
        line-height: 48px;
        box-shadow: 0px 8px 29px 0px rgba(0, 5, 58, 0.05);
        border-radius: 3px;
        font-size: 14px;
        font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
        height: calc(100vh - 67px - 95px - 19px);
        background: #252527;
        border-radius: 6px 0px 0px 6px;
        overflow-y: scroll;
        overflow: -moz-scrollbars-none;
        -ms-overflow-style: none;
    }
    .leftWrap::-webkit-scrollbar { width: 0 !important }
    .main{
        margin-left: 374px;
        height: calc(100vh - 67px - 95px - 18px);
        padding: 24px 24px 0 24px;
        box-sizing: border-box;
        overflow-y: scroll;
        overflow: -moz-scrollbars-none;
        -ms-overflow-style: none;
    }
    .main::-webkit-scrollbar { width: 0 !important }
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
            font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
            width: 100%;
            h3{
                font-size: 16px;
                font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
                    font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
                    font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
    min-height: calc(100vh - 67px - 95px - 38px - 28px);
    border-radius: 6px;
    background: #252527;
    border-radius: 6px;
    padding: 0 67px;
    position: relative;

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

    a {
        color: #4C72FF;
    }

    .count-down {
        position: absolute;
        top: 30px;
        right: 30px;
        width: 150px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #FF9800;
        border-radius: 3px;
        font-size: 16px;
        font-family: Roboto-Bold,Roboto;
        font-weight: bold;
        color: #FFFFFF;
        border: none;
        cursor: pointer;

        i {
            width: 16px;
            height: 16px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAADYUlEQVRYCbWXzUtUURiHHdPUxFqYlmmJLVoF1ULLReWmjOiLok1/QbRxU5uIylUSmBhaLVq2DAyz2iQWaZIQRKtaKJkWFJWVmH1Pz88573DGuXPnitMLz7znvF/n3I8559xYXkSJx+MlhO6AZmiElVAOsk/Ca3gBt6E/Fov9Qi9eGLgS2mEGospnAq9CVbYZxMICKHAavyj14r7THoJx+Ag/oAZqoQH82Bn67dDGHZlFRxcGrwZf+ujsAd3yQMFXDAfgJvgyQifr3UgpSkI+dMEN2JrijNAhpwEGwWSCxqYIqbkLYUBdxCWbAfotBN8JHLp9uuKLuZtCohI1T4DJEI3CtDEwnrMI9Nq0gEUaqNnh1b+QUg5HHcy6gOEUZ4461C6AR24M/aVXJUvTuewcf9Bbko4sDWJ3QSuUZQmdcxNXDyYdZizF8sVZb0UpZDHkfHB5x82WTRPf63K+oUvySdDSutwlXslWYJ5fS7HEdKIX/tvt3FpPdmoCTc6gVWvAtf+nekhxraaSZk1Ay6dkOGcbSKJe4C9jaPBB59ymCVS7zpjTkRTPT7kmcWtE1NpHJBUqUjnXzMt753RUtdcLHPXaUZqfXFC5JvDTdQqiZCqGq9+Auu7iv6AX+u7YmMWawLQrtMLpUMXgdQT0gy0kLTzX96FJ6U5t35JJXY3tWHo7Q4XYGhgDk1OhCRmcJA+4Avc1gU7X+YpO3yRcEXyr4aWLlTqboX6ombwSsNNVlyZwGEz2B2XjjMEzC0K3BcVFsZF7yKuzWxMogiln7Akqgq8K/rqYzqCYqDZq9Lg6GjNxx2noHGBSH1QM5xE4BrEgfxQbuY1g0pXMwbIG7Lk8ob006cxRg5pL4DFIpsH+RYkRMJyXx8m1HI2bLENd2/I1RPoLjFEzvCOvk5PJ7EU2qNdiRdG6C0WBJXGUwXMw0cdF5BVyflFyC8F/v17Rt6V/fniiT0AtvAETnem3B0dntpKjF27YiqB1LN+YOcPzEFgBveBLH52j4H/5eFlze4ROV/vgHvjygE7glYf+pUjSUUufVsu8kbSfP4VxmAA9T52I1kEj+P+gWfrKb2W/+I1euDAJfaKdgVGIKlpkusHOGhkHDr0DfhbFFNsEB2EzrAfbQado6xN9BHTauetOPjTD5R/miq7DUqJhiwAAAABJRU5ErkJggg==);
            background-size: 100%;
            margin-right: 15px;
        }

        span {
            min-width: 65px;
        }
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
            font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
            font-weight: 500;
            color: #FFFFFF;
            line-height: 32px;
            margin: 24px 0 4px;
        }
        p{
            font-size: 14px;
            font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
            position: relative;

            .email-suffix {
                position: absolute;
                left: 82px;
                bottom: 100%;
                display: none;
                font-size: 16px;
                color: #8E8E8F;

                &.show {
                    display: flex;
                }

                // same with the input
                p {
                    visibility: hidden;
                    font-family: Roboto-Regular,Roboto;
                    font-weight: 400;
                    margin-right: 12px;
                }

                .email-suffix-text {
                    line-height: 60px;
                    position: relative;
                    top: 60px;
                }
            }

            input{
                height: 48px;
                width: calc(100% - 16px - 46px - 110px - 40px);
                padding-left: 5px;
                border: none;
                outline: none;
                background: none;
                display: inline-block;
                font-size: 16px;
                font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
                font-size: 16px;
                font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                font-weight: 400;
                color: #FFFFFF;
                line-height: 48px;
                border: none;
                cursor: pointer;
            }
            .searchBtn:hover{
                background: #fa7a4f;
            }
            .searchBtn:active{
                background: #913719;
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
                    font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
                background-position: 26px center;
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
                font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                font-weight: 500;
                color: #FFFFFF;
                line-height: 24px;
                padding: 0 0 8px 14px;
                display: flex;
                align-item: top;
                justify-content: space-between;
                span{
                    font-size: 14px;
                    font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: 400;
                    color: #4C72FF;
                    line-height: 24px;
                    cursor: pointer;
                }
            }
            p{
                font-size: 14px;
                font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
            p.active{
                color: #fff;
                img{
                    width: 14px;
                    height: 14px; 
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 10px;
                }
            }
        }
    }
    .con_footer{
        margin-top: 16px;
        font-size: 14px;
        font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
        font-weight: 500;
        color: #9F9FA0;
        line-height: 24px;
        text-align: center;
        a{
           color: #4C72FF;
        }
    }
`


const ConfirmPannel = styled.div`
    min-height: calc(100vh - 67px - 95px - 38px - 20px);
    border-radius: 6px;
    background: #252527;
    border-radius: 6px;
    padding: 25px 32px;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { width: 0 !important }
    .backBtn{
       img{
           width: 24px;
           height: 24px;
           vertical-align: middle;
           margin-right: 8px;
       } 
       span{
            font-size: 20px;
            font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
            img{
                width: 100%;
            }
        }
        .orderDetail{
            margin-left: 282px;
            h3{
                font-size: 48px;
                font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                font-weight: 500;
                color: #FFFFFF;
                line-height: 60px;
            }
            .tip{
                font-size: 14px;
                font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
                        font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                        font-weight: 400;
                        color: rgba(255,255,255, .5);
                        line-height: 24px;
                    }
                    .value{
                        font-size: 16px;
                        font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
                            font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
                            width: 20px;
                            height: 20px;
                            display: inline-block;
                            margin-right: 10px;
                        }
                        img.icp{
                            width: 22px;
                            height: 11px;
                        }
                        .raLabel{
                            font-size: 16px;
                            font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
                    .radio.disabled{
                        cursor: not-allowed;
                    }
                }
                .btnWrap{
                    display: flex;
                    align-items: center;
                    padding-top: 40px;
                    
                    .confirmBtn{
                        width: 180px;
                        height: 48px;
                        display: inline-block;
                        background: #FF6633;
                        box-shadow: 0px 8px 29px 0px rgba(0, 5, 58, 0.05);
                        border-radius: 3px;
                        font-size: 16px;
                        font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                        font-weight: bold;
                        color: #FFFFFF;
                        line-height: 48px;
                        text-align: center;
                        margin-right: 22px;
                        cursor: pointer;
                    }
                    .confirmBtn:hover{
                        background: #fa7a4f;
                    }
                    .confirmBtn:active{
                        background: #913719;
                    }

                    .countDown {
                        font-size: 16px;
                        font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                        font-weight: bold;
                        color: #FF6633;
                        line-height: 48px;
                        display: flex;
                        align-items: center;

                        i {
                            width: 16px;
                            height: 16px;
                            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAAE+ElEQVRYCbVXXUxcVRCeOaUUtn8mtBValGBMn9RogG2BVNHEokbTJqa+NGlTH7oEilht0figFBNj02K1rQiNPvRBTfRNWjQmpJKWYvmJMfGhiVGCriAmWpouZVm6d/zOuffuXnAve2nxJnvPnDnfzJk5Z2buLFPARw5W5tN08lGyrFpiqSShdcRUQML5RBIF/RtUXSVSXSRWD58Zng2imrOBpK5qA0niNRKpAzaUDe+sXyfmzyHTCkPGF5JZ0ADZX/4GvMOPVqaVcBze9uEERjH+TcQzRFYx5iXAhOdiaQqYNgrlvssn+qfTOtKUrwFSV7mJrEQ0DaXzxOo0hXJ6/ZRJS00eTcS2U5L2wPDn07I8iPmOTKfhb0BLi6LxcycheBe8OwXhK2mF2SmpKw9D7j1cQ7WNZsSJepY7B370Svsa4AXdLi3aibFzx+HEQUeHjocy70mkDDDHNx4DmG5y51Dz7W6aSU4iFfXIjA/tNb4Mg2pghMkSlRIYi+lIb8DvsNRX3JPiLwHBnYPtyIr3bVVShbHVVWsMkAPhUjBeN0ym77l98HcXsGRj0arD0HXJ0feSNG25W9P2CcxauCPJQ8pYsLTeAWUdJFL+pETKjkhz9epsYG757hblqFccXIjiSeOwkkPbdY7vtRe4izuGfsimzLOOYkNv0vX4bg/Pl8TJDsLBLgcQ0dVV0Y1rtbj3NYYp0u4rnWlBpMCwme0xE2Y+j5UdjCL5dPPWY7gCqXEwUxgvzMcv+bww1IvqGbf1Sq2C97p84uF+NzXs+f/zRizozZ1glK04Ad5ktmL6dTFbmiLjCliIhMU8jO+IfoTW6yvYYE9kwoxBX392P5OCMv+SooMR/ziwAoXUS5gJU04wWZjcEN6MvuBjB49P7/LFxY44exLnIQbohqNobRADTNGatXpghikkkGnijst/BZFNY6TYpiWKE2Dn7vmBNCAzJY1biilhNncUcDMC92xm9AJc5hKzyjyqs2DYTIQekf1ly/3E8H0opJmk9lyXbcSueovPDB3zw/vxTWuXyjy6ihNQyEv9yGrQT9n03LeIMCWtb4DZbFZYHcUHpnUuKuBsKlELpN3aiXylKHfdeTAmjbhYL2ZUEykvRKw85KydxOamjmfEZmfudSB6zwuKT309gzj41GHuxFFXzNdhGgjFu8DfTZ1DL89fDzqXSLgS2J0Gjz114WM9kQPVGykR/xlkCMYMUFHpNm750k5Pg77zl3yxaxn1jFxEzFUi9WOUl3M/f3BlAoUI8XS6b4wU2wGlA2RsBL3gEj89IyfM5katOqY316QxwPCeKH0b3ncbmiSCNuqQTd/5G7qasHmj0cTcj7g76mo1V+BOTGMxGe/D/EEH3EFFqxpNM+GCFjGatGbWnjc4YqOkVoS9hWuOARokDVUlNDuDxpE22kLo6ZepV/mjgYv2PNjbDrgk2nLa6uiJ4ryfRsPzk1fDfwzQi9K4bT0lpj+B5c95wDpdz9Kagm4+/u2Uh58iTXcVm3wcHbBubj01hXtJ5b7g9dwVymiAu4h+rw4etGFuFw6zYP6aDWMD/DVTaF5lBTC6I7oXtE6zXAPTL2b8HeM2Klp5xO8aFzRA6zB/0SSxD4r2YdP7NC/AM4lU+4w49x3u6P9jIXxWA1xhU44j5TVQvAN/yR/GqI2xv6Ai1+BtFCcxgPESPO52Oh9X3Hf8F8IVubkty4MYAAAAAElFTkSuQmCC);
                            background-size: 100%;
                            margin-right: 12px;
                        }
                    }
                }
                .notice{
                    font-size: 14px;
                    font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
        margin-bottom: 16px;
        cursor: pointer;
        span{
            display: inline-block;
            font-size: 16px;
            font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
            font-weight: bold;
            color: #1D1D1F;
            line-height: 72px;
        }
        .loading{
            height: 22px !important;
            width: 22px !important;
            animation: spin 1s steps(8) infinite;
        }
        @keyframes spin {
            from {transform: rotate(0deg);}
              to {transform: rotate(360deg);}
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
            img.plug{
                width: 28px;
                height: 40px;
                display: inline-block;
            }
            img.tronlink{
                width: 35px;
                height: 35px;
                display: inline-block;
            }
        }
    }
    .walletItem:last-child{
        margin-bottom: 0px;
        
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
            font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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
                font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
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

const ToastWrap = styled.div`
    
        display: flex;
        flex-wrap: nowrap;
        align-items: top;
        justify-content: start;
        img{
            width: 18px;
            height: 18px;
            vertical-align: middle;
            margin-right: 15px;
        }
        img.animate{
            animation: spin 1s steps(8) infinite;
        }
        @keyframes spin {
            from {transform: rotate(0deg);}
            to {transform: rotate(360deg);}
        }
        p{
            font-size: 16px;
            font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
            font-weight: bold;
            color: #1D1D1F;
            line-height: 18px;
            word-break: break-all;
            .tipimg{
                width: 24px;
                height: 24px;
                margin-right: 0;
                margin-left: 10px;
            }
        }
`

const ConnectWalletBtn = styled.div`

`

export {
    OperateBtn,
    ContentBox,
    Left,
    Mainpannel,
    ConfirmPannel,
    WalletWrap,
    StepDialogWrap,
    ToastWrap,
    ConnectWalletBtn
}