import React from 'react'
import styles from "./LogButton.module.css";

export default function LogButton(props) {
  const {type}=props;
  //this is login button that is used both in signin and sign up page
  return (
    <button className={styles.logButton}>
        {type}
    </button>
  )
}
