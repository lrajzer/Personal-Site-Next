import styles from "../../styles/Poll.module.css";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import PollOption from "../../components/PollOption.js";

export async function getServerSideProps(context) {
  const uid = context.query.uid;
  return {
    props: {
      poll: {
        title: "Mob vote 2023",
        totalVotes: 33,
        options: [
          { text: "Option 1", votes: 1, id: 0 },
          { text: "Option 2", votes: 10, id: 1 },
          { text: "Option 3", votes: 2, id: 2 },
          { text: "Option 1", votes: 1, id: 3 },
          { text: "Option 2", votes: 7, id: 4 },
        ],
        end: 1668288385653,
        viewResults: true,
      },
    },
  };
}

export default function Poll({ poll }) {
  const [localeString, setLocaleString] = useState("en-GB");
  const [pollColor, setPollColor] = useState(0);
  // console.log(localeString);

  useEffect(() => {
    setLocaleString(navigator.language);
  }, []);

  var { title, options, end, viewResults, totalVotes } = poll;
  const endDate = new Date(end);
  console.log(options);
  console.log(new Date().getTime());
  let ended = false;
  ended = end !== 0 ? end < Date.now() : false;
  let colorDeg = 0;
  let offset = 0;
  return (
    <Layout isMonoLang={true}>
      <div>
        <div>
          <h1>{title}</h1>
          <p>
            {`Poll end${ended ? "ed" : "s"} on: `}
            <time datetime={endDate.toUTCString()}>
              {endDate.toLocaleString(localeString)}
            </time>
          </p>
        </div>

        <div>
          {options.map((item) => {
            console.log(item);
            return (
              <PollOption
                text={item.text}
                key={item.id}
                displayResults={ended}
                votes={item.votes}
                totalVotes={totalVotes}
              />
            );
          })}
        </div>
        {ended ? (
          <div
            style={{
              height: "10vh",
              position: "relative",
              marginLeft: "5vw",
              marginRight: "5vw",
            }}
          >
            {options.map((item) => {
              colorDeg += (item.votes * 360) / totalVotes;
              offset += (item.votes * 100) / totalVotes;
              return (
                <div
                  key={item.id}
                  style={{
                    width: `${(item.votes * 100) / totalVotes}%`,
                    height: "100%",
                    backgroundColor: `hsl(${colorDeg}, 100%, 10%)`,
                    position: "absolute",
                    left: `${offset - (item.votes * 100) / totalVotes}%`,
                  }}
                >
                  <p>
                    {item.text}: {Math.round((item.votes * 100) / totalVotes)}%
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
}
