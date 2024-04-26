import { createContext, useContext } from "react";
// import {data} from "../../data/products";
import React, { useState,useEffect } from 'react';
import { useLoadingFetch } from "../../custom-hooks/useLoadingStatus";



const ProuductsContext=createContext();


//for using the product value later
//custom hook
export function useProductValue(){
    return useContext(ProuductsContext);
}

//since the products are being used in the search bar and filter bar, the whole navbar will be the children of this component
export default function ProductContextComponent({children}){
    
    //this is to show the products, whether the user is signed in or not, we need to show the data
    const [data,loading]=useLoadingFetch([],"products");
    // console.log(data);
    //every product has price, name, etc...
    const [price,setPrice]=useState(7000);
    const [products,setProducts]=useState([]);
    //this is the search value from the search bar that we need to filter the products
    const [searchValue,setSearchValue]=useState("");
    //filtering by category on the left panel
    let [categories,setCategories]=useState([]);
    //after fetching the data, set the data and show the products in home page
    useEffect(()=>{
        setProducts(data);
        // console.log(products);
    },[data]);

    //whenver the price/category/search changes, we need the search results to be changed likewise
    useEffect(() => {
       if(categories.length>0){
        // console.log("categories",categories);
        const filteredProducts=data.filter((product)=>categories.includes(product.category)&&product.price<=price);
        // console.log(filteredProducts);
        if(searchValue===""){
            setProducts(filteredProducts);
        }else{
            //can be searched based on product name or description as weelll
            const searchFiltered=filteredProducts.filter((product)=>product.name.toLowerCase().includes(searchValue.toLowerCase()) || product.description.toLowerCase().includes(searchValue.toLowerCase()));
            setProducts(searchFiltered);
        }
       
       }else{
        const filteredProducts=data.filter((product)=>product.price<=price);
        // console.log(filteredProducts);
        if(searchValue===""){
            setProducts(filteredProducts);
        }else{
            const searchFiltered=filteredProducts.filter((product)=>product.name.toLowerCase().includes(searchValue.toLowerCase()) || product.description.toLowerCase().includes(searchValue.toLowerCase()));
            setProducts(searchFiltered);
        }
       }
    }, [price,categories,searchValue,data])


    //for the seach in Navbar
    function handleSearch(e){
        setSearchValue(e.target.value);
    }

    //for setting the price in filter
    function handlePrice(e){
      const price=e.target.value;
      setPrice(price);
    }
    
    //for setting the category in filter
    function handleCategory(e){
      const category=e.target.value;
      const index=categories.indexOf(category);
      if(index===-1){
        categories=[...categories,category];
      }else{
        categories=categories.filter((category,i)=>i!==index);
      }
      setCategories(categories);
      //  console.log(categories);
  
    }

    return(
        <ProuductsContext.Provider value={{handlePrice,handleCategory,products,price,handleSearch,searchValue,loading}}>
            {children}
        </ProuductsContext.Provider>
    )
}
