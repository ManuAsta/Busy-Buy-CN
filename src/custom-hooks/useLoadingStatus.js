import {  useEffect, useState} from "react";
//firebase
import { db } from "../firebase/firebaseinit";
import {collection,getDocs} from "firebase/firestore";

//custom hook

//used only for homepage to fetch the product data and show the list of the products
export const useLoadingFetch= (initialProductState,collectionName)=>{

    const[loading,setLoading]=useState(true);
    const[data,setData]=useState(initialProductState);

  useEffect(()=>{
    const getData=async ()=>{
      try{
        const querySnapshot=await getDocs(collection(db,collectionName));
        const data=querySnapshot.docs.map((doc)=>{
          return{
              id:doc.id,
              ...doc.data()
          }
        })
        // console.log(data);
        setData(data);
      }finally{
         setLoading(false);
      }
  }
    getData();
  },[collectionName]);

    return [data,loading];
}


