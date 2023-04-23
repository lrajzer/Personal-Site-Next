import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import CEBlogForm from "../../components/CEBlogForm";
import Layout from "../../components/Layout";
import connectDB from "../../components/db/connectDB";
import BlogPost from "../../components/db/models/BlogPost";

export default function EditBlog({ user, blog }) {
  return (
    <Layout>
      <CEBlogForm blog={blog} type="edit"></CEBlogForm>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ query, req, res }) {
    const { user } = getSession(req, res);
    if (user?.sub !== process.env.ADMINSUB) {
      res.writeHead(302, {
        Location: "/blog",
      });
      res.end();
      return { props: {} };
    }

    const uid = query.uid;
    if (!uid) {
      return {
        redirect: {
          permanent: false,
          destination: `/blog/create`,
        },
      };
    }
    await connectDB();
    const blog = await BlogPost.findOne({ uid: uid });
    if (!blog) {
      return {
        redirect: {
          permanent: false,
          destination: `/blog/create`,
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
          type: blog.tag ? blog.tag : null,
          dateModified: blog.dateModified
            ? blog.dateModified.toISOString()
            : null,
          coverImageURL: blog.coverImageURL ? blog.coverImageURL : null, //"https://i.imgur.com/m0SctLi.jpeg"
          coverImageAlt: blog.coverImageAlt ? blog.coverImageAlt : null, //"Swimmy cat"
          draft: blog.draft ? true : false,
        },
      },
    };
  },
});
