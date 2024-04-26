import { createContext, useContext,useEffect, useState } from "react";
import { getAuth,onAuthStateChanged} from "firebase/auth";



const SignInContext=createContext();
export function useSignInValue(){
    return useContext(SignInContext);
}

//this is to check if the user is singed in or singed out and to use the user data elsewhere in the application

export default function SignInContextComponent({children}){
    const [isSignedIn,setSignedIn]=useState(false);
    const [user,setUser]=useState(null);
    useEffect(()=>{
        const auth=getAuth();
        const unsub=onAuthStateChanged(auth,(user)=>{
          if(user){
            // console.log("User is signed icn");
            setSignedIn(true);
            // console.log(user);
      
            setUser(user);
          }else{
            setSignedIn(false);
          }
        });

        return(()=>{
          unsub();
        })

      },[])

    return(<SignInContext.Provider value={{isSignedIn,user}}>
        {children}
    </SignInContext.Provider>)
}