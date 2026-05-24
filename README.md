<img width="1366" height="613" alt="image" src="https://github.com/user-attachments/assets/3b11d20c-d44d-43e1-91dc-1fc39f1fe56f" /># Kubo

Kubo es un MVP frontend de una plataforma de estudio para estudiantes universitarios, inspirada en Anki.
La app permite organizar materias y decks, estudiar con cards, mantener una racha, visualizar progreso diario y avanzar con una experiencia simple, moderna y gamificada de forma sobria.

Actualmente es un prototipo visual con datos mock. No tiene backend, base de datos, persistencia ni autenticación real. (24/05/2026)

## Preview

<img width="1366" height="613" alt="image" src="https://github.com/user-attachments/assets/b0b50106-0762-40b7-91b7-de2e43c187fb" />
IMAGEN - Dashboard principal con sesión diaria, racha y decks.

<img width="737" height="573" alt="image" src="https://github.com/user-attachments/assets/3c260409-d9f4-48cc-b69e-7cc1ec1d58ca" />
IMAGEN - Pantalla de estudio con card, respuesta y botones de calificación.

## Objetivo

El objetivo de Kubo es validar una experiencia de estudio clara para que estudiantes puedan:

- Ver qué tienen que estudiar hoy.
- Organizar materias y decks.
- Repasar contenido con cards.
- Medir progreso.
- Mantener una racha de estudio.
- Usar una interfaz lúdica, pero profesional.

## Stack

- Next.js 16 con App Router
- React 19
- TypeScript
- Tailwind CSS v4
- clsx
- tailwind-merge
- Inter y Manrope vía next/font

## Funcionalidades actuales

### Login demo

Ruta: `/`

- Login visual sin autenticación real.
- Redirige al dashboard.
- `/login` redirige a `/`.

<img width="1366" height="613" alt="image" src="https://github.com/user-attachments/assets/f693c245-1009-4afd-918b-a31a3403edc4" />
IMAGEN - Login demo.

### Dashboard

Ruta: `/dashboard`

Incluye:

- Saludo al usuario demo.
- Racha actual.
- Calendario semanal.
- Panel de sesión diaria.
- Cards pendientes.
- Objetivo diario.
- Anillo de progreso.
- Breakdown por deck.
- Preview de decks.
- CTA para iniciar la sesión de estudio.
  
<img width="1366" height="613" alt="image" src="https://github.com/user-attachments/assets/bcd2731e-f0fb-4815-a14d-6c3fdbbfbe45" />
IMAGEN - Dashboard con sesión diaria y progreso.

### Materias

Ruta: `/materias`

Incluye:

- Listado de decks.
- Progreso por deck.
- Cards totales.
- Cards pendientes.
- Porcentaje de dominio.
- Acciones para estudiar o editar un deck.
- Modal visual para crear un nuevo deck, todavía sin persistencia.

<img width="1366" height="613" alt="image" src="https://github.com/user-attachments/assets/6e2a944a-f3d3-4698-9c8f-60642e303136" />
IMAGEN - Página de materias con decks.

### Estudio

Rutas:

- `/estudiar/sesion`
- `/materias/[slug]/estudiar`

Flujo actual:

1. Ver pregunta.
2. Ver respuesta.
3. Calificar la card: Otra vez, Difícil, Bien o Fácil.
4. Avanzar a la siguiente card.
5. Finalizar con una pantalla de sesión completada.

La lógica todavía funciona con datos mock, pero el flujo principal está completo a nivel visual y de interacción.

<img width="1366" height="613" alt="image" src="https://github.com/user-attachments/assets/b1c21661-a37c-45d9-98ad-80d1162df3c8" />
IMAGEN - Card de estudio antes de mostrar respuesta.

<img width="1366" height="613" alt="image" src="https://github.com/user-attachments/assets/c16cb845-bfd0-47e4-9fbd-ecfdc519aeb0" />
IMAGEN - Card de estudio con respuesta y botones de calificación.

![Uploading image.png…](
IMAGEN - Pantalla de sesión completada.

### Editar deck

Ruta: `/materias/[slug]/editar`

Pantalla placeholder para la futura administración de cards.

Incluye:

- Crear card.
- Editar card.
- Borrar card.
- Listado mock de cards.
- Empty state visual.

Todavía no tiene CRUD real ni persistencia.

<img width="1366" height="613" alt="image" src="https://github.com/user-attachments/assets/7242b96d-6f64-4599-b7ee-f37f46fb4df1" />
IMAGEN - Pantalla de edición de deck.

### Perfil

Ruta: `/perfil`

Incluye:

- Datos del usuario demo.
- Resumen de progreso.
- Racha.
- Estadísticas.
- Preferencias.
- Información de cuenta.

<img width="1366" height="613" alt="image" src="https://github.com/user-attachments/assets/f0c18e9f-31a2-4218-9075-db3e09c886c6" />
IMAGEN - Perfil del usuario con resumen de progreso.

### Navegación

La app cuenta con:

- Sidebar en desktop.
- Bottom navigation en mobile.
- Header con avatar y notificaciones.
- Página 404 custom.

<img width="452" height="439" alt="image" src="https://github.com/user-attachments/assets/a8d99a14-fb84-4736-a0bf-d13491c5b60a" />
IMAGEN - Dropdown de notificaciones.

## Identidad visual

Kubo busca una estética moderna, clara y lúdica, sin infantilizar la experiencia.

Paleta principal:

- Midnight Ink: `#111827`
- Graphite: `#232B36`
- Electric Lime: `#B7FF2A`
- Fresh Lime: `#D9FF6B`
- Soft Cloud: `#F5F7FA`
- Cool Gray: `#98A2B3`

Tipografías:

- Inter para texto general e interfaz.
- Manrope para títulos, logo y elementos destacados.

Criterios visuales:

- Cards limpias.
- Bordes redondeados.
- Alto contraste.
- Electric lime como acento principal.
- Gamificación sutil mediante rachas, XP, objetivos y progreso.
- Emojis usados como lenguaje visual en sidebar, decks y notificaciones.


## Rutas principales

| Ruta | Descripción |
|---|---|
| `/` | Login demo |
| `/login` | Redirige a `/` |
| `/dashboard` | Inicio del estudiante |
| `/materias` | Listado de materias/decks |
| `/materias/[slug]/estudiar` | Estudio por deck |
| `/materias/[slug]/editar` | Edición mock de deck |
| `/materias/psicologia-cognitiva` | Ruta legacy / redirección |
| `/estudiar/sesion` | Sesión diaria |
| `/perfil` | Perfil del usuario demo |

## Datos demo

Los datos mock están centralizados en `src/lib/mock-data.ts`.

Incluyen:

- Usuario demo.
- Decks.
- Cards.
- Sesión diaria.
- Progreso.
- Racha.
- Actividad reciente.
- Estadísticas.

Usuario demo: Andrés Demo.

Decks demo:

- Psicología Cognitiva
- Psicología Social

Métricas mock:

- Racha actual: 6 días
- Objetivo diario: 50 cards
- Cards pendientes hoy: 38
- Progreso de deck: 64%
- Cards demo: 128/200

## Estructura del proyecto

- `src/app`: rutas de Next.js.
- `src/components`: componentes reutilizables de UI.
- `src/lib`: datos mock, navegación y utilidades.

## Decisiones de UX/UI

Durante el desarrollo se priorizó que la app se sienta como un producto usable y no solo como una maqueta visual.

Decisiones principales:

- Separar el flujo de estudio del flujo de edición.
- Hacer que el dashboard comunique qué debe estudiar el usuario hoy.
- Diferenciar cards pendientes del objetivo diario.
- Completar el flujo de estudio hasta la sesión finalizada.
- Mantener una estética lúdica pero profesional.
- Usar gamificación como soporte de motivación, no como decoración excesiva.
- Centralizar los datos mock para facilitar el paso a datos reales.
- Mejorar responsive con sidebar en desktop y bottom navigation en mobile.


## Nota

Kubo todavía no es una aplicación productiva completa.

Es un prototipo frontend avanzado pensado para validar diseño, experiencia de usuario, navegación y flujo principal de estudio antes de pasar a backend, base de datos y usuarios reales.
