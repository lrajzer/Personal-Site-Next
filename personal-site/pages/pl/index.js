import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layout";
import CountUpAnimation from "../../components/CountUp";
import useOnScreen from "../../components/useOnScreen";
import { useRef } from "react";
import Link from "next/link";

export default function Home() {
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  return (
    <Layout title="O mnie | Michal Rajzer" pl={true}>
      <div className={styles.contentBlockOne}>
        <div className={styles.nameHeader}>
          <div style={{ padding: 0, margin: 0 }}>
            <h1>Hej!</h1>
            <h1>Jestem Michał,</h1>
            <h1>Jestem developerem fullstack!</h1>
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
          <h2 className={styles.headTwo}>Kilka słów o mnie.</h2>
          <p>
            W chwili obecnej studiuję na kierunku Informatics Politechniki
            Śląskiej, ponieważ jedynie ćwiczenia i laboratoria są obowiązkowe,
            bez problemu mogę pracować na pełnym etacie. W liceum brałem udział
            w programie IB, wybrałem wtedy rozszerzenia z fizyki, informatyki i
            matematyki. Moja przygoda z programowaniem zaczęła się, gdy mój tata
            pokazał mi Arduino. Od tego czasu przeszedłem w stronę webdev, ale
            nadal tworzę projekty związane z IOT i robotyką.
          </p>
        </div>
        <div className={`${styles.spacer} ${styles.spacerTwo}`}></div>
        <div>
          <div className={`${styles.textBlock} ${styles.textTwo}`}>
            <table className={styles.tableList}>
              <caption className={styles.tableCaption}>
                Moje umiejętności:
              </caption>
              <tbody>
                <tr className={styles.tableRow}>
                  <td className={styles.tableItem}>Python 3</td>
                  <td className={styles.tableItem}>Zaawansowany</td>
                  <td className={styles.tableItem}>[▉▉▉▉▉▉]</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableItem}>React/NextJS</td>
                  <td className={styles.tableItem}>Zaawansowany</td>
                  <td className={styles.tableItem}>[▉▉▉▉▉]</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableItem}>TensorFlow 2</td>
                  <td className={styles.tableItem}>Średniozaawansowany</td>
                  <td className={styles.tableItem}>[▉▉▉▉]</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableItem}>C++</td>
                  <td className={styles.tableItem}>Podstawowy</td>
                  <td className={styles.tableItem}>[▉▉▉]</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableItem}>Arduino</td>
                  <td className={styles.tableItem}>Podstawowy</td>
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
                <Link href="/pl/projekty">Moje projekty</Link>
              </caption>
              <tbody ref={ref}>
                <tr className={styles.tableRow} style={{ textAlign: "center" }}>
                  <th className={styles.tableItem}>Python</th>
                  <th className={styles.tableItem}>Javascript</th>
                  <th className={styles.tableItem}>Arduino</th>
                </tr>
                <tr className={styles.tableRow} style={{ textAlign: "center" }}>
                  <td className={styles.tableItem}>
                    {isVisible ? <CountUpAnimation>12</CountUpAnimation> : ""}
                  </td>
                  <td className={styles.tableItem}>
                    {isVisible ? <CountUpAnimation>5</CountUpAnimation> : ""}
                  </td>
                  <td className={styles.tableItem}>
                    {isVisible ? <CountUpAnimation>10</CountUpAnimation> : ""}
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
