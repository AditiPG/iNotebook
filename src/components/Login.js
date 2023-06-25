import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";


const Login = (props) => {

  const [credentials,setCredentials]= useState({email:"", password:""});
  let navigate= useNavigate();
  
  
  const handleSubmit= async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:credentials.email, password:credentials.password}),
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
    <div >
    <h2 className='heading'>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit} className='my-3'>
  <div className="mb-3" >
    <label for="email" className='heading'>Email address</label>
    <input type="email" className="form-control " id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
    
  </div>
  <div className="fmb-3 my-2">
    <label for="password" className='heading'>Password</label>
    <input type="password" className="form-control " name="password" onChange={onChange} id="password" value={credentials.password}placeholder="Password"/>
  </div>
 
  <button type="submit" className="btn note-submit" >Submit</button>
</form>
</div>
    </>
  )
}

export default Login