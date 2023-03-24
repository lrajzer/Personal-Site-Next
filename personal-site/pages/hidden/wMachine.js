import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import styles from "../../styles/WMachine.module.css";

export default function WMachine() {
  return (
    <Layout inBrackets={"W Machine"} otherLang="/hidden/wMachinePl" pl={false}>
      <div className={styles.content}>
        <h1>
          This is just a placeholder for now, sooner or later this'll be a W
          Machine sim but online
        </h1>
      </div>
    </Layout>
  );
}
