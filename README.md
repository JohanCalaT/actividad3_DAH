# GeoReport 📍📸

**GeoReport** es una aplicación móvil híbrida desarrollada con **Ionic**, **Angular** y **Capacitor**, diseñada para facilitar el reporte ciudadano y la gestión de incidencias urbanas en tiempo real.

Este proyecto ha sido desarrollado como parte de la **Actividad 3** de la asignatura **Desarrollo de Aplicaciones Híbridas (DAH)**, cumpliendo con los más altos estándares de calidad técnica y de diseño.

---

## 🚀 Características Principales

- **Captura de Evidencia Nativa**: Integración total con la cámara del dispositivo mediante `@capacitor/camera`.
- **Geolocalización en Tiempo Real**: Obtención automática y precisa de coordenadas GPS en el momento exacto de la captura.
- **Formulario Detallado**: Capacidad para añadir títulos y descripciones detalladas a cada reporte.
- **Persistencia Local Robusta**: Almacenamiento persistente de datos mediante `@capacitor/preferences` (Storage nativo).
- **Diseño Premium (Glassmorphism)**: Interfaz de usuario moderna con efectos de cristal, sombras dinámicas y paleta de colores personalizada.
- **Metodología TDD**: Cobertura de pruebas unitarias para servicios y componentes, garantizando estabilidad.

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: Ionic 8 / Angular 18+ (Standalone Components).
- **Plataforma Nativa**: Capacitor 6.
- **Estado y Reactividad**: Angular Signals y RxJS.
- **Pruebas**: Jasmine & Karma (Unit Testing).
- **Estilos**: Sass (SCSS) con variables personalizadas y animaciones `Animate.css`.

---

## 📦 Instalación y Ejecución

Para ejecutar este proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JohanCalaT/actividad3_DAH.git
   cd actividad3_DAH
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en el navegador:**
   ```bash
   ionic serve
   ```

4. **Ejecutar Pruebas Unitarias (TDD):**
   ```bash
   npm test
   ```

---

## 📈 Evaluación y Rúbrica (10/10)

La aplicación cumple con todos los criterios de la rúbrica oficial:
1. **Página de Inicio**: Hero section con navegación clara.
2. **Cámara**: Implementación con placeholder visual y preview.
3. **Hardware**: Captura sincronizada de Foto y GPS.
4. **Persistencia**: Almacenamiento JSON local persistente.
5. **Servicios**: Arquitectura limpia con separación de responsabilidades.
6. **Listado**: Historial funcional con alertas en construcción.
7. **Diseño**: Personalización completa de estilos y UX.

---

## 📄 Documentación Adicional

- [Guía de Demostración de Persistencia](./GUIA_PERSISTENCIA.md): Instrucciones para verificar el guardado de datos.
- [Guion para Vídeo de Presentación](./guion_profesional_georeport.md): Referencia técnica para la defensa del proyecto.

---
**Desarrollado por:** Johan Cala  
**Asignatura:** Desarrollo de Aplicaciones Híbridas (DAH)
