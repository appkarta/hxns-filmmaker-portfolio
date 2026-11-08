import type { Project, WorkCategory } from "@/lib/types";
import { pad2 } from "@/lib/asset";
import { tr, ui, type Locale } from "@/lib/i18n";
import { aspectOf, categoriesInDisplayOrder, isVertical, projectsIn } from "@/lib/projects";
import AccentTitle from "../AccentTitle";
import CategoryNav from "./CategoryNav";
import MediaCard from "./MediaCard";
import OpenButton from "./OpenButton";
import styles from "./Work.module.css";

type Ctx = { locale: Locale; t: (typeof ui)[Locale] };

/** Work: Vertical · Horizontal · Brands & Commercial · Artists & Events · Personal / Experiments, all driven by data/projects.ts */
export default function Work({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const ctx = { locale, t };
  const categories = categoriesInDisplayOrder();

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className={`container ${styles.head}`}>
        <p className="section-label mono" data-reveal="fade">
          {t.workLabel}
        </p>
        <h2 id="work-title" className={`display ${styles.title}`}>
          <span data-reveal="lines">
            <AccentTitle parts={t.workTitle} />
          </span>
        </h2>
        <p className={styles.lead} data-reveal="fade">
          {t.workLead}
        </p>
      </div>

      <div className={styles.navWrap}>
        <div className="container">
          <CategoryNav
            label={t.workNav}
            items={categories.map((c) => ({ id: c.id, label: tr(c.label, locale), count: projectsIn(c.id).length }))}
          />
        </div>
      </div>

      {categories.map((c, i) => {
        const items = projectsIn(c.id);
        return (
          <div key={c.id} id={`work-${c.id}`} className={`container ${styles.block}`}>
            <header className={styles.blockHead} data-reveal="stagger">
              <span className={`mono ${styles.blockNum}`}>{pad2(i + 1)}</span>
              <h3 className={styles.blockTitle}>{tr(c.label, locale)}</h3>
              <p className={styles.blockDesc}>{tr(c.description, locale)}</p>
              <span className="mono dim">{t.projectsCount(items.length)}</span>
            </header>
            <Projects category={c.id} items={items} ctx={ctx} />
          </div>
        );
      })}
    </section>
  );
}

function Projects({ category, items, ctx }: { category: WorkCategory; items: Project[]; ctx: Ctx }) {
  if (category === "vertical") return <VerticalRow items={items} ctx={ctx} />;
  if (category === "horizontal") return <HorizontalStack items={items} ctx={ctx} />;
  if (category === "brands") return <>{items.map((p) => <Brand key={p.id} project={p} ctx={ctx} />)}</>;
  return <>{items.map((p) => <Personal key={p.id} project={p} ctx={ctx} />)}</>;
}

/** 9:16 pieces side by side, large, swipeable on phones */
function VerticalRow({ items, ctx }: { items: Project[]; ctx: Ctx }) {
  return (
    <ul className={styles.vRow}>
      {items.map((p) => (
        <li key={p.id} className={styles.vItem}>
          <MediaCard project={p} locale={ctx.locale} sizes="(max-width: 760px) 78vw, 26vw" label={p.client} />
          <Caption project={p} ctx={ctx} />
        </li>
      ))}
    </ul>
  );
}

/** 16:9 / 21:9 pieces stacked, full width, with room to breathe */
function HorizontalStack({ items, ctx }: { items: Project[]; ctx: Ctx }) {
  return (
    <ul className={styles.hStack}>
      {items.map((p) => (
        <li key={p.id}>
          <MediaCard project={p} locale={ctx.locale} sizes="100vw" label={p.client} />
          <Caption project={p} ctx={ctx} />
        </li>
      ))}
    </ul>
  );
}

function Caption({ project, ctx }: { project: Project; ctx: Ctx }) {
  return (
    <div className={styles.caption}>
      <h4 className={styles.name}>{tr(project.title, ctx.locale)}</h4>
      <p className="mono dim">{[project.client, project.tag && tr(project.tag, ctx.locale), project.year].filter(Boolean).join(" — ")}</p>
      {project.description && <p className={styles.desc}>{tr(project.description, ctx.locale)}</p>}
    </div>
  );
}

/** Brand work: the piece next to a credits sheet (only the fields that are filled in) */
function Brand({ project, ctx }: { project: Project; ctx: Ctx }) {
  const { t, locale } = ctx;
  const vertical = isVertical(aspectOf(project));
  const rows = (
    [
      [t.client, project.client],
      [t.category, project.tag && tr(project.tag, locale)],
      [t.role, project.role && tr(project.role, locale)],
      [t.year, project.year],
      [t.format, aspectOf(project)],
    ] as [string, string | undefined][]
  ).filter((r): r is [string, string] => Boolean(r[1]));

  return (
    <article className={`${styles.brand} ${vertical ? styles.brandVertical : ""}`}>
      <div className={styles.brandMedia}>
        <MediaCard project={project} locale={locale} sizes={vertical ? "(max-width: 760px) 86vw, 32vw" : "(max-width: 760px) 100vw, 60vw"} />
      </div>
      <div className={styles.brandInfo} data-reveal="stagger">
        {project.tag && <p className={`mono ${styles.kicker}`}>{tr(project.tag, locale)}</p>}
        <h4 className={styles.brandTitle}>{tr(project.title, locale)}</h4>
        {project.quote && <blockquote className={`${styles.quote} ${styles.brandQuote}`}>“{tr(project.quote, locale)}”</blockquote>}
        {project.description && (
          <p className={project.quote ? styles.personalDesc : styles.brandDesc}>{tr(project.description, locale)}</p>
        )}
        <dl className={`mono ${styles.credits}`}>
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <OpenButton id={project.id} label={t.viewProject} />
      </div>
    </article>
  );
}

/** Personal work: more editorial — the idea first, the piece beside it */
function Personal({ project, ctx }: { project: Project; ctx: Ctx }) {
  const { t, locale } = ctx;
  return (
    <article className={styles.personal}>
      <div className={styles.personalText}>
        {project.tag && (
          <p className={`mono ${styles.kicker}`} data-reveal="fade">
            {tr(project.tag, locale)}
            {project.year && ` — ${project.year}`}
          </p>
        )}
        <h4 className={styles.personalTitle} data-reveal="lines">
          {tr(project.title, locale)}
        </h4>
        {project.quote && (
          <blockquote className={styles.quote} data-scrub="words">
            “{tr(project.quote, locale)}”
          </blockquote>
        )}
        {project.description && (
          <p className={styles.personalDesc} data-reveal="fade">
            {tr(project.description, locale)}
          </p>
        )}
        <div data-reveal="fade">
          <OpenButton id={project.id} label={t.viewProject} />
        </div>
      </div>
      <div className={`${styles.personalMedia} ${isVertical(aspectOf(project)) ? "" : styles.personalMediaWide}`}>
        <span className={`mono ${styles.edge}`} aria-hidden="true">
          HXNS ▸ {project.id.toUpperCase()} ▸ {aspectOf(project)}
        </span>
        <MediaCard project={project} locale={locale} sizes="(max-width: 760px) 86vw, 34vw" />
        {project.mediaType === "video" && (
          <span className={`mono ${styles.edgeBottom}`} aria-hidden="true">
            {t.soundOn}
          </span>
        )}
      </div>
    </article>
  );
}

