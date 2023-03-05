import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import CEBlogForm from "../../components/CEBlogForm";
import Layout from "../../components/Layout";

export default withPageAuthRequired(function CreateBlog({ user }) {
  const router = useRouter();
  if (user !== process.env.ADMINSUB) {
    console.log("Unauthorized user: " + user);
    router.push("/api/auth/logout");
    return <></>;
  }
  return (
    <Layout isMonoLang={true}>
      <CEBlogForm></CEBlogForm>
    </Layout>
  );
});
