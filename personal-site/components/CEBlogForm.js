import Styles from "../styles/CEBlog.module.css";
import { useState } from "react";
import md from "markdown-it";
import BlogLong from "./BlogLong.js";

export default function Form({ blog, type, preview }) {
  const thisBlog = blog ? blog : undefined;
  const [blogText, setBlogText] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [coverImgUrl, setCoverImgUrl] = useState(null);
  const [lang, setLang] = useState("en");
  const [draft, setDraft] = useState(false);

  return (
    <div>
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
          defaultValue={thisBlog ? thisBlog.title : ""}
          placeholder="Title"
          onChange={(e) => {
            setBlogTitle(e.target.value);
          }}
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
          <input
            type="text"
            name="uid"
            id="uid"
            required
            placeholder="Unique ID (and subpage) of the blog"
          />
        )}
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
          <input
            type="text"
            name="tag"
            id="tag"
            required
            placeholder="Tag of the blog"
          />
        )}
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          rows="20"
          cols="50"
          required
          defaultValue={thisBlog ? thisBlog.content : ""}
          placeholder="Content of the blog, can use HTML"
          onChange={(e) => {
            setBlogText(e.target.value);
          }}
        />
        <label htmlFor="imgSrc">Cover image URL</label>
        <input
          type="text"
          name="imgSrc"
          id="imgSrc"
          defaultValue={thisBlog ? thisBlog.coverImageURL : ""}
          placeholder="Cover image URL"
          onChange={(e) => {
            setCoverImgUrl(e.target.value);
          }}
        />
        <label htmlFor="imgAlt">Cover image alternative text</label>
        <input
          type="text"
          name="imgAlt"
          id="imgAlt"
          defaultValue={thisBlog ? thisBlog.coverImageAlt : ""}
          placeholder="Alt text for the cover image."
        />
        <div>
          <label htmlFor="lang" style={{ paddingRight: 25 }}>
            Blog is in Polish?
          </label>
          <input
            type="checkbox"
            name="lang"
            id="lang"
            onChange={(e) => {
              setLang(lang === "en" ? "pl" : "en");
            }}
          />
        </div>
        <div>
          <label htmlFor="draft" style={{ paddingRight: 25 }}>
            Draft?
          </label>
          <input
            type="checkbox"
            name="draft"
            id="draft"
            onChange={(e) => {
              setDraft(!draft);
            }}
          />
        </div>
        <button type="submit" className={Styles.Submit}>
          Submit
        </button>
      </form>
      <BlogLong
        blog={{
          dateCreated: new Date(),
          content: blogText,
          title: blogTitle,
          coverImageURL: coverImgUrl,
          lang: lang,
        }}
      />
    </div>
  );
}
