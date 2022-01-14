// import styled  from 'styled-components';
import styled, { createGlobalStyle} from '@/utils/styledPx2vw.js'
import bannerBackground from '@/static/images/home/banner/bg.png'
import dmailBackground from '@/static/images/home/what_is_dmail/bg.png'
import workBackground from '@/static/images/home/work/bg.png'
import highBackground from '@/static/images/home/highlights/bg.png'
import roadmapBackground from '@/static/images/home/roadmap/bg.png'

import backImg from '@/static/images/ambassador/arrow-left@2x.png'

const mainColor = "#FF6633";
const mainGray = "#9A9A9A";

const NewHome = styled.div`
        height: 100vh;
        width: 100%;
        min-width: 1200px;
        background-color: #1D1D1F;
        .pageWrap {
            height: 100vh;
            width: 100%;
            min-width: 1200px;
            margin: 0 auto;
            .header {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                border-bottom: 1px solid #888888;
            }
        }
        .contentWrap{
            height: calc(100vh - 67px);
            padding-top: 67px;
            position: relative;

            .nextBtn{
                cursor: pointer;
                position: absolute;
                bottom: 48px;
                left: 160px;
                img{
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    vertical-align: middle;
                    margin-right: 16px;
                }
                .txt{
                    font-size: 14px;
                    font-family: Helvetica;
                    color: #FFFFFF;
                    line-height: 40px;
                }
            }
        }
        .bannerBlock{
            background-image: url(${bannerBackground});
            background-size: 1215px 803px;
            background-position: 100% 50%;
            background-repeat: no-repeat;
        }
        
        .bannerContent {
            .content{
                width: 50%;
                min-height: 300px;
                margin-left: 160px;
                margin-top: 19vh;
                p{
                    font-size: 18px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #9B9B9B;
                    line-height: 20px;
                }
                h2,h3{
                    font-size: 48px;
                    font-family: Roboto-Black, Roboto;
                    color: #FFFFFF;
                    font-weight: normal;
                    line-height: 65px;
                }
                h2{
                    font-family: Roboto-Bold, Roboto;
                    font-weight: bold;
                    margin-top: 5px;
                }
                h3{
                    margin-bottom:15px;
                }
                .launchBtn{
                    display: block;
                    width: 225px;
                    height: 52px;
                    margin-top: 55px;
                    background-color: #FF6633;
                    font-size: 16px;
                    font-family: Helvetica;
                    color: #FFFFFF;
                    line-height: 52px;
                    text-align: center;
                    img{
                        display: inline-block;
                        vertical-align: middle;
                        margin-left: 32px;
                        width: 17px;
                        height: 14px;
                    }
                }
            }
        }

        
        .dmailBlock{
            background-image: url(${dmailBackground});
            background-size: 1185px 676px;
            background-position: 100% 50%;
            background-repeat: no-repeat;
        }

        .dmailContent{
            .content{
                width: 50%;
                max-width: 650px;
                min-height: 300px;
                margin-left: 160px;
                margin-top: 9vh;
                p{
                    font-size: 18px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #6E6E6E;
                    line-height: 20px;
                }
                p.desc{
                    color: #FFFFFF;
                    line-height: 28px;
                    letter-spacing: 2px;
                }
                h2{
                    font-size: 48px;
                    font-family: Roboto-Black, Roboto;
                    font-weight: 900;
                    color: #FF6633;
                    line-height: 65px;
                    margin: 5px 0 20px;
                }
                .dmailItem{
                    margin-top: 40px;
                    .item{
                        width: 50%;
                        display: inline-block;
                        margin-top: 40px;
                        >div{
                            display: inline-block;
                            width: 112px;
                            text-align: center;
                            margin-right: 27px;
                        }
                        img{
                            display: inline-block;
                            width: 56px;
                            height: 54px;
                            vertical-align: middle;
                        }
                        .txt{
                            font-size: 18px;
                            font-family: Roboto-Medium, Roboto;
                            font-weight: 500;
                            color: #FFFFFF;
                            line-height: 20px;
                        }
                    }
                    .item2{
                        img{
                            width: 56px;
                            height: 62px;
                        }
                    }
                    .item3{
                        img{
                            width: 65px;
                            height: 57px;
                        }
                    }
                    .item4{
                        img{
                            width: 42px;
                            height: 61px;
                        }
                    }
                }

            }
        }


        .workBlock{
            background-image: url(${workBackground});
            background-size: 1174px 693px;
            background-position: 100% 50%;
            background-repeat: no-repeat;
        }

        .workContent{
            .content{
                width: 50%;
                max-width: 650px;
                min-height: 300px;
                margin-left: 160px;
                margin-top: 9vh;
                p{
                    font-size: 18px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #6E6E6E;
                    line-height: 20px;
                }
                p.desc{
                    color: #FFFFFF;
                    line-height: 28px;
                    letter-spacing: 2px;
                }
                h2{
                    font-size: 48px;
                    font-family: Roboto-Black, Roboto;
                    font-weight: 900;
                    color: #FF6633;
                    line-height: 65px;
                    margin: 5px 0 20px;
                }
            }
        }



        .highlightBlock{
            background-image: url(${highBackground});
            background-size: 1185px 676px;
            background-position: 100% 100%;
            background-repeat: no-repeat;
        }

        .highlightContent{
            .title{
                position: absolute;
                left: 50%;
                top: 157px;
                margin-left: 320px;
                p{
                    font-size: 27px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #6E6E6E;
                    line-height: 32px;
                }
                h2{
                    font-size: 48px;
                    font-family: Roboto-Black, Roboto;
                    font-weight: 900;
                    color: #FF6633;
                    line-height: 65px;
                }
            }
            .content{
                width: 50%;
                max-width: 750px;
                min-height: 300px;
                margin-left: 87px;
                margin-top: 50px;
                p{
                    font-size: 18px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #6E6E6E;
                    line-height: 20px;
                }
                p.desc{
                    color: #FFFFFF;
                    line-height: 28px;
                    letter-spacing: 2px;
                }
                h2{
                    font-size: 48px;
                    font-family: Roboto-Black, Roboto;
                    font-weight: 900;
                    color: #FF6633;
                    line-height: 65px;
                    margin: 5px 0 20px;
                }
                .highlightItem{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    .item{
                        width: 33%;
                        max-width: 210px;
                        display: inline-block;
                        margin-top: 40px;
                        text-align: left;
                        >div{
                            height: 62px;
                            display: flex;
                            align-items: flex-end;
                        }
                        img{
                            display: inline-block;
                            width: 57px;
                            height: 62px;
                            vertical-align: bottom;
                        }
                        h3{
                            font-size: 18px;
                            font-family: Roboto-Black, Roboto;
                            font-weight: 900;
                            color: #FFFFFF;
                            line-height: 20px;
                            margin: 17px 0 8px;
                        }
                        p{
                            font-size: 14px;
                            font-family: PTSans-Regular, PTSans;
                            font-weight: 400;
                            color: #9B9B9B;
                            line-height: 20px;
                            
                        }
                    }
                    .item2{
                        img{
                            width: 60px;
                            height: 52px;
                        }
                    }
                    .item3{
                        img{
                            width: 47px;
                            height: 60px;
                        }
                    }
                    .item4{
                        img{
                            width: 52px;
                            height: 54px;
                        }
                    }
                    .item5{
                        img{
                            width: 49px;
                            height: 58px;
                        }
                    }
                    .item6{
                        img{
                            width: 56px;
                            height: 53px;
                        }
                    }
                    .item7{
                        img{
                            width: 52px;
                            height: 57px;
                        }
                    }
                    .item8{
                        img{
                            width: 54px;
                            height: 53px;
                        }
                    }
                    .item9{
                        img{
                            width: 38px;
                            height: 53px;
                        }
                    }
                }
            }
            .nextBtn{
                left: auto;
                right: 200px;
            }
        }

        .roadmapBlock{
            background-image: none;
        }

        .roadmapContent{
            .content{
                width: 50%;
                max-width: 650px;
                min-height: 150px;
                margin-left: 160px;
                margin-top: 9vh;
                p{
                    font-size: 18px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #6E6E6E;
                    line-height: 20px;
                }
                h2{
                    font-size: 48px;
                    font-family: Roboto-Black, Roboto;
                    font-weight: 900;
                    color: #FF6633;
                    line-height: 65px;
                    margin: 5px 0 20px;
                }
            }
            .roadMap{
                width: 100%;
                background-image: url(${roadmapBackground});
                background-size: 1440px 250px;
                background-position: 100% 50%;
                background-repeat: no-repeat;
                height: calc(100vh - 290px);
                position: relative;
                .item{
                    width: 100px;
                    padding-bottom: 50px;
                    position: absolute;
                    bottom: 50%;
                    margin-bottom: 75px;
                    left: 110px;
                   h3{
                    font-size: 24px;
                    font-family: Roboto-Bold, Roboto;
                    font-weight: bold;
                    color: #FFFFFF;
                    line-height: 28px;
                    margin-bottom: 12px;
                   }
                   p{
                    font-size: 14px;
                    font-family: Roboto-Medium, Roboto;
                    font-weight: 500;
                    color: rgba(225,225,225,.52);
                    line-height: 18px;
                   }
                   .line{
                        width: 0;
                        height: 27px;
                        border-left: 1px solid #FF6633;
                        position: absolute;
                        bottom: 15px;
                        left: 50%;
                   }
                   .circle{
                        width: 16px;
                        height: 16px;
                        display: inline-block;
                        background: #FF6633;
                        box-shadow: 0px 0px 10px 0px #E84118;
                        border-radius: 50%;
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        margin-left: -8px;
                   }
                }
                .item.bottom{
                    .line{
                        bottom: auto;
                        top: 10px;
                        left: 50%;
                   }
                   .circle{
                        bottom: auto;
                        top: 0;
                        left: 50%;
                        margin-left: -8px;
                    }
                }
                .item2{
                    padding: 90px 0 0px;
                    top: 50%;
                    bottom: auto;
                    margin-bottom: 0;
                    margin-top: -40px;
                    left: 300px;
                    .line{
                        height: 80px;
                   }
                }
                .item3{
                    padding-bottom: 80px;
                    bottom: 50%;
                    margin-bottom: 45px;
                    left: 550px;
                }
                .item4{
                    padding:80px 0 0px;
                    top: 50%;
                    bottom: auto;
                    margin-bottom: 0;
                    margin-top: 0px;
                    left: 810px;
                    .line{
                        height: 60px;
                   }
                }
                .item5{
                    padding-bottom: 50px;
                    bottom: 50%;
                    margin-bottom: 75px;
                    left: 1010px;
                }
                .item6{
                    padding: 70px 0 0px;
                    top: 50%;
                    bottom: auto;
                    margin-bottom: 0;
                    margin-top: 50px;
                    left: 1230px;
                    .line{
                        height: 50px;
                   }
                }
            }
        }
        
`;
export {
    NewHome
}