import styled from "styled-components";
import styledPx2vw from "@/utils/styledPx2vw.js";
import bannerBackground from "@/static/images/home/banner/bg.png";
import dmailBackground from "@/static/images/home/what_is_dmail/bg.png";
import workBackground from "@/static/images/home/work/bg.png";
import highBackground from "@/static/images/home/highlights/bg.png";
import roadmapBackground from "@/static/images/home/roadmap/bg.png";
import partnerBackground from "@/static/images/home/partner/bg.jpg";
import footerBackground from "@/static/images/home/footer/bg.png";

const baseWidth = 1440 / 100;
const baseWidth750 = 750 / 100;
const baseWidth1920 = 1920 / 100;

const NewHome = styled.div`
        height: 100vh;
        width: 100%;
        background-color: #1D1D1F;
        .header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            border: none;
            // border-bottom: 1px solid #888888;
        }
        .pageWrap {
            height: 100vh;
            width: 100%;
            margin: 0 auto;
            background-color: #1D1D1F;
        }
        .contentWrap{
            height: 100vh;
            padding-top: 0;
            position: relative;
            box-sizing: border-box;
            .content{
                position: relative;
                z-index: 1;
            }
            .animation{
                position: absolute;
                width: 100%;
                height: auto;
                bottom: 0;
                right: 0;
                left: auto;
                z-index: 0;
                img{
                    width: 100%;
                }
            }
            .nextBtn{
                cursor: pointer;
                position: absolute;
                bottom: ${48 / baseWidth}vw;
                left: ${160 / baseWidth}vw;
                img{
                    display: inline-block;
                    width: ${40 / baseWidth}vw;
                    height: ${40 / baseWidth}vw;
                    vertical-align: middle;
                    margin-right: ${16 / baseWidth}vw;
                }
                .txt{
                    font-size: ${14 / baseWidth}vw;
                    font-family: Helvetica;
                    color: #FFFFFF;
                    line-height: ${40 / baseWidth}vw;
                }
            }
        }
        .bannerBlock{
            height: 100vh;
            background-image: url(${bannerBackground});
            background-size: ${1440 / baseWidth}vw ${836 / baseWidth}vw;
            background-position: 100% 100%;
            background-repeat: no-repeat;
        }
        
        .bannerContent {
            padding-top: ${67 / baseWidth}vw;
            .content{
                width: 50%;
                min-height: 300px;
                margin-left: ${160 / baseWidth}vw;
                margin-top: 19vh;
                p{
                    font-size: ${(18 / 1440) * 100}vw;
                    font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: 400;
                    color: #6E6E6E;
                    line-height: ${20 / baseWidth}vw;
                }
                .desc{
                    font-size: ${28 / baseWidth}vw;
                    line-height: ${20 / baseWidth}vw;
                    color: #AFAFAF;
                }
                h2,h3{
                    font-size: ${72 / baseWidth}vw;
                    font-family: Roboto-Black, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    color: #FFFFFF;
                    font-weight: normal;
                    line-height: ${100 / baseWidth}vw;
                }
                h2{
                    font-family: Roboto-Bold, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: bold;
                    margin-top: 5px;
                }
                h3{
                    margin-bottom: ${15 / baseWidth}vw;
                }
                .launchBtn{
                    display: block;
                    width: ${225 / baseWidth}vw;
                    height: ${52 / baseWidth}vw;
                    margin-top: ${80 / baseWidth}vw;
                    background-color: #FF6633;
                    font-size: ${16 / baseWidth}vw;
                    font-family: Helvetica;
                    color: #FFFFFF;
                    line-height: ${52 / baseWidth}vw;
                    text-align: center;
                    img{
                        display: inline-block;
                        vertical-align: middle;
                        margin-left: ${32 / baseWidth}vw;
                        width: ${17 / baseWidth}vw;
                        height: ${14 / baseWidth}vw;
                    }
                }
                .launchBtn:hover{
                    background: #fa7a4f;
                }
                .launchBtn:active{
                    background: #913719;
                }
            }
        }

        
        .dmailBlock{
            background-image: url(${dmailBackground});
            background-size:  ${1440 / baseWidth}vw  ${836 / baseWidth}vw;
            background-position: 100% 50%;
            background-repeat: no-repeat;
        }

        .dmailContent{
            .content{
                width: ${565 / baseWidth}vw;
                min-height: 300px;
                margin-left: ${160 / baseWidth}vw;
                padding-top: ${135 / baseWidth}vw;
                p{
                    font-size: ${14 / baseWidth}vw;
                    font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: 400;
                    color: #6E6E6E;
                    line-height: ${20 / baseWidth}vw;
                }
                p.desc{
                    color: #FFFFFF;
                    font-size: ${16 / baseWidth}vw;
                    line-height: ${24 / baseWidth}vw;
                    letter-spacing: 2px;
                }
                h2{
                    font-size: ${32 / baseWidth}vw;
                    font-family: Roboto-Black, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: 900;
                    color: #FF6633;
                    line-height: ${38 / baseWidth}vw;
                    margin: 8px 0 ${18 / baseWidth}vw;
                }
                .dmailItem{
                    margin-top: ${30 / baseWidth}vw;
                    .item{
                        width: 50%;
                        display: inline-block;
                        margin-top: ${40 / baseWidth}vw;
                        >div{
                            display: inline-block;
                            width: ${56 / baseWidth}vw;
                            text-align: center;
                            margin-right: ${24 / baseWidth}vw;
                        }
                        img{
                            display: inline-block;
                            width: ${55 / baseWidth}vw;
                            height: ${54 / baseWidth}vw;
                            vertical-align: middle;
                        }
                        .txt{
                            font-size: ${16 / baseWidth}vw;
                            font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                            font-weight: 500;
                            color: #FFFFFF;
                            line-height: ${20 / baseWidth}vw;
                        }
                    }
                    .item2{
                        img{
                            width: ${56 / baseWidth}vw;
                            height: ${61 / baseWidth}vw;
                        }
                    }
                    .item3{
                        img{
                            width: ${54 / baseWidth}vw;
                            height: ${48 / baseWidth}vw;
                        }
                    }
                    .item4{
                        img{
                            width: ${43 / baseWidth}vw;
                            height: ${61 / baseWidth}vw;
                        }
                    }
                }

            }
        }


        .workBlock{
            background-image: url(${workBackground});
            background-size: ${1440 / baseWidth}vw ${836 / baseWidth}vw;
            background-position: 100% 50%;
            background-repeat: no-repeat;
        }

        .workContent{
            .content{
                width: ${505 / baseWidth}vw;
                min-height: 300px;
                margin-left: ${160 / baseWidth}vw;
                padding-top: ${145 / baseWidth}vw;
                p{
                    font-size: ${14 / baseWidth}vw;
                    font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: 400;
                    color: #6E6E6E;
                    line-height: ${16 / baseWidth}vw;
                }
                p.desc{
                    color: #FFFFFF;
                    font-size: ${16 / baseWidth}vw;
                    line-height: ${24 / baseWidth}vw;
                    letter-spacing: 1px;
                }
                h2{
                    font-size: ${32 / baseWidth}vw;
                    font-family: Roboto-Black, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: 900;
                    color: #FF6633;
                    line-height: ${38 / baseWidth}vw;
                    margin: 8px 0 ${18 / baseWidth}vw;
                }
            }
        }



        .highlightBlock{
            background-image: url(${highBackground});
            background-size: ${1440 / baseWidth}vw ${836 / baseWidth}vw;
            background-position: 100% 50%;
            background-repeat: no-repeat;
        }

        .highlightContent{
            padding-top: 0;
            .title{
                position: absolute;
                left: 50%;
                top: ${124 / baseWidth}vw;
                margin-left: ${320 / baseWidth}vw;
                p{
                    font-size: ${14 / baseWidth}vw;
                    font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: 400;
                    color: #6E6E6E;
                    line-height: ${16 / baseWidth}vw;
                }
                h2{
                    font-size: ${32 / baseWidth}vw;
                    font-family: Roboto-Black, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: 900;
                    color: #FF6633;
                    line-height: ${38 / baseWidth}vw;
                    margin-top: ${8 / baseWidth}vw;
                }
            }
            .content{
                width:  ${868 / baseWidth}vw;
                min-height: 300px;
                margin-left: ${87 / baseWidth}vw;
                padding-top: ${140 / baseWidth}vw;
                .highlightItem{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    .item{
                        width: ${260 / baseWidth}vw;
                        display: inline-block;
                        box-sizing: border-box;
                        padding: 0 0px 0;
                        margin-bottom: ${63 / baseWidth}vw;
                        text-align: left;
                        >div{
                            height: ${62 / baseWidth}vw;
                            display: flex;
                            align-items: flex-end;
                            margin-left: ${6 / baseWidth}vw;
                        }
                        img{
                            display: inline-block;
                            width: ${59 / baseWidth}vw;
                            height: ${64 / baseWidth}vw;
                            vertical-align: bottom;
                        }
                        h3{
                            font-size: ${16 / baseWidth}vw;
                            font-family: Roboto-Black, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                            font-weight: 900;
                            color: #FFFFFF;
                            line-height: ${20 / baseWidth}vw;
                            margin: ${11 / baseWidth}vw 0 ${8 / baseWidth}vw;
                        }
                        p{
                            width: ${260 / baseWidth}vw;
                            font-size: ${14 / baseWidth}vw;
                            font-family: PTSans-Regular, PTSans;
                            font-weight: 400;
                            color: #9B9B9B;
                            line-height: ${16 / baseWidth}vw;
                            
                        }
                    }
                    .item:nth-child(1), .item:nth-child(2){
                        width: ${240 / baseWidth}vw;
                        margin-right: ${21 / baseWidth}vw;
                        p{
                            width: ${212 / baseWidth}vw;
                        }
                    }
                    .item2{
                        img{
                            width: ${62 / baseWidth}vw;
                            height: ${54 / baseWidth}vw;
                        }
                    }
                    .item3{
                        img{
                            width: ${49 / baseWidth}vw;
                            height: ${63 / baseWidth}vw;
                        }
                    }
                    .item4{
                        img{
                            width: ${55 / baseWidth}vw;
                            height: ${58 / baseWidth}vw;
                        }
                    }
                    .item5{
                        img{
                            width: ${52 / baseWidth}vw;
                            height: ${61 / baseWidth}vw;
                        }
                    }
                    .item6{
                        img{
                            width: ${59 / baseWidth}vw;
                            height: ${56 / baseWidth}vw;
                        }
                    }
                    .item7{
                        img{
                            width: ${55 / baseWidth}vw;
                            height: ${60 / baseWidth}vw;
                        }
                    }
                    .item8{
                        img{
                            width: ${58 / baseWidth}vw;
                            height: ${56 / baseWidth}vw;
                        }
                    }
                    .item9{
                        img{
                            width: ${44 / baseWidth}vw;
                            height: ${56 / baseWidth}vw;
                        }
                    }
                }
            }
            .nextBtn{
                left: auto;
                right: ${150 / baseWidth}vw;
            }
        }

        .roadmapBlock{
            background-image: none;
            height: 100vh;
            padding-top: 0;
            // background-image: url(${roadmapBackground});
            background-size: ${1440 / baseWidth}vw ${835 / baseWidth}vw;
            background-position: 100% 100%;
            background-repeat: no-repeat;
        }

        .roadmapContent{
            height: 100vh;
            padding-top: 0;
            .content{
                width: 50%;
                margin-left: ${118 / baseWidth}vw;
                padding-top: ${124 / baseWidth}vw;
                p{
                    font-size: ${14 / baseWidth}vw;
                    font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: 400;
                    color: #6E6E6E;
                    line-height: ${16 / baseWidth}vw;
                }
                h2{
                    font-size: ${32 / baseWidth}vw;
                    font-family: Roboto-Black, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: 900;
                    color: #FF6633;
                    line-height: ${38 / baseWidth}vw;
                    margin: ${8 / baseWidth}vw 0 0;
                }
            }
            .nextBtn{
                left: ${100 / baseWidth}vw;
                bottom: ${40 / baseWidth}vw;
            }
            .roadMap{
                width: 100%;
                background-image: url(${roadmapBackground});
                background-size: ${1440 / baseWidth}vw ${249 / baseWidth}vw;
                background-position: 100% 50%;
                background-repeat: no-repeat;
                height: calc(100vh - ${290 / baseWidth}vw);
                margin-top: ${20 / baseWidth}vw;
                position: relative;
                opacity: 0;
                transition: opacity 1s;
                .item{
                    width: ${120 / baseWidth}vw;
                    padding-bottom: ${50 / baseWidth}vw;
                    position: absolute;
                    bottom: 50%;
                    margin-bottom: ${75 / baseWidth}vw;
                    left: ${110 / baseWidth}vw;
                   h3{
                    font-size: ${20 / baseWidth}vw;
                    font-family: Roboto-Bold, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: bold;
                    color: #FFFFFF;
                    line-height: ${24 / baseWidth}vw;
                    margin-bottom: ${12 / baseWidth}vw;
                   }
                   p {
                        font-size: ${14 / baseWidth}vw;
                        font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                        font-weight: 500;
                        color: rgba(225,225,225,.52);
                        line-height: 1.3;
                        white-space: nowrap;
                   }
                   
                   .line{
                        width: 0;
                        height: ${27 / baseWidth}vw;
                        border-left: 1px solid #FF6633;
                        position: absolute;
                        bottom: ${15 / baseWidth}vw;
                        left: 50%;
                   }
                   .circle{
                        width: ${16 / baseWidth}vw;
                        height: ${16 / baseWidth}vw;
                        display: inline-block;
                        background: #FF6633;
                        box-shadow: 0px 0px 10px 0px #E84118;
                        border-radius: 50%;
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        margin-left: -${8 / baseWidth}vw;
                   }
                }
                .item1 .icon {
                    // transform: translate(-45px);
                }
                .item1 {
                    // width: ${180 / baseWidth}vw;
                    // margin-bottom: ${80 / baseWidth}vw;
                }
                .item.bottom{
                    .line{
                        bottom: auto;
                        top: ${10 / baseWidth}vw;
                        left: 50%;
                   }
                   .circle{
                        bottom: auto;
                        top: 0;
                        left: 50%;
                        margin-left: -${8 / baseWidth}vw;
                    }
                }
                .item2.bottom{
                    width: ${160 / baseWidth}vw;
                    padding: ${60 / baseWidth}vw 0 0px;
                    top: 50%;
                    bottom: auto;
                    margin-bottom: 0;
                    margin-top: ${50 / baseWidth}vw;
                    left: ${350 / baseWidth}vw;
                    .line{
                        height: ${40 / baseWidth}vw;
                        left: 50%;
                        margin-left: -${35 / baseWidth}vw;
                    }
                   .circle{
                        left: 50%;
                        margin-left: -${43 / baseWidth}vw;
                    }
                }
                .item3{
                    padding-bottom: ${60 / baseWidth}vw;
                    bottom: 50%;
                    margin-bottom: ${70 / baseWidth}vw;
                    left: ${530 / baseWidth}vw;
                }
                .item4{
                    // width: ${176 / baseWidth}vw;
                    padding: ${80 / baseWidth}vw 0 0px;
                    top: 50%;
                    bottom: auto;
                    margin-bottom: 0;
                    margin-top: ${40 / baseWidth}vw;
                    left: ${760 / baseWidth}vw;
                    .line{
                        height: ${60 / baseWidth}vw;
                   }
                }
                .item5{
                    width: ${150 / baseWidth}vw;
                    padding-bottom: ${50 / baseWidth}vw;
                    bottom: 50%;
                    margin-bottom: ${75 / baseWidth}vw;
                    left: ${1010 / baseWidth}vw;
                    
                }
                .item6{
                    padding: ${70 / baseWidth}vw; 0 0px;
                    top: 50%;
                    bottom: auto;
                    margin-bottom: 0;
                    margin-top: ${60 / baseWidth}vw;
                    left: ${1130 / baseWidth}vw;
                    .line{
                        height: ${50 / baseWidth}vw;
                   }
                }
            }
            .roadMap.show{
                opacity: 1
            }
        }

        .partnerBlock{
            background-image: url(${partnerBackground});
            background-size: ${1440 / baseWidth}vw ${836 / baseWidth}vw;
            background-position: 100% 50%;
            background-repeat: no-repeat;
        }

        .partnerContent{
            .content{
                width: ${594 / baseWidth}vw;
                min-height: 300px;
                margin-left: ${84 / baseWidth}vw;
                padding-top: ${100 / baseWidth}vw;
                h2{
                    font-size: ${32 / baseWidth}vw;
                    font-family: Roboto-Black, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: 900;
                    color: #FF6633;
                    line-height: ${38 / baseWidth}vw;
                    margin: 0px 0 ${6 / baseWidth}vw;
                }
                .partners{
                    width: ${645 / baseWidth}vw;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: flex-start;
                    .pitem{
                        width: ${190 / baseWidth}vw;
                        height: ${120 / baseWidth}vw;
                        text-align: center;
                        box-sizing: border-box;
                        padding: ${28 / baseWidth}vw;
                        background: #232323;
                        margin: ${18 / baseWidth}vw ${18 / baseWidth}vw 0 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            width: ${144 / baseWidth}vw;
                            height: ${24 / baseWidth}vw;
                            display: inline-block;
                        }
                    }
                    .pitem:nth-child(2){
                        img{
                            width: ${145 / baseWidth}vw;
                            height: ${40 / baseWidth}vw;
                        }
                    }
                    .pitem:nth-child(3){
                        img{
                            width: ${117 / baseWidth}vw;
                            height: ${84 / baseWidth}vw;
                        }
                    }
                    .pitem:nth-child(4){
                        img{
                            width: ${73 / baseWidth}vw;
                            height: ${74 / baseWidth}vw;
                        }
                    }
                    .pitem:nth-child(5){
                        img{
                            width: ${141 / baseWidth}vw;
                            height: ${64 / baseWidth}vw;
                        }
                    }
                    .pitem:nth-child(6){
                        img{
                            width: ${130 / baseWidth}vw;
                            height: auto;
                        }
                    }
                    .pitem:nth-child(7){
                        img{
                            width: ${103 / baseWidth}vw;
                            height: ${28 / baseWidth}vw;
                        }
                    }
                    .pitem:nth-child(8){
                        img{
                            width: ${141 / baseWidth}vw;
                            height: ${39 / baseWidth}vw;
                        }
                    }
                    .pitem:nth-child(9){
                        img{
                            width: ${120 / baseWidth}vw;
                            height: ${51 / baseWidth}vw;
                        }
                    }
                    .pitem:nth-child(10){
                        img{
                            width: ${119 / baseWidth}vw;
                            height: ${44 / baseWidth}vw;
                        }
                    }
                    .pitem:nth-child(11){
                        img{
                            width: ${107 / baseWidth}vw;
                            height: ${28 / baseWidth}vw;
                        }
                    }
                    .pitem:nth-child(12){
                        img{
                            width: ${74 / baseWidth}vw;
                            height: ${67 / baseWidth}vw;
                        }
                    }
                }
            }
            .nextBtn{
                bottom: ${48 / baseWidth}vw;
                left: ${70 / baseWidth}vw;
            }
        }
        .footWrap{
            .signWrap{
                height: calc(100vh - ${224 / baseWidth}vw);
                padding: ${250 / baseWidth}vw 0;
                box-sizing: border-box;
                text-align: center;
                background-image: url(${footerBackground});
                background-size: 100%;
                background-position: 50% 100%;
                background-repeat: no-repeat;
                position: relative;
                
                p{
                    font-size: ${22 / baseWidth}vw;
                    font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                    font-weight: 500;
                    color: #FFFFFF;
                    line-height: ${25 / baseWidth}vw;
                    width: 100%;
                    text-align: center;
                    position: absolute;
                    bottom: 0;
                    margin-bottom: ${360 / baseWidth}vw;
                }
                .inputWrap{
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    margin-left: ${-(439 + 154) / 2 / baseWidth}vw;
                    margin-bottom: ${300 / baseWidth}vw;
                    input{
                        height: ${48 / baseWidth}vw;
                        width: ${439 / baseWidth}vw;
                        line-height: ${48 / baseWidth}vw;
                        border: none;
                        outline: none;
                        background: rgba(216,216,216, .19);
                        padding-left: ${12 / baseWidth}vw;
                        font-size: ${18 / baseWidth}vw;
                        font-family: Roboto-Light, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                        font-weight: 300;
                        color: rgba(255,255,255, .6);
                        box-sizing: border-box;
                        border-radius: 0;
                        display: inline-block;
                        vertical-align: top;
                    }
                    input::placeholder{
                        font-size: ${18 / baseWidth}vw;
                        font-family: Roboto-Light, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                        font-weight: 300;
                        color: rgba(255,255,255, .22);
                        line-height: ${21 / baseWidth}vw;
                    }
                    .MuiOutlinedInput-root{
                        .MuiOutlinedInput-notchedOutline{
                            border:none;
                        }
                    }
                    .MuiOutlinedInput-root.Mui-focused {
                        background-color: none;
                        padding: 0;
                        border:none;
                        margin-top: 0px;
                        .MuiOutlinedInput-notchedOutline{
                            border:none
                        }
                    }
                    .MuiOutlinedInput-root:hover{
                        .MuiOutlinedInput-notchedOutline{
                            border:none;
                        }
                    }
                    .MuiOutlinedInput-root.Mui-error{
                        .MuiOutlinedInput-notchedOutline{
                            border:1px solid #d32f2f;
                        }
                    }
                    
                    .signBtn{
                        height: ${48 / baseWidth}vw;
                        width: ${154 / baseWidth}vw;
                        display: inline-block;
                        vertical-align: top;
                        background: #FF6633;
                        font-size: ${16 / baseWidth}vw;
                        font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                        font-weight: 400;
                        color: #FFFFFF;
                        line-height: ${48 / baseWidth}vw;
                        cursor: pointer;
                    }
                    .signBtn:hover{
                        background: #fa7a4f;
                    }
                    .signBtn:active{
                        background: #913719;
                    }
                }
            }
            .footerInfo{
                height: ${224 / baseWidth}vw;
                background: #111111;
                display: flex;
                box-sizing: border-box;
                padding: ${43 / baseWidth}vw 0;
                .footerLogo{
                    width: ${350 / baseWidth}vw;
                    height: ${138 / baseWidth}vw;
                    text-align: center;
                    border-right: 1px solid rgba(151,151,151, .43);
                    img{
                        width: ${110 / baseWidth}vw;
                        height: ${94 / baseWidth}vw;
                    }
                    p{
                        font-size: ${14 / baseWidth}vw;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #D0D0D0;
                        line-height: ${20 / baseWidth}vw;
                        margin-top: ${25 / baseWidth}vw;
                    }
                }
                .bref{
                    width: ${555 / baseWidth}vw;
                    height: ${138 / baseWidth}vw;
                    border-sizing: border-box;
                    padding: 0 ${90 / baseWidth}vw 0 ${55 / baseWidth}vw;
                    border-right: 1px solid rgba(151,151,151, .43);
                    p{
                        font-size: ${16 / baseWidth}vw;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: rgba(208,208,208, .6);
                        line-height: ${22 / baseWidth}vw;
                    }
                    p:nth-child(2){
                        font-size: ${14 / baseWidth}vw;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #FFFFFF;
                        line-height: ${20 / baseWidth}vw;
                        margin-top: ${30 / baseWidth}vw;
                    }
                }
                .links{
                    width: ${529 / baseWidth}vw;
                    height: ${138 / baseWidth}vw;
                    border-sizing: border-box;
                    padding: 0 ${100 / baseWidth}vw 0 ${55 / baseWidth}vw;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    ul{
                        li{
                            font-size: ${16 / baseWidth}vw;
                            font-family: Roboto-Medium, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                            font-weight: 500;
                            color: rgba(255, 255, 255, .8);
                            line-height: ${20 / baseWidth}vw;
                            margin-bottom: ${8 / baseWidth}vw;
                            a{
                                font-size: ${14 / baseWidth}vw;
                                font-family: PingFangSC-Regular, PingFang SC;
                                font-weight: 400;
                                color: rgba(255, 255, 255, .6);
                                line-height: ${20 / baseWidth}vw;
                                img{
                                    width: ${20 / baseWidth}vw;
                                    height: ${18 / baseWidth}vw;
                                    display: inline-block;
                                    vertical-align: middle;
                                    margin-right: ${8 / baseWidth}vw;
                                }
                            }
                        }
                        li:nth-child(1){
                            margin-bottom: ${16 / baseWidth}vw;
                            a{
                                img{
                                    width: ${19 / baseWidth}vw;
                                    height: ${16 / baseWidth}vw;
                                }
                            }
                        }
                        li:nth-child(4){
                            a{
                                img{
                                    width: ${23 / baseWidth}vw;
                                    height: ${17 / baseWidth}vw;
                                }
                            }
                        }
                    }
                    ul:nth-child(3){
                        li{
                            margin-bottom: ${11 / baseWidth}vw;
                        }
                        li:nth-child(1){
                            margin-bottom: ${18 / baseWidth}vw;
                        }
                    }
                }
                
            }
        }

        .toTop{
            position: fixed;
            width: 35px;
            height: 35px;
            border-radius: 60px;
            bottom: 40px;
            right: 40px;
            cursor: pointer;
            img{
                width: 35px;
                height: 35px;
            }
        }
        .toastWrap{
            position: fixed;
            // width: 60px;
            // height: 50px;
            // background: #FFFFFF;
            text-align: center;
            top: 90px;
            left:0;
            right:0;
            margin: 0 auto;
            
            box-sizing: border-box;
            
            .closeBtn{
                width: 16px;
                height: 16px;
                display: block;
                position: relative;
                float: right;
                margin-bottom: 16px;
                cursor: pointer;
                span{
                    position: absolute;
                    top: 8px;
                    height:1px;
                    width:16px;
                    display: block;
                    background: #888888;
                    transform: rotate(45deg);
                }
                span:nth-child(2){
                    transform: rotate(-45deg);
                }
            }
            .content{
                padding: 0;
                display: inline-block;
                text-align: center;
                background-color: #1D1D1F;
                opacity: .8;
                padding: 20px;
                border : 1px solid rgba(255,255,255, .4);
                border-radius: 6px;
                box-shadow:0 0 10px rgba(255, 255, 255, 0.2);
            }
            img{
                width: 30px;
                height: 30px;
                display: inline-block;
                vertical-align: middle;
                margin: 0 20px 0px 0;
            }
            span.tip{
                display: inline-block;
                font-size: 20px;
                font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
                font-weight: 400;
                // color: #111111;
                color: #ffffff;
                height: 24px;
                line-height: 24px;
            }
        }
        .toastWrap.hidden{display:none;}
        .toastWrap.show{display:block}
        @media screen and (min-width: 1536px) {
            .roadmapContent{
                .roadMap{
                    margin-top: ${50 / baseWidth}vw;
                }
            }
            .partnerContent{
                .content{
                    width: ${594 / baseWidth1920}vw;
                    margin-left: ${84 / baseWidth1920}vw;
                    padding-top: ${100 / baseWidth1920}vw;
                    .partners{
                        width: ${675 / baseWidth1920}vw;
                        .pitem{
                            width: ${204 / baseWidth1920}vw;
                            height: ${140 / baseWidth1920}vw;
                            padding: ${28 / baseWidth1920}vw;
                            margin: ${18 / baseWidth1920}vw ${
  18 / baseWidth1920
}vw 0 0;
                            img{
                                width: ${149 / baseWidth1920}vw;
                                height: ${25 / baseWidth1920}vw;
                                display: inline-block;
                            }
                        }
                        .pitem:nth-child(2){
                            img{
                                width: ${150 / baseWidth1920}vw;
                                height: ${42 / baseWidth1920}vw;
                            }
                        }
                        .pitem:nth-child(3){
                            img{
                                width: ${120 / baseWidth1920}vw;
                                height: ${87 / baseWidth1920}vw;
                            }
                        }
                        .pitem:nth-child(4){
                            img{
                                width: ${76 / baseWidth1920}vw;
                                height: ${77 / baseWidth1920}vw;
                            }
                        }
                        .pitem:nth-child(5){
                        img{
                                width: ${146 / baseWidth1920}vw;
                                height: ${67 / baseWidth1920}vw;
                            }
                        }
                        .pitem:nth-child(6){
                            img{
                                width: ${135 / baseWidth1920}vw;
                                height: auto;
                            }
                        }
                        .pitem:nth-child(7){
                            img{
                                width: ${107 / baseWidth1920}vw;
                                height: ${30 / baseWidth1920}vw;
                            }
                        }
                        .pitem:nth-child(8){
                            img{
                                width: ${146 / baseWidth1920}vw;
                                height: ${41 / baseWidth1920}vw;
                            }
                        }
                        .pitem:nth-child(9){
                            img{
                                width: ${126 / baseWidth1920}vw;
                                height: ${56 / baseWidth1920}vw;
                            }
                        }
                        .pitem:nth-child(10){
                            img{
                                width: ${125 / baseWidth1920}vw;
                                height: ${45 / baseWidth1920}vw;
                            }
                        }
                        .pitem:nth-child(11){
                            img{
                                width: ${110 / baseWidth1920}vw;
                                height: ${29 / baseWidth1920}vw;
                            }
                        }
                        .pitem:nth-child(12){
                            img{
                                width: ${84 / baseWidth1920}vw;
                                height: ${70 / baseWidth1920}vw;
                            }
                        }
                    }
                }
            }
        }
        @media screen and (max-width: 1024px) {
            .header {
                padding: 0 5px;
                .logo{
                    order: 1;
                }
                .nav{
                    order: 0;
                }
                .support{
                    width: auto;
                    padding: 0 15px;
                    order: 2;
                    ul{
                        width: 100%;
                        left: 0;
                    }
                }
            }
            .contentWrap{
                height: 100vh;
                .nextBtn{
                    bottom: ${30 / baseWidth750}vw;
                    left: ${30 / baseWidth750}vw;
                    img{
                        width: ${20 / baseWidth750}vw;
                        height: ${20 / baseWidth750}vw;
                        margin-right: ${16 / baseWidth750}vw;
                    }
                    .txt{
                        font-size: ${14 / baseWidth750}vw;
                        line-height: ${20 / baseWidth750}vw;
                    }
                }
            }
            .bannerBlock{
                background-size: 100% auto;
                background-position: 50% 100%;
            }
            .bannerContent {
                padding-top: ${30 / baseWidth750}vw;
                .content{
                    width: 100%;
                    min-height: 300px;
                    padding:0 ${30 / baseWidth750}vw;
                    margin-top: 19vh;
                    margin-left: 0;
                    p{
                        font-size: ${18 / baseWidth750}vw;
                        line-height: ${24 / baseWidth750}vw;
                    }
                    .desc{
                        line-height: ${26 / baseWidth750}vw;
                    }
                    h2,h3{
                        font-size: ${30 / baseWidth750}vw;
                        line-height: ${38 / baseWidth750}vw;
                    }
                    h2{
                        margin-top: 5px;
                    }
                    h3{
                        margin-bottom:15px;
                    }
                    .launchBtn{
                        width: ${180 / baseWidth750}vw;
                        height: ${40 / baseWidth750}vw;
                        margin-top: ${55 / baseWidth750}vw;
                        font-size: ${14 / baseWidth750}vw;
                        line-height: ${40 / baseWidth750}vw;
                        img{
                            margin-left: ${32 / baseWidth750}vw;
                            width: ${17 / baseWidth750}vw;
                            height: ${14 / baseWidth750}vw;
                        }
                    }
                }
            }
            
            .dmailBlock{
                background-size:  100%  auto;
                background-position: 100% 100%;
            }
    
            .dmailContent{
                .content{
                    width: 65%;
                    margin-left: ${30 / baseWidth750}vw;
                    padding-top: ${100 / baseWidth750}vw;
                    p{
                        font-size: ${12 / baseWidth750}vw;
                        line-height: ${18 / baseWidth750}vw;
                    }
                    p.desc{
                        font-size: ${12 / baseWidth750}vw;
                        line-height: ${16 / baseWidth750}vw;
                    }
                    h2{
                        font-size: ${32 / baseWidth750}vw;
                        line-height: ${40 / baseWidth750}vw;
                        margin: 5px 0 ${10 / baseWidth750}vw;
                    }
                    .dmailItem{
                        margin-top: ${20 / baseWidth750}vw;
                        .item{
                            margin-top: ${20 / baseWidth750}vw;
                            >div{
                                width: ${40 / baseWidth750}vw;
                                margin-right: ${10 / baseWidth750}vw;
                            }
                            img{
                                width: ${56 / 2 / baseWidth750}vw;
                                height: ${54 / 2 / baseWidth750}vw;
                            }
                            .txt{
                                font-size: ${14 / 1.5 / baseWidth750}vw;
                                line-height: ${20 / baseWidth750}vw;
                            }
                        }
                        .item2{
                            img{
                                width: ${56 / 2 / baseWidth750}vw;
                                height: ${62 / 2 / baseWidth750}vw;
                            }
                        }
                        .item3{
                            img{
                                width: ${65 / 2 / baseWidth750}vw;
                                height: ${57 / 2 / baseWidth750}vw;
                            }
                        }
                        .item4{
                            img{
                                width: ${42 / 2 / baseWidth750}vw;
                                height: ${61 / 2 / baseWidth750}vw;
                            }
                        }
                    }
    
                }
            }

            .workBlock{
                background-size: 100% auto;
                background-position: 100% 100%;
            }
    
            .workContent{
                .content{
                    width: 70%;
                    min-height: 300px;
                    margin-left: ${30 / baseWidth750}vw;
                    padding-top: ${100 / baseWidth750}vw;
                    p{
                        font-size: ${14 / baseWidth750}vw;
                        line-height: ${18 / baseWidth750}vw;
                    }
                    p.desc{
                        font-size: ${12 / baseWidth750}vw;
                        line-height: ${18 / baseWidth750}vw;
                        letter-spacing: 1px;
                    }
                    h2{
                        font-size: ${32 / baseWidth750}vw;
                        line-height: ${40 / baseWidth750}vw;
                        margin: 5px 0 ${20 / baseWidth750}vw;
                    }
                }
            }

            .highlightBlock{
                background-image: linear-gradient(to top, rgba(29,29,31, .8), rgba(29,29,31, .8)), url(${highBackground});
                background-size: 100% auto;
                background-position: 100% 50%;
            }
    
            .highlightContent{
                .title{
                    position: relative;
                    top: 0;
                    left: 0;
                    right: auto;
                    margin-left: 0;
                    padding: ${70 / baseWidth750}vw ${30 / baseWidth750}vw 0;
                    p{
                        font-size: ${14 / baseWidth750}vw;
                        line-height: ${22 / baseWidth750}vw;
                    }
                    h2{
                        font-size: ${28 / baseWidth750}vw;
                        line-height: ${30 / baseWidth750}vw;
                    }
                }
                .content{
                    width: 100%;
                    box-sizing: border-box;
                    margin-left: 0;
                    padding-left: ${20 / baseWidth750}vw;
                    padding-right: ${20 / baseWidth750}vw;
                    padding-top: ${10 / baseWidth750}vw;
                    .highlightItem{
                        .item{
                            width: 33%;
                            padding: 0 5px 0;
                            margin-top: ${5 / baseWidth750}vw;
                            margin-bottom: ${15 / baseWidth750}vw;
                            >div{
                                height: ${62 / 2 / baseWidth750}vw;
                            }
                            img{
                                width: ${59 / 2 / baseWidth750}vw;
                                height: ${64 / 2 / baseWidth750}vw;
                            }
                            h3{
                                font-size: ${14 / baseWidth750}vw;
                                line-height: ${18 / baseWidth750}vw;
                                margin: ${8 / baseWidth750}vw 0 ${
  4 / baseWidth750
}vw;
                            }
                            p{
                                font-size: ${12 / baseWidth750}vw;
                                line-height: ${18 / baseWidth750}vw;
                                
                            }
                        }
                        .item2{
                            img{
                                width: ${62 / 2 / baseWidth750}vw;
                                height: ${54 / 2 / baseWidth750}vw;
                            }
                        }
                        .item3{
                            img{
                                width: ${49 / 2 / baseWidth750}vw;
                                height: ${63 / 2 / baseWidth750}vw;
                            }
                        }
                        .item4{
                            img{
                                width: ${55 / 2 / baseWidth750}vw;
                                height: ${58 / 2 / baseWidth750}vw;
                            }
                        }
                        .item5{
                            img{
                                width: ${52 / 2 / baseWidth750}vw;
                                height: ${61 / 2 / baseWidth750}vw;
                            }
                        }
                        .item6{
                            img{
                                width: ${59 / 2 / baseWidth750}vw;
                                height: ${56 / 2 / baseWidth750}vw;
                            }
                        }
                        .item7{
                            img{
                                width: ${55 / 2 / baseWidth750}vw;
                                height: ${60 / 2 / baseWidth750}vw;
                            }
                        }
                        .item8{
                            img{
                                width: ${58 / 2 / baseWidth750}vw;
                                height: ${56 / 2 / baseWidth750}vw;
                            }
                        }
                        .item9{
                            img{
                                width: ${44 / 2 / baseWidth750}vw;
                                height: ${56 / 2 / baseWidth750}vw;
                            }
                        }
                        .item:nth-child(1), .item:nth-child(2){
                            width: 30%;
                            margin-right: 0;
                            p{
                                width: 100%;
                            }
                        }
                        .item:nth-child(3){
                            width: 40%;
                            p{
                                width: 100%;
                            }
                        }
                    }
                }
                .nextBtn{
                    left: ${20 / baseWidth750}vw;
                    right: auto;
                    bottom: ${15 / baseWidth750}vw;
                }
            }
    
            .roadmapContent{
                height: 100vh;
                padding-top: 0;
                .content{
                    width: 50%;
                    min-height: ${110 / baseWidth750}vw;
                    margin-left: ${30 / baseWidth750}vw;
                    padding-top: ${80 / baseWidth750}vw;
                    p{
                        font-size: ${14 / baseWidth750}vw;
                        line-height: ${20 / baseWidth750}vw;
                    }
                    h2{
                        font-size: ${28 / baseWidth750}vw;
                        line-height: ${30 / baseWidth750}vw;
                        margin: 5px 0 ${10 / baseWidth750}vw;
                    }
                }
                .roadMap{
                    width: 100%;
                    background-image: url(${roadmapBackground});
                    background-size: 100% auto;
                    background-position: 100% 50%;
                    height: calc(100vh - ${350 / baseWidth750}vw);
                    .item{
                        width: ${120 / baseWidth750}vw;
                        padding-bottom: ${45 / baseWidth750}vw;
                        margin-bottom: ${45 / baseWidth750}vw;
                        left: ${55 / baseWidth750}vw;
                       h3{
                        font-size: ${14 / baseWidth750}vw;
                        line-height: ${18 / baseWidth750}vw;
                        margin-bottom: ${6 / baseWidth750}vw;
                       }
                       p{
                        font-size: ${12 / baseWidth750}vw;
                        line-height: ${14 / baseWidth750}vw;
                       }
                       .line{
                            width: 0;
                            height: ${27 / baseWidth750}vw;
                            bottom: ${7 / baseWidth750}vw;
                            left: 30%;
                       }
                       .circle{
                            width: ${8 / baseWidth750}vw;
                            height: ${8 / baseWidth750}vw;
                            left: 30%;
                            margin-left: -${4 / baseWidth750}vw;
                       }
                    }
                    .item.bottom{
                        .line{
                            bottom: auto;
                            top: ${4 / baseWidth750}vw;
                            left: 50%;
                       }
                       .circle{
                            bottom: auto;
                            top: 0;
                            left: 50%;
                            margin-left: -${8 / baseWidth750}vw;
                        }
                    }
                    .item2.bottom{
                        width: ${160 / baseWidth750}vw;
                        padding: ${50 / baseWidth750}vw 0 0px;
                        top: 50%;
                        bottom: auto;
                        margin-bottom: 0;
                        margin-top: ${20 / baseWidth750}vw;
                        left: ${160 / baseWidth750}vw;
                        .line{
                            height: ${40 / baseWidth750}vw;
                            left: 50%;
                            margin-left: -${40 / baseWidth750}vw;
                        }
                       .circle{
                            left: 50%;
                            margin-left: -${43 / baseWidth750}vw;
                        }
                    }
                    .item3{
                        padding-bottom: ${50 / baseWidth750}vw;
                        bottom: 50%;
                        margin-bottom: ${25 / baseWidth750}vw;
                        left: ${280 / baseWidth750}vw;
                    }
                    .item4.bottom{
                        width: ${160 / baseWidth750}vw;
                        padding: ${50 / baseWidth750}vw 0 0px;
                        margin-top: ${16 / baseWidth750}vw;
                        left: ${380 / baseWidth750}vw;
                        .line{
                            height: ${40 / baseWidth750}vw;
                            margin-left: -${41 / baseWidth750}vw;
                        }
                        .circle{
                            left: 50%;
                            margin-left: -${44 / baseWidth750}vw;
                        }
                    }
                    .item5{
                        width: ${150 / baseWidth750}vw;
                        padding-bottom: ${40 / baseWidth750}vw;
                        bottom: 50%;
                        margin-bottom: ${40 / baseWidth750}vw;
                        left: ${530 / baseWidth750}vw;
                    }
                    .item6.bottom{
                        padding: ${40 / baseWidth750}vw 0 0px;
                        margin-top: ${30 / baseWidth750}vw;
                        left: ${610 / baseWidth750}vw;
                        .line{
                            height: ${30 / baseWidth750}vw;
                            margin-left: -${20 / baseWidth750}vw;
                        }
                        .circle{
                            left: 50%;
                            margin-left: -${24 / baseWidth750}vw;
                        }
                    }
                }
            }
            .partnerContent{
                .content{
                    min-height: 300px;
                    margin-left: ${30 / baseWidth750}vw;
                    padding-top: ${60 / baseWidth750}vw;
                    .partners{
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        justify-content: flex-end;
                    }
                }
            }

        }


        @media screen and (max-width: 750px) {
            .pageWrap {
                height: 100vh;
                width: 100%;
            }
            .contentWrap{
                height: 100vh;
                padding-top: 0;
                position: relative;
                box-sizing: border-box;
    
                .nextBtn{
                    bottom: ${40 / baseWidth750}vw;
                    left: ${40 / baseWidth750}vw;
                    img{
                        width: ${45 / baseWidth750}vw;
                        height: ${45 / baseWidth750}vw;
                        margin-right: ${16 / baseWidth750}vw;
                    }
                    .txt{
                        font-size: ${18 / baseWidth750}vw;
                        line-height: ${40 / baseWidth750}vw;
                    }
                }
            }
            .bannerBlock{
                height: 100vh;
                background-size: 100% auto;
                background-position: 50% 100%;
            }
            .bannerContent {
                padding-top: 0;
                height: 100vh;
                .content{
                    width: 100%;
                    min-height: 300px;
                    padding:${220 / baseWidth750}vw ${30 / baseWidth750}vw 0;
                    margin-top: 0;
                    margin-left: 0;
                    box-sizing: border-box;
                    p{
                        font-size: ${(12 * 2) / baseWidth750}vw;
                        line-height: ${(16 * 2) / baseWidth750}vw;
                    }
                    .desc{
                        line-height: ${(16 * 2) / baseWidth750}vw;
                    }
                    h2,h3{
                        font-size: ${(26 * 1.8) / baseWidth750}vw;
                        line-height: ${(34 * 2) / baseWidth750}vw;
                    }
                    h2{
                        margin-top: 5px;
                    }
                    h3{
                        margin-bottom:15px;
                    }
                    .launchBtn{
                        width: ${(100 * 2) / baseWidth750}vw;
                        height: ${(25 * 2) / baseWidth750}vw;
                        margin-top: ${55 / baseWidth750}vw;
                        font-size: ${16 / baseWidth750}vw;
                        line-height: ${(25 * 2) / baseWidth750}vw;
                        img{
                            margin-left: ${32 / baseWidth750}vw;
                            width: ${17 / baseWidth750}vw;
                            height: ${14 / baseWidth750}vw;
                        }
                    }
                }
            }
            
            .dmailBlock{
                background-size:  100%  auto;
                background-position: 100% 100%;
            }
    
            .dmailContent{
                .content{
                    width: 100%;
                    margin-left: 0;
                    padding: ${150 / baseWidth750}vw ${30 / baseWidth750}vw 0;
                    box-sizing: border-box;
                    p{
                        font-size: ${(14 * 1.5) / baseWidth750}vw;
                        line-height: ${(18 * 1.5) / baseWidth750}vw;
                    }
                    p.desc{
                        line-height: ${(24 * 1.5) / baseWidth750}vw;
                    }
                    h2{
                        font-size: ${(32 * 1.5) / baseWidth750}vw;
                        line-height: ${(38 * 1.5) / baseWidth750}vw;
                        margin: 5px 0 ${(10 * 1.5) / baseWidth750}vw;
                    }
                    .dmailItem{
                        margin-top: ${(15 * 1.5) / baseWidth750}vw;
                        .item{
                            margin-top: ${(20 * 1.5) / baseWidth750}vw;
                            >div{
                                width: ${(40 * 1.5) / baseWidth750}vw;
                                margin-right: ${(10 * 1.5) / baseWidth750}vw;
                                display: block;
                            }
                            img{
                                width: ${56 / baseWidth750}vw;
                                height: ${54 / baseWidth750}vw;
                            }
                            .txt{
                                font-size: ${(14 * 1.5) / baseWidth750}vw;
                                line-height: ${(20 * 1.5) / baseWidth750}vw;
                            }
                        }
                        .item2{
                            img{
                                width: ${56 / baseWidth750}vw;
                                height: ${62 / baseWidth750}vw;
                            }
                        }
                        .item3{
                            img{
                                width: ${65 / baseWidth750}vw;
                                height: ${57 / baseWidth750}vw;
                            }
                        }
                        .item4{
                            img{
                                width: ${42 / baseWidth750}vw;
                                height: ${61 / baseWidth750}vw;
                            }
                        }
                    }
    
                }
            }

            .workBlock{
                background-size: 120% auto;
                background-position: 100% 100%;
            }
    
            .workContent{
                .content{
                    width: 100%;
                    min-height: 300px;
                    margin-left: 0;
                    padding: ${150 / baseWidth750}vw ${30 / baseWidth750}vw 0;
                    box-sizing: border-box;
                    p{
                        font-size: ${(16 * 1.5) / baseWidth750}vw;
                        line-height: ${(18 * 1.5) / baseWidth750}vw;
                    }
                    p.desc{
                        font-size: ${(14 * 1.5) / baseWidth750}vw;
                        line-height: ${(20 * 1.5) / baseWidth750}vw;
                        letter-spacing: 1px;
                    }
                    h2{
                        font-size: ${(32 * 1.5) / baseWidth750}vw;
                        line-height: ${(38 * 1.5) / baseWidth750}vw;
                        margin: 5px 0 ${(20 * 1.5) / baseWidth750}vw;
                    }
                }
            }

            .highlightBlock{
                background-image: linear-gradient(to top, rgba(29,29,31, .8), rgba(29,29,31, .8)), url(${highBackground});
                background-size: 150% auto;
                background-position: 100% 50%;
            }
    
            .highlightContent{
                .title{
                    position: relative;
                    top: 0;
                    left: 0;
                    right: auto;
                    margin-left: 0;
                    padding: ${150 / baseWidth750}vw ${30 / baseWidth750}vw 0;
                    p{
                        font-size: ${(16 * 1.5) / baseWidth750}vw;
                        line-height: ${(22 * 1.5) / baseWidth750}vw;
                    }
                    h2{
                        font-size: ${(38 * 1.5) / baseWidth750}vw;
                        line-height: ${(45 * 1.5) / baseWidth750}vw;
                    }
                }
                .content{
                    width: 100%;
                    box-sizing: border-box;
                    margin-left: 0;
                    padding: ${(20 * 1.5) / baseWidth750}vw ${
  30 / baseWidth750
}vw;
                    .highlightItem{
                        display: block;
                        .item{
                            width: 100%;
                            padding: 0 5px 0;
                            margin-top: ${(5 * 1.5) / baseWidth750}vw;
                            >div{
                                height: ${62 / baseWidth750}vw;
                                width: ${62 / baseWidth750}vw;
                                float: left;
                                align-items: center;
                                text-align: center;
                            }
                            img{
                                width: ${59 / 1.5 / baseWidth750}vw;
                                height: ${64 / 1.5 / baseWidth750}vw;
                                display: inline-block;
                                vertical-align: middle;
                                
                            }
                            h3{
                                font-size: ${(14 * 1.5) / baseWidth750}vw;
                                line-height: ${(18 * 1.5) / baseWidth750}vw;
                                margin: ${(8 * 1.5) / baseWidth750}vw 0 ${
  4 / baseWidth750
}vw;
                                margin-left: ${62 / baseWidth750}vw;
                            }
                            p{
                                display: none;
                                font-size: ${(12 * 1.5) / baseWidth750}vw;
                                line-height: ${(14 * 1.5) / baseWidth750}vw;
                                margin-left: ${62 / baseWidth750}vw;
                            }
                        }
                        .item2{
                            img{
                                width: ${62 / 1.5 / baseWidth750}vw;
                                height: ${54 / 1.5 / baseWidth750}vw;
                            }
                        }
                        .item3{
                            img{
                                width: ${49 / 1.5 / baseWidth750}vw;
                                height: ${63 / 1.5 / baseWidth750}vw;
                            }
                        }
                        .item4{
                            img{
                                width: ${55 / 1.5 / baseWidth750}vw;
                                height: ${58 / 1.5 / baseWidth750}vw;
                            }
                        }
                        .item5{
                            img{
                                width: ${52 / 1.5 / baseWidth750}vw;
                                height: ${61 / 1.5 / baseWidth750}vw;
                            }
                        }
                        .item6{
                            img{
                                width: ${59 / 1.5 / baseWidth750}vw;
                                height: ${56 / 1.5 / baseWidth750}vw;
                            }
                        }
                        .item7{
                            img{
                                width: ${55 / 1.5 / baseWidth750}vw;
                                height: ${60 / 1.5 / baseWidth750}vw;
                            }
                        }
                        .item8{
                            img{
                                width: ${58 / 1.5 / baseWidth750}vw;
                                height: ${56 / 1.5 / baseWidth750}vw;
                            }
                        }
                        .item9{
                            img{
                                width: ${44 / 1.5 / baseWidth750}vw;
                                height: ${56 / 1.5 / baseWidth750}vw;
                            }
                        }
                        .item:nth-child(1), .item:nth-child(2){
                            width: 100%;
                        }
                        .item:nth-child(3){
                            width: 100%;
                        }
                    }
                }
                .nextBtn{
                    // left: ${(30 * 2) / baseWidth750}vw;
                    right: auto;
                }
            }
    
            .roadmapContent{
                padding-top: 0;
                .content{
                    width: 100%;
                    min-height: ${(100 * 1.5) / baseWidth750}vw;
                    margin-left: ${(30 * 1.5) / baseWidth750}vw;
                    padding-top: ${150 / baseWidth750}vw;
                    p{
                        font-size: ${(18 * 1.5) / baseWidth750}vw;
                        line-height: ${(20 * 1.5) / baseWidth750}vw;
                    }
                    h2{
                        font-size: ${(36 * 1.5) / baseWidth750}vw;
                        line-height: ${(45 * 1.5) / baseWidth750}vw;
                        margin: 5px 0 ${(20 * 1.5) / baseWidth750}vw;
                    }
                }
                .roadMap{
                    width: 100%;
                    background-image: none;
                    background-size: 100% auto;
                    background-position: 100% 50%;
                    height: calc(100vh - ${290 / baseWidth750}vw);
                    .line{
                        height: calc(100vh - ${290 / baseWidth750}vw);
                        border-left: 1px solid #FF6633;
                        left: 50%;
                        bottom: 0;
                        width: 1px;
                        position: absolute;
                    }
                    .item{
                        width: 50%;
                        padding-bottom: 0;
                        margin-bottom: 0;
                        top: 2%;
                        left: auto;
                        right: 50%;
                        margin-right: -${8 / baseWidth750}vw;
                        box-sizing: border-box;
                        text-align: right;
                        padding-right: ${(35 * 1.5) / baseWidth750}vw;

                       h3{
                        font-size: ${(16 * 1.5) / baseWidth750}vw;
                        line-height: ${(20 * 1.5) / baseWidth750}vw;
                        margin-bottom: ${(6 * 1.5) / baseWidth750}vw;
                       }
                       p{
                        font-size: ${(12 * 1.5) / baseWidth750}vw;
                        line-height: ${(18 * 1.5) / baseWidth750}vw;
                       }
                       .line{
                            width: ${(27 * 1.5) / baseWidth750}vw;
                            height: 0;
                            bottom: auto;
                            top: ${16 / baseWidth750}vw;
                            left: auto;
                            right: 0;
                            border-top: 1px solid #FF6633;
                            
                       }
                       .circle{
                            width: ${(8 * 2) / baseWidth750}vw;
                            height: ${(8 * 2) / baseWidth750}vw;
                            left: auto;
                            right: 0;
                            bottom: auto;
                            top: ${16 / 2 / baseWidth750}vw;
                            margin-left: 0;
                       }
                    }
                    .item.bottom{
                        width: 50%;
                        text-align: left;
                        left: 50%;
                        right: auto;
                        margin-left: -${8 / baseWidth750}vw;
                        padding: 0 0 0 ${(35 * 1.5) / baseWidth750}vw;
                        .line{
                            bottom: auto;
                            top: ${16 / baseWidth750}vw;
                            left: 0;
                            right: auto;
                            width: ${(27 * 1.5) / baseWidth750}vw;
                            height: 0;
                            border-top: 1px solid #FF6633;
                            margin-left:0;
                       }
                       .circle{
                            top: ${16 / 2 / baseWidth750}vw;
                            left: 0%;
                            margin-left: 0;
                        }
                    }
                    .item2.bottom{
                       top: 13%;
                    }
                    .item3{
                        top: 30%;
                    }
                    .item4.bottom{
                        top: 45%;
                    }
                    .item5{
                        top: 65%;
                    }
                    .item6.bottom{
                        top: 80%;
                    }
                }
            }
            .toastWrap{
                width: 280px;
                height: auto;
                border-radius: 6px;
                left: 50%;
                padding: 8px 8px 32px;
                margin-left: -140px;
                .content{
                    padding: 32px 10px 0;
                }
                img{
                    width: 24px;
                    height: 24px;
                }
                span.tip{
                    font-size: 14px;
                    height: 46px;
                    line-height: 46px;
                }
            }
        }


        @media screen and (max-width: 414px) {
            .pageWrap {
                height: 100vh;
                width: 100%;
            }
            .contentWrap{
                height: 100vh;
                padding-top: 110px;
                position: relative;
                box-sizing: border-box;
    
                .nextBtn{
                    bottom: ${(40 * 2) / baseWidth750}vw;
                    left: ${40 / baseWidth750}vw;
                    img{
                        width: ${45 / baseWidth750}vw;
                        height: ${45 / baseWidth750}vw;
                        margin-right: ${16 / baseWidth750}vw;
                    }
                    .txt{
                        font-size: ${(18 * 1.5) / baseWidth750}vw;
                        line-height: ${40 / baseWidth750}vw;
                    }
                }
            }
            .bannerBlock{
                height: 100vh;
                background-size: 140% auto;
                background-position: 100% 100%;
            }
            .bannerContent {
                padding-top: 67px;
                height: 100vh;
                .content{
                    width: 100%;
                    min-height: 300px;
                    padding: ${150 / baseWidth750}vw ${
  (30 * 2) / baseWidth750
}vw 0;
                    margin-top: 0;
                    margin-left: 0;
                    box-sizing: border-box;
                    p{
                        font-size: ${(14 * 2) / baseWidth750}vw;
                        line-height: ${(24 * 2) / baseWidth750}vw;
                    }
                    .desc{
                        line-height: ${(24 * 2) / baseWidth750}vw;
                    }
                    h2,h3{
                        font-size: ${(30 * 1.5) / baseWidth750}vw;
                        line-height: ${(38 * 2) / baseWidth750}vw;
                    }
                    h2{
                        margin-top: 5px;
                    }
                    h3{
                        margin-bottom:15px;
                    }
                    .launchBtn{
                        width: ${(180 * 2) / baseWidth750}vw;
                        height: ${(40 * 2) / baseWidth750}vw;
                        margin-top: ${(55 * 2) / baseWidth750}vw;
                        font-size: ${(14 * 2) / baseWidth750}vw;
                        line-height: ${(40 * 2) / baseWidth750}vw;
                        img{
                            margin-left: ${(32 * 2) / baseWidth750}vw;
                            width: ${(17 * 2) / baseWidth750}vw;
                            height: ${(14 * 2) / baseWidth750}vw;
                        }
                    }
                }
            }
            
            .dmailBlock{
                background-size:  100%  auto;
                background-position: 100% 100%;
            }
    
            .dmailContent{
                .content{
                    width: 100%;
                    margin-left: 0;
                    padding: ${150 / baseWidth750}vw ${
  (30 * 2) / baseWidth750
}vw 0;
                    box-sizing: border-box;
                    p{
                        font-size: ${(14 * 2) / baseWidth750}vw;
                        line-height: ${(18 * 2) / baseWidth750}vw;
                    }
                    p.desc{
                        font-size: ${(14 * 2) / baseWidth750}vw;
                        line-height: ${(18 * 2) / baseWidth750}vw;
                    }
                    h2{
                        font-size: ${(30 * 2) / baseWidth750}vw;
                        line-height: ${(36 * 2) / baseWidth750}vw;
                        margin: 5px 0 ${(10 * 2) / baseWidth750}vw;
                    }
                    .dmailItem{
                        margin-top: ${(15 * 2) / baseWidth750}vw;
                        .item{
                            margin-top: ${(20 * 2) / baseWidth750}vw;
                            >div{
                                width: ${(40 * 2) / baseWidth750}vw;
                                margin-right: ${(10 * 2) / baseWidth750}vw;
                                display: block;
                            }
                            img{
                                width: ${(56 * 2) / 1.5 / baseWidth750}vw;
                                height: ${(54 * 2) / 1.5 / baseWidth750}vw;
                            }
                            .txt{
                                font-size: ${(14 * 2) / baseWidth750}vw;
                                line-height: ${(20 * 2) / baseWidth750}vw;
                            }
                        }
                        .item2{
                            img{
                                width: ${(56 * 2) / 1.5 / baseWidth750}vw;
                                height: ${(62 * 2) / 1.5 / baseWidth750}vw;
                            }
                        }
                        .item3{
                            img{
                                width: ${(65 * 2) / 1.5 / baseWidth750}vw;
                                height: ${(57 * 2) / 1.5 / baseWidth750}vw;
                            }
                        }
                        .item4{
                            img{
                                width: ${(42 * 2) / 1.5 / baseWidth750}vw;
                                height: ${(61 * 2) / 1.5 / baseWidth750}vw;
                            }
                        }
                    }
    
                }
            }

            .workBlock{
                background-size: 160% auto;
                background-position: 100% 100%;
            }
    
            .workContent{
                .content{
                    width: 100%;
                    min-height: 300px;
                    margin-left: 0;
                    padding: ${150 / baseWidth750}vw ${
  (30 * 2) / baseWidth750
}vw 0;
                    box-sizing: border-box;
                    p{
                        font-size: ${(14 * 2) / baseWidth750}vw;
                        line-height: ${(18 * 2) / baseWidth750}vw;
                    }
                    p.desc{
                        font-size: ${(14 * 2) / baseWidth750}vw;
                        line-height: ${(18 * 2) / baseWidth750}vw;
                        letter-spacing: 1px;
                    }
                    h2{
                        font-size: ${(30 * 2) / baseWidth750}vw;
                        line-height: ${(38 * 2) / baseWidth750}vw;
                        margin: 5px 0 ${(10 * 2) / baseWidth750}vw;
                    }
                }
            }

            .highlightBlock{
                background-image: linear-gradient(to top, rgba(29,29,31, .8), rgba(29,29,31, .8)), url(${highBackground});
                background-size: 150% auto;
                background-position: 100% 50%;
            }
    
            .highlightContent{
                .title{
                    position: relative;
                    top: 0;
                    left: 0;
                    right: auto;
                    margin-left: 0;
                    padding: ${30 / baseWidth750}vw ${40 / baseWidth750}vw 0;
                    p{
                        font-size: ${(14 * 2) / baseWidth750}vw;
                        line-height: ${(22 * 2) / baseWidth750}vw;
                    }
                    h2{
                        font-size: ${(30 * 2) / baseWidth750}vw;
                        line-height: ${(40 * 2) / baseWidth750}vw;
                    }
                }
                .content{
                    width: 100%;
                    box-sizing: border-box;
                    margin-left: 0;
                    padding-left: ${(20 * 2) / baseWidth750}vw;
                    padding-right: ${(20 * 2) / baseWidth750}vw;
                    padding-top: ${(10 * 2) / baseWidth750}vw;
                    .highlightItem{
                        display: block;
                        .item{
                            width: 100%;
                            padding: 0 5px 0;
                            margin-top: ${5 / baseWidth750}vw;
                            margin-bottom: 0;
                            >div{
                                height: ${(62 * 2) / 1.5 / baseWidth750}vw;
                                width: ${(62 * 2) / 1.5 / baseWidth750}vw;
                                float: left;
                                align-items: center;
                                text-align: center;
                            }
                            img{
                                width: ${59 / baseWidth750}vw;
                                height: ${64 / baseWidth750}vw;
                                display: inline-block;
                                vertical-align: middle;
                                
                            }
                            h3{
                                font-size: ${(14 * 2) / baseWidth750}vw;
                                line-height: ${(18 * 2) / baseWidth750}vw;
                                margin: ${(8 * 2) / baseWidth750}vw 0 ${
  4 / baseWidth750
}vw;
                                margin-left: ${(62 * 2) / 1.5 / baseWidth750}vw;
                            }
                            p{
                                display: none;
                                font-size: ${(12 * 2) / baseWidth750}vw;
                                line-height: ${(14 * 2) / baseWidth750}vw;
                                margin-left: ${(62 * 2) / 1.5 / baseWidth750}vw;
                            }
                        }
                        .item2{
                            img{
                                width: ${62 / baseWidth750}vw;
                                height: ${54 / baseWidth750}vw;
                            }
                        }
                        .item3{
                            img{
                                width: ${49 / baseWidth750}vw;
                                height: ${63 / baseWidth750}vw;
                            }
                        }
                        .item4{
                            img{
                                width: ${55 / baseWidth750}vw;
                                height: ${58 / baseWidth750}vw;
                            }
                        }
                        .item5{
                            img{
                                width: ${52 / baseWidth750}vw;
                                height: ${61 / baseWidth750}vw;
                            }
                        }
                        .item6{
                            img{
                                width: ${59 / baseWidth750}vw;
                                height: ${56 / baseWidth750}vw;
                            }
                        }
                        .item7{
                            img{
                                width: ${55 / baseWidth750}vw;
                                height: ${60 / baseWidth750}vw;
                            }
                        }
                        .item8{
                            img{
                                width: ${58 / baseWidth750}vw;
                                height: ${56 / baseWidth750}vw;
                            }
                        }
                        .item9{
                            img{
                                width: ${44 / baseWidth750}vw;
                                height: ${56 / baseWidth750}vw;
                            }
                        }
                        .item:nth-child(1), .item:nth-child(2){
                            width: 100%;
                        }
                        .item:nth-child(3){
                            width: 100%;
                        }
                    }
                }
                .nextBtn{
                    // left: ${(30 * 2) / baseWidth750}vw;
                    right: auto;
                }
            }
    
            .roadmapContent{
                height: 100vh;
                box-sizing: border-box;
                padding-top: 67px;
                .content{
                    width: 100%;
                    min-height: ${(100 * 2) / baseWidth750}vw;
                    margin-left: ${(30 * 2) / baseWidth750}vw;
                    padding-top: ${110 / baseWidth750}vw;
                    p{
                        font-size: ${(14 * 2) / baseWidth750}vw;
                        line-height: ${(20 * 2) / baseWidth750}vw;
                    }
                    h2{
                        font-size: ${(30 * 2) / baseWidth750}vw;
                        line-height: ${(35 * 2) / baseWidth750}vw;
                        margin: 5px 0 ${(20 * 2) / baseWidth750}vw;
                    }
                }
                .roadMap{
                    width: 100%;
                    background-image: none;
                    background-size: 100% auto;
                    background-position: 100% 50%;
                    height: calc(100vh - ${(290 * 2) / baseWidth750}vw);
                    .line{
                        height: calc(100vh - ${(290 * 2) / baseWidth750}vw);
                        border-left: 1px solid #FF6633;
                        left: 50%;
                        bottom: 0;
                        width: 1px;
                        position: absolute;
                    }
                    .item{
                        width: 50%;
                        padding-bottom: 0;
                        margin-bottom: 0;
                        top: 2%;
                        left: auto;
                        right: 50%;
                        margin-right: -${8 / baseWidth750}vw;
                        box-sizing: border-box;
                        text-align: right;
                        padding-right: ${(35 * 2) / baseWidth750}vw;
                       h3{
                        font-size: ${(16 * 2) / baseWidth750}vw;
                        line-height: ${(20 * 2) / baseWidth750}vw;
                        margin-bottom: ${(6 * 2) / baseWidth750}vw;
                       }
                       p{
                        font-size: ${(12 * 2) / baseWidth750}vw;
                        line-height: ${(18 * 2) / baseWidth750}vw;
                       }
                       .line{
                            width: ${(27 * 2) / baseWidth750}vw;
                            height: 0;
                            bottom: auto;
                            top: ${16 / baseWidth750}vw;
                            left: auto;
                            right: 0;
                            border-top: 1px solid #FF6633;
                            
                       }
                       .circle{
                            width: ${(8 * 2) / baseWidth750}vw;
                            height: ${(8 * 2) / baseWidth750}vw;
                            left: auto;
                            right: 0;
                            bottom: auto;
                            top: ${16 / 2 / baseWidth750}vw;
                            margin-left: 0;
                       }
                    }
                    .item.bottom{
                        width: 50%;
                        text-align: left;
                        left: 50%;
                        right: auto;
                        margin-left: -${8 / baseWidth750}vw;
                        padding: 0 0 0 ${(35 * 2) / baseWidth750}vw;
                        .line{
                            bottom: auto;
                            top: ${16 / baseWidth750}vw;
                            left: 0;
                            right: auto;
                            width: ${(27 * 2) / baseWidth750}vw;
                            height: 0;
                            border-top: 1px solid #FF6633;
                            margin-left:0;
                       }
                       .circle{
                            top: ${16 / 2 / baseWidth750}vw;
                            left: 0%;
                            margin-left: 0;
                        }
                    }
                    .item2.bottom{
                       top: 10%;
                    }
                    .item3{
                        top: 30%;
                    }
                    .item4.bottom{
                        top: 45%;
                    }
                    .item5{
                        top: 65%;
                    }
                    .item6.bottom{
                        top: 80%;
                    }
                }
            }

            .partnerBlock{
                background-size: 100% auto;
                background-position: 100% 100%;
            }
    
            .partnerContent{
                .content{
                    width: 100%;
                    min-height: 300px;
                    margin-left: 0;
                    padding: ${(30 * 2) / baseWidth750}vw ${
  (30 * 2) / baseWidth750
}vw 0;
                    h2{
                        font-size: ${(30 * 2) / baseWidth750}vw;
                        line-height: ${(45 * 2) / baseWidth750}vw;
                        margin: 5px 0 ${(20 * 2) / baseWidth750}vw;
                    }
                    .partners{
                        width: ${645 / baseWidth750}vw;
                        .pitem{
                            width: ${197 / baseWidth750}vw;
                            height: ${147 / baseWidth750}vw;
                            padding: ${28 / baseWidth750}vw;
                            margin: ${18 / baseWidth750}vw ${
  18 / baseWidth750
}vw 0 0;
                            img{
                                width: ${144 / baseWidth750}vw;
                                height: ${24 / baseWidth750}vw;
                                display: inline-block;
                            }
                        }
                        .pitem:nth-child(2){
                            img{
                                width: ${145 / baseWidth750}vw;
                                height: ${40 / baseWidth750}vw;
                            }
                        }
                        .pitem:nth-child(3){
                            img{
                                width: ${117 / baseWidth750}vw;
                                height: ${84 / baseWidth750}vw;
                            }
                        }
                        .pitem:nth-child(4){
                            img{
                                width: ${73 / baseWidth750}vw;
                                height: ${74 / baseWidth750}vw;
                            }
                        }
                        .pitem:nth-child(5){
                            img{
                                width: ${141 / baseWidth750}vw;
                                height: ${64 / baseWidth750}vw;
                            }
                        }
                        .pitem:nth-child(6){
                            img{
                                width: ${130 / baseWidth750}vw;
                                height: auto;
                            }
                        }
                        .pitem:nth-child(7){
                            img{
                                width: ${103 / baseWidth750}vw;
                                height: ${28 / baseWidth750}vw;
                            }
                        }
                        .pitem:nth-child(8){
                            img{
                                width: ${141 / baseWidth750}vw;
                                height: ${39 / baseWidth750}vw;
                            }
                        }
                        .pitem:nth-child(9){
                            img{
                                width: ${120 / baseWidth750}vw;
                                height: ${51 / baseWidth750}vw;
                            }
                        }
                        .pitem:nth-child(10){
                            img{
                                width: ${119 / baseWidth750}vw;
                                height: ${44 / baseWidth750}vw;
                            }
                        }
                        .pitem:nth-child(11){
                            img{
                                width: ${107 / baseWidth750}vw;
                                height: ${28 / baseWidth750}vw;
                            }
                        }
                        .pitem:nth-child(12){
                            img{
                                width: ${74 / baseWidth750}vw;
                                height: ${67 / baseWidth750}vw;
                            }
                        }
                    }
                }
            }
            .footWrap{
                .signWrap{
                    height: calc(100vh - ${700 / baseWidth750}vw);
                    padding: ${450 / baseWidth750}vw 0;
                    box-sizing: border-box;
                    text-align: center;
                    background: #232323;
                    background-image: url(${footerBackground});
                    background-size: 140%;
                    background-position: 50% 100%;
                    background-repeat: no-repeat;
                    p{
                        font-size: ${30 / baseWidth750}vw;
                        line-height: ${25 / baseWidth750}vw;
                        position: static;
                        margin-bottom: 10px;
                    }
                    .inputWrap{
                        position: static;
                        margin-left: 0;
                        margin-top: ${(16 * 2) / baseWidth750}vw;
                        input{
                            height: ${(46 * 2) / baseWidth750}vw;
                            line-height: ${(46 * 2) / baseWidth750}vw;
                            padding-left: ${12 / baseWidth750}vw;
                            font-size: ${(18 * 2) / baseWidth750}vw;
                            width: ${439 / baseWidth750}vw;
                        }
                        input::placeholder{
                            font-size: ${18 / baseWidth750}vw;
                            line-height: ${21 / baseWidth750}vw;
                        }
                        .signBtn{
                            height: ${(48 * 2) / baseWidth750}vw;
                            width: ${154 / baseWidth750}vw;
                            font-size: ${(16 * 2) / baseWidth750}vw;
                            line-height: ${(48 * 2) / baseWidth750}vw;
                        }
                    }
                }
                .footerInfo{
                    height: auto;
                    background: #111111;
                    display: flex;
                    flex-wrap:  wrap;
                    box-sizing: border-box;
                    padding: ${43 / baseWidth750}vw 0 ${90 / baseWidth750}vw;
                    .footerLogo{
                        order: 1;
                        width: ${200 / baseWidth750}vw;
                        height: ${(138 * 2) / baseWidth750}vw;
                        text-align: center;
                        border-right: 1px solid rgba(151,151,151, .43);
                        img{
                            width: ${110 / baseWidth750}vw;
                            height: ${94 / baseWidth750}vw;
                        }
                        p{
                            font-size: ${14 / baseWidth750}vw;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: #D0D0D0;
                            line-height: ${20 / baseWidth750}vw;
                            margin-top: ${25 / baseWidth750}vw;
                            display: none;
                        }
                    }
                    .bref{
                        order: 0; 
                        width: 100%;
                        height: auto;
                        padding: 0 ${90 / baseWidth750}vw ${
  50 / baseWidth750
}vw ${55 / baseWidth750}vw;
                        margin-bottom: ${50 / baseWidth750}vw;
                        border-bottom: 1px solid rgba(151,151,151, .43);
                        p{
                            font-size: ${(12 * 2) / baseWidth750}vw;
                            line-height: ${(18 * 2) / baseWidth750}vw;
                        }
                        p:nth-child(2){
                            font-size: ${(12 * 2) / baseWidth750}vw;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: #FFFFFF;
                            line-height: ${(18 * 2) / baseWidth750}vw;
                            margin-top: ${30 / baseWidth750}vw;
                        }
                    }
                    .links{
                        order: 2;
                        width: ${480 / baseWidth750}vw;
                        height: auto;
                        padding: 0 ${25 / baseWidth750}vw;
                        ul{
                            li{
                                font-size: ${16 / baseWidth750}vw;
                                line-height: ${(20 * 2) / baseWidth750}vw;
                                margin-bottom: ${(8 * 2) / baseWidth750}vw;
                                a{
                                    font-size: ${14 / baseWidth750}vw;
                                    line-height: ${20 / baseWidth750}vw;
                                    img{
                                        width: ${20 / baseWidth750}vw;
                                        height: ${18 / baseWidth750}vw;
                                        display: inline-block;
                                        vertical-align: middle;
                                        margin-right: ${8 / baseWidth750}vw;
                                    }
                                }
                            }
                            li:nth-child(1){
                                margin-bottom: ${16 / baseWidth}vw;
                                a{
                                    img{
                                        width: ${19 / baseWidth}vw;
                                        height: ${16 / baseWidth}vw;
                                    }
                                }
                            }
                            li:nth-child(4){
                                margin-bottom: ${16 / baseWidth}vw;
                                a{
                                    img{
                                        width: ${23 / baseWidth}vw;
                                        height: ${17 / baseWidth}vw;
                                    }
                                }
                            }
                        }
                        ul:nth-child(3){
                            li{
                                margin-bottom: ${(11 * 2) / baseWidth}vw;
                            }
                            li:nth-child(1){
                                margin-bottom: ${(18 * 2) / baseWidth}vw;
                            }
                        }
                    }
                    
                }
            }
        }

    .beta {
        position: relative;
        display: inline;

        span {
            position: absolute;
            right: -72px;
            top: 1px;
            background-color: rgba(216,216,216,.5);
            font-size: 16px;
            line-height: 28px;
            padding: 0 12px;
            border-radius: 5px;
        }
    }

    .topbar {
        position: fixed;
        top: 60px;
        height: 45px;
        left: 0;
        width: 100%;
        background: rgba(216,216,216,.19);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #fff;
        z-index: 10;

        a {
            background-color: #FF6633;
            line-height: 28px;
            padding: 0 12px;
            border-radius: 5px;
            color: #fff;
            margin-left: 20px;
            font-size: 14px;
        }
    }
        
`;
export { NewHome };
