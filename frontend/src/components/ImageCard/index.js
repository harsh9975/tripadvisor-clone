import React from 'react'
import styles from "./imagecard.module.css"

const ImageCard = ({label,url}) => {
  return (
    <div className={styles.imagecard}>
        <img src={url} alt="img" />
        <h2>{label}</h2>
    </div>
  )
}

export default ImageCard