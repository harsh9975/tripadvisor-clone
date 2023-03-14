import React from "react";
import styles from "./home.module.css";
import {
  BiBed,
  BiHomeSmile,
  BiRestaurant,
  BiGlobe,
  BiHelpCircle,
} from "react-icons/bi";
import { RiCoupon3Line, RiFlightTakeoffLine } from "react-icons/ri";
import Chipslist from "../../components/ChipsList";
import SearchBar from "../../components/SearchBar";
import ImageGallery from "../../components/ImageGalley";
import AdBanner from "../../components/AdBanner";

const Home = () => {
  return (
    <div className={styles.home}>
      <Chipslist list={chips} />
       <div className={styles.searchBar}>
        <SearchBar
          style={{
            height: "55px",
            width: "60vw",
            boxShadow: "0 4px 4px rgb(0 0 0 / 25%)",
          }}
        />
      </div>
     <div className={styles.places}>
        <h2>Where to go, right now</h2>
        <p>Spots at the top of travellers’ must-go lists</p>
        <ImageGallery list={imageGallery} />
      </div>

      <div className={styles.places}>
        <h2>Ways to tour Bardez</h2>
        <p>SBook these experiences for a close-up look at Bardez.</p>
        <ImageGallery list={imageGallery} />
      </div>

      <AdBanner title="Get Out There"
      desc="Best of the Best tours, attractions & activities you won’t want to miss."
      url="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/f7/1d/4d/caption.jpg?w=1000&amp;h=-1&amp;s=1"
      label="See the list" />

      <div className={styles.places}>
        <h2>Ways to tour Bardez</h2>
        <p>SBook these experiences for a close-up look at Bardez.</p>
        <ImageGallery list={imageGallery} />
      </div>
    </div>
  );
};

export default Home;

const chips = [
  {
    label: "Hotels",
    icon: <BiBed />,
  },
  {
    label: "Things to Do",
    icon: <RiCoupon3Line />,
  },
  {
    label: "Holiday Homes",
    icon: <BiHomeSmile />,
  },
  {
    label: "Restaurants",
    icon: <BiRestaurant />,
  },
  {
    label: "Travel Stories",
    icon: <BiGlobe />,
  },
  {
    label: "Flights",
    icon: <RiFlightTakeoffLine />,
  },
  {
    label: "Help",
    icon: <BiHelpCircle />,
  },
  
];

const imageGallery = [
  {
    place: "Riviera Maya",
    src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/79/11/8c/caption.jpg?w=600&h=-1&s=1",
  },
  {
    place: "Reyjavik",
    src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/79/11/ad/caption.jpg?w=600&h=-1&s=1",
  },
  {
    place: "Sydney",
    src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/79/11/c5/caption.jpg?w=600&h=-1&s=1",
  },
  {
    place: "Grand Canyon National Park",
    src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/79/11/e8/caption.jpg?w=600&h=-1&s=1",
  },
  {
    place: "St Thomas",
    src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/79/12/05/caption.jpg?w=600&h=-1&s=1",
  },
  {
    place: "Tokyo",
    src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/79/12/10/caption.jpg?w=600&h=-1&s=1",
  },
];
