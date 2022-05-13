import { useState } from "react";

import Header  from "./Header"
import MainComponent from "./MainComponent"
import Footer from "./Footer"

 export interface UserData{
  user_id: number
  user_name: string
  is_faculty: boolean
}



export default function App(): JSX.Element {
  const [user, setUser] = useState<UserData>({user_id: 1, user_name: 'roshni', is_faculty: false})
  
  return (
  <>
    <Header user={user} setUser={setUser}/>
    <MainComponent  />
    <Footer/>

  </>
  )
}


