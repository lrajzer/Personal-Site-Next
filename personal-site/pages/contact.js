import { useCallback, useState } from "react";
import Styles from "../styles/Contact.module.css";
import Layout from "../components/Layout";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function Contact() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { email, subject, type, content } = e.target;

      if (!executeRecaptcha) {
        return;
      }
      executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
        fetch("/api/contact/sendEmail", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            subject: subject.value,
            type: type.value,
            content: content.value,
            gRecaptchaToken: gReCaptchaToken,
          }),
        })
          .then((res) => res.json())
          .then((res) =>
            res.errors
              ? alert(
                  `There was an error with Your message!\nYour message was missing: ${res?.errors}.`
                )
              : res.error
              ? alert(
                  "Internal server error!\nContact me directly at michal.rajzer03@gmail.com"
                )
              : res.ReCAPTCHAError
              ? alert(
                  "You reCAPTCHA score was too low to send Your message.\nYou can contact me at michal.rajzer03 at gmail.com"
                )
              : alert("Your message has been sent!")
          );
      });
    },
    [executeRecaptcha]
  );
  return (
    <Layout
      title="Contact me!"
      description="You can connect with me using my contact form."
    >
      <form onSubmit={handleSubmit} className={Styles.ContactForm}>
        <div className={Styles.Headers}>
          <div>
            <label className={Styles.FormLabel} htmlFor="email">
              Your email adress &#40;so I can respond to Your message&#41;.
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className={Styles.FormInput}
              placeholder="Your email"
              required
            />
          </div>
          <div>
            <label className={Styles.FormLabel} htmlFor="type">
              Why are You contacting me?
            </label>
            <select type="text" name="type" id="type" className={Styles.Type}>
              <option value="contact">I want to hire You!</option>
              <option value="bug">I want to report a bug!</option>
              <option value="other">Other!</option>
            </select>
          </div>
        </div>
        <div className={Styles.EmailContent}>
          <label className={Styles.FormLabel} htmlFor="subject">
            The subject of Your message.
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            className={Styles.FormInput}
            placeholder="Subject"
            required
          />
          <label className={Styles.FormLabel} htmlFor="content">
            Please elaborate.
          </label>
          <textarea
            rows={10}
            type="text"
            name="content"
            id="content"
            className={Styles.FormInput}
            placeholder="Your message"
            required
          />
        </div>
        <button type="submit" id="submit" className={Styles.Submit}>
          Submit
        </button>
      </form>
    </Layout>
  );
}
