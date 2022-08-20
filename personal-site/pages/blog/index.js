import styles from "../../styles/Blogs.module.css";
import Layout from "../../components/Layout";
import BlogShort from "../../components/BlogShort";


export async function getServerSideProps() {
  return {
    props: {
      blogs: [
        {
          coverImage: {
            url: "https://i.imgur.com/83x9xI4.jpeg",
            alt: "Kitty cat",
          },
          uid: "0AA",
          title: "Hello",
          author: "Michal",
          date: "2021-01-17T12:00:00Z",
          content: "Short",
        },
        {
          coverImage: {
            url: "https://i.imgur.com/m0SctLi.jpeg",
            alt: "Swimmy cat",
          },
          uid: "0AB",
          title: "World",
          author: "Michal",
          date: "2021-01-13T13:00:00Z",
          content:
            "Long: <h1><className>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, ab asperiores hic itaque velit unde nesciunt, quidem odit labore explicabo impedit veritatis voluptatum! Voluptatibus debitis numquam unde dolorum quo hic!</span><span>Ullam eius excepturi cupiditate nisi, nulla quasi quaerat corrupti illum molestias alias, a quisquam ducimus libero adipisci cumque aliquid! Ducimus provident excepturi enim repellendus libero quidem molestias numquam, repellat id?</span><span>Perferendis quos aspernatur aperiam consequuntur velit quisquam, error nisi non temporibus, veniam omnis vitae. Laboriosam neque maiores necessitatibus perspiciatis, sed odit? Temporibus eveniet facere dicta ex enim corrupti odit iste.</span><span>Voluptatem nostrum quia libero corporis facere eius ipsum porro reiciendis nisi quibusdam accusamus molestias maiores fugiat, enim iusto ducimus labore consectetur ratione quidem rerum? Magni minima accusantium tempora incidunt modi!</span><span>Doloremque perspiciatis nihil illo quo, dolores labore excepturi esse enim dolor aspernatur vero voluptatem eum iusto nostrum minima quisquam quam voluptates. Iusto reprehenderit qui ducimus quo. Soluta animi deserunt natus.</span><span>Impedit vitae nulla, nobis maiores amet, expedita eligendi necessitatibus, voluptates voluptatum debitis nihil accusantium sint dolore laborum reprehenderit omnis labore totam similique fugit quia! Vitae perferendis inventore deserunt libero dolores?</span><span>Eaque alias, fugiat iste unde consequatur nihil ea quae maiores nam itaque, error, voluptatum totam exercitationem? Doloremque aperiam iure soluta commodi cum reprehenderit, facilis quia maxime atque? Quas, consectetur odit!</span><span>Recusandae veritatis ratione, illo corporis, exercitationem eligendi iusto minus nemo nam distinctio dolor nobis quia assumenda unde quibusdam quo! Excepturi consequuntur eum deserunt eos adipisci illum sapiente magnam in iure.</span><span>Facere consequatur unde quis magni fugit inventore deserunt earum ipsum quibusdam suscipit nulla obcaecati totam architecto facilis magnam dolorum molestiae ea dolor eaque voluptatum consectetur excepturi, adipisci cum? Eos, cupiditate?</span><span>Eos animi illo nostrum reiciendis molestias architecto! Ab, nostrum! Cumque esse quisquam iure aut necessitatibus quidem natus sunt assumenda. Porro itaque sit a, consequatur perspiciatis sunt nobis iusto reiciendis corporis.",
        },
      ],
    },
  };
}

export default function Home({ blogs }) {
  return (
    <Layout>
      <div className={styles.BlogContent}>
        <h1>Welcome to my Blog</h1>
        <div>
          <ul>
            {blogs.map((blog) => (
              <BlogShort blog={blog} key={blog.uid} maxLength={340} />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
