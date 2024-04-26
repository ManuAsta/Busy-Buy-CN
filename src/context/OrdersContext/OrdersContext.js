import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc} from "firebase/firestore"; 
import { db } from "../../firebase/firebaseinit";
import { useSignInValue } from "../SignInContext/SignInContext";

const ordersContext=createContext();

export function useOrdersValues(){
    return useContext(ordersContext);
}

//most important conext, this component interacts with the database at first and fetches the data like orders/cart items

export default function OrdersContextComponent({children}){

    //need to check if the user is there or not, to fetch the data of the respective user
    const {user}=useSignInValue();
    //data that we need from server
    const[cartCount,setCartCount]=useState(0);
    const[totalPrice,setTotalPrice]=useState(0);
    const[cart,setCart]=useState([]);
    const[orders,setOrders]=useState({});
    //while fetching, to show the react spinner
    const [fetchLoading,setFetchLoading]=useState(true);
    
    
    
    //when the component loads, get the data fromt the server and set the orders, cart, totalcount, totalprice
    useEffect(()=>{
        //  console.log(cart,cartCount,totalPrice);
        if(user){
         //fetch the data
         // console.log("Hello");
         setFetchLoading(true);
         const getUserData=async()=>{
             const docRef = doc(db, "users", user.uid);
             const docSnap = await getDoc(docRef);
             if (docSnap.exists()) {
                 const data=docSnap.data();
                //  console.log(data);
                 setOrders(data.orders);
                 setCart(data.cart);
                 setTotalPrice(data.totalPrice);
                 setCartCount(data.cartCount);
             }
             setFetchLoading(false);
         }
         getUserData();
        }
     },[user]);


     //to clear the local state
    const clearAll=()=>{
        setCart([]);
        setCartCount(0);
        setTotalPrice(0);
        setOrders({});
    }
 

  
    

    return(<ordersContext.Provider value={{cart,cartCount,setCartCount,setCart,setTotalPrice,totalPrice,fetchLoading,clearAll,user,orders,setOrders}}>
        {children}
    </ordersContext.Provider>)
}