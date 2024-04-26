import React from 'react'
import styles from "./ImageButton.module.css";
//Navlink to redirect to a specific page (cart/orders/home/login)
import { NavLink } from 'react-router-dom';
//we need to display the cartCount  on the cart icon in the navbar, so i imported it here from the context
import { useOrdersValues } from '../../context/OrdersContext/OrdersContext';


export default function ImageButton(props) {
   //navicons data
  const{name,source,imgWidth,pageLink,logOut}=props;
   //for updating the cart count
   const {cartCount}=useOrdersValues();
  
  return (
    <>  
       {name!=="Logout" && <NavLink  className={({isActive})=> isActive? `${styles["box-glow"]} ${styles["container"]}`:`${styles["container"]}`} to={pageLink}>
          <img alt={name} src={source} width={imgWidth} height={"100%"}/>
          {name==="Cart" && <div className={styles.count}>{cartCount}</div>}
          <span>{name}</span>
       </NavLink>}

        {/**for logging out, it is not a link, just a button */}
       {name==="Logout" && <div  className={styles.container} onClick={()=>{logOut()}}> 
      <img alt={name} src={source} width={imgWidth} height={"100%"}/>
          <span>{name}</span>
       </div>}

    </>
  )
}



