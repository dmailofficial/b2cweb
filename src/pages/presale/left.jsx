import React, {useState, useEffect} from 'react'
import { Left } from './css'
import { getEvents } from './request'

import coverImg1 from '@/static/images/presale/activecover1.png'
import coverImg2 from '@/static/images/presale/activecover2.png'


const testlist = [
    {
        id: 1,
        label: "WEDNESDAY",
        name: "Firstround of dmail NFT Domain Account presale",
        desc: "Master your mailbox data sovereignty Each mail is NFT",
        time: "12/26/2021-1/26/2022",
        status: "1",
        cover: coverImg1
    },
    {
        id: 2,
        label: "WEDNESDAY",
        name: "Firstround of dmail NFT Domain Account presale",
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
    const [list, setList] = useState([])

    const handleClickItem = (id,e) => {
        setCurId(id);
        let cur = null
        if(!list.length){return}

        list.map((item,i)=>{
            if(id == item._index){
                cur =  item;
            }
        })
        props.presaleChange(cur);
    }

    const getEventsList = async () =>{
       const {data, code, message, success} = await getEvents();
       if(!success){

       }

       const list = data.map((item, i)=>{
            let status = i == 0 ? "2" : "3";
            return {...item, cover: coverImg1, _index:i+1, id: i+1, status}
       })

       await (()=>{setList(list)})()
    }

    useEffect(()=>{
        // check id after get list data
        getEventsList();
        
    }, [])

    useEffect(()=>{
        handleClickItem(1);
    }, [list])

    return (
        <Left>
            {
                list.map((item, i)=>{
                    return <div 
                            className={["activityItem",  curId == item._index ? "active" : "", item.status == 1 ? " coming" : item.status == 2 ? " progress" : " closed" ].join(' ')}
                            onClick = {()=>{handleClickItem(item._index)}}
                            key = {i}
                        >
                        {/* <span className="label">{item.label}</span> */}
                        <img className="cover" src={item.cover}></img>
                        <div className="info">
                            <h3>{item.name}</h3>
                            <div className="statusInfo">
                                <span className="time">{item.startDate}-{item.endDate}</span>
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
