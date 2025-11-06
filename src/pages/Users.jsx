import React from 'react'
import "../styles/Users.css"
import { useState } from 'react'
import UserOptions from '../components/UserComponents/UserOptions'
import AllUserTable from '../components/UserComponents/AllUserTable'
import ThemeToggleButton from '../components/ThemeToggleButton'
const Users = () => {
  const [userAdded,setUserAdded]=useState(0)
  const handleUserAdded=()=>{
    setUserAdded(prev=>prev+1)
  }
  return (
     <div className="users_section">
      <h1>Manage All The Users</h1>
    
    

      {/* Pass the key/signal to the table component */}
      <AllUserTable userAddedSignal={userAdded} /> 
    </div>
  )
}

export default Users