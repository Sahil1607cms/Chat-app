import React from 'react'
import { useState } from 'react'

const SettingsPage = () => {
  const [formData,setFormData] = useState({
    fullName:"",
    email:"",
    password:""
  })
  const [showPassword,setShowPassword] = useState(false)

  const handleSubmit=()=>{
    e.preventDefault(e)
  }
  const validateForm=()=>{

  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* left side */}
      <div>

      </div>
      {/* right side */}
      <div>
        <h1>Signup</h1>
        <form action=""></form>
      </div>

    </div>
  )
}

export default SettingsPage