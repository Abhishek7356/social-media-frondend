import React, { useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import { registerUser } from '../../services/allApi';


function Signup() {
  const [user, setUser] = useState({
    username: "",
    about: "",
    relationship: "",
    city: "",
    country: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, about, relationship, city, country, email, password } = user;
    if (username && about && relationship && city && country && email && password) {
      if (password == confirmPassword) {
        try {
          let response = await registerUser(user);
          console.log(response);
          if (response.data) {
            navigate('/login')
          } else {
            alert('This email has alreday registered')
          }
        } catch (err) {
          alert(err)
        }
      } else {
        alert('passwords does not match')
      }
    } else {
      alert('Please Provide Details Correctly')
    }
  }

  return (
    <div className='outerSignup'>
      <div className='signUpForm'>
        <img src="https://i.pinimg.com/originals/bc/be/2f/bcbe2fed5a876bf4e71577bae57b2352.png" alt="" />
        <form className='loginform'>
          <h4 className='text-center mb-3'>Sign up</h4>
          <div className='d-flex gap-2 mb-2'>
            <MDBInput className='input' required re type='text' label='Username' onChange={(e) => setUser({ ...user, username: e.target.value })} />
            <MDBInput className=' input' required re type='text' label='Designation' onChange={(e) => setUser({ ...user, about: e.target.value })} />
          </div>
          <div className='d-flex gap-2 mb-2'>
            <MDBInput className=' input' required re type='text' label='Country' onChange={(e) => setUser({ ...user, country: e.target.value })} />
            <MDBInput className='input' required re type='text' label='City' onChange={(e) => setUser({ ...user, city: e.target.value })} />
          </div>
          <MDBInput className='mb-2 input' required re type='text' label='Marital Status' placeholder='Married or single' onChange={(e) => setUser({ ...user, relationship: e.target.value })} />
          <MDBInput className='mb-2 input' required re type='email' label='Email address' onChange={(e) => setUser({ ...user, email: e.target.value })} />
          <div className='d-flex gap-2 mb-2'>
            <MDBInput className=' input' required type='password' label='Password' onChange={(e) => setUser({ ...user, password: e.target.value })} />
            <MDBInput className='input' required type='password' label='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <div className='d-flex justify-content-between flex-wrap align-items-center'>
            <MDBBtn style={{ width: '150px' }} type='submit' onClick={handleSubmit} block>
              Sign up
            </MDBBtn>
            <Link to={'/login'}>Allready have an account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup