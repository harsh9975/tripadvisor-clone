import React from 'react'
import BackDrop from '../Backdrop'
import styles from "./drawer.module.css"
import { MdCancel } from "react-icons/md";

const Drawer = ({onClick,children,style}) => {
  return (
    <>
    <div className={styles.drawer} style={style}>
      <div onClick={onClick} style={{display:'flex',marginTop:'20px',width:'100%',justifyContent:'flex-end',alignItems:'center',padding:'30px',boxSizing:'border-box',cursor:'pointer'}}>
<MdCancel style={{fontSize:'19px'}} />
      </div>
      {children}
      </div>
    <BackDrop onClick={onClick}/>
    </>
    
  )
}

export default Drawer