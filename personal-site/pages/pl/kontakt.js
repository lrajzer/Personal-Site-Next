import { useCallback, useState } from "react";
import Styles from "../../styles/Contact.module.css";
import Layout from "../../components/Layout";
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
                  `Z twoją wiadomością był problem!\nW twojej wiadomości brakowało: ${res?.errors}.`
                )
              : res.error
              ? alert(
                  "Wewnętrzny błąd serwera!\nSkontaktuj się ze mną bezpośrednio: michal.rajzer03@gmail.com"
                )
              : res.ReCAPTCHAError
              ? alert(
                  "Twoja wartość reCaptcha była za niska.\nMożesz się ze mną skontaktować na: michal.rajzer03 (małpa) gmail.com"
                )
              : alert("Your message has been sent!")
          );
      });
    },
    [executeRecaptcha]
  );
  return (
    <Layout pl={true}>
      <form onSubmit={handleSubmit} className={Styles.ContactForm}>
        <div className={Styles.Headers}>
          <div>
            <label className={Styles.FormLabel} htmlFor="email">
              Twój adress email &#40;abym mógł odpowiedzieć na Twoją wiadomość&#41;.
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className={Styles.FormInput}
              placeholder="Twój email"
              required
            />
          </div>
          <div>
            <label className={Styles.FormLabel} htmlFor="type">
              Czemu chcesz się ze mną skontaktować?
            </label>
            <select type="text" name="type" id="type" className={Styles.Type}>
              <option value="contact">Chcę Cię zatrudnić!</option>
              <option value="bug">Chcę zgłosić błąd na stronie!</option>
              <option value="other">Coś innego!</option>
            </select>
          </div>
        </div>
        <div className={Styles.EmailContent}>
          <label className={Styles.FormLabel} htmlFor="subject">
            Temat Twojej wiadomości
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            className={Styles.FormInput}
            placeholder="Temat"
            required
          />
          <label className={Styles.FormLabel} htmlFor="content">
            Proszę rozwiń dalej.
          </label>
          <textarea
            rows={10}
            type="text"
            name="content"
            id="content"
            className={Styles.FormInput}
            placeholder="Twoja wiadomość"
            required
          />
        </div>
        <button type="submit" id="submit" className={Styles.Submit}>
          Wyślij
        </button>
      </form>
    </Layout>
  );
}
