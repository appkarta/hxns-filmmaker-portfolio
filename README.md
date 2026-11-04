# HXNS — York Hans · Filmmaker y editor de video en Barranquilla

**HXNS** es la identidad creativa de **York Hans**: filmmaker, editor de video y creativo audiovisual de 21 años en Barranquilla, Colombia. Este repositorio es su portafolio: un sitio vivo pensado para crecer con cada proyecto nuevo.

🔗 **Sitio:** https://hxnss.co (español) · https://hxnss.co/en/ (English)

---

## Qué hay en la página

| Sección | Contenido |
| --- | --- |
| **Hero** | HXNS, «Cada fotograma tiene algo que decir», video propio (*20 segundos*) en formato vertical, CTA a Trabajo y a Sobre mí |
| **Trabajo** | Cuatro áreas: **Vertical**, **Horizontal**, **Marcas y comercial**, **Personal / Experimentos**. Las que tienen proyectos aparecen primero; las vacías muestran «En construcción» |
| **Sobre mí** | York Hans, 21 años, Barranquilla · biografía · dos retratos en composición editorial |
| **Lo que hago** | Servicios: filmmaking, edición, reels y contenido para redes, videos para empresas y marcas, fotografía |
| **Contacto** | Formulario conectado a Resend (ver [`worker/README.md`](worker/README.md)) y canales que configures |

Cada proyecto se abre en un reproductor a pantalla completa (MP4 propio, YouTube, Vimeo o imágenes) con enlace compartible: `hxnss.co/#work/<id>`.

## Stack

Next.js 16 (export estático) · React 19 · TypeScript · CSS Modules · GSAP + Lenis · GitHub Pages · Cloudflare Worker + Resend para el formulario.

## Estructura

```
data/projects.ts        ← ✏️ TUS PROYECTOS (el único archivo que tocas para añadir trabajo)
site.config.ts          ← ✏️ textos del hero, Sobre mí, servicios, contacto y datos de York Hans
lib/i18n.ts             ← etiquetas de interfaz y categorías de Trabajo (ES / EN)
lib/types.ts            ← tipo Project (qué campos admite cada proyecto)
scripts/optimize-media.mjs ← prepara videos e imágenes para la web (npm run media)
public/
├── images/
│   ├── about/          york-hans-01.webp, york-hans-02.webp
│   ├── hero/           póster y fondo del hero
│   └── projects/{vertical,horizontal,brands,personal}/   portadas
└── videos/
    ├── hero/           hxns-hero.mp4 (loop sin audio)
    └── {vertical,horizontal,brands,personal}/            video + preview
media/originals/        ← originales sin comprimir (NO se suben a git)
worker/                 ← formulario de contacto → Resend
app/(es)/  → /          app/(en)/en/ → /en/          app/(es)/es/ → redirige /es/ a /
```

## Añadir tu próximo proyecto (3 pasos)

**1. Prepara los archivos** (necesitas [ffmpeg](https://ffmpeg.org/) instalado):

```bash
npm run media -- "C:\ruta\a\mi video.mp4" vertical reel-cafe-luna
```

- Categorías: `vertical`, `horizontal`, `brands`, `personal`.
- El id (`reel-cafe-luna`) va en minúsculas, con guiones.
- El script crea el video web (720p, con audio), un *preview* de 5 s sin audio y la portada; guarda el original en `media/originals/` y te imprime un bloque listo para pegar.
- Opcional: `--poster-at 4.2` (segundo de la portada) y `--preview-at 10` (inicio del preview).
- También funciona con imágenes (`.jpg`, `.png`…).

**2. Pega el bloque en `data/projects.ts`** y completa lo que tengas:

```ts
{
  id: "reel-cafe-luna",
  title: "Café Luna",
  category: "vertical",
  client: "Café Luna",
  tag: "Reel / Instagram",
  year: "2026",
  role: { es: "Rodaje y edición", en: "Shooting & edit" },
  description: { es: "Reel de lanzamiento para…", en: "Launch reel for…" },
  mediaType: "video",
  media: "/videos/vertical/reel-cafe-luna.mp4",       // o "youtube:ID" / "vimeo:ID"
  thumbnail: "/images/projects/vertical/reel-cafe-luna.webp",
  preview: "/videos/vertical/reel-cafe-luna-preview.mp4",
  aspect: "9:16",                                       // 9:16 · 16:9 · 21:9 · 4:5 · 1:1
  featured: true,                                       // sale primero en su categoría
  alt: { es: "Qué se ve en la portada", en: "What the cover shows" },
},
```

Los textos pueden ser un solo texto (igual en ambos idiomas) o `{ es, en }`. Cualquier campo que omitas simplemente no se muestra.

**3. Publica:**

```bash
git add .
git commit -m "Add Café Luna reel"
git push
```

GitHub Actions compila y publica en 2–3 minutos.

> **Videos largos o pesados** (más de ~50 MB tras optimizar): súbelos a YouTube o Vimeo y usa `media: "youtube:ID"` o `media: "vimeo:ID"`. GitHub no acepta archivos de más de 100 MB.

## Peso de los videos actuales

| Video | Original | Versión web |
| --- | --- | --- |
| Axia Odontología (77 s) | 116 MB · 1080×1920 | 16 MB · 720×1280 + preview 0,17 MB |
| 20 segundos (37 s) | 57 MB · 1080×1920 | 4,7 MB · 720×1280 + preview 0,13 MB |
| Loop del hero | — | 0,46 MB (10,6 s, sin audio) |

Nada pesado se descarga al abrir la página: el hero carga un loop de 0,46 MB después de mostrarse; los previews solo al pasar el cursor o al entrar en pantalla; los videos completos solo al abrir el proyecto (`preload="metadata"`, *fast start*). Con *Ahorro de datos* no se carga el loop del hero. Recomendación: si Axia crece en duración, súbelo a YouTube/Vimeo.

## Idiomas

Español en `/` (idioma principal, pensado para clientes en Barranquilla) e inglés en `/en/`. El selector ES / EN conserva la sección o el proyecto abierto y recuerda la elección. La antigua dirección `/es/` redirige a `/`.

## SEO local (Barranquilla)

- **Title:** «York Hans | Filmmaker y editor de video en Barranquilla — HXNS»
- **Description:** «York Hans es filmmaker y editor de video en Barranquilla. Portafolio de HXNS: reels y contenido para redes, videos para marcas y empresas, y proyectos personales.»
- **H1 único:** «York Hans — Filmmaker y editor de video en Barranquilla» (visible en el hero).
- **Palabras clave objetivo:** filmmaker en Barranquilla · editor de video en Barranquilla · creador audiovisual en Barranquilla · videos para empresas y marcas · reels y contenido para redes · producción audiovisual (secundaria: muy disputada por productoras y directorios).
- **Datos estructurados (JSON-LD):** WebSite, ProfilePage, Person (York Hans, ciudad Barranquilla, Atlántico, CO) y un CreativeWork por proyecto. Solo datos visibles en la página: sin dirección, teléfono, empresa, premios ni reseñas.
- **Técnico:** `sitemap.xml` con alternativas de idioma, `robots.txt`, canonical y `hreflang` (es-CO / en / x-default), Open Graph y Twitter con `og-image.png`, imágenes WebP, carga diferida.
- **Escalable:** si algún día trabajas en otras ciudades, añádelo en el texto de Sobre mí / servicios de forma natural; no hace falta crear páginas por ciudad.

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build      # genera /out (sitio estático)
```

El proyecto no depende de rutas locales: tras clonar el repositorio funciona en cualquier computador (los originales de `media/originals/` no hacen falta para ejecutar la web).

## Dominio (hxnss.co)

GitHub Pages con dominio propio (*Settings → Pages*), HTTPS forzado. DNS en Namecheap: cuatro registros A de `@` a `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` y CNAME `www` → `appkarta.github.io`. Si cambias de dominio, actualiza `site.url` en `site.config.ts`.

## Seguridad

- Content-Security-Policy en `<meta>` (solo el propio sitio, el worker de contacto, YouTube/Vimeo y, si se activa, Turnstile) y Referrer-Policy.
- Formulario: límites exactos por IP y diarios, validación estricta y antispam → [`worker/README.md`](worker/README.md#seguridad).
- Sin claves en el código; secret scanning y push protection activos; Dependabot semanal.

## Accesibilidad

`prefers-reduced-motion` (sin intro, sin scroll suave ni animaciones), navegación por teclado, *skip link*, foco visible, reproductor con atajos (`Espacio`/`K`, `←/→`, `M`, `F`, `Shift+←/→`, `Esc`) y textos alternativos en todas las imágenes.

## Pendiente de completar

- `site.config.ts → contact`: correo, Instagram, TikTok, Vimeo, YouTube (vacíos = ocultos).
- `data/projects.ts → axia-odontologia`: año, rol y descripción final.
- `site.config.ts → availability`: confirmar si estás disponible para nuevos proyectos.
- Proyectos para **Vertical** y **Horizontal** (por ahora muestran «En construcción»).
