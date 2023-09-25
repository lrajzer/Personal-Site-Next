import { useReducer } from "react";
import Layout from "../../../components/Layout";

const initialValues = {
  t: 1, // Type
  L: null, // Inductance
  Lu: 1, // Inductance Unit
  C: null, // Capacitance
  Cu: 1, // Capacitance Unit
  R: null, // Resistance
  Ru: 1, // Resistance Unit
  f1: null, // Frequency 1
  f2: null, // Frequency 2
  f1u: 1, // Frequency 1 Unit
  f2u: 1, // Frequency 2 Unit
  o: 0, // Order
  dL: 1, // Display Inductance
  dC: 1, // Display Capacitance
  dR: 0, // Display Resistance
  dF2: 0, // Display Frequency 2
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "type":
      switch (action.payload) {
        case "1":
          return { ...state, t: action.payload, dL: 1, dC: 1, dR: 0, dF2: 0 };
        case "2":
          return { ...state, t: action.payload, dL: 1, dC: 1, dR: 0, dF2: 0 };
        case "3":
          return { ...state, t: action.payload, dL: 1, dC: 1, dR: 0, dF2: 0 };
        case "4":
          return { ...state, t: action.payload, dL: 1, dC: 1, dR: 0, dF2: 0 };
        case "5":
          return { ...state, t: action.payload, dL: 0, dC: 1, dR: 1, dF2: 0 };
        case "6":
          return { ...state, t: action.payload, dL: 0, dC: 1, dR: 1, dF2: 0 };
        case "7":
          return { ...state, t: action.payload, dL: 0, dC: 1, dR: 1, dF2: 0 };
        case "8":
          return { ...state, t: action.payload, dL: 0, dC: 1, dR: 1, dF2: 0 };
        default:
          return state;
      }
    case "L":
      return { ...state, L: action.payload };
    case "Lu":
      return { ...state, Lu: action.payload };
    case "C":
      return { ...state, C: action.payload };
    case "Cu":
      return { ...state, Cu: action.payload };
    case "R":
      return { ...state, R: action.payload };
    case "Ru":
      return { ...state, Ru: action.payload };
    case "f1":
      return { ...state, f1: action.payload };
    case "f2":
      return { ...state, f2: action.payload };
    case "f1u":
      return { ...state, f1u: action.payload };
    case "f2u":
      return { ...state, f2u: action.payload };
    case "o":
      return { ...state, o: action.payload };
    case "reset":
      console.log("reset");
      return {
        ...state,
        L: null, // Inductance
        C: null, // Capacitance
        R: null, // Resistance
        f1: null, // Frequency 1
        f2: null, // Frequency 2
      };
    default:
      return state;
  }
};

export default function Filters() {
  const [values, setValues] = useReducer(reducer, initialValues);
  console.log(values.dL);
  return (
    <Layout isMonoLang={true}>
      <h1>Filters</h1>
      <div>
        <label htmlFor="ftype">Filter Type</label>
        <select
          name="type"
          id="ftype"
          onChange={(e) => setValues({ type: "type", payload: e.target.value })}
        >
          <option disabled>LC Filters</option>
          <option value="1" selected>
            LC Low Pass
          </option>
          <option value="2">LC High Pass</option>
          <option value="3">LC Band Pass</option>
          <option value="4">LC Band Stop</option>
          <option disabled>RC Filters</option>
          <option value="5">RC Low Pass</option>
          <option value="6">RC High Pass</option>
          <option value="7">RC Band Pass</option>
          <option value="8">RC Band Stop</option>
          <option disabled>Complex Filters</option>
        </select>
        {values.dL ? (
          <div>
            <label htmlFor="fL">Inductance</label>
            <input
              type="number"
              name="L"
              id="fL"
              onChange={(e) =>
                setValues({
                  type: "L",
                  payload: e.target.value ? e.target.value : null,
                })
              }
              value={values.L}
            />
            <select
              name="Lu"
              id="Lu"
              onChange={(e) =>
                setValues({
                  type: "Lu",
                  payload: e.target.value,
                })
              }
            >
              <option value="1">H</option>
              <option value="2">mH</option>
              <option value="3" selected>
                uH
              </option>
              <option value="4">nH</option>
            </select>
          </div>
        ) : (
          <></>
        )}

        {values.dC ? (
          <div>
            <label htmlFor="fC">Capacitance</label>
            <input
              type="number"
              name="C"
              id="fC"
              onChange={(e) =>
                setValues({
                  type: "C",
                  payload: e.target.value ? e.target.value : null,
                })
              }
            />
            <select
              name="Cu"
              id="Cu"
              onChange={(e) =>
                setValues({
                  type: "Cu",
                  payload: e.target.value,
                })
              }
            >
              <option value="1">F</option>
              <option value="2">mF</option>
              <option value="3" selected>
                uF
              </option>
              <option value="4">nF</option>
              <option value="5">pF</option>
            </select>
          </div>
        ) : (
          <></>
        )}

        {values.dR ? (
          <div>
            <label htmlFor="fR">Resistance</label>
            <input
              type="number"
              name="R"
              id="fR"
              onChange={(e) =>
                setValues({
                  type: "R",
                  payload: e.target.value ? e.target.value : null,
                })
              }
            />
            <select
              name="Ru"
              id="Ru"
              onChange={(e) =>
                setValues({
                  type: "Ru",
                  payload: e.target.value,
                })
              }
            >
              <option value="1">Ohm</option>
              <option value="2">kOhm</option>
              <option value="3">MOhm</option>
            </select>
          </div>
        ) : (
          <></>
        )}

        <div>
          <label htmlFor="ff1">
            {values.type < 2 ? "Frequency" : "Bottom frequency"}
          </label>
          <input
            type="number"
            name="f1"
            id="ff1"
            onChange={(e) =>
              setValues({
                type: "f1",
                payload: e.target.value ? e.target.value : null,
              })
            }
          />
          <select
            name="f1u"
            id="f1u"
            onChange={(e) =>
              setValues({
                type: "f1u",
                payload: e.target.value,
              })
            }
          >
            <option value="1">Hz</option>
            <option value="2">kHz</option>
            <option value="3">MHz</option>
            <option value="4">GHz</option>
          </select>
        </div>

        <div>
          <button type="button" onClick={console.log("clicked!")}>
            Calculate!
          </button>
          <button
            type="button"
            onClick={
              values.C || values.R || values.L || values.f1 || values.f2
                ? setValues({ type: "reset", payload: "" })
                : null
            }
          >
            Reset!
          </button>
        </div>
      </div>
    </Layout>
  );
}
