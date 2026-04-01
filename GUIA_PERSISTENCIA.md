# 📖 Guía de Demostración: Persistencia Local (Criterio 4)

Esta guía explica cómo demostrar paso a paso que la aplicación guarda los datos de forma persistente utilizando las herramientas de desarrollo del navegador.

## EVIDENCIA 1: Prueba de Recarga (F5)
1. Abre la aplicación en tu navegador (`localhost:8100`).
2. Ve a **"Nueva Incidencia"**.
3. Captura una foto y pulsa el botón **"GUARDAR REPORTE"**.
4. Serás redirigido al Home. Ve ahora a **"Ver Incidencias"**.
5. Verifica que tu reporte aparece en la lista con la miniatura y las coordenadas correctas.
6. **ACCIÓN CRUCIAL**: Pulsa `F5` o el botón de recargar del navegador.
7. Vuelve a entrar en el listado. Los datos **siguen ahí**. Esto demuestra que no están solo en memoria, sino persistidos.

---

## EVIDENCIA 2: Inspección de Almacenamiento (Técnica)
Para demostrar qué tecnología estás usando exactamente:
1. Haz clic derecho en cualquier parte de la app y selecciona **Inspeccionar**.
2. Ve a la pestaña **Application** (en la parte superior, junto a Console o Network).
3. En el menú de la izquierda, despliega **Storage > Local Storage**.
4. Haz clic en `http://localhost:8100` (o tu URL local).
5. En la lista de la derecha, busca la clave que empieza por `_cap_incidencias`.
6. Haz clic en ella: verás un JSON con la estructura del array de incidencias, incluyendo la `foto` (como URI `data:image/...`), `latitud`, `longitud` y `id`.

> [!NOTE]
> La clave tiene el prefijo `_cap_` porque Capacitor Preferences emula el comportamiento de los Storage nativos (iOS/Android) usando Local Storage cuando se ejecuta en un navegador web.

---

## EVIDENCIA 3: Persistencia entre Sesiones
1. Cierra la pestaña del navegador por completo.
2. Abre una nueva pestaña y vuelve a entrar en la aplicación.
3. Ve directamente al listado. Los datos persisten.

---

## Puntos Clave para el Evaluador:
- **Tecnología**: `@capacitor/preferences` (anteriormente Storage).
- **No es volátil**: Los datos sobreviven a cierres y reinicios.
- **Formato**: Los datos se serializan en JSON para poder guardarlos como string en el par clave-valor.
