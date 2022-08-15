import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";


export default function Layout(props) {
  return (
    <main>
      <Navbar />
      <div className={styles.content}>
        {props.children}
      </div>
    </main>
  );
}
