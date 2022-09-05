import styles from "../../styles/Blogs.module.css";
import Layout from "../../components/Layout";
import BlogLong from "../../components/BlogLong";
import connectDB from "../../components/db/connectDB";
import BlogPost from "../../components/db/models/BlogPost";

export async function getServerSideProps(context) {
  const uid = context.query.uid;

  await connectDB();
  const blog = await BlogPost.findOne({ uid: uid });
  return {
    props: {
      blog: {
        uid: blog.uid,
        title: blog.title,
        dateCreated: blog.dateCreated.toISOString(),
        content: blog.content,
        dateModified: blog.dateModified
          ? blog.dateModified.toISOString()
          : null,
        coverImageURL: blog.coverImageURL ? blog.coverImageURL : null, //"https://i.imgur.com/m0SctLi.jpeg"
        coverImageAlt: blog.coverImageAlt ? blog.coverImageAlt : null, //"Swimmy cat"
      },
    },
  };
}

export default function Blog({ blog }) {
  return (
    <Layout>
      <BlogLong blog={blog} />
    </Layout>
  );
}
