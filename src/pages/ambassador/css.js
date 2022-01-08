import styled  from 'styled-components';
import successImg from '@/static/images/ambassador/success@2x.png'
import backImg from '@/static/images/ambassador/back.jpg'

const Step1 = styled.div`
    position: relative;
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
                    font-size: 16px;
                    font-family: Montserrat-Regular, Montserrat;
                    font-weight: bold;
                    color: #E84118;
                    line-height: 32px;
                    letter-spacing: 3px;
                }
                h3 {
                    font-size: 48px;
                    font-family: Montserrat-Regular, Montserrat;
                    font-weight: bold;
                    color: #000000;
                    line-height: 64px;
                }
                p {
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
    @media screen and (max-width: 1024px) {
        color: #fff;
        .cheader {
            padding-top: 60px;
            h2 {
                font-size: 28px;
                margin-top: 20px;
            }
            
        }
        .banner {
            margin: 0;
            height: 478px;
            background: #1D1D1F;
            h1 {
                padding-top: 50px;
                font-size: 30px;
            }
            p {
                font-size: 18px;
                line-height: 30px;
            }
            .applyBtn {
            }
        }
        .culture{
            padding: 0 20px 60px;
            .citem {
                margin-top: 60px;
                .img{
                    width: 100%;
                    float: none;
                    margin: 0 auto;
                    img{
                        width:100%;
                        height:auto;
                        float:none;
                    }
                }
                .desc {
                    padding: 0px 0 0 20px;
                    span {
                        
                    }
                    h3 {
                        font-size: 22px;
                        line-height: 28px;
                    }
                    p {
                        font-size: 18px;
                        line-height: 18px;
                        margin-top: 10px;
                    }
                }
            }
            .citem:last-child {
                margin-top: 0px;
                .desc{
                    float: none;
                    padding: 30px 0 0 30px;
                }
                .img{
                    width: 100%;
                    float: none;
                    margin: 0 auto;
                    img {
                        width: 100%;
                        height: auto;
                        margin-left: 0px;
                    }
                }
            }
        }
        .criteria {
            padding-bottom: 40px;
            .content {
                display: block;
                padding: 60px 30px;
    
                .citem {
                    display: block;
                    width: 100%;
                    height: auto;
                    margin-right: 0;
                    margin-top: 30px;
                    padding-bottom: 40px;

                    h3{
                        height: 40px;
                        padding-left: 15px;
                        border-radius: 4px 4px 0px 0px;
                        font-size: 20px;
                        line-height: 40px;
                        margin-bottom: 30px;
                    }
                    p {
                        line-height: 18px;
                        padding: 0 20px;
                        margin-top: 15px;
                    }
                }
                .citem:last-child {
                    margin-right: 0;
                }
            }
        }
    }
`

const Step2 = styled.div`
    position: relative;
    background: #fff;
    color: #fff;
    padding-top: 64px;
    padding-bottom: 100px;
    .cheader{
        max-width: 1200px;
        margin: 0 auto;
        height: 57px;
        color: #E84118;
        line-height: 57px;
        h1{
            display: inline-block;
            height: 57px;
            font-size: 48px;
            font-family: Montserrat-Bold, Montserrat;
            font-weight: bold;
            color: #E84118;
            line-height: 57px;
        } 
        .back{
            width: 40px;
            height: 32px;
            display: inline-block;
            background-image: url(${backImg});
            background-size: 40px auto;
            background-position: 50% 0%;
            background-repeat: no-repeat;
            text-indent: -9999rem;
        }
    }
    .form {
        max-width: 1200px;
        margin: 40px auto 0;
        .formGroupWrap {
            .gheader {
                height: 56px;
                background: rgba(213, 214, 218, 0.03);
                box-shadow: 0px 8px 11px 0px rgba(0, 0, 0, 0.02);
                border-radius: 4px 4px 0px 0px;
                border: 1px solid #E4E4E4;
                h2{
                    font-size: 18px;
                    font-family: Roboto-Medium, Roboto;
                    font-weight: 500;
                    color: rgba(0, 0, 0, 0.87);
                    line-height: 56px;
                    padding-left: 20px;
                }
            }
            .gcontent{
                position:relative;
                background: #FFFFFF;
                border-radius: 4px 4px 0px 0px;
                border: 1px solid #E4E4E4;
                border-width: 0 1px 1px 1px;
                padding: 15px 20px;
                .orangeBlock {
                    width: 4px;
                    height: 100%;
                    background: #E84118;
                    position:absolute;
                    left: -1px;
                    top: -1px;
                }
                .label{
                    font-size: 17px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #9A9A9A;
                    line-height: 20px;
                    padding: 15px 0 12px;
                }
                .MuiFormControl-root{
                    width:100%;
                    margin:0;
                }
                .input{
                    width:100%;
                    height: 40px;
                    .MuiOutlinedInput-root{
                        
                    }
                    .MuiOutlinedInput-input{
                        line-height: 20px;
                        height: 20px;
                        padding: 10px 20px;
                        font-size: 16px;
                        border-radius: 4px;
                    }
                    .MuiOutlinedInput-input.Mui-focused{
                        border: 1px solid #333;
                    }
                    
                    .MuiInputLabel-root{
                        line-height: 20px;
                        height: 20px;
                        font-size: 16px;
                        margin-top: -6px;
                        // transform: translate(16px, 10px) scale(1);
                        
                    }
                    .MuiInputLabel-root.Mui-focused {
                        // transform: translate(16px, -9px) scale(1);
                        background-color: #ffffff;
                        padding: 0 5px 0 0;
                        margin-top: 0px;
                        .Mui-focused.MuiOutlinedInput-notchedOutline{
                            border:none
                        }
                    }
                }
                .input.userBriefly {
                    height: 260px !important;
                    width: 100% !important;
                    border: none;
                    outline: none;
                }
                .tip {
                    font-size: 12px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #E84118;
                    line-height: 14px;
                    margin-top: 5px;
                }
                .checkboxWrap{
                    .MuiFormControlLabel-label{
                        color: #4A4A4A;
                    }
                    .MuiFormControlLabel-label.Mui-disabled {
                        color: #9A9A9A;
                    }
                    .formgroup{
                        display: flex;
                        flex-direction: row;
                        justify-content: stretch;
                    }
                }
                .checkboxWrap.expertise{
                    .MuiFormGroup-root{
                        display: flex;
                        flex-direction: row;
                        justify-content: stretch;
                        .MuiFormControlLabel-root{
                            width: 25%;
                        }
                    }
                }
                .checkboxWrap.channels{
                    .MuiFormControlLabel-root{
                        width: 100%;
                    }
                    .otherChannel{
                        display: flex;
                        flex-direction: row;
                        justify-content: stretch;
                        .MuiFormControlLabel-root{
                            width: 100px;
                        }
                    }
                }
            }
        }
        .btn {
            width: 119px;
            height: 40px;
        }
        .submit.MuiButton-root{
            margin-right:16px;
            background-color: #E84118;
            font-size: 16px;
            font-family: Montserrat-SemiBold, Montserrat;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 19px;
        }
        .back.MuiButton-root{
            color: #E84118;
            border-color: #E84118;
        }
        .contactInfo, .socialMedia{
            width: 578px;
            .gcontent{
                min-height: 400px;
            }
            
        }
        .multiColumn {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            >.MuiFormControl-root{
                width:48%  !important;
                margin:0;
            }
        }
        .mt24{
            margin-top: 24px !important;
        }
        .mt35{
            margin-top: 35px !important;
        }
        .mt9{
            margin-top: 9px;
        }
        .mr20{
            margin-right: 20px;
        }
    }
    @media screen and (max-width: 1024px) {
        padding: 60px 20px;
        .cheader{
            max-width: 100%;
            margin: 0 auto;
            height: auto;
            h1{
                display: block;
                height: 40px;
                font-size: 22px;
                line-height: 40px;
            } 
            .back{
                background-size: 30px auto;
            }
        }
        .form {
            max-width: 100%;
            .formGroupWrap {
                .gheader {
                    h2{
                        font-size: 16px;
                    }
                }
                .gcontent{
                    .checkboxWrap.expertise{
                        .MuiFormControlLabel-root{
                            width: 45%;
                        }
                    }
                    .checkboxWrap.channels{
                        .MuiFormControlLabel-root{
                            width: 100%;
                        }
                    }
                    .label{
                        font-size: 16px;
                    }
                }
            }
            .contactInfo, .socialMedia{
                width: 100%;
                .gcontent{
                    min-height: auto;
                    padding: 0 10px 40px 10px;
                }
            }
            .socialMedia{
                margin-top: 20px;
            }
            .multiColumn {
                display: block;
            }
        }
    }
`

const Step3 = styled.div`
    position: relative;
    z-index: 100;
    background: #fff;
    background-image: url(${successImg});
    background-size: 95%;
    background-position: 50% 10%;
    background-repeat: no-repeat;
    color: #fff;
    height: 100vh;
    .content {
        padding-top: 50vh;
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

    @media screen and (max-width: 1024px) {
        background-size: 195%;
        background-position: 50% 10%;

        .content {
            padding: 30vh 30px 0;
            
            h2 {
                width: 100%;
                font-size: 18px;
                line-height: 24px;
            }
            p{
                width: 100%;
                font-size: 14px;
            }
            .btnWrap{
                width: 100%;
                text-align: center;
            }
        }
    }
`

export {
    Step1,
    Step2,
    Step3
}