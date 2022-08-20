import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import CountUpAnimation from "../components/CountUp";
import useOnScreen from "../components/useOnScreen";
import { useRef } from "react";
import Link from "next/link";

export default function Home() {
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  return (
    <Layout title="About Michal Rajzer">
      <div className={styles.contentBlockOne}>
        <div className={styles.nameHeader}>
          <div style={{ padding: 0, margin: 0 }}>
            <h1>Hey!</h1>
            <h1>My name is Michał</h1>
            <h1>I&apos;m a fullstack developer!</h1>
          </div>
        </div>
        <svg className={styles.arrows}>
          <path className={styles.a1} d="M0 0 L30 32 L60 0"></path>
          <path className={styles.a2} d="M0 20 L30 52 L60 20"></path>
          <path className={styles.a3} d="M0 40 L30 72 L60 40"></path>
        </svg>
        <div className={`${styles.spacer} ${styles.spacerOne}`}></div>
      </div>
      <div>
        <div className={`${styles.textBlock} ${styles.textOne}`}>
          <h2 className={styles.headTwo}>A few words about me.</h2>
          <p>
            Right now I&apos;m attending Computer Science undergraduate studies at
            --REDATCTED--. In highschool I took part in the IB Programme where I
            took higher level computer science, physics and maths courses. I
            started my adventure with programming at 12 when my father
            introduced me to Arduino. Since then I moved toward web development
            but I still dabble in IOT and robotics.
          </p>
        </div>
        <div className={`${styles.spacer} ${styles.spacerTwo}`}></div>
        <div>
          <div className={`${styles.textBlock} ${styles.textTwo}`}>
            <table className={styles.tableList}>
              <caption className={styles.tableCaption}>My skills:</caption>
              <tbody>
                <tr className={styles.tableRow}>
                  <td className={styles.tableItem}>Python 3</td>
                  <td className={styles.tableItem}>Experienced</td>
                  <td className={styles.tableItem}>[▉▉▉▉▉▉]</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableItem}>React/NextJS</td>
                  <td className={styles.tableItem}>Experienced</td>
                  <td className={styles.tableItem}>[▉▉▉▉▉]</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableItem}>TensorFlow 2</td>
                  <td className={styles.tableItem}>Intermediate</td>
                  <td className={styles.tableItem}>[▉▉▉▉]</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableItem}>C++</td>
                  <td className={styles.tableItem}>Basic</td>
                  <td className={styles.tableItem}>[▉▉▉]</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableItem}>Arduino</td>
                  <td className={styles.tableItem}>Basic</td>
                  <td className={styles.tableItem}>[▉▉▉]</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={`${styles.spacer} ${styles.spacerThree}`}></div>
        </div>
        <div>
          <div className={`${styles.textBlock} ${styles.textThree}`}>
            <table className={styles.tableList}>
              <caption className={styles.tableCaption}>
                <Link href="/projects">My Projects</Link>
              </caption>
              <tbody ref={ref}>
                <tr className={styles.tableRow} style={{ textAlign: "center" }}>
                  <th className={styles.tableItem}>Python</th>
                  <th className={styles.tableItem}>Javascript</th>
                  <th className={styles.tableItem}>Arduino</th>
                </tr>
                <tr className={styles.tableRow} style={{ textAlign: "center" }}>
                  <td className={styles.tableItem}>
                    {isVisible ? <CountUpAnimation>5</CountUpAnimation> : ""}
                  </td>
                  <td className={styles.tableItem}>
                    {isVisible ? <CountUpAnimation>4</CountUpAnimation> : ""}
                  </td>
                  <td className={styles.tableItem}>
                    {isVisible ? <CountUpAnimation>12</CountUpAnimation> : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
