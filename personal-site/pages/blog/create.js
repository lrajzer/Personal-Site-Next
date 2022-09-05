import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import CEBlogForm from "../../components/CEBlogForm"
import Layout from "../../components/Layout";

export default withPageAuthRequired(function CreateBlog({ user }) {
  return (
    <Layout>
      <CEBlogForm></CEBlogForm>
    </Layout>
  );
});
