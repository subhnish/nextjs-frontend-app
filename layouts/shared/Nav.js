import React from "react";
import styles from "../../styles/Main.module.css";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  return (
    <div className={styles.navParent}>
      <div className={styles.nav}>
        <Image
          src="https://cdn.techorfy.com/wp-content/uploads/2020/04/techorfy-v4-Normal.png"
          layout="intrinsic"
          alt="techorfy logo"
          width={225}
          height={36}
          quality={100}
        />
        <div className={styles.navLinks}>
          <label className={styles.hamburger} htmlFor="barCheck">
          <FontAwesomeIcon
            icon={faBars}
            size="3x"
            color="white"
          />
          </label>
          <input
          type="checkbox"
          name="barCheck"
          id="barCheck"
          className={styles.checkboxMenu}
          style={{display: 'none'}}
          />
          <ul className={styles.navListUl}>
            <li>
              <Link href="/stock-rom/">Devices</Link>
            </li>
            <li>
              <Link href="https://techorfy.com/about-us/">About Us</Link>
            </li>
            <li>
              <Link href="https://techorfy.com/contact-us/">Contact Us</Link>
            </li>
            <li>
              <Link href="https://techorfy.com/privacy-policy/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="https://t.me/joinchat/aX0-fZda8DYyOWNl">Report a bug</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
