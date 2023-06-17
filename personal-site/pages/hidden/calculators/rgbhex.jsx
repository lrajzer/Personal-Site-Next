import Layout from "../../../components/Layout";
import { useEffect, useState } from "react";

export default function RGBHex() {
  const [rgb, setRgb] = useState("");
  const [hex, setHex] = useState("");
  const [editRGB, setEditRGB] = useState(true);
  const [editHex, setEditHex] = useState(true);

  useEffect(() => {
    if (!editRGB || rgb.length === 0) {
      return;
    }
    console.log(rgb.length);
    let lhex = "#";
    let lrgb = ["", "", ""];
    if (rgb.length === 13) {
      lrgb = rgb.split(",");
    } else if (rgb.length === 11) {
      lrgb = rgb.split(" ");
    } else {
      let ind = 0;
      for (let i = 0; i < rgb.length; i++) {
        if (rgb[i] === " ") {
          ind++;
        } else {
          lrgb[ind] += rgb[i];
        }
      }
    }
    for (let i = 0; i < lrgb.length; i++) {
      lrgb[i] = parseInt(lrgb[i]).toString(16);
      if (lrgb[i].length === 1) {
        lrgb[i] = "0" + lrgb[i];
      }
      lhex += lrgb[i];
    }
    setHex(lhex);
  }, [rgb]);

  useEffect(() => {
    if (!editHex) {
      return;
    } else {
      if (hex.length === 7) {
        let lrgb = "";
        for (let i = 1; i < hex.length; i += 2) {
          lrgb +=
            parseInt(hex.slice(i, i + 2), 16).toString() +
            (i <= 3 ? ", " : " ");
        }
        setRgb(lrgb);
      }
    }
  }, [hex]);

  return (
    <Layout isMonoLang={true}>
      <h1>RGB to Hex</h1>
      <span>Converts RGB to Hex</span>
      <div>
        <input
          id="rgb"
          placeholder="RGB"
          onChange={(e) => {
            setRgb(e.target.value);
            setEditRGB(false);
            setEditHex(true);
          }}
          value={rgb}
        />
        <input
          id="hex"
          placeholder="Hex"
          onChange={(e) => {
            setHex(e.target.value);
            setEditHex(false);
            setEditRGB(true);
          }}
          value={hex}
        />
      </div>
    </Layout>
  );
}
