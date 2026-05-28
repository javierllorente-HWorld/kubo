# Kubo

Kubo es una plataforma de estudio para organizar materias, decks y cards, estudiar con repetición espaciada y visualizar progreso diario.

La app permite crear contenido propio, estudiar cards, guardar progreso, sumar XP y revisar actividad reciente.

## Demo

Cuenta demo pública:

```txt
Email: demo@kubo.app
Password: kubo123
```

> La cuenta demo incluye datos precargados para explorar la app.

## Preview

<img width="1366" height="613" alt="image" src="https://github.com/user-attachments/assets/b0b50106-0762-40b7-91b7-de2e43c187fb" />

IMAGEN - Dashboard principal con sesión diaria, racha y decks.

<img width="737" height="573" alt="image" src="https://github.com/user-attachments/assets/3c260409-d9f4-48cc-b69e-7cc1ec1d58ca" />

IMAGEN - Pantalla de estudio con card, respuesta y botones de calificación.

## Funcionalidades

- Registro e inicio de sesión con email y contraseña.
- Usuario demo público.
- Dashboard con progreso diario, XP, racha y sesión diaria.
- CRUD de materias.
- CRUD de decks.
- CRUD de cards.
- Estudio por sesión diaria o por deck.
- Calificación de cards:
  - Otra vez
  - Difícil
  - Bien
  - Fácil
- Guardado de progreso real.
- Actividad reciente.
- Perfil de usuario editable.
- Diseño responsive con sidebar desktop y navegación mobile.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- AWS Aurora PostgreSQL
- Vercel
- bcryptjs
- pg

## Base de datos

Kubo usa AWS Aurora PostgreSQL.

Modelo principal:

```txt
Usuario → Materias → Decks → Cards → Reviews
```

Tablas principales:

- `users`
- `user_settings`
- `user_stats`
- `subjects`
- `decks`
- `cards`
- `card_reviews`
- `daily_progress`
- `activity_events`

Materias, decks y cards usan soft delete: se ocultan para el usuario, pero no se eliminan físicamente de la base.

## Rutas principales

| Ruta | Descripción |
|---|---|
| `/` | Login y registro |
| `/dashboard` | Inicio del estudiante |
| `/materias` | Listado de materias |
| `/materias/[slug]` | Decks de una materia |
| `/materias/decks/[deckId]/editar` | Edición de cards |
| `/materias/decks/[deckId]/estudiar` | Estudio por deck |
| `/estudiar/sesion` | Sesión diaria |
| `/perfil` | Perfil del usuario |


((La conexión real a AWS funciona principalmente en Vercel Preview/Production. En local puede usarse fallback si las credenciales temporales de AWS no están disponibles.))

## Identidad visual

Kubo usa una estética moderna, clara y lúdica, sin infantilizar la experiencia.

Paleta principal:

- Midnight Ink: `#111827`
- Graphite: `#232B36`
- Electric Lime: `#B7FF2A`
- Fresh Lime: `#D9FF6B`
- Soft Cloud: `#F5F7FA`
- Cool Gray: `#98A2B3`

Tipografías:

- Inter
- Manrope

## Estado actual

Kubo es una primera versión funcional/MVP.

Incluye autenticación básica, usuarios reales, base de datos en AWS, CRUD de contenido, progreso de estudio, XP y actividad reciente.

Todavía no incluye recuperación de contraseña, roles avanzados, pagos ni generación automática de cards con IA.
