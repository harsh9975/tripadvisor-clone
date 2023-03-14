import React, { useState } from 'react'
import styles from './textfield.module.css'
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";

const TextField = ({label,value,onChange,placeholder,type="text",error}) => {
    const [inputType,setInputType] = useState(type)
  return (
    <div className={styles.textfield}>
        <label>{label}</label>
        <div style={{position:'relative'}}>
        <input value={value} onChange={onChange} type={inputType} placeholder={placeholder} />
        {
            label === "Password" && 
            (
                <div style={{position:'absolute',right:10,top:12,cursor:'pointer'}}>
                    {
                        inputType === "password" ?
                        <AiFillEye onClick={()=>setInputType("text")}/>:
                        <AiFillEyeInvisible onClick={()=>setInputType("password")} />
                    }

                </div>
            )
        }
        </div>
        {error && <p style={{fontSize:'12px',marginTop:'3px',color:'red'}}>{error}</p>}
    </div>
  )
}

export default TextField