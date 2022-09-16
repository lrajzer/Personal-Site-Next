import styles from "../../../styles/Blogs.module.css";
import Layout from "../../../components/Layout";
import BlogShort from "../../../components/BlogShort";
import connectDB from "../../../components/db/connectDB";
import BlogPost from "../../../components/db/models/BlogPost";

export async function getServerSideProps() {
  await connectDB();
  const blogs = await BlogPost.find({ lang: "pl" }).limit(5);
  const blogsSanitized = new Array();
  console.log(blogs.join())
  blogs.forEach((blog) =>
    blogsSanitized.push({
      uid: blog.uid,
      title: blog.title,
      dateCreated: blog.dateCreated.toISOString(),
      content: blog.content,
      dateModified: blog.dateModified ? blog.dateModified.toISOString() : null,
      coverImageURL: blog.coverImageURL ? blog.coverImageURL : null, //"https://i.imgur.com/m0SctLi.jpeg"
      coverImageAlt: blog.coverImageAlt ? blog.coverImageAlt : null, //"Swimmy cat"
      lang: 'pl',
    })
  );
  console.log(blogsSanitized);
  return { props: { blogs: blogsSanitized } };
}

export default function Home({ blogs }) {
  return (
    <Layout pl={true}>
      <div className={styles.BlogContent}>
        <h1>Witaj na moim blogu!</h1>
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
