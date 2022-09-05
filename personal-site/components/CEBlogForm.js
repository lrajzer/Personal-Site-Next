import Styles from "../styles/CEBlog.module.css";

export default function Form({blog, type}) {
    const thisBlog = blog?blog:undefined;
    return (
      <form
        action={
          type === "edit" ? "/api/blog/updatePost" : "/api/blog/createPost"
        }
        className={Styles.Form}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={thisBlog ? thisBlog.title : "Please enter the title"}
        />
        <label htmlFor="uid">uid</label>
        {thisBlog ? (
          <input
            type="text"
            name="uid"
            id="uid"
            defaultValue={thisBlog.uid}
            readOnly
          />
        ) : (
          <input type="text" name="uid" id="uid" required />
        )}{" "}
        <label htmlFor="type">type</label>
        {thisBlog ? (
          <input
            type="text"
            name="type"
            id="type"
            defaultValue={thisBlog.type}
            readOnly
          />
        ) : (
          <input type="text" name="tag" id="tag" required />
        )}
        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" rows="20" cols="50" required defaultValue={thisBlog ? thisBlog.content : "Please enter the content of the blog"
        }/>
        <label htmlFor="imgSrc">Cover image URL</label>
        <input
          type="text"
          name="imgSrc"
          id="imgSrc"
          defaultValue={
            thisBlog
              ? thisBlog.coverImageURL
              : ""
          }
        />{" "}
        <label htmlFor="imgAlt">Cover image alternative text</label>
        <input
          type="text"
          name="imgAlt"
          id="imgAlt"
          defaultValue={
            thisBlog
              ? thisBlog.coverImageAlt
              : ""
          }
        />
        <button type="submit" className={Styles.Submit}>
          Submit
        </button>
      </form>
    );
}