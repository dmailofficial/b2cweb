import React, {useState, useEffect} from 'react'
import { Left } from './css'

import coverImg1 from '@/static/images/presale/activecover1.png'
import coverImg2 from '@/static/images/presale/activecover2.png'


const list = [
    {
        id: 1,
        label: "WEDNESDAY",
        name: "NFT Domain Account",
        desc: "Master your mailbox data sovereignty Each mail is NFT",
        time: "12/26/2021-1/26/2022",
        status: "1",
        cover: coverImg1
    },
    {
        id: 2,
        label: "WEDNESDAY",
        name: "NFT Domain Account",
        desc: "Master your mailbox data sovereignty Each mail is NFT",
        time: "12/26/2021-1/26/2022",
        status: "2",
        cover: coverImg2
    },
    {
        id:3,
        label: "WEDNESDAY",
        name: "NFT Domain Account",
        desc: "Master your mailbox data sovereignty Each mail is NFT",
        time: "12/26/2021-1/26/2022",
        status: "3",
        cover: coverImg1
    },
    {
        id:4,
        label: "WEDNESDAY",
        name: "NFT Domain Account",
        desc: "Master your mailbox data sovereignty Each mail is NFT",
        time: "12/26/2021-1/26/2022",
        status: "3",
        cover: coverImg2
    }
    
]

const LeftComp = (props) => {
    const [curId, setCurId] = useState(1)
    

    const handleClickItem = (id,e) => {
        setCurId(id);
        let cur = null
        list.map((item)=>{
            if(id == item.id){
                cur =  item;
            }
        })
        props.presaleChange(cur);
    }

    useEffect(()=>{
        // check id after get list data
        handleClickItem(1);
    }, [])

    return (
        <Left>
            {
                list.map((item, i)=>{
                    return <div 
                            className={["activityItem",  curId == item.id ? "active" : "", item.status == 1 ? " coming" : item.status == 2 ? " progress" : " closed" ].join(' ')}
                            onClick = {()=>{handleClickItem(item.id)}}
                            key = {i}
                        >
                        {/* <span className="label">{item.label}</span> */}
                        <img className="cover" src={item.cover}></img>
                        <div className="info">
                            <h3>{item.name}</h3>
                            <div className="statusInfo">
                                <span className="time">{item.time}</span>
                                <span className="status">{item.status == 1 ? "Coming" : item.status == 2 ? "In progress" : "Closed"}</span>
                            </div>
                        </div>
                    </div>
                })
            }
        </Left>
    )
}

export default LeftComp
