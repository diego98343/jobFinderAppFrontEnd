

import {useState,useEffect} from 'react'
import React from 'react'
import Wrapper from '../assets/wrappers/RegisterPage';
import Logo from '../components/Logo'
import { FormRow } from '../components';

const initialState = {
    name:'',
    email:'',
    password:'',
    inMember:true
}






function Register() {

const [values, setValues] = useState(initialState)

const handleChange = (e) =>{
    console.log(e.target)
};

const onSubmit = (e) =>{ 
    e.preventDefault()
    console.log(e.target)
};


  return (
    <Wrapper>
           <form className="form" onSubmit={onSubmit}>
              <Logo></Logo>
               <h3>Login</h3>

               <FormRow
                type='text'
                name='name'
                value={values.name}
                handleChange={handleChange}
               />

              <FormRow
                type='email'
                name='email'
                value={values.email}
                handleChange={handleChange}
               />
               
               <FormRow
                type='password'
                name='password'
                value={values.password}
                handleChange={handleChange}
               />


         
            <button type='submit' className='btn btn-block'>
                 submit
              </button>
           </form>
    </Wrapper>
    
  )
}

export default Register