/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import Styles from "../styles/Blog.module.css";
import md from "markdown-it";

export default function BlogLong({ blog }) {
  // console.log(blog);
  const creationDate = new Date(blog.dateCreated);
  const editDate = blog.dateModified ? new Date(blog.dateModified) : undefined;
  return (
    <div className={Styles.BlogFull}>
      <div className={Styles.BlogHeader}>
        {blog.coverImageURL !== null ? (
          <div>
            <img src={blog.coverImageURL} alt={blog.coverImageAlt} />
          </div>
        ) : (
          ""
        )}
        <h1>{blog.title}</h1>
        <div>
          <p>
            {blog.lang == "en" ? "By: " : "Przez: "}
            <Link href="/">Rajzer</Link>
          </p>
          <p>
            {blog.lang == "en" ? "Created at: " : "Utworzone: "}
            <time dateTime={creationDate.toISOString()}>
              {blog.lang == "en"
                ? creationDate.toLocaleDateString("en-GB")
                : creationDate.toLocaleDateString("pl-PL")}
            </time>
          </p>
          {editDate !== undefined ? (
            <p>
              {blog.lang == "en" ? "Edited at: " : "Zmienione: "}
              <time dateTime={editDate.toISOString()}>
                {blog.lang == "en"
                  ? editDate.toLocaleDateString("en-GB")
                  : editDate.toLocaleDateString("pl-PL")}
              </time>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className={Styles.blogWrapper}
        dangerouslySetInnerHTML={{ __html: md().render(blog.content) }}
      ></div>
    </div>
  );
  /* '__html: product.description' is unsafe but the data in there shouldn't 
  be able to be created anywhere other than my DB thus it should be okay (fingers crossed) */
}
