# Formulario de contacto → Resend

El formulario de la web envía los mensajes a este pequeño **Cloudflare Worker** (`src/index.ts`), que los valida, filtra bots (campo trampa, envío demasiado rápido y límite de 5 mensajes cada 10 minutos por IP) y los manda a tu correo con la API de **Resend**. La clave de Resend vive solo en Cloudflare: nunca aparece en el código de la web.

```
hxnss.co (formulario)  →  hxns-contact.<tu-subdominio>.workers.dev  →  Resend  →  tu bandeja de entrada
```

## Puesta en marcha (una sola vez, se puede hacer desde el móvil)

1. **Resend.** Crea una cuenta en https://resend.com y, en *API Keys*, una clave con permiso *Sending access*.
   - Mientras no verifiques tu dominio, Resend solo deja enviar desde `onboarding@resend.dev` **y solo al correo con el que te registraste**. Para un formulario de contacto eso basta: usa ese mismo correo como `CONTACT_TO`.
2. **Cloudflare.** Crea una cuenta gratuita en https://dash.cloudflare.com.
   - Entra una vez en *Workers & Pages* para activar tu subdominio `*.workers.dev`.
   - Copia tu **Account ID** (aparece en la página principal de *Workers & Pages*).
   - En *My Profile → API Tokens → Create Token*, usa la plantilla **Edit Cloudflare Workers**.
3. **GitHub.** En el repositorio: *Settings → Secrets and variables → Actions → New repository secret*. Crea estos cuatro:

   | Secreto | Valor |
   | --- | --- |
   | `CLOUDFLARE_API_TOKEN` | el token del paso 2 |
   | `CLOUDFLARE_ACCOUNT_ID` | tu Account ID |
   | `RESEND_API_KEY` | la clave de Resend |
   | `CONTACT_TO` | el correo que recibirá los mensajes |

4. En *Actions → Deploy contact worker (Resend) → Run workflow*, lanza el despliegue. Al terminar, el log muestra la URL del worker, del tipo `https://hxns-contact.<tu-subdominio>.workers.dev`.
5. Conecta la web al worker: en *Settings → Secrets and variables → Actions → **Variables***, crea `CONTACT_ENDPOINT` con esa URL y vuelve a ejecutar *Deploy to GitHub Pages*. También puedes pegarla en `site.contact.formEndpoint` dentro de `site.config.ts`.

Mientras no haya URL configurada, el formulario se muestra pero avisa de que aún no está activo.

## Enviar desde tu propio dominio (opcional, recomendado)

En Resend: *Domains → Add domain → `hxnss.co`*. Resend te dará unos registros DNS (TXT para SPF y DKIM y, opcionalmente, MX). Añádelos en Namecheap (*Advanced DNS*) y espera a que el dominio aparezca como *Verified*. Después cambia en `wrangler.toml`:

```toml
CONTACT_FROM = "HXNS <hola@hxnss.co>"
```

Haz push y el worker se vuelve a desplegar solo.

## Desarrollo local

```bash
cd worker
npx wrangler@4.151.2 dev
```
Para que funcione en local, crea `worker/.dev.vars` (está ignorado por git) con `RESEND_API_KEY=...` y `CONTACT_TO=...`.

## Seguridad

| Protección | Detalle |
| --- | --- |
| Límite de envíos | Contadores **exactos** en un Durable Object de Cloudflare: **3 peticiones/minuto por IP**, **5 mensajes/día por IP** y **60 mensajes/día en total** (por debajo de los 100/día gratuitos de Resend). Delante, el rate limiting de Cloudflare filtra inundaciones de forma barata. Los límites diarios solo cuentan mensajes válidos, así que las peticiones basura no pueden agotarlos. Respuesta `429` + `Retry-After`. Los valores están en `LIMITS`, dentro de `src/index.ts`. |
| Origen | Solo acepta peticiones con `Origin` de `https://hxnss.co` o `https://www.hxnss.co`; sin `Origin` (scripts, curl) → `403`. |
| Formato | Solo `POST` con `Content-Type: application/json` (bloquea formularios CSRF simples), cuerpo máx. 16 KB, JSON tipo objeto. |
| Bots | Campo trampa oculto, tiempo mínimo de 2,5 s y, opcionalmente, **Cloudflare Turnstile** (ver abajo). Los bots detectados reciben un falso "OK" y no se envía nada. |
| Contenido | Se eliminan caracteres de control y saltos de línea en nombre y asunto (sin inyección de cabeceras); correo con validación estricta (sin comas, comillas ni `<>`); tipo de proyecto y plazo solo de la lista del formulario; la URL de origen solo si es de hxnss.co; todo el HTML del correo se escapa. |
| Secretos | La clave de Resend solo vive en Cloudflare (secreto del worker) y en GitHub Secrets. Los errores de Resend se registran sin su contenido. |

> El dominio `localhost` ya no está permitido en producción. Para probar en local, crea `worker/.dev.vars` con `ALLOWED_ORIGINS="http://localhost:3000"`.

### Activar Cloudflare Turnstile (recomendado contra spam)
1. Cloudflare → **Turnstile → Add widget**: nombre `hxnss.co`, dominios `hxnss.co` y `www.hxnss.co`, modo **Managed**.
2. Copia la **Site Key** (es pública) → GitHub *Settings → Secrets and variables → Actions → Variables*: `TURNSTILE_SITE_KEY`.
3. Copia la **Secret Key** → GitHub *Secrets*: `TURNSTILE_SECRET`.
4. Ejecuta *Deploy contact worker (Resend)* y después *Deploy to GitHub Pages*.

Con eso el formulario muestra la verificación de Cloudflare y el worker rechaza cualquier mensaje sin un token válido.
