import Layout from "../../../components/Layout";
import { useEffect } from "react";

export default function Cpp() {
  useEffect(() => alert("Ta część strony jest nadal niedokończona!"));
  return (
    <Layout pl={true}>
      <h1>Projekty C++</h1>
      <p>WIP</p>
    </Layout>
  );
}
