import React from 'react'
import '../components/Login_first.css'

const Login_first = () => {
  return (
    <div className='login_first'>
        <div className='loginf_img'>
            <img src="https://img.staticmb.com/mbcontent/images/uploads/2022/7/difference-between-flat-and-apartment.jpg" alt="" />
        </div>
        <div className='loginf_sec'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEPnJztpWSqZ8Mtwxyc-qAqT5fI-PG8dHWNQ&s" alt="" />
            <input type="text" placeholder='Name' id='Name'/>
            <input type="number" placeholder='Phone No' id='PhoneNo'/>
            <input type="text" placeholder='Society Name' id='SocietyName'/>
            <input type="text" placeholder='Society Address' id='SocietyAddress'/>
            <input type="text" placeholder='City' id='City'/>
            <input type="text" placeholder='District' id='District'/>
            <input type='text' placeholder='Postal' id='Postal'/>
            <button>Register</button>
        </div>
    </div>
  )
}

export default Login_first