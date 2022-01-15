import styled  from 'styled-components';
import styledPx2vw from '@/utils/styledPx2vw.js'
import bannerBackground from '@/static/images/home/banner/bg.png'
import dmailBackground from '@/static/images/home/what_is_dmail/bg.png'
import workBackground from '@/static/images/home/work/bg.png'
import highBackground from '@/static/images/home/highlights/bg.png'
import roadmapBackground from '@/static/images/home/roadmap/bg.png'

const baseWidth =  1440/100;
const baseWidth750 =  750/100;

const NewHome = styled.div`
        height: 100vh;
        width: 100%;
        background-color: #1D1D1F;
        .pageWrap {
            height: calc(100vh - 67px);
            width: 100%;
            margin: 0 auto;
            background-color: #1D1D1F;
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
            padding-top: 0;
            position: relative;

            .nextBtn{
                cursor: pointer;
                position: absolute;
                bottom: ${48/baseWidth}vw;
                left: ${160/baseWidth}vw;
                img{
                    display: inline-block;
                    width: ${40/baseWidth}vw;
                    height: ${40/baseWidth}vw;
                    vertical-align: middle;
                    margin-right: ${16/baseWidth}vw;
                }
                .txt{
                    font-size: ${14/baseWidth}vw;
                    font-family: Helvetica;
                    color: #FFFFFF;
                    line-height: ${40/baseWidth}vw;
                }
            }
        }
        .bannerBlock{
            height: 100vh;
            background-image: url(${bannerBackground});
            background-size: ${1215/baseWidth}vw ${803/baseWidth}vw;
            background-position: 100% 50%;
            background-repeat: no-repeat;
        }
        
        .bannerContent {
            padding-top: ${67/baseWidth}vw;
            .content{
                width: 50%;
                min-height: 300px;
                margin-left: ${160/baseWidth}vw;
                margin-top: 19vh;
                p{
                    font-size: ${18/1440*100}vw;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #9B9B9B;
                    line-height: ${20/baseWidth}vw;
                }
                .desc{
                    line-height: ${26/baseWidth}vw;
                }
                h2,h3{
                    font-size: ${48/baseWidth}vw;
                    font-family: Roboto-Black, Roboto;
                    color: #FFFFFF;
                    font-weight: normal;
                    line-height: ${65/baseWidth}vw;
                }
                h2{
                    font-family: Roboto-Bold, Roboto;
                    font-weight: bold;
                    margin-top: 5px;
                }
                h3{
                    margin-bottom: ${15/baseWidth}vw;
                }
                .launchBtn{
                    display: block;
                    width: ${225/baseWidth}vw;
                    height: ${52/baseWidth}vw;
                    margin-top: ${55/baseWidth}vw;
                    background-color: #FF6633;
                    font-size: ${16/baseWidth}vw;
                    font-family: Helvetica;
                    color: #FFFFFF;
                    line-height: ${52/baseWidth}vw;
                    text-align: center;
                    img{
                        display: inline-block;
                        vertical-align: middle;
                        margin-left: ${32/baseWidth}vw;
                        width: ${17/baseWidth}vw;
                        height: ${14/baseWidth}vw;
                    }
                }
            }
        }

        
        .dmailBlock{
            background-image: url(${dmailBackground});
            background-size:  ${1185/baseWidth}vw  ${676/baseWidth}vw;
            background-position: 100% 50%;
            background-repeat: no-repeat;
        }

        .dmailContent{
            .content{
                width: 55%;
                min-height: 300px;
                margin-left: ${160/baseWidth}vw;
                padding-top: ${76/baseWidth}vw;
                p{
                    font-size: ${18/baseWidth}vw;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #6E6E6E;
                    line-height: ${20/baseWidth}vw;
                }
                p.desc{
                    color: #FFFFFF;
                    line-height: ${27/baseWidth}vw;
                    letter-spacing: 2px;
                }
                h2{
                    font-size: ${48/baseWidth}vw;
                    font-family: Roboto-Black, Roboto;
                    font-weight: 900;
                    color: #FF6633;
                    line-height: ${65/baseWidth}vw;
                    margin: 5px 0 ${20/baseWidth}vw;
                }
                .dmailItem{
                    margin-top: ${30/baseWidth}vw;
                    .item{
                        width: 50%;
                        display: inline-block;
                        margin-top: ${40/baseWidth}vw;
                        >div{
                            display: inline-block;
                            width: ${112/baseWidth}vw;
                            text-align: center;
                            margin-right: ${27/baseWidth}vw;
                        }
                        img{
                            display: inline-block;
                            width: ${56/baseWidth}vw;
                            height: ${54/baseWidth}vw;
                            vertical-align: middle;
                        }
                        .txt{
                            font-size: ${18/baseWidth}vw;
                            font-family: Roboto-Medium, Roboto;
                            font-weight: 500;
                            color: #FFFFFF;
                            line-height: ${20/baseWidth}vw;
                        }
                    }
                    .item2{
                        img{
                            width: ${56/baseWidth}vw;
                            height: ${62/baseWidth}vw;
                        }
                    }
                    .item3{
                        img{
                            width: ${65/baseWidth}vw;
                            height: ${57/baseWidth}vw;
                        }
                    }
                    .item4{
                        img{
                            width: ${42/baseWidth}vw;
                            height: ${61/baseWidth}vw;
                        }
                    }
                }

            }
        }


        .workBlock{
            background-image: url(${workBackground});
            background-size: ${1174/baseWidth}vw ${693/baseWidth}vw;
            background-position: 100% 50%;
            background-repeat: no-repeat;
        }

        .workContent{
            .content{
                width: 50%;
                min-height: 300px;
                margin-left: ${160/baseWidth}vw;
                padding-top: ${76/baseWidth}vw;
                p{
                    font-size: ${18/baseWidth}vw;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #6E6E6E;
                    line-height: ${20/baseWidth}vw;
                }
                p.desc{
                    color: #FFFFFF;
                    line-height: ${27/baseWidth}vw;
                    letter-spacing: 2px;
                }
                h2{
                    font-size: ${48/baseWidth}vw;
                    font-family: Roboto-Black, Roboto;
                    font-weight: 900;
                    color: #FF6633;
                    line-height: ${65/baseWidth}vw;
                    margin: 5px 0 ${20/baseWidth}vw;
                }
            }
        }



        .highlightBlock{
            background-image: url(${highBackground});
            background-size: ${1153/baseWidth}vw ${678/baseWidth}vw;
            background-position: 100% 50%;
            background-repeat: no-repeat;
        }

        .highlightContent{
            padding-top: 0;
            .title{
                position: absolute;
                left: 50%;
                top: ${50/baseWidth}vw;
                margin-left: ${320/baseWidth}vw;
                p{
                    font-size: ${27/baseWidth}vw;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #6E6E6E;
                    line-height: ${32/baseWidth}vw;
                }
                h2{
                    font-size: ${48/baseWidth}vw;
                    font-family: Roboto-Black, Roboto;
                    font-weight: 900;
                    color: #FF6633;
                    line-height: ${65/baseWidth}vw;
                }
            }
            .content{
                width: 50%;
                min-height: 300px;
                margin-left: ${87/baseWidth}vw;
                padding-top: ${50/baseWidth}vw;
                .highlightItem{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    .item{
                        width: 33%;
                        display: inline-block;
                        box-sizing: border-box;
                        padding: 0 10px 0;
                        margin-top: ${20/baseWidth}vw;
                        text-align: left;
                        >div{
                            height: ${62/baseWidth}vw;
                            display: flex;
                            align-items: flex-end;
                        }
                        img{
                            display: inline-block;
                            width: ${59/baseWidth}vw;
                            height: ${64/baseWidth}vw;
                            vertical-align: bottom;
                        }
                        h3{
                            font-size: ${18/baseWidth}vw;
                            font-family: Roboto-Black, Roboto;
                            font-weight: 900;
                            color: #FFFFFF;
                            line-height: ${20/baseWidth}vw;
                            margin: ${17/baseWidth}vw 0 ${8/baseWidth}vw;
                        }
                        p{
                            font-size: ${14/baseWidth}vw;
                            font-family: PTSans-Regular, PTSans;
                            font-weight: 400;
                            color: #9B9B9B;
                            line-height: ${20/baseWidth}vw;
                            
                        }
                    }
                    .item2{
                        img{
                            width: ${62/baseWidth}vw;
                            height: ${54/baseWidth}vw;
                        }
                    }
                    .item3{
                        img{
                            width: ${49/baseWidth}vw;
                            height: ${63/baseWidth}vw;
                        }
                    }
                    .item4{
                        img{
                            width: ${55/baseWidth}vw;
                            height: ${58/baseWidth}vw;
                        }
                    }
                    .item5{
                        img{
                            width: ${52/baseWidth}vw;
                            height: ${61/baseWidth}vw;
                        }
                    }
                    .item6{
                        img{
                            width: ${59/baseWidth}vw;
                            height: ${56/baseWidth}vw;
                        }
                    }
                    .item7{
                        img{
                            width: ${55/baseWidth}vw;
                            height: ${60/baseWidth}vw;
                        }
                    }
                    .item8{
                        img{
                            width: ${58/baseWidth}vw;
                            height: ${56/baseWidth}vw;
                        }
                    }
                    .item9{
                        img{
                            width: ${44/baseWidth}vw;
                            height: ${56/baseWidth}vw;
                        }
                    }
                }
            }
            .nextBtn{
                left: auto;
                right: ${150/baseWidth}vw;
            }
        }

        .roadmapBlock{
            background-image: none;
            height: calc(100vh - 67px);
            padding-top: 0;
        }

        .roadmapContent{
            height: calc(100vh - 67px);
            padding-top: 0;
            .content{
                width: 50%;
                min-height: ${150/baseWidth}vw;
                margin-left: ${160/baseWidth}vw;
                padding-top: 67px;
                p{
                    font-size: ${18/baseWidth}vw;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #6E6E6E;
                    line-height: ${20/baseWidth}vw;
                }
                h2{
                    font-size: ${48/baseWidth}vw;
                    font-family: Roboto-Black, Roboto;
                    font-weight: 900;
                    color: #FF6633;
                    line-height: ${65/baseWidth}vw;
                    margin: 5px 0 ${20/baseWidth}vw;
                }
            }
            .roadMap{
                width: 100%;
                background-image: url(${roadmapBackground});
                background-size: ${1440/baseWidth}vw ${250/baseWidth}vw;
                background-position: 100% 50%;
                background-repeat: no-repeat;
                height: calc(100vh - ${290/baseWidth}vw);
                position: relative;
                .item{
                    width: ${120/baseWidth}vw;
                    padding-bottom: ${50/baseWidth}vw;
                    position: absolute;
                    bottom: 50%;
                    margin-bottom: ${75/baseWidth}vw;
                    left: ${110/baseWidth}vw;
                   h3{
                    font-size: ${24/baseWidth}vw;
                    font-family: Roboto-Bold, Roboto;
                    font-weight: bold;
                    color: #FFFFFF;
                    line-height: ${27/baseWidth}vw;
                    margin-bottom: ${12/baseWidth}vw;
                   }
                   p{
                    font-size: ${14/baseWidth}vw;
                    font-family: Roboto-Medium, Roboto;
                    font-weight: 500;
                    color: rgba(225,225,225,.52);
                    line-height: ${18/baseWidth}vw;
                   }
                   .line{
                        width: 0;
                        height: ${27/baseWidth}vw;
                        border-left: 1px solid #FF6633;
                        position: absolute;
                        bottom: ${15/baseWidth}vw;
                        left: 50%;
                   }
                   .circle{
                        width: ${16/baseWidth}vw;
                        height: ${16/baseWidth}vw;
                        display: inline-block;
                        background: #FF6633;
                        box-shadow: 0px 0px 10px 0px #E84118;
                        border-radius: 50%;
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        margin-left: -${8/baseWidth}vw;
                   }
                }
                .item.bottom{
                    .line{
                        bottom: auto;
                        top: ${10/baseWidth}vw;
                        left: 50%;
                   }
                   .circle{
                        bottom: auto;
                        top: 0;
                        left: 50%;
                        margin-left: -${8/baseWidth}vw;
                    }
                }
                .item2.bottom{
                    width: ${160/baseWidth}vw;
                    padding: ${90/baseWidth}vw 0 0px;
                    top: 50%;
                    bottom: auto;
                    margin-bottom: 0;
                    margin-top: -${40/baseWidth}vw;
                    left: ${300/baseWidth}vw;
                    .line{
                        height: ${80/baseWidth}vw;
                        left: 50%;
                        margin-left: -${35/baseWidth}vw;
                    }
                   .circle{
                        left: 50%;
                        margin-left: -${43/baseWidth}vw;
                    }
                }
                .item3{
                    padding-bottom: ${80/baseWidth}vw;
                    bottom: 50%;
                    margin-bottom: ${50/baseWidth}vw;
                    left: ${530/baseWidth}vw;
                }
                .item4{
                    width: ${160/baseWidth}vw;
                    padding: ${80/baseWidth}vw 0 0px;
                    top: 50%;
                    bottom: auto;
                    margin-bottom: 0;
                    margin-top: 0px;
                    left: ${760/baseWidth}vw;
                    .line{
                        height: ${60/baseWidth}vw;
                   }
                }
                .item5{
                    width: ${150/baseWidth}vw;
                    padding-bottom: ${50/baseWidth}vw;
                    bottom: 50%;
                    margin-bottom: ${75/baseWidth}vw;
                    left: ${1010/baseWidth}vw;
                    
                }
                .item6{
                    padding: ${70/baseWidth}vw; 0 0px;
                    top: 50%;
                    bottom: auto;
                    margin-bottom: 0;
                    margin-top: ${50/baseWidth}vw;
                    left: ${1130/baseWidth}vw;
                    .line{
                        height: ${50/baseWidth}vw;
                   }
                }
            }
        }
        @media screen and (max-width: 1024px) {
            .contentWrap{
                .nextBtn{
                    bottom: ${30/baseWidth750}vw;
                    left: ${30/baseWidth750}vw;
                    img{
                        width: ${30/baseWidth750}vw;
                        height: ${30/baseWidth750}vw;
                        margin-right: ${16/baseWidth750}vw;
                    }
                    .txt{
                        font-size: ${18/baseWidth750}vw;
                        line-height: ${40/baseWidth750}vw;
                    }
                }
            }
            .bannerBlock{
                background-size: 100% auto;
                background-position: 50% 100%;
            }
            .bannerContent {
                padding-top: ${30/baseWidth750}vw;
                .content{
                    width: 100%;
                    min-height: 300px;
                    padding:0 ${30/baseWidth750}vw;
                    margin-top: 19vh;
                    margin-left: 0;
                    p{
                        font-size: ${18/baseWidth750}vw;
                        line-height: ${24/baseWidth750}vw;
                    }
                    .desc{
                        line-height: ${26/baseWidth750}vw;
                    }
                    h2,h3{
                        font-size: ${30/baseWidth750}vw;
                        line-height: ${38/baseWidth750}vw;
                    }
                    h2{
                        margin-top: 5px;
                    }
                    h3{
                        margin-bottom:15px;
                    }
                    .launchBtn{
                        width: ${180/baseWidth750}vw;
                        height: ${40/baseWidth750}vw;
                        margin-top: ${55/baseWidth750}vw;
                        font-size: ${14/baseWidth750}vw;
                        line-height: ${40/baseWidth750}vw;
                        img{
                            margin-left: ${32/baseWidth750}vw;
                            width: ${17/baseWidth750}vw;
                            height: ${14/baseWidth750}vw;
                        }
                    }
                }
            }
            
            .dmailBlock{
                background-size:  90%  auto;
                background-position: 100% 100%;
            }
    
            .dmailContent{
                .content{
                    width: 65%;
                    margin-left: ${30/baseWidth750}vw;
                    padding-top: ${50/baseWidth750}vw;
                    p{
                        font-size: ${16/baseWidth750}vw;
                        line-height: ${18/baseWidth750}vw;
                    }
                    p.desc{
                        line-height: ${24/baseWidth750}vw;
                    }
                    h2{
                        font-size: ${36/baseWidth750}vw;
                        line-height: ${40/baseWidth750}vw;
                        margin: 5px 0 ${10/baseWidth750}vw;
                    }
                    .dmailItem{
                        margin-top: ${20/baseWidth750}vw;
                        .item{
                            margin-top: ${20/baseWidth750}vw;
                            >div{
                                width: ${40/baseWidth750}vw;
                                margin-right: ${10/baseWidth750}vw;
                            }
                            img{
                                width: ${56/1.5/baseWidth750}vw;
                                height: ${54/1.5/baseWidth750}vw;
                            }
                            .txt{
                                font-size: ${14/baseWidth750}vw;
                                line-height: ${20/baseWidth750}vw;
                            }
                        }
                        .item2{
                            img{
                                width: ${56/1.5/baseWidth750}vw;
                                height: ${62/1.5/baseWidth750}vw;
                            }
                        }
                        .item3{
                            img{
                                width: ${65/1.5/baseWidth750}vw;
                                height: ${57/1.5/baseWidth750}vw;
                            }
                        }
                        .item4{
                            img{
                                width: ${42/1.5/baseWidth750}vw;
                                height: ${61/1.5/baseWidth750}vw;
                            }
                        }
                    }
    
                }
            }

            .workBlock{
                background-size: 80% auto;
                background-position: 100% 100%;
            }
    
            .workContent{
                .content{
                    width: 70%;
                    min-height: 300px;
                    margin-left: ${30/baseWidth750}vw;
                    padding-top: ${50/baseWidth750}vw;
                    p{
                        font-size: ${16/baseWidth750}vw;
                        line-height: ${18/baseWidth750}vw;
                    }
                    p.desc{
                        line-height: ${22/baseWidth750}vw;
                        letter-spacing: 1px;
                    }
                    h2{
                        font-size: ${38/baseWidth750}vw;
                        line-height: ${45/baseWidth750}vw;
                        margin: 5px 0 ${20/baseWidth750}vw;
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
                    top: ${20/baseWidth750}vw;
                    left: ${30/baseWidth750}vw;
                    right: auto;
                    margin-left: 0;
                    p{
                        font-size: ${16/baseWidth750}vw;
                        line-height: ${22/baseWidth750}vw;
                    }
                    h2{
                        font-size: ${38/baseWidth750}vw;
                        line-height: ${45/baseWidth750}vw;
                    }
                }
                .content{
                    width: 100%;
                    box-sizing: border-box;
                    margin-left: 0;
                    padding-left: ${20/baseWidth750}vw;
                    padding-right: ${20/baseWidth750}vw;
                    padding-top: ${100/baseWidth750}vw;
                    .highlightItem{
                        .item{
                            width: 33%;
                            padding: 0 5px 0;
                            margin-top: ${10/baseWidth750}vw;
                            >div{
                                height: ${62/1.5/baseWidth750}vw;
                            }
                            img{
                                width: ${59/1.5/baseWidth750}vw;
                                height: ${64/1.5/baseWidth750}vw;
                            }
                            h3{
                                font-size: ${14/baseWidth750}vw;
                                line-height: ${18/baseWidth750}vw;
                                margin: ${8/baseWidth750}vw 0 ${4/baseWidth750}vw;
                            }
                            p{
                                font-size: ${12/baseWidth750}vw;
                                line-height: ${18/baseWidth750}vw;
                                
                            }
                        }
                        .item2{
                            img{
                                width: ${62/1.5/baseWidth750}vw;
                                height: ${54/1.5/baseWidth750}vw;
                            }
                        }
                        .item3{
                            img{
                                width: ${49/1.5/baseWidth750}vw;
                                height: ${63/1.5/baseWidth750}vw;
                            }
                        }
                        .item4{
                            img{
                                width: ${55/1.5/baseWidth750}vw;
                                height: ${58/1.5/baseWidth750}vw;
                            }
                        }
                        .item5{
                            img{
                                width: ${52/1.5/baseWidth750}vw;
                                height: ${61/1.5/baseWidth750}vw;
                            }
                        }
                        .item6{
                            img{
                                width: ${59/1.5/baseWidth750}vw;
                                height: ${56/1.5/baseWidth750}vw;
                            }
                        }
                        .item7{
                            img{
                                width: ${55/1.5/baseWidth750}vw;
                                height: ${60/1.5/baseWidth750}vw;
                            }
                        }
                        .item8{
                            img{
                                width: ${58/1.5/baseWidth750}vw;
                                height: ${56/1.5/baseWidth750}vw;
                            }
                        }
                        .item9{
                            img{
                                width: ${44/1.5/baseWidth750}vw;
                                height: ${56/1.5/baseWidth750}vw;
                            }
                        }
                        .item:nth-child(1), .item:nth-child(2){
                            width: 30%;
                        }
                        .item:nth-child(3){
                            width: 40%;
                        }
                    }
                }
                .nextBtn{
                    left: ${30/baseWidth750}vw;
                    right: auto;
                    bottom: ${10/baseWidth750}vw;
                }
            }
    
            .roadmapContent{
                height: calc(100vh - 67px);
                padding-top: 0;
                .content{
                    width: 50%;
                    min-height: ${150/baseWidth750}vw;
                    margin-left: ${30/baseWidth750}vw;
                    padding-top: 67px;
                    p{
                        font-size: ${18/baseWidth750}vw;
                        line-height: ${20/baseWidth750}vw;
                    }
                    h2{
                        font-size: ${38/baseWidth750}vw;
                        line-height: ${45/baseWidth750}vw;
                        margin: 5px 0 ${20/baseWidth750}vw;
                    }
                }
                .roadMap{
                    width: 100%;
                    background-image: url(${roadmapBackground});
                    background-size: 100% auto;
                    background-position: 100% 50%;
                    height: calc(100vh - ${290/baseWidth750}vw);
                    .item{
                        width: ${120/baseWidth750}vw;
                        padding-bottom: ${45/baseWidth750}vw;
                        margin-bottom: ${45/baseWidth750}vw;
                        left: ${55/baseWidth750}vw;
                       h3{
                        font-size: ${16/baseWidth750}vw;
                        line-height: ${20/baseWidth750}vw;
                        margin-bottom: ${6/baseWidth750}vw;
                       }
                       p{
                        font-size: ${12/baseWidth750}vw;
                        line-height: ${18/baseWidth750}vw;
                       }
                       .line{
                            width: 0;
                            height: ${27/baseWidth750}vw;
                            bottom: ${7/baseWidth750}vw;
                            left: 30%;
                       }
                       .circle{
                            width: ${8/baseWidth750}vw;
                            height: ${8/baseWidth750}vw;
                            left: 30%;
                            margin-left: -${4/baseWidth750}vw;
                       }
                    }
                    .item.bottom{
                        .line{
                            bottom: auto;
                            top: ${4/baseWidth750}vw;
                            left: 50%;
                       }
                       .circle{
                            bottom: auto;
                            top: 0;
                            left: 50%;
                            margin-left: -${8/baseWidth750}vw;
                        }
                    }
                    .item2.bottom{
                        width: ${160/baseWidth750}vw;
                        padding: ${50/baseWidth750}vw 0 0px;
                        top: 50%;
                        bottom: auto;
                        margin-bottom: 0;
                        margin-top: -${30/baseWidth750}vw;
                        left: ${160/baseWidth750}vw;
                        .line{
                            height: ${40/baseWidth750}vw;
                            left: 50%;
                            margin-left: -${40/baseWidth750}vw;
                        }
                       .circle{
                            left: 50%;
                            margin-left: -${43/baseWidth750}vw;
                        }
                    }
                    .item3{
                        padding-bottom: ${50/baseWidth750}vw;
                        bottom: 50%;
                        margin-bottom: ${25/baseWidth750}vw;
                        left: ${280/baseWidth750}vw;
                    }
                    .item4.bottom{
                        width: ${160/baseWidth750}vw;
                        padding: ${50/baseWidth750}vw 0 0px;
                        left: ${380/baseWidth750}vw;
                        .line{
                            height: ${40/baseWidth750}vw;
                            margin-left: -${41/baseWidth750}vw;
                        }
                        .circle{
                            left: 50%;
                            margin-left: -${44/baseWidth750}vw;
                        }
                    }
                    .item5{
                        width: ${150/baseWidth750}vw;
                        padding-bottom: ${40/baseWidth750}vw;
                        bottom: 50%;
                        margin-bottom: ${40/baseWidth750}vw;
                        left: ${530/baseWidth750}vw;
                    }
                    .item6.bottom{
                        padding: ${40/baseWidth750}vw 0 0px;
                        margin-top: ${30/baseWidth750}vw;
                        left: ${610/baseWidth750}vw;
                        .line{
                            height: ${30/baseWidth750}vw;
                            margin-left: -${20/baseWidth750}vw;
                        }
                        .circle{
                            left: 50%;
                            margin-left: -${24/baseWidth750}vw;
                        }
                    }
                }
            }
        }


        @media screen and (max-width: 750px) {
            .pageWrap {
                height: calc(100vh - 67px);
                width: 100%;
            }
            .contentWrap{
                height: calc(100vh - 67px);
                padding-top: 0;
                position: relative;
    
                .nextBtn{
                    bottom: ${40*2/baseWidth750}vw;
                    left: ${40/baseWidth750}vw;
                    img{
                        width: ${45/baseWidth750}vw;
                        height: ${45/baseWidth750}vw;
                        margin-right: ${16/baseWidth750}vw;
                    }
                    .txt{
                        font-size: ${18*1.5/baseWidth750}vw;
                        line-height: ${40/baseWidth750}vw;
                    }
                }
            }
            .bannerBlock{
                height: 100vh;
                background-size: 100% auto;
                background-position: 50% 100%;
            }
            .bannerContent {
                padding-top: ${30/baseWidth750}vw;
                height: 100vh;
                .content{
                    width: 100%;
                    min-height: 300px;
                    padding:0 ${30/baseWidth750}vw;
                    margin-top: 19vh;
                    margin-left: 0;
                    box-sizing: border-box;
                    p{
                        font-size: ${18*2/baseWidth750}vw;
                        line-height: ${24*2/baseWidth750}vw;
                    }
                    .desc{
                        line-height: ${22*2/baseWidth750}vw;
                    }
                    h2,h3{
                        font-size: ${30*1.8/baseWidth750}vw;
                        line-height: ${38*2/baseWidth750}vw;
                    }
                    h2{
                        margin-top: 5px;
                    }
                    h3{
                        margin-bottom:15px;
                    }
                    .launchBtn{
                        width: ${180*2/baseWidth750}vw;
                        height: ${40*2/baseWidth750}vw;
                        margin-top: ${55*2/baseWidth750}vw;
                        font-size: ${14*2/baseWidth750}vw;
                        line-height: ${40*2/baseWidth750}vw;
                        img{
                            margin-left: ${32*2/baseWidth750}vw;
                            width: ${17*2/baseWidth750}vw;
                            height: ${14*2/baseWidth750}vw;
                        }
                    }
                }
            }
            
            .dmailBlock{
                background-size:  90%  auto;
                background-position: 100% 100%;
            }
    
            .dmailContent{
                .content{
                    width: 100%;
                    margin-left: 0;
                    padding: ${50/baseWidth750}vw ${50/baseWidth750}vw 0;
                    box-sizing: border-box;
                    p{
                        font-size: ${14*2/baseWidth750}vw;
                        line-height: ${18*2/baseWidth750}vw;
                    }
                    p.desc{
                        line-height: ${24*2/baseWidth750}vw;
                    }
                    h2{
                        font-size: ${32*2/baseWidth750}vw;
                        line-height: ${38*2/baseWidth750}vw;
                        margin: 5px 0 ${10*2/baseWidth750}vw;
                    }
                    .dmailItem{
                        margin-top: ${15*2/baseWidth750}vw;
                        .item{
                            margin-top: ${20*2/baseWidth750}vw;
                            >div{
                                width: ${40*2/baseWidth750}vw;
                                margin-right: ${10*2/baseWidth750}vw;
                                display: block;
                            }
                            img{
                                width: ${56*2/1.5/baseWidth750}vw;
                                height: ${54*2/1.5/baseWidth750}vw;
                            }
                            .txt{
                                font-size: ${14*2/baseWidth750}vw;
                                line-height: ${20*2/baseWidth750}vw;
                            }
                        }
                        .item2{
                            img{
                                width: ${56*2/1.5/baseWidth750}vw;
                                height: ${62*2/1.5/baseWidth750}vw;
                            }
                        }
                        .item3{
                            img{
                                width: ${65*2/1.5/baseWidth750}vw;
                                height: ${57*2/1.5/baseWidth750}vw;
                            }
                        }
                        .item4{
                            img{
                                width: ${42*2/1.5/baseWidth750}vw;
                                height: ${61*2/1.5/baseWidth750}vw;
                            }
                        }
                    }
    
                }
            }

            .workBlock{
                background-size: 80% auto;
                background-position: 100% 100%;
            }
    
            .workContent{
                .content{
                    width: 100%;
                    min-height: 300px;
                    margin-left: 0;
                    padding: ${50*2/baseWidth750}vw ${30*2/baseWidth750}vw 0;
                    box-sizing: border-box;
                    p{
                        font-size: ${16*2/baseWidth750}vw;
                        line-height: ${18*2/baseWidth750}vw;
                    }
                    p.desc{
                        font-size: ${14*2/baseWidth750}vw;
                        line-height: ${20*2/baseWidth750}vw;
                        letter-spacing: 1px;
                    }
                    h2{
                        font-size: ${32*2/baseWidth750}vw;
                        line-height: ${38*2/baseWidth750}vw;
                        margin: 5px 0 ${20*2/baseWidth750}vw;
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
                    top: ${20*2/baseWidth750}vw;
                    left: ${30*2/baseWidth750}vw;
                    right: auto;
                    margin-left: 0;
                    p{
                        font-size: ${16*2/baseWidth750}vw;
                        line-height: ${22*2/baseWidth750}vw;
                    }
                    h2{
                        font-size: ${38*2/baseWidth750}vw;
                        line-height: ${45*2/baseWidth750}vw;
                    }
                }
                .content{
                    width: 100%;
                    box-sizing: border-box;
                    margin-left: 0;
                    padding-left: ${20*2/baseWidth750}vw;
                    padding-right: ${20*2/baseWidth750}vw;
                    padding-top: ${20*2/baseWidth750}vw;
                    .highlightItem{
                        display: block;
                        .item{
                            width: 100%;
                            padding: 0 5px 0;
                            margin-top: ${5*2/baseWidth750}vw;
                            >div{
                                height: ${62*2/1.5/baseWidth750}vw;
                                width: ${62*2/1.5/baseWidth750}vw;
                                float: left;
                                align-items: center;
                                text-align: center;
                            }
                            img{
                                width: ${59/baseWidth750}vw;
                                height: ${64/baseWidth750}vw;
                                display: inline-block;
                                vertical-align: middle;
                                
                            }
                            h3{
                                font-size: ${14*2/baseWidth750}vw;
                                line-height: ${18*2/baseWidth750}vw;
                                margin: ${8*2/baseWidth750}vw 0 ${4/baseWidth750}vw;
                                margin-left: ${62*2/1.5/baseWidth750}vw;
                            }
                            p{
                                display: none;
                                font-size: ${12*2/baseWidth750}vw;
                                line-height: ${14*2/baseWidth750}vw;
                                margin-left: ${62*2/1.5/baseWidth750}vw;
                            }
                        }
                        .item2{
                            img{
                                width: ${62/baseWidth750}vw;
                                height: ${54/baseWidth750}vw;
                            }
                        }
                        .item3{
                            img{
                                width: ${49/baseWidth750}vw;
                                height: ${63/baseWidth750}vw;
                            }
                        }
                        .item4{
                            img{
                                width: ${55/baseWidth750}vw;
                                height: ${58/baseWidth750}vw;
                            }
                        }
                        .item5{
                            img{
                                width: ${52/baseWidth750}vw;
                                height: ${61/baseWidth750}vw;
                            }
                        }
                        .item6{
                            img{
                                width: ${59/baseWidth750}vw;
                                height: ${56/baseWidth750}vw;
                            }
                        }
                        .item7{
                            img{
                                width: ${55/baseWidth750}vw;
                                height: ${60/baseWidth750}vw;
                            }
                        }
                        .item8{
                            img{
                                width: ${58/baseWidth750}vw;
                                height: ${56/baseWidth750}vw;
                            }
                        }
                        .item9{
                            img{
                                width: ${44/baseWidth750}vw;
                                height: ${56/baseWidth750}vw;
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
                    left: ${30*2/baseWidth750}vw;
                    right: auto;
                }
            }
    
            .roadmapContent{
                height: calc(100vh - 67px);
                padding-top: 0;
                .content{
                    width: 100%;
                    min-height: ${100*2/baseWidth750}vw;
                    margin-left: ${30*2/baseWidth750}vw;
                    padding-top: ${50*2/baseWidth750}vw;
                    p{
                        font-size: ${18*2/baseWidth750}vw;
                        line-height: ${20*2/baseWidth750}vw;
                    }
                    h2{
                        font-size: ${36*2/baseWidth750}vw;
                        line-height: ${45*2/baseWidth750}vw;
                        margin: 5px 0 ${20*2/baseWidth750}vw;
                    }
                }
                .roadMap{
                    width: 100%;
                    background-image: none;
                    background-size: 100% auto;
                    background-position: 100% 50%;
                    height: calc(100vh - ${290*2/baseWidth750}vw);
                    .line{
                        height: calc(100vh - ${290*2/baseWidth750}vw);
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
                        margin-right: -${8/baseWidth750}vw;
                        box-sizing: border-box;
                        text-align: right;
                        padding-right: ${35*2/baseWidth750}vw;
                       h3{
                        font-size: ${16*2/baseWidth750}vw;
                        line-height: ${20*2/baseWidth750}vw;
                        margin-bottom: ${6*2/baseWidth750}vw;
                       }
                       p{
                        font-size: ${12*2/baseWidth750}vw;
                        line-height: ${18*2/baseWidth750}vw;
                       }
                       .line{
                            width: ${27*2/baseWidth750}vw;
                            height: 0;
                            bottom: auto;
                            top: ${16/baseWidth750}vw;
                            left: auto;
                            right: 0;
                            border-top: 1px solid #FF6633;
                            
                       }
                       .circle{
                            width: ${8*2/baseWidth750}vw;
                            height: ${8*2/baseWidth750}vw;
                            left: auto;
                            right: 0;
                            bottom: auto;
                            top: ${16/2/baseWidth750}vw;
                            margin-left: 0;
                       }
                    }
                    .item.bottom{
                        width: 50%;
                        text-align: left;
                        left: 50%;
                        right: auto;
                        margin-left: -${8/baseWidth750}vw;
                        padding: 0 0 0 ${35*2/baseWidth750}vw;
                        .line{
                            bottom: auto;
                            top: ${16/baseWidth750}vw;
                            left: 0;
                            right: auto;
                            width: ${27*2/baseWidth750}vw;
                            height: 0;
                            border-top: 1px solid #FF6633;
                            margin-left:0;
                       }
                       .circle{
                            top: ${16/2/baseWidth750}vw;
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
        }


        @media screen and (max-width: 414px) {
            .pageWrap {
                height: calc(100vh - 67px);
                width: 100%;
            }
            .contentWrap{
                height: calc(100vh - 67px);
                padding-top: 0;
                position: relative;
    
                .nextBtn{
                    bottom: ${40*2/baseWidth750}vw;
                    left: ${40/baseWidth750}vw;
                    img{
                        width: ${45/baseWidth750}vw;
                        height: ${45/baseWidth750}vw;
                        margin-right: ${16/baseWidth750}vw;
                    }
                    .txt{
                        font-size: ${18*1.5/baseWidth750}vw;
                        line-height: ${40/baseWidth750}vw;
                    }
                }
            }
            .bannerBlock{
                height: 100vh;
                background-size: 100% auto;
                background-position: 50% 100%;
            }
            .bannerContent {
                padding-top: ${30/baseWidth750}vw;
                height: 100vh;
                .content{
                    width: 100%;
                    min-height: 300px;
                    padding:0 ${30/baseWidth750}vw;
                    margin-top: 19vh;
                    margin-left: 0;
                    box-sizing: border-box;
                    p{
                        font-size: ${18*2/baseWidth750}vw;
                        line-height: ${24*2/baseWidth750}vw;
                    }
                    h2,h3{
                        font-size: ${30*1.8/baseWidth750}vw;
                        line-height: ${38*2/baseWidth750}vw;
                    }
                    h2{
                        margin-top: 5px;
                    }
                    h3{
                        margin-bottom:15px;
                    }
                    .launchBtn{
                        width: ${180*2/baseWidth750}vw;
                        height: ${40*2/baseWidth750}vw;
                        margin-top: ${55*2/baseWidth750}vw;
                        font-size: ${14*2/baseWidth750}vw;
                        line-height: ${40*2/baseWidth750}vw;
                        img{
                            margin-left: ${32*2/baseWidth750}vw;
                            width: ${17*2/baseWidth750}vw;
                            height: ${14*2/baseWidth750}vw;
                        }
                    }
                }
            }
            
            .dmailBlock{
                background-size:  90%  auto;
                background-position: 100% 100%;
            }
    
            .dmailContent{
                .content{
                    width: 100%;
                    margin-left: 0;
                    padding: ${50/baseWidth750}vw ${50/baseWidth750}vw 0;
                    box-sizing: border-box;
                    p{
                        font-size: ${14*2/baseWidth750}vw;
                        line-height: ${18*2/baseWidth750}vw;
                    }
                    p.desc{
                        line-height: ${24*2/baseWidth750}vw;
                    }
                    h2{
                        font-size: ${32*2/baseWidth750}vw;
                        line-height: ${38*2/baseWidth750}vw;
                        margin: 5px 0 ${10*2/baseWidth750}vw;
                    }
                    .dmailItem{
                        margin-top: ${15*2/baseWidth750}vw;
                        .item{
                            margin-top: ${20*2/baseWidth750}vw;
                            >div{
                                width: ${40*2/baseWidth750}vw;
                                margin-right: ${10*2/baseWidth750}vw;
                                display: block;
                            }
                            img{
                                width: ${56*2/1.5/baseWidth750}vw;
                                height: ${54*2/1.5/baseWidth750}vw;
                            }
                            .txt{
                                font-size: ${14*2/baseWidth750}vw;
                                line-height: ${20*2/baseWidth750}vw;
                            }
                        }
                        .item2{
                            img{
                                width: ${56*2/1.5/baseWidth750}vw;
                                height: ${62*2/1.5/baseWidth750}vw;
                            }
                        }
                        .item3{
                            img{
                                width: ${65*2/1.5/baseWidth750}vw;
                                height: ${57*2/1.5/baseWidth750}vw;
                            }
                        }
                        .item4{
                            img{
                                width: ${42*2/1.5/baseWidth750}vw;
                                height: ${61*2/1.5/baseWidth750}vw;
                            }
                        }
                    }
    
                }
            }

            .workBlock{
                background-size: 80% auto;
                background-position: 100% 100%;
            }
    
            .workContent{
                .content{
                    width: 100%;
                    min-height: 300px;
                    margin-left: 0;
                    padding: ${50*2/baseWidth750}vw ${30*2/baseWidth750}vw 0;
                    box-sizing: border-box;
                    p{
                        font-size: ${16*2/baseWidth750}vw;
                        line-height: ${18*2/baseWidth750}vw;
                    }
                    p.desc{
                        font-size: ${14*2/baseWidth750}vw;
                        line-height: ${20*2/baseWidth750}vw;
                        letter-spacing: 1px;
                    }
                    h2{
                        font-size: ${32*2/baseWidth750}vw;
                        line-height: ${38*2/baseWidth750}vw;
                        margin: 5px 0 ${20*2/baseWidth750}vw;
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
                    top: ${20*2/baseWidth750}vw;
                    left: ${30*2/baseWidth750}vw;
                    right: auto;
                    margin-left: 0;
                    p{
                        font-size: ${16*2/baseWidth750}vw;
                        line-height: ${22*2/baseWidth750}vw;
                    }
                    h2{
                        font-size: ${38*2/baseWidth750}vw;
                        line-height: ${45*2/baseWidth750}vw;
                    }
                }
                .content{
                    width: 100%;
                    box-sizing: border-box;
                    margin-left: 0;
                    padding-left: ${20*2/baseWidth750}vw;
                    padding-right: ${20*2/baseWidth750}vw;
                    padding-top: ${20*2/baseWidth750}vw;
                    .highlightItem{
                        display: block;
                        .item{
                            width: 100%;
                            padding: 0 5px 0;
                            margin-top: ${5*2/baseWidth750}vw;
                            >div{
                                height: ${62*2/1.5/baseWidth750}vw;
                                width: ${62*2/1.5/baseWidth750}vw;
                                float: left;
                                align-items: center;
                                text-align: center;
                            }
                            img{
                                width: ${59/baseWidth750}vw;
                                height: ${64/baseWidth750}vw;
                                display: inline-block;
                                vertical-align: middle;
                                
                            }
                            h3{
                                font-size: ${14*2/baseWidth750}vw;
                                line-height: ${18*2/baseWidth750}vw;
                                margin: ${8*2/baseWidth750}vw 0 ${4/baseWidth750}vw;
                                margin-left: ${62*2/1.5/baseWidth750}vw;
                            }
                            p{
                                display: none;
                                font-size: ${12*2/baseWidth750}vw;
                                line-height: ${14*2/baseWidth750}vw;
                                margin-left: ${62*2/1.5/baseWidth750}vw;
                            }
                        }
                        .item2{
                            img{
                                width: ${62/baseWidth750}vw;
                                height: ${54/baseWidth750}vw;
                            }
                        }
                        .item3{
                            img{
                                width: ${49/baseWidth750}vw;
                                height: ${63/baseWidth750}vw;
                            }
                        }
                        .item4{
                            img{
                                width: ${55/baseWidth750}vw;
                                height: ${58/baseWidth750}vw;
                            }
                        }
                        .item5{
                            img{
                                width: ${52/baseWidth750}vw;
                                height: ${61/baseWidth750}vw;
                            }
                        }
                        .item6{
                            img{
                                width: ${59/baseWidth750}vw;
                                height: ${56/baseWidth750}vw;
                            }
                        }
                        .item7{
                            img{
                                width: ${55/baseWidth750}vw;
                                height: ${60/baseWidth750}vw;
                            }
                        }
                        .item8{
                            img{
                                width: ${58/baseWidth750}vw;
                                height: ${56/baseWidth750}vw;
                            }
                        }
                        .item9{
                            img{
                                width: ${44/baseWidth750}vw;
                                height: ${56/baseWidth750}vw;
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
                    left: ${30*2/baseWidth750}vw;
                    right: auto;
                }
            }
    
            .roadmapContent{
                height: calc(100vh - 67px);
                padding-top: 0;
                .content{
                    width: 100%;
                    min-height: ${100*2/baseWidth750}vw;
                    margin-left: ${30*2/baseWidth750}vw;
                    padding-top: ${50*2/baseWidth750}vw;
                    p{
                        font-size: ${18*2/baseWidth750}vw;
                        line-height: ${20*2/baseWidth750}vw;
                    }
                    h2{
                        font-size: ${36*2/baseWidth750}vw;
                        line-height: ${45*2/baseWidth750}vw;
                        margin: 5px 0 ${20*2/baseWidth750}vw;
                    }
                }
                .roadMap{
                    width: 100%;
                    background-image: none;
                    background-size: 100% auto;
                    background-position: 100% 50%;
                    height: calc(100vh - ${290*2/baseWidth750}vw);
                    .line{
                        height: calc(100vh - ${290*2/baseWidth750}vw);
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
                        margin-right: -${8/baseWidth750}vw;
                        box-sizing: border-box;
                        text-align: right;
                        padding-right: ${35*2/baseWidth750}vw;
                       h3{
                        font-size: ${16*2/baseWidth750}vw;
                        line-height: ${20*2/baseWidth750}vw;
                        margin-bottom: ${6*2/baseWidth750}vw;
                       }
                       p{
                        font-size: ${12*2/baseWidth750}vw;
                        line-height: ${18*2/baseWidth750}vw;
                       }
                       .line{
                            width: ${27*2/baseWidth750}vw;
                            height: 0;
                            bottom: auto;
                            top: ${16/baseWidth750}vw;
                            left: auto;
                            right: 0;
                            border-top: 1px solid #FF6633;
                            
                       }
                       .circle{
                            width: ${8*2/baseWidth750}vw;
                            height: ${8*2/baseWidth750}vw;
                            left: auto;
                            right: 0;
                            bottom: auto;
                            top: ${16/2/baseWidth750}vw;
                            margin-left: 0;
                       }
                    }
                    .item.bottom{
                        width: 50%;
                        text-align: left;
                        left: 50%;
                        right: auto;
                        margin-left: -${8/baseWidth750}vw;
                        padding: 0 0 0 ${35*2/baseWidth750}vw;
                        .line{
                            bottom: auto;
                            top: ${16/baseWidth750}vw;
                            left: 0;
                            right: auto;
                            width: ${27*2/baseWidth750}vw;
                            height: 0;
                            border-top: 1px solid #FF6633;
                            margin-left:0;
                       }
                       .circle{
                            top: ${16/2/baseWidth750}vw;
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
        }
        
`;
export {
    NewHome
}