/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import Styles from "../styles/Blog.module.css";


export default function BlogLong({ blog }) {
  console.log(blog)
  const creationDate = new Date(blog.dateCreated);
  const editDate = blog.dateModified ? new Date(blog.dateModified) : undefined;
  return (
    <div className={Styles.BlogFull}>
      <div>
        {blog.coverImage !== null ? <div><img src={blog.coverImage.url}/></div> : ""}
        <h1>{blog.title}</h1>
        <div>
          <p>
            <Link href="/">
              <a>Michał Rajzer</a>
            </Link>
          </p>
          <p>
            Created at:&nbsp;
            <time dateTime={creationDate.toISOString()}>
              {creationDate.toLocaleDateString("en-GB")}
            </time>
          </p>
          {editDate !== undefined ? (
            <p>
              Edited at:
              <time dateTime={editDate.toISOString()}>
                {editDate.toLocaleDateString("en-GB")}
              </time>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
    </div>
  );
  /* '__html: product.description' is unsafe but the data in there shouldn't 
  be able to be created anywhere other than my DB thus it should be okay (fingers crossed) */
}
