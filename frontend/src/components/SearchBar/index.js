import React, { useState } from 'react'
import styles from "./searchbar.module.css"
import { BiSearch } from "react-icons/bi";
import SearchDrawer from '../SearchDrawer';

const SearchBar = ({style}) => {
  const [showDrawer,setShowDrawer] = useState(false)
  return (
    <>
    <div className={styles.search} style={style} onClick={()=>setShowDrawer(true)}>
            <BiSearch style={{fontSize:'24px',color:'#ccc'}}/>
            <input className={styles.search_input} placeholder="Where to.."></input>
    </div>
    {showDrawer && <SearchDrawer onClick={()=>setShowDrawer(false)}/>}
    </>
  )
}

export default SearchBar