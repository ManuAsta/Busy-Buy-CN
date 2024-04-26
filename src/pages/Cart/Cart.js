import React, { useEffect,useState } from 'react'
import styles from "./Cart.module.css";
import { useSignInValue } from '../../context/SignInContext/SignInContext';
import {useOrdersValues} from "../../context/OrdersContext/OrdersContext";
import CartItem from '../../components/CartItem/CartItem';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseinit';
import Loading from "../../components/Loading/Loading";


//for showing notifications
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';




export default function Cart() {

  const {fetchLoading,cart,setCart,setTotalPrice,setCartCount,totalPrice,cartCount,orders,setOrders}  =useOrdersValues();
  const {user}=useSignInValue();
  const [clicked,setClicked]=useState(false);
  const [loadingUpdate,setLoadingUpdate]=useState(false);
  const navigate=useNavigate();

  
  const handleDecrease=(item)=>{
    //find the item in the cart and set the quantity
    const cartItem=cart.find((Item)=>Item.id===item.id);
    if(cartItem.quantity===1){
      return;
    }
    // console.log(cartItem);
    cartItem["quantity"]-=1;
    setCart(cart);
    setCartCount((prevState)=>prevState-1);
    setTotalPrice((prevState)=>prevState-item.price);
  }

  const handleIncrease=(item)=>{
    //find the item in the cart and set the quantity
    const cartItem=cart.find((Item)=>Item.id===item.id);

    // console.log(cartItem);
    cartItem["quantity"]+=1;
    setCart(cart);
    setCartCount((prevState)=>prevState+1);
    setTotalPrice((prevState)=>prevState+item.price);
  }

  const removeFromCart=(item)=>{
    // console.log(item);
    const cartItemIndex=cart.indexOf(item);
    //first decrease the cartCount by quantity
    setCartCount((prevState)=>prevState-item.quantity);
    //next decrease the price
    setTotalPrice((prevState)=>prevState-item.quantity*item.price);
    cart.splice(cartItemIndex,1);
    setCart(cart);
    // console.log(cart);
    setClicked(true);
  } 


  const placeOrder=()=>{
    
    orders[new Date().toString()]=[...cart];
    console.log(orders);
    setCart([]);
    setCartCount(0);
    setTotalPrice(0);
    setClicked(true);
    setOrders(orders);
    toast.success("order placed");
    setTimeout(()=>{
      navigate("/orders");
    },2000)
  }



 //update in the firestore as well
 useEffect(()=>{
  // console.log("hello");
  const updateUserInfo=async()=>{
    if((user && clicked) || (user && cart.length!==0)){
      setLoadingUpdate(true)
      await updateDoc(doc(db,"users",user.uid),{
        cartCount,
        cart,
        totalPrice,
        orders
      })
      setClicked(false);
      setLoadingUpdate(false);
    } 
  }
  if(user){
    updateUserInfo();
  }
},[cartCount,user,cart,totalPrice,clicked,orders]);


  return (
    <>
    
    {fetchLoading? <div className={"position-absolute top-50 start-50"}><Loading/></div>: <>{cart.length>0? <div className={styles.cartlayout}>
    <div className={styles.priceSection}>
      <div className={styles.priceBox}>
         <h4>{user? <span>{user.displayName}</span>:<span>User's Cart</span>}</h4>
         <hr className="border border-primary border-2 opacity-75"></hr>
         <h5>Total Price</h5>
         <h3>₹ {totalPrice}</h3>
         <button onClick={()=>placeOrder()} className={styles.order}> 
              Place Order
         </button>
      </div>
    </div>
    <div className={styles.items}>
      {cart.map((cartItem,index)=><CartItem handleDecrease={handleDecrease} removeFromCart={removeFromCart} handleIncrease={handleIncrease} key={index} item={cartItem}/>)}
    </div>
  </div>:<h1>Cart is Empty X﹏X</h1>}
      
    </>}
    {loadingUpdate? <div className={`position-fixed ${styles.update}`}><Loading/></div>:<></>}
    </>
   
    
  )
}
