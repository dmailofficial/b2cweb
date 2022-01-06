import styled, { createGlobalStyle, useTheme } from 'styled-components';
import successImg from '@/static/images/ambassador/success@2x.png'

const Step1 = styled.div`
    position: relative;
    z-index: 100;
    background: #1D1D1F;
    color: #fff;
    .cheader {
        padding-top: 120px;
        span {
            display: block;
            width: 100%;
            height: 19px;
            font-size: 16px;
            font-family: Montserrat-Bold, Montserrat;
            font-weight: bold;
            color: #E84118;
            line-height: 19px;
            letter-spacing: 5px;
            text-align: center;
        }
        h2 {
            width: 100%;
            height: 43px;
            font-size: 36px;
            font-family: Montserrat-Bold, Montserrat;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 43px; 
            text-align: center;
            margin-top: 30px;
        }
        
    }
    .banner {
        height: 478px;
        h1 {
            height: 57px;
            font-size: 48px;
            font-family: Montserrat-Bold, Montserrat;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 57px;
            padding-top: 110px;
            padding-bottom: 25px;
            text-align: center;
        }
        p {
            font-size: 20px;
            font-family: Montserrat-Regular, Montserrat;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 40px;
            text-align: center;
        }
        .applyBtn {
            width: 240px;
            height: 60px;
            display: block;
            margin: 0 auto;
            background: #E84118;
            border-radius: 4px;
            font-size: 14px;
            font-family: Montserrat-SemiBold, Montserrat;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 60px;
            text-align: center;
            margin-top: 50px;
        }
    }
    .culture{
        background: #ffffff;
        padding: 0 120px 200px;
        .cheader {
            h2 {
                color: #322F2F;
            }
        }
        .citem {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            min-height: 424px; 
            margin-top: 100px;
            position: relative;
            overflow: hidden;
            .img{
                width: 60%;
                float: right;
                img{
                    width:669px;
                    height:424px;
                    float:right;
                }
            }
            .desc {
                float: left;
                padding: 56px 0 0 70px;
                span {
                    height: 32px;
                    font-size: 16px;
                    font-family: Montserrat-Regular, Montserrat;
                    font-weight: bold;
                    color: #E84118;
                    line-height: 32px;
                    letter-spacing: 3px;
                }
                h3 {
                    height: 64px;
                    font-size: 48px;
                    font-family: Montserrat-Regular, Montserrat;
                    font-weight: bold;
                    color: #000000;
                    line-height: 64px;
                }
                p {
                    height: 32px;
                    font-size: 20px;
                    font-family: Montserrat-Regular, Montserrat;
                    color: #4A4A4A;
                    line-height: 32px;
                }
            }
        }
        .citem:last-child {
            .desc{
                float: left;
                padding: 136px 0 0 70px;
            }
            .img{
                float: left;
                img {
                    width: 666px;
                    height: 544px;
                    margin-left: 70px;
                }
            }
        }
    }
    .criteria {
        padding-bottom: 240px;
        .content {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 95px;

            .citem {
                display: flex;
                flex-direction: column;
                width: 378px;
                height: 369px;
                background: #FFFFFF;
                box-shadow: 0px 4px 32px 0px rgba(34, 41, 77, 0.02), 0px 8px 64px 0px rgba(33, 39, 75, 0.1);
                border-radius: 8px;
                margin-right: 48px;

                h3{
                    height: 64px;
                    padding-left: 33px;
                    margin-bottom: 10px;
                    background: #E84118;
                    border-radius: 8px 8px 0px 0px;
                    font-size: 24px;
                    font-family: Montserrat-Regular, Montserrat;
                    font-weight: bold;
                    color: #FFFFFF;
                    line-height: 64px;
                }
                p {
                    line-height: 20px;
                    font-size: 16px;
                    padding: 0 33px;
                    margin-top: 16px;
                    font-family: Montserrat-Regular, Montserrat;
                    font-weight: bold;
                    color: #22294F;
                }
                
            }
            .citem:last-child {
                margin-right: 0;
            }
        }
    }
`

const Step2 = styled.div`
    position: relative;
    z-index: 100;
    background: #fff;
    color: #fff;
`

const Step3 = styled.div`
    position: relative;
    z-index: 100;
    background: #fff;
    background-image: url(${successImg});
    background-size: 95%;
    background-position: 50% 0%;
    background-repeat: no-repeat;
    color: #fff;
    height: 100vh;
    .content {
        padding-top: 60vh;
        h2 {
            width: 489px;
            margin: 0 auto;
            font-size: 20px;
            font-family: Montserrat-Bold, Montserrat;
            font-weight: bold;
            color: #333333;
            line-height: 24px;
        }
        p{
            width: 489px;
            margin: 12px auto 0;
            font-size: 16px;
            font-family: Montserrat-Regular, Montserrat;
            font-weight: 400;
            color: #555555;
            line-height: 20px; 
        }
        .btnWrap{
            width: 405px;
            margin: 0 auto;
            text-align: right;
        }
        .backBtn{
            width: 100px;
            height: 32px;
            display: inline-block;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: bold;
            color: #FFFFFF;
            background-color: #E84118;
            line-height: 32px;
            text-align: center;
            margin-top: 30px;
        }
        .mt20 {
            margin-top: 30px;
        }
    }
`

export {
    Step1,
    Step2,
    Step3
}