import React from 'react'
import styles from "./button.module.css"

const Button = ({label,onClick,style}) => {
  return (
    <button className={styles.button} style={style} onClick={onClick}>{label}</button>
  )
}

export default Button