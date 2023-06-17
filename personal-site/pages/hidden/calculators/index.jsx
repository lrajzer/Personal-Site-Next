import Layout from "../../../components/Layout";
import Link from "next/link";

export default function Calculators() {
  return (
    <Layout isMonoLang={true}>
      <h1>Calculators</h1>
      <span>
        This is a small selection of calculators, that I wanted to use to help
        me with my projects.
      </span>

      <ul>
        <li>
          <Link href="/hidden/calculators/rgbhex">RGB to Hex</Link>
        </li>
        <li>
          <Link href="/hidden/calculators/filters">Filters</Link>
        </li>
      </ul>
    </Layout>
  );
}
