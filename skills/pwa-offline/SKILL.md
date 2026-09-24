# PWA offline

---
name: pwa-offline
description: >
  Registro de entrenamientos sin conexion en la PWA del alumno. Trigger: Al tocar el player, el outbox, el service worker o la sincronizacion.
license: MIT
metadata:
  author: template-team
  version: "1.0.0"
  scope: [root]
  auto_invoke:
    - "Implementing offline workout logging"
    - "Syncing the outbox after reconnect"
---

## Reglas

1. El service worker usa `injectManifest` y `registerType: 'prompt'`. No muestres la actualizacion si hay un entrenamiento en curso.
2. Precachea el shell. `NetworkFirst` con timeout de 3 s para hoy, calendario y la rutina. `CacheFirst` para imagenes de ejercicios. No cachees URLs firmadas de fotos.
3. Cada cambio de serie se guarda en IndexedDB. El outbox sincroniza con `PUT /api/v1/me/workout-logs/:syncId`, que es idempotente.
4. Sincroniza al abrir, con `online`, con `visibilitychange`, despues de renovar el token y cada 60 s mientras el outbox no este vacio.
5. Reservar y cancelar exigen conexion: el cupo vive en el servidor.
6. En iOS no hay Background Sync. La sincronizacion es la de la app. Safari borra el almacenamiento de sitios no instalados: conviene pedir la instalacion.
7. El timer de descanso usa timestamps, no intervalos. El navegador frena los intervalos en segundo plano.
