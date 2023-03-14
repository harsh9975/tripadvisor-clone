import React, { useState } from "react";
import BackDrop from "../Backdrop";
import styles from "./searchdrawer.module.css";
import { BiSearch, BiArrowBack,BiMap } from "react-icons/bi";

const SearchDrawer = ({ onClick }) => {
  const [search, setSearch] = useState("");
  return (
    <div className={styles.drawerContainer}>
      <div className={styles.searchdrawer}>
        <div className={styles.searchbar}>
          <div onClick={onClick} className={styles.back}>
            <BiArrowBack />
          </div>
          <div className={styles.search}>
            <BiSearch />
          </div>
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Where to?"
          />
          <div className={styles.back}>
            <BiSearch />
          </div>
        </div>
        <SearchText place="Dubai" desc="Emirate of Dubai, United Arab Emirated"/>

      </div>
      <BackDrop
        style={{ backgroundColor: "#fff", opacity: "0.9" }}
        onClick={onClick}
      />
    </div>
  );
};

export default SearchDrawer;

const SearchText = ({icon,place,desc}) =>{

    return(
        <div className={styles.searchtext}>
            <div className={styles.searchicon}>
                <BiMap/>
            </div>
            <div className={styles.searchPlace}>
                <h3>{place}</h3>
                <p>{desc}</p>
            </div>
        </div>
    )
}
