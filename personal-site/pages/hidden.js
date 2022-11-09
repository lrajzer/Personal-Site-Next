import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Link from "next/link";

export default function Hidden() {
  return (
    <Layout title="Ooooo spooky hidden" isMonoLang={true}>
      <div>
        <h1>Welcome to a secret part of my website.</h1>
        <p>
          Here I have several of my side-projects that don't require whole
          separate websites for themselves.
        </p>
      </div>
      <div>
        <ul>
          <li>
            <div>
              <Link href="/hidden/jam-helper"> Gamejam helper</Link>
            </div>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
