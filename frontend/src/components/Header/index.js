import React, { useState } from "react";
import styles from "./header.module.css";
import logo from "../../assets/tripadvisor-logo.svg";
import Button from "../Button";
import { AiOutlineHeart } from "react-icons/ai";
import IconLabel from "../IconLabel";
import { BiPencil, BiBell } from "react-icons/bi";
import SearchBar from "../SearchBar";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import Drawer from "../Drawer";
import SearchDrawer from "../SearchDrawer";
import Modal from "../Modal";
import AuthModal from "../AuthModal";
import useWindowDimensions from "../../utils/getWindowDimentions";

const Header = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <>
      <nav className={styles.header}>
        <div className={styles.header_content}>
          <div className={styles.hamburger} onClick={() => setShowDrawer(true)}>
            <RxHamburgerMenu />
          </div>
          <img className={styles.logo} src={logo} alt="tripadvisor" />
          <div className={styles.search}>
            <SearchBar style={{ width: "80%", margin: "auto" }} />
          </div>
          <div className={styles.navBar}>
            <IconLabel label="Review" icon={<BiPencil />} />
            <IconLabel label="Trips" icon={<AiOutlineHeart />} />
            <IconLabel label="Alerts" icon={<BiBell />} />
            <Button label="Sign in" onClick={() => setShowAuthModal(true)} />
          </div>
          <div
            className={styles.mobileMenu}
            onClick={() => setShowSearch(true)}
          >
            <BiSearch />
          </div>
        </div>
      </nav>
      {showDrawer && (
        <Drawer onClick={() => setShowDrawer(false)}>
          <div className={styles.drawerContainer}>
            <Button
              label="Sign in"
              style={{ width: "100%" }}
              onClick={() => setShowAuthModal(true)}
            />
            <ul>
              <li>Write a review</li>
              <li>Post photos</li>
              <li>Alerts</li>
              <li>Trips</li>
              <li>Bookings</li>
            </ul>
          </div>
        </Drawer>
      )}
      {showSearch && <SearchDrawer onClick={() => setShowSearch(false)} />}

      {showAuthModal ?
      width > 800 ? (
        <Modal onClose={() => setShowAuthModal(false)}>
          <AuthModal />
        </Modal>
      ) : (
        <Drawer onClick={() => {setShowAuthModal(false);setShowAuthModal(false)}} style={{width:'100vw'}}>
          <AuthModal />
        </Drawer> 
      ): null}
    </>
  );
};

export default Header;
