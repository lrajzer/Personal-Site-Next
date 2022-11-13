import styles from "../../styles/Blogs.module.css";
import Layout from "../../components/Layout";
import BlogShort from "../../components/BlogShort";
import connectDB from "../../components/db/connectDB";
import BlogPost from "../../components/db/models/BlogPost";

export async function getServerSideProps() {
  await connectDB();
  const blogs = await BlogPost.find({ lang: "eng" });
  // const blogs = [
  //   {
  //     uid: 0,
  //     title: "AAAAAAAAAAAAAAAAAA",
  //     dateCreated: new Date(),
  //     content: "AAAAAAAAAA",
  //   },
  // ];
  const blogsSanitized = new Array();
  // console.log(blogs.join())
  blogs.forEach((blog) =>
    blogsSanitized.push({
      uid: blog.uid,
      title: blog.title,
      dateCreated: blog.dateCreated.toISOString(),
      content: blog.content,
      dateModified: blog.dateModified ? blog.dateModified.toISOString() : null,
      coverImageURL: blog.coverImageURL ? blog.coverImageURL : null, //"https://i.imgur.com/m0SctLi.jpeg"
      coverImageAlt: blog.coverImageAlt ? blog.coverImageAlt : null, //"Swimmy cat"
      lang: "en",
    })
  );

  blogsSanitized.sort((a, b) => {
    return new Date(a.dateCreated) < new Date(b.dateCreated)
      ? 1
      : new Date(a.dateCreated) > new Date(b.dateCreated)
      ? -1
      : 0;
  });

  return {
    props: {
      blogs: blogsSanitized,
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
