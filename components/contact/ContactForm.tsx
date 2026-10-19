"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, RotateCcw } from "lucide-react";
import { site } from "@/site.config";
import { ui, type Locale } from "@/lib/i18n";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "sent" | "error";
type Field = "name" | "email" | "message";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Project inquiry form. Sends JSON to the Resend worker configured in
 * site.contact.formEndpoint (see worker/README.md). No keys live in the browser.
 */
export default function ContactForm({ locale }: { locale: Locale }) {
  const f = ui[locale].form;
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || site.contact.formEndpoint;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const openedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (data: FormData) => {
    const next: Partial<Record<Field, string>> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name) next.name = f.required;
    if (!email) next.email = f.required;
    else if (!EMAIL_RE.test(email)) next.email = f.invalidEmail;
    if (!message) next.message = f.required;
    else if (message.length < 10) next.message = f.shortMessage;
    return next;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!endpoint || status === "sending") return;
    const data = new FormData(e.currentTarget);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name")).trim(),
          email: String(data.get("email")).trim(),
          type: String(data.get("type") ?? ""),
          timing: String(data.get("timing") ?? ""),
          message: String(data.get("message")).trim(),
          website: String(data.get("website") ?? ""), // honeypot, must stay empty
          elapsed: openedAt.current ? Date.now() - openedAt.current : 0,
          locale,
          page: window.location.href,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  };

  const field = (name: Field) => ({
    name,
    id: `cf-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `cf-${name}-err` : undefined,
    onInput: () => errors[name] && setErrors((prev) => ({ ...prev, [name]: undefined })),
  });

  const err = (name: Field) =>
    errors[name] ? (
      <span id={`cf-${name}-err`} className={styles.err}>
        {errors[name]}
      </span>
    ) : null;

  if (status === "sent") {
    return (
      <div className={styles.done} role="status">
        <span className={styles.doneIcon} aria-hidden="true">
          <Check />
        </span>
        <p className={styles.doneText}>{f.success}</p>
        <button type="button" className="btn" onClick={() => setStatus("idle")}>
          <RotateCcw aria-hidden="true" /> {f.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className={styles.form}
      onSubmit={onSubmit}
      onFocus={() => {
        if (!openedAt.current) openedAt.current = Date.now();
      }}
      noValidate
      aria-labelledby="cf-title"
    >
      <p id="cf-title" className={`mono ${styles.title}`}>
        {f.title}
      </p>

      <div className={styles.grid}>
        <label className={styles.field} htmlFor="cf-name">
          <span className={`mono ${styles.label}`}>{f.name} *</span>
          <input {...field("name")} type="text" autoComplete="name" maxLength={120} required />
          {err("name")}
        </label>

        <label className={styles.field} htmlFor="cf-email">
          <span className={`mono ${styles.label}`}>{f.email} *</span>
          <input {...field("email")} type="email" autoComplete="email" inputMode="email" maxLength={200} required />
          {err("email")}
        </label>

        <label className={styles.field} htmlFor="cf-type">
          <span className={`mono ${styles.label}`}>{f.type}</span>
          <select id="cf-type" name="type" defaultValue={f.types[0]}>
            {f.types.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className={styles.field} htmlFor="cf-timing">
          <span className={`mono ${styles.label}`}>
            {f.timing} <span className="dim">({f.optional})</span>
          </span>
          <select id="cf-timing" name="timing" defaultValue="">
            <option value="">—</option>
            {f.timings.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className={`${styles.field} ${styles.wide}`} htmlFor="cf-message">
          <span className={`mono ${styles.label}`}>{f.message} *</span>
          <textarea {...field("message")} rows={5} maxLength={5000} placeholder={f.messagePlaceholder} required />
          {err("message")}
        </label>

        {/* Honeypot: hidden from people, tempting for bots */}
        <div className={styles.hp} aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <div className={styles.foot}>
        <button type="submit" className="btn btn--solid" disabled={!endpoint || status === "sending"} aria-disabled={!endpoint || undefined}>
          {status === "sending" ? f.sending : f.send}
          {status === "sending" ? <span className={styles.spin} aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
        </button>
        <p className={`mono ${styles.note}`} role="status" aria-live="polite">
          {!endpoint ? f.offline : status === "error" ? <span className={styles.errText}>{f.error}</span> : f.privacy}
        </p>
      </div>
    </form>
  );
}
