import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/site.config";
import Year from "./Year";
import styles from "./Contact.module.css";

export default function Contact() {
  const { contact } = site;
  const channels = [
    { label: "Email", value: contact.email, href: contact.email ? `mailto:${contact.email}` : "" },
    { label: "Instagram", value: contact.instagram && handle(contact.instagram), href: contact.instagram },
    { label: "Vimeo", value: contact.vimeo && handle(contact.vimeo), href: contact.vimeo },
    { label: "YouTube", value: contact.youtube && handle(contact.youtube), href: contact.youtube },
  ];
  const configured = channels.filter((c) => c.href);

  return (
    <>
      <section id="contact" className={styles.section} aria-labelledby="contact-title">
        <div className={styles.glow} aria-hidden="true" />
        <div className={`container ${styles.inner}`}>
          <p className="section-label mono" data-reveal="fade">
            (05) Contact
          </p>

          <h2 id="contact-title" className={styles.headline}>
            {contact.headline.map((line, i) => (
              <span key={line} className={i === 1 ? styles.indent : undefined} data-reveal="lines">
                {i === 1 ? (
                  <>
                    <span className="serif">{line.split(" ")[0]}</span> {line.split(" ").slice(1).join(" ")}
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>

          <div className={styles.row}>
            <div className={styles.cta} data-reveal="stagger">
              <p className={styles.text}>{contact.text}</p>
              {contact.email ? (
                <a className="btn btn--solid" href={`mailto:${contact.email}?subject=${encodeURIComponent("New project — HXNS")}`}>
                  <Mail aria-hidden="true" /> Start a project
                </a>
              ) : configured[0] ? (
                <a className="btn btn--solid" href={configured[0].href} target="_blank" rel="noopener noreferrer">
                  Get in touch on {configured[0].label} <ArrowUpRight aria-hidden="true" />
                </a>
              ) : (
                <p className={`mono ${styles.pending}`}>Contact channels opening soon.</p>
              )}
              {site.availability.open && (
                <p className={`mono ${styles.avail}`}>
                  <span className="dot" aria-hidden="true" /> {site.availability.label}
                </p>
              )}
            </div>

            {configured.length > 0 && (
              <ul className={styles.channels} data-reveal="stagger">
                {configured.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      className={styles.channel}
                      {...(c.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      <span className="mono dim">{c.label}</span>
                      <span className={styles.value}>{c.value}</span>
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`container ${styles.footInner}`}>
          <a href="#top" className={styles.footMark} aria-label={`${site.name} — back to top`}>
            HXNS<sup>®</sup>
          </a>
          <nav aria-label="Footer" className={styles.footNav}>
            {site.nav.map((n) => (
              <a key={n.href} href={n.href} className="mono">
                {n.label}
              </a>
            ))}
          </nav>
          <div className={`${styles.footMeta} mono dim`}>
            <span>
              © <Year /> {site.name}. {site.concept}.
            </span>
            {site.mediaCredit && (
              <a href={site.mediaCredit.url} target="_blank" rel="noopener noreferrer">
                {site.mediaCredit.label}
              </a>
            )}
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}

function handle(url: string) {
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/\/$/, "");
    return path ? path.slice(1).replace(/^@?/, "@") : u.hostname;
  } catch {
    return url;
  }
}
