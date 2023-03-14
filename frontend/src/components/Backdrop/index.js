import React from 'react'
import styles from "./backdrop.module.css"

const BackDrop = ({onClick,style}) => {
  return (
    <div className={styles.backdrop} style={style} onClick={onClick}></div>
  )
}

export default BackDrop