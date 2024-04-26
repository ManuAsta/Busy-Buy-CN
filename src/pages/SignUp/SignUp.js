import React, {  useState } from 'react';
import LogButton from '../../components/LogButton/LogButton';
import Loading from '../../components/Loading/Loading';

import styles from "./Login.module.css";
//Firebase Autentication
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";

//creating data for this user
import { db } from '../../firebase/firebaseinit';
import {doc,setDoc} from "firebase/firestore";

//for showing the notifications
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//for redirecting the user after signed up
import {useNavigate} from "react-router-dom";
import { useNameEmailPassword } from '../../custom-hooks/useNameEmailPassword';


export default function SignUp() {

    const [name,setName,email,setEmail,password,setPassword]=useNameEmailPassword("","","");
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();

  
    const handleSignUp=(e)=>{
        e.preventDefault();
        const auth = getAuth();
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            setLoading(false);
            updateProfile(userCredential.user,{displayName:name})
            await setDoc(doc(db,"users",userCredential.user.uid),{
              orders:{},
              cartCount:0,
              totalPrice:0,
              cart:[]
            })
            .then(()=>{
              toast.success("Signed Up Successfully");
              setTimeout(()=>{
                navigate("/")
              },2000);
            })         
          })
          .catch((error) => {
            setLoading(false);
            // console.log(error);
            toast.error("Email Already in Use!");
        });
    }

    return (
        <>
         {loading&&<div className={styles.box}>
            <Loading/>
         </div>}
         <div className={styles.conatiner}>
          <h2>Sign Up</h2>
          <form className={styles.form} onSubmit={(e)=>handleSignUp(e)}>
            <input type='name' placeholder='Enter your Name' required onChange={(e)=>setName(e.target.value)}/>
            <input type='email' placeholder='Enter Email' required onChange={(e)=>setEmail(e.target.value)}/>
            <input type={'password'} minLength={6} placeholder='Enter Password' required onChange={(e)=>setPassword(e.target.value)}/>
            <LogButton type={"Sign Up"}/>
          </form>
        </div>
        </>
        
      )
}
