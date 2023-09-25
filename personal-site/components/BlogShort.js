/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import styles from "../styles/Blogs.module.css";
import TagRemover from "../utils/TagRemover";
import md from "markdown-it";

export default function BlogShort({ maxLength, blog }) {
  maxLength = maxLength !== undefined ? maxLength : 303;
  const thisBlog = blog;

  let content = thisBlog.content;
  content = TagRemover(md().render(content));
  content =
    content.length >= maxLength
      ? content.slice(0, maxLength - 3) + "..."
      : content;

  const image =
    thisBlog.coverImageURL !== null ? (
      <img
        src={thisBlog.coverImageURL}
        alt={thisBlog.coverImageAlt}
        className={styles.CoverImage}
      />
    ) : (
      ""
    );
  const date =
    thisBlog.dateModified !== null
      ? new Date(thisBlog.dateModified)
      : new Date(thisBlog.dateCreated);

  return (
    <li className={styles.BlogLi}>
      {image}
      <div style={{ width: `100%` }}>
        <div className={styles.Titular}>
          <div>
            <h3>
              <Link href={`/blog/${thisBlog.uid}`} className={styles.Title}>
                {thisBlog.title}
              </Link>
            </h3>
          </div>
          <div className={styles.Meta}>
            <p className={styles.Author}>
              <Link href="/">Rajzer</Link>
            </p>
            {
              <time dateTime={date.toISOString()} className={styles.Date}>
                {thisBlog.lang == "en"
                  ? date.toLocaleDateString("en-GB")
                  : date.toLocaleDateString("pl-PL")}
              </time>
            }
          </div>
        </div>
        <p className={styles.Description}>
          <Link href={`/blog/${thisBlog.uid}`}>{content}</Link>
        </p>
      </div>
    </li>
  );
}
