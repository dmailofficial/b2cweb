import React, {useState, useEffect} from 'react'
import { Left } from './css'

const testlist = [
    {
        id: 1,
        label: "WEDNESDAY",
        name: "Firstround of dmail NFT Domain Account presale",
        time: "12/12/121-12/12/12/12",
        state: "1"
    },
    {
        id: 2,
        label: "WEDNESDAY",
        name: "Firstround of dmail NFT Domain Account presale",
        time: "12/12/121-12/12/12/12",
        state: "2"
    },
    {
        id:3,
        label: "WEDNESDAY",
        name: "Firstround of dmail NFT Domain Account presale",
        time: "12/12/121-12/12/12/12",
        state: "3"
    },
    {
        id:4,
        label: "WEDNESDAY",
        name: "Firstround of dmail NFT Domain Account presale",
        time: "12/12/121-12/12/12/12",
        state: "3"
    }
    
]

const LeftComp = (props) => {
    const [curId, setCurId] = useState(1)
    

    const handleClickItem = (id,e) => {
        setCurId(id);
        props.presaleChange(id);
        console.log(props);
    }

    useEffect(()=>{
        // check id after get list data
        handleClickItem(1);
    }, [])

    return (
        <Left>
            {
                testlist.map((item, i)=>{
                    return <div 
                            className={["activityItem",  curId == item.id ? "active" : "", item.state == 1 ? " coming" : item.state == 2 ? " progress" : " closed" ].join(' ')}
                            onClick = {()=>{handleClickItem(item.id)}}
                            key = {i}
                        >
                        <span className="label">{item.label}</span>
                        <div className="info">
                            <h3>{item.name}</h3>
                            <div className="statusInfo">
                                <span className="time">{item.time}</span>
                                <span className="status">{item.state == 1 ? "Coming" : item.state == 2 ? "In progress" : "Closed"}</span>
                            </div>
                        </div>
                    </div>
                })
            }
        </Left>
    )
}

export default LeftComp
