# HXNS® — Social Video, Music Visuals & Graphic Design

**Visual identity in motion.** Portafolio de HXNS: videos para redes sociales, videoclips y visuales musicales, motion graphics y piezas gráficas. Intro tipográfica, showreel a pantalla completa, galería editorial de proyectos (video y piezas gráficas), *Behind the edit*, servicios, archivo experimental y formulario de contacto conectado a Resend.

🔗 **Sitio publicado:** https://hxnss.co/ (English) · https://hxnss.co/es/ (Español)

---

## Stack

| Área | Elección | Por qué |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router) + **React 19** + **TypeScript** | Componentes de servidor para el contenido, cliente solo donde hay interacción. |
| Estilos | **CSS Modules** + tokens en `app/globals.css` | Control total de la composición editorial sin utilidades genéricas. |
| Movimiento | **GSAP** (ScrollTrigger, SplitText) + **Lenis** | Una sola librería de animación; Lenis solo para scroll suave en escritorio. |
| Iconos | **lucide-react** | Solo en controles del reproductor y botones. |
| Tipografía | Geist · Geist Mono · Instrument Serif (`next/font`) | Titulares compactos, metadatos tipo timecode y contrapunto editorial en cursiva. |
| Hosting | **GitHub Pages** vía GitHub Actions (export estático) | Despliegue automático en cada `push` a `main`. |

## Estructura

```
site.config.ts          ← ✏️ TODO el contenido editable (en inglés y español): textos, contacto, proyectos, servicios, archivo
lib/i18n.ts             ← idiomas, etiquetas de interfaz (botones, menús, aria) y nombres de categorías en EN / ES
lib/types.ts            ← tipos de Project / Service / ArchiveItem y fuentes de video
lib/document.tsx        ← <html lang>, fuentes y metadatos SEO por idioma (canonical, hreflang, Open Graph)
app/
  (en)/                 ← página en inglés  → /
  (es)/es/              ← página en español → /es/
  global-not-found.tsx  ← 404 bilingüe
  sitemap.ts, robots.ts, icon.svg
components/
  Site.tsx              ← la landing completa, renderizada una vez por idioma
  LanguageSwitch.tsx    ← selector EN / ES (header y footer)
  Intro.tsx             ← intro HXNS + apertura tipo letterbox
  Hero.tsx              ← showreel de fondo, wordmark a ancho completo, timecode en vivo
  works/                ← galería editorial (Selected Works): videos y galerías de piezas gráficas
  player/               ← modal de reproducción: MP4 propio, YouTube o Vimeo
  About.tsx             ← Behind the edit
  services/             ← lista de servicios con glifos y preview flotante
  archive/              ← Visual playground (scroll horizontal fijado en escritorio)
  Contact.tsx           ← contacto + footer
  motion/Motion.tsx     ← Lenis + revelados por atributos data-reveal / data-parallax
public/
  images/{projects,portraits,stills,archive}/
  videos/{hero,projects,archive}/
public/og-image.png     ← imagen para compartir en redes (1200×630)
```

## Editar contenido

Todo se cambia en **`site.config.ts`**. Lo marcado con `TODO` es un marcador de posición.

### Idiomas (inglés / español)
El sitio existe en dos versiones estáticas: **inglés en `/`** y **español en `/es/`**, cada una con su `lang`, título, descripción y enlaces `hreflang` para Google. El selector **EN / ES** del header y del footer cambia de versión conservando la sección o el proyecto abierto (`#services`, `#work/nocturne`…), y recuerda la elección del visitante.

Cada texto de `site.config.ts` se escribe en ambos idiomas:
```ts
subtitle: { en: "Filmmaker · Video Editor · Visual Storytelling", es: "Cine · Edición de video · Narrativa visual" },
```
Las etiquetas de interfaz (botones, menú, reproductor, títulos de sección) están en `lib/i18n.ts` → `ui.en` / `ui.es`; TypeScript avisa si a una de las dos le falta una clave.

> Los textos en español usan formulaciones neutras ("hago cine y edición de video") para no asumir género; cámbialas a tu gusto (p. ej. "soy editor/editora de video").

### Contacto
```ts
contact: {
  email: "tu@correo.com",
  instagram: "https://www.instagram.com/tuusuario",
  vimeo: "https://vimeo.com/tuusuario",
  youtube: "https://www.youtube.com/@tuusuario",
}
```
Los campos vacíos se ocultan automáticamente (también `tiktok`). El **formulario de contacto** envía los mensajes con Resend a través de un pequeño worker: ver [`worker/README.md`](worker/README.md) para activarlo (unos 10 minutos, se puede hacer desde el móvil).

### Añadir o sustituir un proyecto
1. Copia tus archivos a `public/`:
   - portada: `public/images/projects/mi-proyecto.webp` (o .jpg)
   - loop corto opcional (3–6 s, sin audio, ~640 px): `public/videos/projects/mi-proyecto-preview.mp4`
   - video completo: `public/videos/projects/mi-proyecto.mp4`
2. Añade una entrada en `projects`:
```ts
{
  slug: "mi-proyecto",
  title: { en: "My Project", es: "Mi Proyecto" },
  category: "Music Visuals",          // Social Media Videos, Music Videos, Music Visuals, Graphic Pieces,
                                       // Motion Graphics, Brand Content, Video Edits, Creative Experiments
  year: 2026,
  role: { en: "Direction · Edit · Color", es: "Dirección · Edición · Color" },
  description: { en: "One or two sentences.", es: "Una o dos frases." },
  aspect: "16:9",                      // o "9:16" para vertical
  layout: "wide",                      // feature | wide | wideRight | tall | mid | half
  cover: "/images/projects/mi-proyecto.webp",
  preview: "/videos/projects/mi-proyecto-preview.mp4",
  media: { type: "mp4", src: "/videos/projects/mi-proyecto.mp4" },
  // media: { type: "youtube", id: "dQw4w9WgXcQ" },
  // media: { type: "vimeo", id: "123456789" },
  demo: false,
}
```
> Los proyectos actuales están marcados `demo: true` y muestran la etiqueta **Demo**: son placeholders con metraje de stock, no trabajos reales.

**Recomendación para MP4 propios** (ligeros y con inicio rápido):
```bash
ffmpeg -i master.mov -vf "scale=1280:-2" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k mi-proyecto.mp4
ffmpeg -ss 5 -t 5 -i master.mov -vf "scale=640:-2" -c:v libx264 -crf 28 -an -movflags +faststart mi-proyecto-preview.mp4
```
Para videos largos o pesados, súbelos a YouTube/Vimeo y usa su ID (GitHub no admite archivos > 100 MB).

### Piezas gráficas (portadas, pósters, carruseles…)
Un proyecto puede ser una galería de imágenes en vez de un video. Cada imagen lleva su propio formato y el visor se adapta (1:1, 4:5, 9:16…); se navega con flechas o con ← / →:
```ts
media: {
  type: "gallery",
  images: [
    { src: "/images/graphics/mi-portada.webp", aspect: "1:1", alt: { en: "…", es: "…" }, caption: { en: "Cover", es: "Portada" } },
    { src: "/images/graphics/mi-poster.webp", aspect: "4:5", alt: { en: "…", es: "…" } },
  ],
},
```

### Showreel del hero
Sustituye `public/videos/hero/hero-reel.mp4` (16:9) y `hero-reel-mobile.mp4` (vertical) y sus pósters en `public/images/stills/`.

### Retrato
Sustituye `public/images/portraits/portrait-placeholder.webp` (4:5) y pon `portraitIsPlaceholder: false`.

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build      # genera /out (sitio estático)
```

## Publicar cambios

```bash
git add .
git commit -m "Update projects"
git push
```
Cada `push` a `main` ejecuta `.github/workflows/deploy.yml`: lint → type-check → build → despliegue en GitHub Pages (1–2 min). El estado se ve en la pestaña **Actions** del repositorio.

## Dominio propio (hxnss.co)

El sitio se sirve desde GitHub Pages con el dominio **hxnss.co** (configurado en *Settings → Pages → Custom domain*; `www.hxnss.co` redirige automáticamente). Registros DNS en Namecheap (*Advanced DNS*):

| Tipo | Host | Valor |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `appkarta.github.io.` |

Sin registros *URL Redirect* ni *parking* para `@` o `www`. Si cambias el dominio, actualiza también `site.url` en `site.config.ts` (canonical, sitemap y Open Graph).

## Seguridad

- **Content-Security-Policy** (en `<meta>`, porque GitHub Pages no permite cabeceras propias): scripts, estilos, fuentes y conexiones solo del propio sitio, del worker de contacto, de los reproductores de YouTube/Vimeo y, si se activa, de Turnstile. `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `upgrade-insecure-requests`. Bloquea scripts externos, iframes ajenos y envíos de datos a terceros.
- **Referrer-Policy** `strict-origin-when-cross-origin`; HTTPS forzado en el dominio.
- **Formulario**: rate limiting, validación estricta y antispam en el worker → ver [`worker/README.md`](worker/README.md#seguridad).
- **Secretos**: ninguna clave en el código ni en el historial de git; GitHub *secret scanning* y *push protection* activados.
- **Dependencias**: 0 vulnerabilidades en las dependencias que se publican. `npm audit` señala `braces` (dependencia de ESLint, solo en desarrollo, sin versión corregida y no explotable aquí). Dependabot (`.github/dependabot.yml`) propone actualizaciones cada semana.

## Accesibilidad y rendimiento

- `prefers-reduced-motion`: sin intro, sin scroll suave, sin parallax ni animaciones de scroll; el archivo pasa a scroll horizontal nativo.
- Navegación por teclado, *skip link*, foco visible, modal con *focus trap*, `Esc` para cerrar.
- Reproductor: `Espacio`/`K` reproducir, `←/→` ±5 s, `M` silencio, `F` pantalla completa, `Shift+←/→` proyecto anterior/siguiente.
- Los videos se cargan bajo demanda (hover o al entrar en pantalla); el hero usa una versión vertical ligera en móvil y no carga video con *Ahorro de datos*.
- Enlaces compartibles a cada proyecto: `/#work/<slug>`.

## Créditos de recursos de demostración

Todo el metraje de demostración procede de **[Mixkit](https://mixkit.co/)** bajo la [Mixkit Stock Video Free License](https://mixkit.co/license/#videoFree) (uso comercial y personal, sin atribución obligatoria). Se recortó, re-etalonó (look frío HXNS) y comprimió para web. Clips usados (ID Mixkit): 1038, 48509, 33896, 51757, 50438, 51275, 44070, 4332, 4451, 50951, 4447, 2374, 41154, 50957, 33936, 48529, 51283, 46351, 44075. Las piezas gráficas (`public/images/graphics/`) y el video *Type in Motion* son diseños de demostración hechos para este sitio.

Sustitúyelos por tu propio material antes de presentar el portafolio como trabajo propio.
