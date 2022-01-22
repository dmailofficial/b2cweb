import React, {useState, useEffect} from 'react'
import { Left } from './css'

import defaultImg from '@/static/images/presale/default.png'

const list = [
    {
        id: 1,
        label: "WEDNESDAY",
        name: "First round of dmail NFT Domain Account presale",
        desc: "Master your mailbox data sovereignty Each mail is NFT",
        time: "12/12/121-12/12/12/12",
        status: "1"
    },
    {
        id: 2,
        label: "WEDNESDAY",
        name: "Second round of dmail NFT Domain Account presale",
        desc: "Master your mailbox data sovereignty Each mail is NFT",
        time: "12/12/121-12/12/12/12",
        status: "2"
    },
    {
        id:3,
        label: "WEDNESDAY",
        name: "Third round of dmail NFT Domain Account presale",
        desc: "Master your mailbox data sovereignty Each mail is NFT",
        time: "12/12/121-12/12/12/12",
        status: "3"
    },
    {
        id:4,
        label: "WEDNESDAY",
        name: "Fourth round of dmail NFT Domain Account presale",
        desc: "Master your mailbox data sovereignty Each mail is NFT",
        time: "12/12/121-12/12/12/12",
        status: "3"
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
                        <span className="label">{item.label}</span>
                        <img className="cover" src={defaultImg}></img>
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
