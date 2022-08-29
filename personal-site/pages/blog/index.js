import styles from "../../styles/Blogs.module.css";
import Layout from "../../components/Layout";
import BlogShort from "../../components/BlogShort";
import connectDB from "../../components/db/connectDB";
import BlogPost from "../../components/db/models/BlogPost";

export async function getServerSideProps() {
  await connectDB();
  const blogs = await BlogPost.find({}).limit(5);
  const blogsSanitized = new Array();
  blogs.forEach((blog) =>
    blogsSanitized.push({
      uid: blog.uid,
      title: blog.title,
      dateCreated: blog.dateCreated.toISOString(),
      content: blog.content,
      dateModified: blog.dateModified ? dateModified : null,
      coverImage: blog.coverImage
        ? { url: blog.url, alt: blog.alt }
        : null,
    })
  );
  console.log(blogsSanitized);
  return { props: { blogs: blogsSanitized } };
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
