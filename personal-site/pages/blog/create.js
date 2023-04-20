import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import CEBlogForm from "../../components/CEBlogForm";
import Layout from "../../components/Layout";

export default withPageAuthRequired(function CreateBlog({ user }) {
  return (
    <Layout isMonoLang={true}>
      <CEBlogForm></CEBlogForm>
    </Layout>
  );
});

// How tf was this working before?
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
