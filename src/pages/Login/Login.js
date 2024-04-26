import React, { useState } from 'react'
import LogButton from '../../components/LogButton/LogButton'
import styles from "./Login.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//custom hooks
import { useNameEmailPassword } from '../../custom-hooks/useNameEmailPassword';
//for showing the notifications
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {

  const [email,setEmail,password,setPassword]=useNameEmailPassword("","","");

  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handleSignIn=(e)=>{
    e.preventDefault();
    const auth = getAuth();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        toast.success(`Welcome ${userCredential.user.displayName}`);
        setTimeout(() => {
            navigate("/")
        }, 2000);
        setLoading(false);
      })
      .catch((error) => {
        // const errorCode = error.code;
        //  const errorMessage = error.message;
        // console.log(error.message);
        if(error.message==="Firebase: Error (auth/network-request-failed)."){
          toast.warning("Something went wrong try later");
          setLoading(false);
          return;
        }
        setLoading(false);
        toast.warning("Invalid username or password");
      });
  }


  return (
    <>
    <div className={styles.conatiner}>
      <h2>Sign In</h2>
      <form className={styles.form} onSubmit={(e)=>handleSignIn(e)}>
        <input type='email' placeholder='Enter Email' required onChange={(e)=>setEmail(e.target.value)}/>
        <input type={'password'} placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} required/>
        <LogButton type={loading? "...":"Sign In"}/>
      </form>
      <div>
        <NavLink  to={"/signup"}>No Account? Sign Up Instead</NavLink>
      </div>
    </div>
    </>
    
  )
}
