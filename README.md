# Kubo

Kubo es un MVP frontend de una aplicación de estudio basada en flashcards gamificadas para estudiantes universitarios.

La idea del producto es combinar una experiencia tipo Anki con una interfaz más moderna, simple y visual, incorporando progreso, rachas, materias y repetición espaciada.

> Estado actual: MVP visual con datos mock. Todavía no tiene backend, base de datos ni autenticación real.

## Objetivo del proyecto

El objetivo inicial de Kubo es validar una experiencia simple para que estudiantes puedan:

- Organizar materias.
- Ver progreso por materia.
- Estudiar con flashcards.
- Mantener una racha de estudio.
- Avanzar con una experiencia visual y gamificada.

## Funcionalidades actuales

- Pantalla de login demo.
- Dashboard principal del estudiante.
- Sidebar de navegación.
- Página de materias.
- Modal visual para agregar una nueva materia.
- Página de perfil.
- Vista inicial de estudio para una materia.
- Datos mock para simular progreso, cards y racha.
- Diseño responsive básico.
- Identidad visual propia con logo, favicon, colores y tipografías.

## Stack actual

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- CSS tokens con Tailwind v4
- Componentes UI reutilizables básicos

## Identidad visual

Paleta principal:

- Midnight Ink: #111827
- Graphite: #232B36
- Electric Lime: #B7FF2A
- Fresh Lime: #D9FF6B
- Soft Cloud: #F5F7FA
- Cool Gray: #98A2B3

Tipografías:

- Inter para texto general e interfaz.
- Manrope para títulos, logo y elementos destacados.

## Rutas actuales

- `/` — Login demo
- `/dashboard` — Inicio del estudiante
- `/materias` — Materias del estudiante
- `/materias/psicologia-cognitiva` — Vista de estudio de una materia
- `/perfil` — Perfil del usuario demo

## Datos demo

Actualmente el proyecto usa información hardcodeada para mostrar la experiencia inicial:

- Usuario demo: Andres Demo
- Carrera: Psicologia
- Materias:
  - Psicologia Cognitiva
  - Psicologia Social
- Racha: 6 dias
- Progreso de deck: 64%
- Cards demo: 128/200

## Próximos pasos posibles

- Conectar base de datos PostgreSQL en Neon.
- Agregar autenticación real.
- Persistir materias y flashcards.
- Crear sistema real de decks.
- Implementar lógica de repetición espaciada.
- Integrar OpenAI para generar flashcards desde apuntes.
- Desplegar en Vercel.

## Instalación local

Clonar el proyecto:

```bash
git clone https://github.com/javierllorente-HWorld/kubo.git
