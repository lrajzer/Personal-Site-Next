import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";

export default function Navbar(props) {
  const { asPath } = useRouter();
  let path = asPath.split("/");
  let inBrackets = props.inBrackets
    ? props.inBrackets
    : path[1] && path[1] != "#"
    ? path[1] != "pl"
      ? path[1].charAt(0).toUpperCase() + path[1].slice(1)
      : path[2]? path[2].charAt(0).toUpperCase() + path[2].slice(1) : "O mnie"
    : "About";
  return (
    <div className={styles.navigation}>
      <nav className={styles.navbar}>
        <Link href={asPath}>
          <a className={styles.navLink}>Michał.Rajzer({inBrackets})</a>
        </Link>
        <Link href={props.pl ? "/pl" : "/"}>
          <a className={styles.navLink}>{props.pl ? "O mnie" : "About me"}</a>
        </Link>
        <Link href={props.pl ? "/pl/projekty" : "/projects"}>
          <a className={styles.navLink}>{props.pl ? "Projekty" : "Projects"}</a>
        </Link>
        <Link href={props.pl ? "/pl/blog" : "/blog"}>
          <a className={styles.navLink}>Blog</a>
        </Link>
        <Link href={props.pl ? "/pl/kontakt" : "/contact"}>
          <a className={styles.navLink}>{props.pl ? "Kontakt" : "Contact"}</a>
        </Link>
      </nav>
    </div>
  );
}
