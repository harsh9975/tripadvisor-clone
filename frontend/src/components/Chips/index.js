import React from "react";
import styles from "./chips.module.css";

const Chips = ({ icon, label }) => {
  return (
    <div className={styles.chips}>
      {label}
      {icon}
    </div>
  );
};

export default Chips;
