import React, { useRef } from "react";
import ImageCard from "../ImageCard";
import styles from "./imagegallery.module.css"
import { AiOutlineArrowLeft,AiOutlineArrowRight } from "react-icons/ai";

const ImageGallery = ({ list }) => {
    const ref = useRef ();
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };
  return (
    <div style={{display:"block",position:"relative"}}> 
    <div className={styles.toggle_circle_left} onClick={()=>scroll(-300)}>
    <AiOutlineArrowLeft/>
    </div>
    <div className={styles.image_gallery} ref={ref}>
      {list.map((item,id) => (
        <ImageCard key={id} label={item.place} url={item.src} />
      ))}
    </div>
    <div className={styles.toggle_circle_right} onClick={()=>scroll(300)}>
<AiOutlineArrowRight/>
    </div>
    </div>
  );
};

export default ImageGallery;
