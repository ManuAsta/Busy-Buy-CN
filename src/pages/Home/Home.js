import styles from "./Home.module.css";
import Item from '../../components/Item/Item';
import CheckButton from '../../components/CheckButton/CheckButton';
//for the values of products and functions related to products
import {useProductValue} from "../../context/ProductsContext/ProductsContext";
import Loading from "../../components/Loading/Loading";

// import { db } from "../../firebase/firebaseinit";



export default function Home() {

  const {handlePrice,handleCategory,products,price,loading}=useProductValue();
  // console.log(products);
  return (
    <>
      {loading? <div className={styles.box}><Loading /></div>:
      <div className={styles.homelayout}>
      <div className={styles.filtersSection}>
        <div className={styles.filterBox}>
           <h4>Filter</h4>
           <form>
            <h5><label htmlFor="price" className="form-label mt-2"><u>Price Under:</u> ₹{price}</label></h5>
              <div className={styles.range}> 
                <input type="range" className="form-range" min="10" max="70000" defaultValue={price} step="5" id="price" name='price' onChange={(e)=>handlePrice(e)}/>
              </div>
              <h5><u>Category:</u></h5>
              <div className={styles.checks}>
                  <CheckButton handleCategory={handleCategory} category="Electronics"/>
                  <CheckButton handleCategory={handleCategory} category="Toys"/>
                  <CheckButton handleCategory={handleCategory} category="Books"/>
                  <CheckButton handleCategory={handleCategory} category="Pet-Accessories"/>
              </div>
           </form>
        </div>
      </div>
      <div className={styles.items}>
        {products.length>0? products.map((item,index)=><Item item={item} key={index}/>):<h1>No Products to show</h1>}
      </div>
    </div>}
      
    </>
    
  )
}
