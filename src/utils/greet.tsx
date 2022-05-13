import axios from "axios"
import { useState } from "react"

export function greet(name: string): JSX.Element {
  const [users, setUsers] = useState()
  const getAllUsers = async() => {
    const userData = await axios.get('www.dsfs.com')
    const allUserData = userData.data
    setUsers(allUserData)
  }
  getAllUsers()

  return (
  <>
    {users}
  </>
  )
  }
