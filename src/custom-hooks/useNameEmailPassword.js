import { useState } from "react";


//since we need the name, email and password for authentication in both login and signup page
export function useNameEmailPassword(nameIntitialState,emailInitialState,passwordInitialState){
    const [name,setName]=useState(nameIntitialState);
    const [email,setEmail]=useState(emailInitialState);
    const [password,setPassword]=useState(passwordInitialState);
    return [name,setName,email,setEmail,password,setPassword];
}