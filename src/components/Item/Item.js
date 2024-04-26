import React from 'react'
import styles from "./Item.module.css";

//for checking if the user is singed in or not and redirect accordingly
import { useSignInValue } from '../../context/SignInContext/SignInContext';
import {useNavigate} from 'react-router-dom';


export default function Item(props) {
  const {item}=props;
//   console.log(props);
  const {isSignedIn}= useSignInValue();
  const navigate=useNavigate();

  //handle product page
  //if the user is signed in take me to the home page or else, take me to the signin page
  const handleProductPage=()=>{
    if(isSignedIn){
      navigate(`/${item.id}`);
    }else{
      navigate("/login");
    }
  }

  return (
    <div className={`card text-center ${styles.item}`} style={{"width": "18rem"}}>
        <img src={item.imageUrl} className={`card-img-top ${styles.image}`} alt={item.name}/>
        <div className="card-body">
            {/**on item, it's enough to show some part of the name, the full details are available on the product page anyway */}
            <h5 className="card-title">{item.name&&item.name.substring(0,40)}...</h5>
            <h2 className={styles.price}>₹ {item.price}</h2>
            <button  className={`btn ${styles["buy-btn"]}`} onClick={()=>handleProductPage()}>Buy Now</button>
        </div>
   </div>
  )
}
