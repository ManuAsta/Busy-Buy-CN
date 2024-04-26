import React from 'react'
import styles from "./CartItem.module.css";

export default function CartItem(props) {
  
  //we need these values
  const{item,handleDecrease,handleIncrease,removeFromCart}=props;

  //this item would have image, name, remove from cart option and increase or decrese quantity of the item
  return (
    <>
    <div className={`card text-center ${styles.item}`} style={{width: "18rem"}}>
      <img src={item.imageUrl} className="card-img-top" width={"100%"} height={"250px"} alt={item.name}/>
    <div className="card-body">
    <h5 className="card-title">{item.name&&item.name.substring(0,30)}...</h5>
    <div className={"d-flex align-items-center justify-content-around"}>
        <h4>₹ {item.price}</h4>
        <button className={`ms-2 me-2 ${styles.button}`} onClick={()=>handleDecrease(item)}>
            <img alt='decrease' src="images/logo/minus.png" width={"100%"} />
        </button>
        <h4>
              {item.quantity}
        </h4> 
        <button className={`ms-2 me-2 ${styles.button}`}  onClick={()=>handleIncrease(item)}>
            <img alt='decrease' src="images/logo/add.png" width={"100%"} />
        </button>  
    </div>
    <button  className={styles.remove} onClick={()=>removeFromCart(item)}>Remove From Cart</button>
  </div>
</div>
    </>
   
  )
}
