import React from 'react'
export default function CheckButton(props) {
  const {category,handleCategory}=props;

  const styles={
    checkForm:{
        display:"flex",
        justifyConent:"space-evenly"
    }
  }
  //this comopnent is for filtering the products on the left side in the home page, a bootstrap checkbox
  return (
    <div className="form-check form-switch" style={styles.checkForm}>
        <input className="form-check-input" type="checkbox" role="switch" id={category} name={category.toLowerCase()} onChange={(e)=>handleCategory(e)} value={category.toLowerCase()}/>
        <label className="form-check-label" htmlFor={category}>{category}</label>
    </div>
  )
}
