import React from 'react'
import styles from "./iconlabel.module.css"

const IconLabel = ({icon,label}) => {
  return (
    <div className={styles.iconlabel}>
        {icon}
        <span style={{fontSize:'14px'}}>{label}</span>
    </div>
  )
}

export default IconLabel