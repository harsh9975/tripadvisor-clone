import React from 'react'
import Chips from '../Chips'
import styles from "./chiplist.module.css"

const Chipslist = ({list}) => {
  return (
    <div className={styles.chiplist} >
    {        list.map((item,id)=>(
            <Chips key={id} label={item.label} icon={item.icon}/>
        ))
        }</div>
  )
}

export default Chipslist