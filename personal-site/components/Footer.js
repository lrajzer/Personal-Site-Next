import styles from "../styles/Footer.module.css";
import Link from "next/link";

export default function Footer({ pl }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link href="">
          <a className={styles.link}>Resume</a>
        </Link>
        <a className={styles.link} href="/docs/CV_def.pdf">
          CV
        </a>
        <Link href="https://www.iubenda.com/privacy-policy/15454240" passHref>
          <a target="_blank" rel="noopener noreferrer" className={styles.link}>
            {pl ? "Polityka prywatności" : "Privacy policy"}
          </a>
        </Link>
        <Link href={pl ? "/pl" : "/"}>
          <a className={`${styles.link} ${styles.noMobile}`}>
            {pl ? "O mnie" : "About me"}
          </a>
        </Link>
        <Link href={pl ? "/kontakt" : "/contact"}>
          <a className={`${styles.link} ${styles.noMobile}`}>
            {pl ? "Kontakt" : "Contact"}
          </a>
        </Link>
        <Link href="/blog">
          <a className={`${styles.link} ${styles.noMobile}`}>Blog</a>
        </Link>
        <Link href={pl ? "/projekty" : "/projects"}>
          <a className={`${styles.link} ${styles.noMobile}`}>
            {pl ? "Projekty" : "Projects"}
          </a>
        </Link>
      </div>
    </footer>
  );
}
