import styles from "../styles/Footer.module.css";
import Link from "next/link";

export default function Footer({ pl }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        {/* <Link href="">
          <a className={styles.link}>Resume</a>
        </Link> */}
        <a
          className={styles.link}
          href={
            "/docs/" + (pl ? "MichałRajzerCVpl.pdf" : "MichalRajzerCVeng.pdf")
          }
        >
          CV
        </a>
        <a
          href="https://www.iubenda.com/privacy-policy/15454240"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {pl ? "Polityka prywatności" : "Privacy policy"}
        </a>
        <Link
          href={pl ? "/pl" : "/"}
          className={`${styles.link} ${styles.noMobile}`}
        >
          {pl ? "O mnie" : "About me"}
        </Link>
        <Link
          href={pl ? "/kontakt" : "/contact"}
          className={`${styles.link} ${styles.noMobile}`}
        >
          {pl ? "Kontakt" : "Contact"}
        </Link>
        <Link href="/blog" className={`${styles.link} ${styles.noMobile}`}>
          Blog
        </Link>
        <Link
          href={pl ? "/projekty" : "/projects"}
          className={`${styles.link} ${styles.noMobile}`}
        >
          {pl ? "Projekty" : "Projects"}
        </Link>
        <Link href="/hidden" className={`${styles.link}`}>
          {pl ? "Tajne" : "Top Secret"}
        </Link>
      </div>
    </footer>
  );
}
