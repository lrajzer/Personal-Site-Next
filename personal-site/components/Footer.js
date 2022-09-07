import styles from "../styles/Footer.module.css";
import Link from "next/link";

export default function Footer(props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link href="">
          <a className={styles.link}> My resume</a>
        </Link>
        <Link href="">
          <a className={styles.link}>My CV</a>
        </Link>
        <Link href="https://www.iubenda.com/privacy-policy/15454240" passHref>
          <a target="_blank" rel="noopener noreferrer" className={styles.link}>
            Privacy policy
          </a>
        </Link>
        <Link href="/">
          <a className={`${styles.link} ${styles.noMobile}`}>About me</a>
        </Link>
        <Link href="">
          <a className={`${styles.link} ${styles.noMobile}`}>Contact me</a>
        </Link>
        <Link href="/blog">
          <a className={`${styles.link} ${styles.noMobile}`}>My blog</a>
        </Link>
        <Link href="/projects">
          <a className={`${styles.link} ${styles.noMobile}`}>My projects</a>
        </Link>
      </div>
    </footer>
  );
}
