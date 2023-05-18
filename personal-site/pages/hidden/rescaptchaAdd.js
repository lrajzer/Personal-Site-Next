import { useState } from "react";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Layout from "../../components/Layout";

export default withPageAuthRequired(function CreatePlate() {
  const [image, setImage] = useState(null);
  const [trainingImg, setTrainingImg] = useState(null);
  return (
    <Layout isMonoLang={true}>
      <div style={{ padding: "2vh 5vw" }}>
        <h1>Welcome to adding a plate...</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const piu = e.target.piu.value;
            const isTrain = trainingImg;
            const piuData = e.target.piuData?.value;
            const data = { piu, isTrain, piuData };
            fetch("/api/hidden/rescaptcha/addPlate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              ?.then((data) => {
                if (data.error) {
                  alert(data.error);
                } else {
                  alert("Success!");
                }
              });
          }}
          method="post"
          style={{
            margin: "2vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            style={{
              width: "50%",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              margin: "0.5rem",
            }}
            type="text"
            name="piu"
            id="piu"
            placeholder="Please enter the url for the plate"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <div>
            <input
              type="checkbox"
              name="isTrain"
              id="isTrain"
              onChange={(e) => {
                setTrainingImg(e.target.checked);
              }}
            />{" "}
            Is this a training image?
          </div>
          {trainingImg && (
            <input
              style={{
                width: "50%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                margin: "0.5rem",
              }}
              type="text"
              name="piuData"
              id="piuData"
              placeholder="Please enter the data for the training image"
            />
          )}
          <button
            type="submit"
            style={{
              width: "30%",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              margin: "0.5rem",
            }}
          >
            Submit!
          </button>
        </form>
        <div style={{ height: "50vh" }}>
          {image && (
            <img
              style={{ height: "50vh" }}
              src={image}
              alt="Preview of the image You're about to add"
            />
          )}
        </div>
      </div>
    </Layout>
  );
});

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const { user } = getSession(req, res);
    if (user?.sub !== process.env.ADMINSUB) {
      res.writeHead(302, {
        Location: "/blog",
      });
      res.end();
    }
    return {
      props: {},
    };
  },
});
