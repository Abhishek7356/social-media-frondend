import React, { useContext, useState } from 'react'
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import './Login.css'
import { Link } from 'react-router-dom';
import { getLoginUserStatus } from '../../services/allApi';
import { DispatchProvider } from '../../context/AuthContext';

function Login() {

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  // console.log(user);

  const dispatch = useContext(DispatchProvider);
  // console.log(dispatch);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (email && password) {
      let responseUser = await getLoginUserStatus(user)
      console.log(responseUser);
      if (responseUser.status == 200) {
        localStorage.setItem("user", JSON.stringify(responseUser.data));
        alert("User Login Successfull")
        // dispatch({ type: 'userLogin', payload: responseUser.data })
        window.location.reload()
      } else {
        alert(responseUser.response.data)
      }
    } else {
      alert('Enter details correctly')
    }
  }

  return (
    <div className='outerSignup'>
      <div className='signUpForm'>
        <img src="https://i.pinimg.com/originals/bc/be/2f/bcbe2fed5a876bf4e71577bae57b2352.png" alt="" />
        <form className='loginform'>
          <h4 className='text-center mb-3'>Login</h4>
          <MDBInput className='mb-4 input' required re type='email' id='form1Example1' label='Email address' onChange={(e) => setUser({ ...user, email: e.target.value })} />
          <MDBInput className='mb-4 input' required type='password' id='form1Example2' label='Password' onChange={(e) => setUser({ ...user, password: e.target.value })} />

          <MDBRow className='mb-4'>
            <MDBCol>
              <a href='#!'>Forgot password?</a>
            </MDBCol>
          </MDBRow>
          <div className='d-flex justify-content-between flex-wrap align-items-center'>
            <MDBBtn style={{ width: '100px' }} type='submit' onClick={handleSubmit} block>
              Log in
            </MDBBtn>
            <Link to={'/signup'}>New user</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login