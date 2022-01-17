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
    }
]

function Left() {


    


    return (
        <Left>
            {
                testlist.map((item, i)=>{
                    return <div className="activityItem"></div>
                })
            }
        </Left>
    )
}

export default Left
