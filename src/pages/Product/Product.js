import React, {  useEffect, useReducer, useState } from 'react'
import { useParams ,Link} from 'react-router-dom';
import { useLoadingFetch } from '../../custom-hooks/useLoadingStatus';
import styles from "./Product.module.css";
import Loading from '../../components/Loading/Loading';
import { useSignInValue } from '../../context/SignInContext/SignInContext';
import { useOrdersValues } from '../../context/OrdersContext/OrdersContext';

//for showing the notifications
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//for updating the userInfo
import { db } from '../../firebase/firebaseinit';
import {doc, updateDoc} from "firebase/firestore";
import ErrorFallBackUI from '../ErrorFallBackUI/ErrorFallBackUI';



//for quanitty
//for increasing or decreasing the quantity
const quantityReducer=(state,action)=>{
  switch(action.type){
    case "ADD": return state+1;
    case "MINUS": if(state===1){
      return state;
    }return state-1;
    default: return state
  }
 
}



export default function Product() {
  const {productID}=useParams();
  //get the product from the server
  //now checck for the product
  const [data,loading]=useLoadingFetch([],"products");
  const product=data.find((prod)=>prod.id===productID);
  // console.log(product);
  // console.log(data);
  //check for user signed in
  const {isSignedIn}=useSignInValue();
  const [quantity,dispatch]=useReducer(quantityReducer,1);
  //for setting the cartCount
  const {cartCount,setCartCount,totalPrice,setTotalPrice,user,setCart,cart}=useOrdersValues();

  //for updating the cart count in the firestore
  const [loadingUpdate,setLoadingUpdate]=useState(false);

  //for setting the cart
  const handleCart=()=>{
    setCartCount(cartCount+quantity);
    setTotalPrice(totalPrice+(quantity*product.price));

    //first search if the product is present in the cart ornot
    const productFromCart=cart.find((cartItem)=>cartItem.id===product.id);
    if(productFromCart){
      const indexOfProduct=cart.indexOf(productFromCart);
      cart[indexOfProduct]["quantity"]+=quantity;
      setCart([...cart]);
      
    }else{
      const cartProduct={
        ...product,
        quantity
      }
      setCart([...cart,cartProduct]);
    }
    toast.success("Added to Cart")
  }

  //update in the firestore as well
  useEffect(()=>{
    const updateUserInfo=async()=>{
      // console.log("Hello");
      if(user && cartCount!==0){
        setLoadingUpdate(true)
        await updateDoc(doc(db,"users",user.uid),{
          cartCount,
          cart,
          totalPrice
        })
        setLoadingUpdate(false);
 
      } 
    }
    updateUserInfo();
  },[cartCount,user,cart,totalPrice]);

  



  return (
    <>
    {isSignedIn? <>{loading? <div className={styles.box}><Loading/></div>:
    <>
      {product?  <div className="container">
        <div className='row'>
          <div className='col text-center'>
            <img src={product.imageUrl} alt={product.name} width={"90%"} height={"600px"}/>
          </div>
          <div className='col'>
            <h2>{product.name}</h2>
            <h1>₹ {product.price}</h1>
            <hr className="border border-danger border-2 opacity-50"></hr>
            <p><b>Description:</b> {product.description.substring(0,1000)}...</p>
            <hr className="border border-danger border-2 opacity-50"></hr>
            <div className='text-center '>
                <div>
                  <span className='fw-bold'>Quantity: </span>
                  <button className={`ms-2 me-2 ${styles.button}`} onClick={()=>dispatch({type:"MINUS"})}>
                    <img alt='decrease' src="images/logo/minus.png" width={"100%"} />
                  </button>
                  <span className='fw-bold'>{quantity}</span>
                  <button className={`ms-2 me-2 ${styles.button}`} onClick={()=>dispatch({type:"ADD"})}><img alt='decrease' src="images/logo/add.png" width={"100%"}/></button>
                </div>
                <div className='mt-3'>
                    <button className={styles["cart-button"]} onClick={()=>handleCart()}>
                        {loadingUpdate? "Adding to cart":"Add to cart"}
                    </button>
                </div>
                <div className='mt-3'>
                  <Link to={"/"}><h3>Go Back</h3></Link>
                </div>
            </div>
          </div>
        </div>
        
      </div>:<ErrorFallBackUI/>}
    </>
     }</> :<Loading/>}
     
    </>
  )
}
