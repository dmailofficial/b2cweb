import styled from "styled-components";
import successImg from "@/static/images/ambassador/success@2x.png";
import backImg from "@/static/images/ambassador/arrow-left@2x.png";

const mainColor = "#FF6633";
const mainGray = "#9A9A9A";

const Step1 = styled.div`
    position: relative;
    background: #1D1D1F;
    color: #fff;
    .cheader {
        padding-top: 60px;
        span {
            display: block;
            width: 100%;
            // height: 19px;
            font-size: 26px;
            font-family: Montserrat-Bold, Montserrat, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
            font-weight: bold;
            color: ${mainColor};
            line-height: 19px;
            letter-spacing: 5px;
            text-align: center;
        }
        h2 {
            width: 100%;
            height: 43px;
            font-size: 36px;
            font-family: Montserrat-Bold, Montserrat, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
            font-weight: bold;
            color: #FFFFFF;
            line-height: 43px; 
            text-align: center;
            margin-top: 30px;
        }
        
    }
    .banner {
        padding: 80px 0 72px;
        text-align: center;
        h1 {
            font-size: 48px;
            font-family: Montserrat-Bold, Montserrat, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
            font-weight: bold;
            color: #FFFFFF;
            line-height: 57px;
            padding-bottom: 25px;
            text-align: center;
        }
        p {
            font-size: 20px;
            font-family: Montserrat-Regular, Montserrat, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
            font-weight: 400;
            color: #FFFFFF;
            line-height: 32px;
            text-align: center;
            // max-width: 846px;
            margin: 0 auto;
        }
        .applyBtn {
            width: 240px;
            height: 60px;
            display: block;
            margin: 0 auto;
            background: ${mainColor};
            border-radius: 4px;
            font-size: 14px;
            font-family: Montserrat-SemiBold, Montserrat, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
            font-weight: 600;
            color: #FFFFFF;
            line-height: 60px;
            text-align: center;
            margin-top: 50px;
            cursor: pointer;
        }
    }
    .culture{
        background: #ffffff;
        padding: 0 120px 72px;
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
            padding-top: 96px;
            display: flex;
            // align-items: center;
            align-items: flex-start
            justify-content: space-between;

            .img{
                width: 60%;
                float: right;
                img{
                    width: 100%;
                    max-width:711px;
                    min-width: 656px;
                    height:auto;
                }
            }
            .img.h5{
                display: none;
            }
            .img.pc{
                display: block;
            }
            .desc {
                width: 40%;
                padding: 67px 0 0 70px;
                span {
                    font-size: 16px;
                    font-family: Montserrat-Regular, Montserrat, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: bold;
                    color: ${mainColor};
                    line-height: 32px;
                    letter-spacing: 3px;
                }
                h3 {
                    font-size: 40px;
                    font-family: Montserrat-Regular, Montserrat, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: normal;
                    color: #000000;
                    line-height: 65px;
                    min-height: 65px;
                    img{
                        width: 65px;
                        height: 65px;
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 8px;
                        float: left;
                    }
                }
                p {
                    margin-top: 34px;
                    font-size: 20px;
                    font-family: Montserrat-Regular, Montserrat, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    color: #4A4A4A;
                    font-weight: 400;
                    line-height: 32px;
                }
            }
        }
        .citem:nth-child(2) {
            padding-top: 172px;
            .img{
                img {
                    width: 100%;
                    max-width: 638px;
                    min-width: 470px;
                    height: auto;
                    margin-left: 0px;
                }
            }
        }
        .citem:last-child {
            padding-top: 228px;
            .desc{
                padding: 15px 0 0 70px;
            }
            .img{
                img {
                    width: 100%;
                    max-width: 666px;
                    min-width: 490px;
                    height: auto;
                    margin-left: 0px;
                }
            }
        }
    }
    .criteria {
        padding-bottom: 100px;
        .cheader{
            p{
               width: 670px;
               margin: 34px auto 0; 
               text-align: center;
            }
        }
        .content {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            padding-top: 95px;
            max-width: 1250px;
            margin: 0 auto;

            .citem {
                display: flex;
                flex-direction: column;
                width: 30%;
                max-width: 378px;
                min-height: 490px;
                padding-bottom: 20px;
                background: #FFFFFF;
                box-shadow: 0px 4px 32px 0px rgba(34, 41, 77, 0.02), 0px 8px 64px 0px rgba(33, 39, 75, 0.1);
                border-radius: 8px;
                // margin-right: 48px;

                h3{
                    height: 64px;
                    padding-left: 33px;
                    margin-bottom: 10px;
                    background: ${mainColor};
                    border-radius: 8px 8px 0px 0px;
                    font-size: 24px;
                    font-family: Montserrat-Regular, Montserrat, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: bold;
                    color: #FFFFFF;
                    line-height: 64px;
                }
                p {
                    padding: 0 20px 0 44px;
                    margin-top: 16px;
                    font-family: Montserrat-Regular, Montserrat, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-size: 16px;
                    font-weight: 400;
                    color: #4A4A4A;
                    line-height: 24px;
                    position: relative;
                    span{
                        width: 8px;
                        height: 8px;
                        border-radius: 8px;
                        display: inline-block;
                        border: 1px solid #FF6633;
                        position: absolute;
                        left: 20px;
                        top: 8px;
                    }
                }
                
            }
            .citem:last-child {
                margin-right: 0;
            }
        }
    }
    @media screen and (max-width: 1080px) {
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
            // min-height: 478px;
            height: auto;
            background: #1D1D1F;
            padding-bottom: 40px;
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
                .desc {
                    padding: 55px 0 0 20px;
                    h3 {
                        font-size: 40px;
                        // line-height: 28px;
                    }
                    p {
                        // font-size: 18px;
                        // line-height: 18px;
                        // margin-top: 10px;
                    }
                }
            }
            .citem:last-child {
                .desc{
                    padding: 67px 0 0 70px;
                }
            }
        }
        .criteria {
            padding-bottom: 40px;
            .content {
                .citem {
                    height: 400px;
                    h3{
                        height: 40px;
                        padding-left: 15px;
                        border-radius: 4px 4px 0px 0px;
                        font-size: 20px;
                        line-height: 40px;
                        margin-bottom: 10px;
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

    @media screen and (max-width: 720px) {
        .banner {
            h1{
                padding-top:0;
            }
            p{padding:0 15px;}

        }
        .culture{
            padding: 0 20px 60px;
            .citem {
                margin-top: 0px;
                display: block;
                .img{
                    width: 100%;
                    float: none;
                    margin: 0 auto;
                    img{
                        width:100%;
                        max-width: 100%;
                        min-width: 100%;
                        height:auto;
                        float:none;
                    }
                }
                .img.pc{
                    display: none;
                }
                .img.h5{
                    display: block;
                }
                .desc {
                    padding: 0 0 0px;
                    text-align: center;
                    width: 100%;
                    span {
                        
                    }
                    h3 {
                        font-size: 30px;
                        line-height: 40px;
                        img{
                            width: 40px;
                            height: 40px;
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 8px;
                            float: none;
                        }
                    }
                    p {
                        font-size: 18px;
                        line-height: 24px;
                        margin-top: 10px;
                    }
                }
            }
            .citem:nth-child(2){
                padding-top: 100px;
                .img{
                    width: 100%;
                    margin: 0 auto;
                    img {
                        width: 100%;
                        max-width: 100%;
                        min-width: 100%;
                        height: auto;
                        margin-left: 0px;
                    }
                }
            }
            .citem:last-child {
                margin-top: 0px;
                padding-top: 100px;
                .desc{
                    float: none;
                    padding: 0;
                }
                .img{
                    width: 100%;
                    margin: 0 auto;
                    img {
                        width: 100%;
                        height: auto;
                        max-width: 100%;
                        min-width: 100%;
                        margin-left: 0px;
                    }
                }
            }
        }
        .criteria {
            .cheader{
                p{
                   width: 95%;
                   margin: 34px auto 0; 
                   text-align: center;
                }
            }
            .content {
                display: block;
                padding: 60px 30px;
    
                .citem {
                    display: block;
                    width: 100%;
                    max-width: 100%;
                    height: auto;
                    min-height: auto;
                    margin-right: 0;
                    margin-top: 30px;
                    padding-bottom: 40px;

                    h3{
                        margin-bottom: 30px;
                    }
                    p {
                        line-height: 18px;
                        padding: 0 20px;
                        margin-top: 15px;
                        span{
                            display: none;
                        }
                    }
                }
                .citem:last-child {
                    margin-right: 0;
                }
            }
        }
    }
`;

const Step2 = styled.div`
  position: relative;
  background: #fff;
  color: #fff;
  padding: 64px 25px 100px;
  .cheader {
    max-width: 1200px;
    margin: 0 auto;
    height: 57px;
    color: ${mainColor};
    line-height: 57px;
    h1 {
      display: inline-block;
      font-size: 48px;
      font-family: Montserrat-Bold, Montserrat, PingFangSC-Medium, PingFang SC,
        "Microsoft YaHei";
      font-weight: bold;
      color: ${mainColor};
      line-height: 57px;
    }
    .back {
      width: 40px;
      height: 32px;
      display: inline-block;
      background-image: url(${backImg});
      background-size: 40px auto;
      background-position: 50% 0%;
      background-repeat: no-repeat;
      text-indent: -9999rem;
      margin-right: 20px;
      cursor: pointer;
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
        border: 1px solid #e4e4e4;
        h2 {
          font-size: 18px;
          font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC,
            "Microsoft YaHei";
          font-weight: 500;
          color: rgba(0, 0, 0, 0.87);
          line-height: 56px;
          padding-left: 20px;
        }
        span {
          color: ${mainColor};
        }
      }
      .gcontent {
        position: relative;
        background: #ffffff;
        border-radius: 4px 4px 0px 0px;
        border: 1px solid #e4e4e4;
        border-width: 0 1px 1px 1px;
        padding: 15px 20px;
        .orangeBlock {
          width: 4px;
          height: 100%;
          background: ${mainColor};
          position: absolute;
          left: -1px;
          top: -1px;
        }
        .label {
          font-size: 17px;
          font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC,
            "Microsoft YaHei";
          font-weight: 400;
          color: ${mainGray};
          line-height: 20px;
          padding: 15px 0 12px;
          span {
            color: ${mainColor};
          }
        }
        .MuiFormControl-root {
          width: 100%;
          margin: 0;
        }
        .input {
          width: 100%;
          height: 40px;
          .MuiOutlinedInput-root {
            fieldset.MuiOutlinedInput-notchedOutline {
              border-color: rgba(171, 171, 171, 0.21);
            }
          }
          .MuiOutlinedInput-root.Mui-error {
            fieldset.MuiOutlinedInput-notchedOutline {
              border-color: ${mainColor};
            }
          }
          .MuiOutlinedInput-input {
            line-height: 20px;
            height: 20px;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 4px;
          }
          .MuiOutlinedInput-input.Mui-focused {
          }

          .MuiInputLabel-root {
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
            .Mui-focused.MuiOutlinedInput-notchedOutline {
              border: none;
            }
          }
          .MuiFormHelperText-root.Mui-error {
            color: ${mainColor};
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
          font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC,
            "Microsoft YaHei";
          font-weight: 400;
          color: ${mainColor};
          line-height: 14px;
          margin-top: 5px;
        }
        .selectWrap {
          .MuiInputLabel-root {
            color: ${mainGray};
          }
          .select {
            .MuiOutlinedInput-notchedOutline {
              border-color: rgba(171, 171, 171, 0.4);
            }
          }
        }

        .checkboxWrap {
          .MuiFormControlLabel-label {
            color: #4a4a4a;
          }
          .MuiFormControlLabel-label.Mui-disabled {
            color: ${mainGray};
          }
          .formgroup {
            display: flex;
            flex-direction: row;
            justify-content: stretch;
          }
        }
        .checkboxWrap.expertise {
          .MuiFormGroup-root {
            display: flex;
            flex-direction: row;
            justify-content: stretch;
            .MuiFormControlLabel-root {
              width: 25%;
            }
          }
        }
        .checkboxWrap.channels {
          .MuiFormControlLabel-root {
            width: 100%;
          }
          .otherChannel {
            display: flex;
            flex-direction: row;
            justify-content: stretch;
            .MuiFormControlLabel-root {
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
    .submit.MuiButton-root {
      margin-right: 16px;
      background-color: ${mainColor};
      font-size: 16px;
      font-family: Montserrat-SemiBold, Montserrat, PingFangSC-Medium,
        PingFang SC, "Microsoft YaHei";
      font-weight: bold;
      color: #ffffff;
      line-height: 19px;
    }
    .back.MuiButton-root {
      color: ${mainColor};
      border-color: ${mainColor};
    }
    .contactInfo,
    .socialMedia {
      width: 48%;
      max-width: 578px;
      .gcontent {
        min-height: 400px;
      }
    }
    .multiColumn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      // justify-content: space-evenly;

      > .controlWrap {
        width: 48%;
      }
    }
    .mt24 {
      margin-top: 24px !important;
    }
    .mt35 {
      margin-top: 35px !important;
    }
    .mt9 {
      margin-top: 9px;
    }
    .mr20 {
      margin-right: 20px;
    }
  }
  .toastWrap {
    position: fixed;
    // width: 60px;
    // height: 50px;
    // background: #FFFFFF;
    text-align: center;
    top: 90px;
    left: 0;
    right: 0;
    margin: 0 auto;

    box-sizing: border-box;

    .closeBtn {
      width: 16px;
      height: 16px;
      display: block;
      position: relative;
      float: right;
      margin-bottom: 16px;
      cursor: pointer;
      span {
        position: absolute;
        top: 8px;
        height: 1px;
        width: 16px;
        display: block;
        background: #888888;
        transform: rotate(45deg);
      }
      span:nth-child(2) {
        transform: rotate(-45deg);
      }
    }
    .content {
      padding: 0;
      display: inline-block;
      text-align: center;
      background-color: #1d1d1f;
      opacity: 0.8;
      padding: 20px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 6px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
    }
    img {
      width: 30px;
      height: 30px;
      display: inline-block;
      vertical-align: middle;
      margin: 0 20px 0px 0;
    }
    span.tip {
      display: inline-block;
      font-size: 20px;
      font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC,
        "Microsoft YaHei";
      font-weight: 400;
      // color: #111111;
      color: #ffffff;
      height: 24px;
      line-height: 24px;
    }
  }
  .toastWrap.hidden {
    display: none;
  }
  .toastWrap.show {
    display: block;
  }
  @media screen and (max-width: 1024px) {
    padding: 60px 25px;
    .cheader {
      max-width: 100%;
      margin: 0 auto;
      height: auto;
      h1 {
        display: block;
        height: auto;
        font-size: 22px;
        line-height: 40px;
      }
      .back {
        background-size: 30px auto;
      }
    }
    .form {
      max-width: 100%;
      .formGroupWrap {
        .gheader {
          h2 {
            font-size: 16px;
          }
        }
        .gcontent {
          .checkboxWrap.expertise {
            .MuiFormGroup-root {
              .MuiFormControlLabel-root {
                width: 100%;
              }
            }
          }
          .checkboxWrap.channels {
            .MuiFormControlLabel-root {
              width: 100%;
            }
          }
          .label {
            font-size: 16px;
          }
        }
      }
      .contactInfo,
      .socialMedia {
        width: 100%;
        max-width: 100%;
        .gcontent {
          min-height: auto;
          padding: 0 10px 40px 10px;
        }
      }
      .socialMedia {
        margin-top: 20px;
      }
      .multiColumn {
        display: block;
        > .controlWrap {
          width: 100%;
          margin-bottom: 20px;
        }
      }
    }
  }
`;

const Step3 = styled.div`
  position: relative;
  z-index: 100;
  background: #fff;
  background-image: url(${successImg});
  background-size: 95%;
  background-position: 50% 10%;
  background-repeat: no-repeat;
  color: #fff;
  height: calc(100vh - 67px);
  .content {
    padding-top: 50vh;
    h2 {
      width: 489px;
      margin: 0 auto;
      font-size: 20px;
      font-family: Montserrat-Bold, Montserrat, PingFangSC-Medium, PingFang SC,
        "Microsoft YaHei";
      font-weight: bold;
      color: #333333;
      line-height: 24px;
    }
    p {
      width: 489px;
      margin: 12px auto 0;
      font-size: 16px;
      font-family: Montserrat-Regular, Montserrat, PingFangSC-Medium,
        PingFang SC, "Microsoft YaHei";
      font-weight: 400;
      color: #555555;
      line-height: 20px;
    }
    .btnWrap {
      width: 405px;
      margin: 0 auto;
      text-align: right;
    }
    .backBtn {
      width: 100px;
      height: 32px;
      display: inline-block;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: bold;
      color: #ffffff;
      background-color: ${mainColor};
      line-height: 32px;
      text-align: center;
      margin-top: 30px;
      cursor: pointer;
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
      p {
        width: 100%;
        font-size: 14px;
      }
      .btnWrap {
        width: 100%;
        text-align: center;
      }
    }
  }
`;

export { Step1, Step2, Step3 };
