# DG Company — Sitio Web

**Material gráfico premium para inmobiliarias · Lima, Perú**

---

## Estructura del repositorio

```
DgCompany/
├── index.html        ← Landing page principal (one-pager)
├── style.css         ← Estilos con paleta CMYK de marca
├── main.js           ← Lógica del formulario, nav, FAQ, animaciones
└── README.md         ← Este archivo
```

---

## Deploy en Netlify (5 minutos)

1. Ve a [netlify.com](https://netlify.com) → **Log in** → **Add new site** → **Deploy manually**
2. Arrastra la carpeta completa `DgCompany/` al área de drop
3. Tu sitio estará live en una URL tipo `https://dgcompany-xxxxx.netlify.app`
4. Para dominio propio: **Domain settings** → **Add custom domain** → `dgcompany.com.pe`

---

## Configuración antes de lanzar

Abre `index.html` y reemplaza estos 3 valores:

| Placeholder | Valor real | Cómo obtenerlo |
|-------------|-----------|----------------|
| `51999XXXXXX` | Tu número WhatsApp (sin + ni espacios) | Tu número Business |
| `TU_ID_PDF_CATALOGO` | ID del PDF en Google Drive | Drive → Compartir → copiar ID de la URL |
| `TU_WEBHOOK_AQUI` | URL webhook de Make.com | Make.com → New scenario → Webhook → Copy URL |

---

## Paleta de colores (CMYK Brand)

| Color | HEX | Uso |
|-------|-----|-----|
| Cyan | `#00AEEF` | Acento principal, CTAs |
| Magenta | `#EC008C` | Acento secundario, stats |
| Yellow | `#FFF200` | Destacados, precios, stat hero |
| Black | `#231F20` | Fondo hero, texto principal |

---

## Tipografías

- **Playfair Display** — títulos y display (serif elegante)
- **DM Sans** — cuerpo, botones, labels

---

## Conectar formulario a WhatsApp (Make.com)

1. Crear cuenta en [make.com](https://make.com)
2. New Scenario → Webhooks → Custom webhook → **Copy URL**
3. Pegar URL en `index.html` (reemplazar `TU_WEBHOOK_AQUI`)
4. Agregar módulo: **WhatsApp Business** o **Gmail** para notificación
5. Agregar módulo: **Google Sheets** → agregar fila al CRM

---

## Secciones del sitio

1. **Banner** — oferta especial inmobiliarias
2. **Navegación** — sticky + responsive
3. **Hero** — título + CTA + visual CMYK
4. **Social proof** — tipos de clientes
5. **Barra descarga catálogo** — PDF directo
6. **Catálogo 3 paquetes** — Folletos · Kit Sala Ventas · Banners
7. **Proceso 4 pasos** — Cotiza → Arte → Producción → Entrega
8. **Testimonio** — Historia Carla + 3 métricas
9. **Formulario** — conectado a Make.com webhook
10. **FAQ** — 5 preguntas frecuentes
11. **Footer** + botón WhatsApp flotante

---

## Próximos pasos después del deploy

- [ ] Optimizar Google Business Profile con fotos reales
- [ ] Configurar Meta Business Suite (IG + WA unificado)
- [ ] Importar base de 1,000 emails en Mailchimp
- [ ] Activar secuencia "Historia Carla" (5 emails automatizados)
- [ ] Crear página de empresa en LinkedIn
- [ ] Subir primeros 3 posts en Instagram/TikTok

---

*Proyecto desarrollado con metodología Growth Partner · Abril 2026*
