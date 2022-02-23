import React, {useState, useEffect} from 'react'
import { Left } from './css'
import { getEvents } from './request'

import coverImg from '@/static/images/presale/activecover.png'

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
        // console.log("props.walletStore......",props.presaleStore)
        props.presaleStore.setCurPresale(cur)
        props.presaleChange(cur)
    }

    const getEventsList = async () =>{
       const {data, code, message, success} = await getEvents();
       if(!success){
            console.log("get events error")
            return
       }

       const list = data.map((item, i)=>{
            let round = item.id;
            return {...item, cover: coverImg, _index:i+1, round}
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
                            className={["activityItem",  curId == item._index ? "active" : "", item.status === 0 ? " coming" : item.status === 1 ? " progress" : " closed" ].join(' ')}
                            onClick = {()=>{handleClickItem(item._index)}}
                            key = {i}
                        >
                        {/* <span className="label">{item.label}</span> */}
                        <img className="cover" src={item.cover}></img>
                        <div className="info">
                            <h3>{item.name}</h3>
                            <div className="statusInfo">
                                <span className="time">{item.startDate}-{item.endDate}</span>
                                <span className="status">{item.status === 0 ? "Coming" : item.status == 1 ? "In progress" : "Closed"}</span>
                            </div>
                        </div>
                    </div>
                })
            }
        </Left>
    )
}

export default LeftComp
