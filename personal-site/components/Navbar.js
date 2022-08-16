import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";

export default function Navbar(props) {
  const { asPath } = useRouter();
  let path = asPath.split("/")[1];
  let inBrackets = props.inBrackets
    ? props.inBrackets
    : path && path != "#"
    ? path.charAt(0).toUpperCase() + path.slice(1)
    : "About";
  return (
    <div className={styles.navigation}>
      <nav className={styles.navbar}>
        <Link href={asPath}>
          <a className={styles.navLink}>Michał.Rajzer({inBrackets})</a>
        </Link>
        <Link href="/">
          <a className={styles.navLink}>About</a>
        </Link>
        <Link href="/projects">
          <a className={styles.navLink}>Projects</a>
        </Link>
        <Link href="/blog">
          <a className={styles.navLink}>Blog</a>
        </Link>
        <Link href="#">
          <a className={styles.navLink}>Contact</a>
        </Link>
      </nav>
    </div>
  );
}
