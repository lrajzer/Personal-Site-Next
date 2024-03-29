import styles from "../../styles/Blogs.module.css";
import Layout from "../../components/Layout";
import BlogLong from "../../components/BlogLong";
import connectDB from "../../components/db/connectDB";
import BlogPost from "../../components/db/models/BlogPost";
import TagRemover from "../../utils/TagRemover";
import md from "markdown-it";

export async function getServerSideProps(context) {
  const uid = context.query.uid;

  await connectDB();
  const blog = await BlogPost.findOne({ uid: uid });

  if (!blog) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  if (blog.draft && (!user || (user && user.sub !== process.env.ADMINSUB))) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  if (blog.lang !== "eng") {
    return {
      redirect: {
        destination: `/pl/blog/${uid}`,
        permanent: false,
      },
    };
  }

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
        lang: "en",
      },
    },
  };
}

export default function Blog({ blog }) {
  let content = TagRemover(md().render(blog.content));
  content = content.length >= 60 ? content.slice(0, 57) + "..." : content;
  return (
    <Layout isMonoLang={true} title={blog.title} description={content}>
      <BlogLong blog={blog} />
    </Layout>
  );
}
