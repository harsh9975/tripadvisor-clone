import React from 'react'
import styles from "./button.module.css"

const Button = ({label,onClick,style,loading}) => {
  return (
    <button className={styles.button} disabled={loading} style={style} onClick={onClick}>{loading ? "Loading..":label}</button>
  )
}

export default Button