import React from 'react'
import { useOrdersValues } from '../../context/OrdersContext/OrdersContext'
import Loading from '../../components/Loading/Loading';
import styles from "./Orders.module.css";

export default function Orders() {

  const{orders,fetchLoading}=useOrdersValues();
  // console.log(orders);
  // console.log(fetchLoading);
  const keys=Object.keys(orders);

 

  return (
    <>
      {fetchLoading? <div className='position-fixed top-50 start-50'><Loading/></div>:<div>
        {keys.length>0? 
        <div className={styles.container}>
          <h2 className='text-center mb-5'>Your Orders</h2>
          {keys.map((key,index)=><div key={index}>
            <h4 className='text-center mt-5'>Orders on {key}</h4>
            <table className="table table-dark table-hover">
            <thead>
            <tr>
              <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Net Price</th>
            </tr>
            </thead>
            <tbody>
              {orders[key].map((cartItemObject,index)=><tr key={index}>
                <td>{cartItemObject.name.substring(0,50)}....</td>
                <td>₹ {cartItemObject.price}</td>
                <td>{cartItemObject.quantity}</td>
                <td>₹ {cartItemObject.price*cartItemObject.quantity}</td>
              </tr>)}
            </tbody>
            <tfoot>
              <tr>
              <td colSpan={"3"}>
                Total:
              </td>
              <td >
              ₹ {orders[key].reduce((total,item)=>total+item.quantity*item.price,0
              )}</td>
                
              </tr>
             
            </tfoot>
            </table>
          </div>)}
        </div>:<h2>No Orders to Show!</h2>}
      </div>}
    </>
  )
}
