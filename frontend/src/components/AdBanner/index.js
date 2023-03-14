import React from 'react'
import Button from '../Button'
import styles from "./adbanner.module.css"

const AdBanner = ({title,desc,label,url}) => {
  return (
    <div className={styles.adbanner}>
        <div className={styles.adbanner_text}>
            <h2>{title}</h2>
            <p>{desc}</p>
            <Button label={label} style={{marginTop:'20px'}} />
        </div>
        <div className={styles.adbanner_img}>
        <img src={url} alt=""/>
        </div>
    </div>
  )
}

export default AdBanner