//react and react router dom
import React from 'react';
import {Outlet,useLocation, useNavigate} from "react-router-dom";
//styles
import styles from "./Navbar.module.css";
import ImageButton from '../ImageButton/ImageButton';
//contexts
import { useProductValue } from '../../context/ProductsContext/ProductsContext';
import { useNavLinksValue } from '../../context/NavLinksContext/NavContext';
import { useSignInValue } from '../../context/SignInContext/SignInContext';
//for showing notifications
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
//for authentication
import {getAuth,signOut} from "firebase/auth";
import { useOrdersValues } from '../../context/OrdersContext/OrdersContext';


export default function Navbar() {

  //the search bar in the navbar should interact with the filter and show the products
  const {handleSearch,searchValue}=useProductValue();
  //navicons data and show the search bar only when wwe are on the home page, that's why we need location
  const {navIcons}=useNavLinksValue();
  const location=useLocation();
  //to check if the user is signed in or not and show the navicons login/logout respectively and to navigate the user to home page after login or logout
  const {isSignedIn}=useSignInValue();
  const navigate=useNavigate();
  //when the user logs out, i need to clear the state variables
  const {clearAll} =useOrdersValues();
  

  //for logging out button on the navbar
  const logOut=()=>{
    const auth=getAuth();
    signOut(auth).then(()=>{
        // console.log("Signed out");
        toast.success("Signed Out!",{
            autoClose:1500
        });
        clearAll();
        navigate("/");
    })
}

  return (
   <>
    <nav className={`navbar fixed-top ${styles["navbar"]}`}>     
        <div className={"container-fluid"}>
            {/**title icon for home */}
            <div className={`${styles[navIcons[0].styles]}`}>
                <ImageButton show={navIcons[0].show} name={navIcons[0].name} source={navIcons[0].source} pageLink={navIcons[0].pageLink} imgWidth={navIcons[0].imgWidth}/>
            </div>

            {/**show the search bar only on the home products page */}
           {location.pathname==="/" && <form className={styles.search} role="search">
                <input name="search" className="form-control" type="search" placeholder="Search for a product ..." aria-label="Search" onChange={(e)=>handleSearch(e)} value={searchValue} />
            </form>}

            {/**other icons on the navbar with conditional rendering , whether the user is signed in or not */}
            {navIcons.map((navIcon,index)=>{
                if(index>=1){
                    if(isSignedIn &&  navIcon.name!=="Login"){
                        return <div key={index} className={`${styles[navIcon.styles]}`}>
                            <ImageButton name={navIcon.name} source={navIcon.source} imgWidth={navIcon.imgWidth} pageLink={navIcon.pageLink} logOut={logOut}/>
                        </div>
                    }else if(!isSignedIn && navIcon.name!=="Orders" && navIcon.name!=="Logout" && navIcon.name!=="Cart"){
                        return <div key={index} className={`${styles[navIcon.styles]}`}>
                            <ImageButton name={navIcon.name} source={navIcon.source} imgWidth={navIcon.imgWidth} pageLink={navIcon.pageLink} />
                        </div>
                    }
                }
                return ""
                })}
        </div>
    </nav>
    <ToastContainer autoClose={"1500"}/>
    <div style={{"marginTop":"130px"}}>
        <Outlet/>
    </div>
    
   </>
    
  )
}
