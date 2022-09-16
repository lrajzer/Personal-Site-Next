/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import styles from "../styles/Blogs.module.css";
import TagRemover from "../utils/TagRemover";

export default function BlogShort(props) {
  let maxLength = 303;
  if (props.maxLength !== undefined) {
    maxLength = props.maxLength;
  }

  const thisBlog = props.blog;
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

  let shortDesc = TagRemover(thisBlog.content);

  if (shortDesc.length > maxLength) {
    shortDesc = shortDesc.slice(0, maxLength - 3) + "...";
  }

  return (
    <li className={styles.BlogLi}>
      {image}
      <div style={{ width: `100%` }}>
        <div className={styles.Titular}>
          <div>
            <h3>
              <Link href={`/blog/${thisBlog.uid}`}>
                <a className={styles.Title}>{thisBlog.title}</a>
              </Link>
            </h3>
          </div>
          <div className={styles.Meta}>
            <p className={styles.Author}>
              <Link href="/">Michał Rajzer</Link>
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
          <Link href={`/blog/${thisBlog.uid}`}>{shortDesc}</Link>
        </p>
      </div>
    </li>
  );
}
