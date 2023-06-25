import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials,setCredentials]= useState({name:"" ,email:"", password:"", cpassword:""});
  let navigate= useNavigate();
  
  
  const handleSubmit= async (e) => {
    e.preventDefault();
    const {name, email, password, }= credentials;
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password}),
    });
    const json= await response.json();
    console.log(json);
    if(json.success){
      //redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert('Successfully signed up!', "success");

    }
    else{
      props.showAlert('Invalid credentials', "danger");
    }
  }
  const onChange=(e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <>
    <div className='container'>
    <h2>Signup to iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="exa" aria-describedby="emailHelp" name="name" onChange={onChange} />
  </div>  
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" name='email'  onChange={onChange}  />
    
  </div>
  
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" onChange={onChange} name='password'  />
  </div>

  <div class="mb-3">
    <label for="cpassword" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" id="cpassword" onChange={onChange} name='cpassword' />
  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

    </div>

    </>

  )
}

export default Signup