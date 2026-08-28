# ARC.3 - Sitio Web Oficial

Sitio web profesional para ARC.3, empresa especializada en desarrollo de páginas web y fotografía profesional en Sevilla.

## 🚀 Características

- **Diseño Moderno:** Estilo contemporáneo con colores blanco, negro y azul neón
- **Totalmente Responsivo:** Optimizado para móviles, tablets y desktop
- **SEO Optimizado:** Estructura semántica y meta etiquetas
- **Interactivo:** Animaciones suaves y efectos visuales modernos
- **Contacto Múltiple:** WhatsApp, Instagram y email integrados
- **Mapa de Ubicación:** Integración con Google Maps de Sevilla
- **Imágenes Personalizables:** Estructura preparada para gestión de imágenes

## 📁 Estructura del Proyecto

```
arc3-web/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos principales
├── js/
│   └── main.js         # Funcionalidad JavaScript
├── img/                # Imágenes del sitio
│   ├── logo.png        # Logo principal (PENDIENTE)
│   ├── about/          # Imágenes de "Sobre Nosotros"
│   ├── services/       # Imágenes de servicios
│   ├── portfolio/      # Galería de proyectos
│   ├── backgrounds/    # Imágenes de fondo
│   └── icons/          # Iconos personalizados
└── assets/             # Recursos adicionales
```

## 🛠️ Instalación y Configuración

### 1. Requisitos Previos
- No se requieren dependencias especiales
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web (opcional, para desarrollo local)

### 2. Configuración del Logo

**IMPORTANTE:** El logo debe colocarse en la carpeta `img/` con el nombre `logo.png`

1. Convierte el logo JPEG proporcionado a formato PNG con fondo transparente
2. Nombra el archivo como `logo.png`
3. Colócalo en la carpeta `img/`
4. El tamaño recomendado es 120x40 píxeles

### 3. Personalización de Contenido

#### Información de Contacto
Los datos de contacto están configurados en `index.html`:

```html
<!-- WhatsApp -->
<a href="https://wa.me/34634376247" target="_blank">+34 634 37 62 47</a>

<!-- Instagram -->
<a href="https://instagram.com/webs.arc" target="_blank">@webs.arc</a>

<!-- Email -->
<a href="mailto:webs.arc.3@gmail.com">webs.arc.3@gmail.com</a>
```

#### Mapa de Ubicación
El mapa está configurado para mostrar Sevilla, España. Para personalizarlo:

1. Ve a [Google Maps](https://www.google.com/maps)
2. Busca la ubicación deseada
3. Haz clic en "Compartir" → "Insertar un mapa"
4. Copia el código iframe y reemplázalo en `index.html`

## 🎨 Personalización de Diseño

### Colores
Los colores se gestionan mediante variables CSS en `css/styles.css`:

```css
:root {
    --color-black: #000000;
    --color-white: #ffffff;
    --color-neon-blue: #00d4ff;
    /* ... más variables */
}
```

### Tipografía
El sitio utiliza dos fuentes de Google Fonts:
- **Orbitron:** Para títulos y elementos destacados
- **Rajdhani:** Para texto general

Para cambiar las fuentes, modifica los enlaces en `index.html` y las variables CSS.

## 📱 Funcionalidades

### Menú Móvil
- Menú hamburguesa automático en dispositivos móviles
- Navegación suave entre secciones
- Cierre automático al seleccionar una opción

### Formulario de Contacto
- Validación de campos en tiempo real
- Simulación de envío con notificaciones
- Preparado para integración con backend

### Animaciones
- Efectos de aparición al scroll
- Partículas animadas en el hero
- Transiciones suaves en elementos interactivos
- Efectos neón en elementos destacados

## 🔧 Desarrollo

### Servidor Local (Opcional)
Para ver el sitio localmente:

```bash
# Usando Python 3
python -m http.server 8000

# Usando Node.js (con http-server)
npx http-server

# Usando PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

### Sin Servidor
Simplemente abre el archivo `index.html` directamente en tu navegador.

## 📈 Optimización

### Rendimiento
- Imágenes optimizadas y comprimidas
- CSS y JavaScript minificados (producción)
- Lazy loading para imágenes
- Código optimizado para carga rápida

### SEO
- Meta etiquetas configuradas
- Estructura semántica HTML5
- Texto alternativo para imágenes
- URLs amigables

## 🚀 Despliegue

### Opciones de Hosting
1. **GitHub Pages:** Gratis para sitios estáticos
2. **Netlify:** Despliegue automático desde Git
3. **Vercel:** Optimizado para sitios estáticos
4. **Hosting tradicional:** Subir archivos via FTP

### Para Producción
1. Minificar CSS y JavaScript
2. Optimizar todas las imágenes
3. Actualizar meta etiquetas si es necesario
4. Probar en diferentes navegadores
5. Configurar dominio personalizado

## 📞 Soporte y Mantenimiento

### Actualizaciones de Contenido
- Texto: Editar directamente en `index.html`
- Imágenes: Reemplazar archivos en la carpeta `img/`
- Estilos: Modificar `css/styles.css`
- Funcionalidad: Editar `js/main.js`

### Contacto del Equipo
- **WhatsApp:** +34 634 37 62 47
- **Instagram:** @webs.arc
- **Email:** webs.arc.3@gmail.com

## 📄 Licencia

Este proyecto es propiedad de ARC.3. Todos los derechos reservados.

## 🔄 Versionado

- **v1.0.0** - Versión inicial con todas las funcionalidades básicas

---

**Desarrollado con ❤️ para ARC.3**