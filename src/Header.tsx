import {UserData} from "./App"
import {baseUrl} from "./baseURL"
import axios from "axios"
import { useEffect, useState } from "react"
interface HeaderProps{
    setUser: (arg:UserData) => void
    user: UserData
}


export default function Header(props: HeaderProps):JSX.Element{
    const [allUsers , setAllUsers ] = useState<UserData[]>([])


useEffect(()=> {
    const getAllUsers = async() => {
        const usersData = await axios.get(`${baseUrl}/users`)
          setAllUsers(usersData.data)             
}
getAllUsers()
}
,[])



    return (
        <>
        <h2>Header</h2>
        {}
        
        <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown button
        </button>
        <ul className="dropdown-menu btn btn-info" aria-labelledby="dropdownMenuButton1">
        {allUsers.map((user) => {return(<li key={user.user_id}><a className="dropdown-item" href="#">{user.user_name}</a></li>)})}
    
    
        </ul>
        </div>
        </>
    )
}