import styles from "../../styles/Blogs.module.css";
import Layout from "../../components/Layout";
import BlogShort from "../../components/BlogShort";
import connectDB from "../../components/db/connectDB";
import BlogPost from "../../components/db/models/BlogPost";

export async function getServerSideProps() {
  await connectDB();
  const blogs = await BlogPost.find({ lang: "eng" });
  const blogsSanitized = new Array();
  blogs.forEach((blog) => {
    if (!blog.draft) {
      blogsSanitized.push({
        uid: blog.uid,
        title: blog.title,
        dateCreated: blog.dateCreated.toISOString(),
        content: blog.content,
        dateModified: blog.dateModified
          ? blog.dateModified.toISOString()
          : null,
        coverImageURL: blog.coverImageURL ? blog.coverImageURL : null,
        coverImageAlt: blog.coverImageAlt ? blog.coverImageAlt : null,
        lang: "en",
      });
    }
  });

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
    <Layout
      title="Michał Rajzer's blog"
      description="Here You can find all of my blogs!"
    >
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
