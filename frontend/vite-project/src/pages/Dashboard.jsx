import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import {useState} from "react"
import { useEffect } from "react"



export const Dashboard = () => {
    const [balance,setBalance] = useState(10000)
    useEffect (()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
    })
        .then(res => {
            setBalance(res.data.balance)   
         })
    }, [])
    
    

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}