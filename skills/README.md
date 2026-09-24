# AI Agent Skills - React Template Base

Este directorio contiene **Agent Skills** siguiendo el [estándar abierto Agent Skills](https://agentskills.io). Las skills proporcionan patrones específicos del dominio, convenciones y guías que ayudan a los asistentes de IA (Claude Code, OpenCode, Cursor, etc.) a entender los requerimientos específicos del proyecto.

---

## ¿Qué son las Skills?

[Agent Skills](https://agentskills.io) es un formato estándar abierto para extender las capacidades de agentes de IA con conocimiento especializado. Originalmente desarrollado por Anthropic y liberado como estándar abierto, ahora es adoptado por múltiples productos de agentes.

Las skills enseñan a los asistentes de IA cómo realizar tareas específicas. Cuando un agente carga una skill, obtiene contexto sobre:

- **Reglas críticas** (qué hacer SIEMPRE/NUNCA)
- **Patrones de código y convenciones**
- **Flujos de trabajo específicos del proyecto**
- **Referencias a documentación detallada**

---

## Setup

Ejecuta el script de setup para configurar las skills para todos los asistentes de IA compatibles:

```bash
./skills/setup.sh
```

Esto crea symlinks para que cada herramienta encuentre las skills en su ubicación esperada:

| Herramienta            | Symlink Creado    |
| ---------------------- | ----------------- |
| Claude Code / OpenCode | `.claude/skills/` |
| Codex (OpenAI)         | `.codex/skills/`  |
| GitHub Copilot         | `.github/skills/` |
| Gemini CLI             | `.gemini/skills/` |

Después de ejecutar el setup, **reinicia tu asistente de IA** para cargar las skills.

---

## Cómo Usar las Skills

Las skills son descubiertas automáticamente por el agente de IA. Para cargar manualmente una skill durante una sesión:

```
Read skills/{skill-name}/SKILL.md
```

**Las skills se auto-invocan** cuando realizas acciones específicas (ver tabla en `AGENTS.md`).

---

## Skills Disponibles

### Skills Específicas de el proyecto

| Skill        | Descripción                                                             |
| ------------ | ----------------------------------------------------------------------- |
| `project`    | Visión general del proyecto, stack tech, navegación de módulos          |
| `teaching`   | Modo enseñanza - explica decisiones y razonamientos                     |
| `naming`     | Convenciones de nombres de archivos/carpetas (validadas por pre-commit) |
| `components` | Patrones de componentes comunes, MUI integration, styling               |
| `hooks`      | Custom hooks estándar (useFetch, usePagination, useFormValidation)      |
| `modules`    | Estructura de módulos, contextos, organización de features              |
| `services`   | Servicios HTTP centralizados, private-http.service, API calls           |
| `commit`     | Convenciones de commits con extracción de número de tarea               |
| `pr`         | Creación de PRs y plantilla de descripción                              |

### Skills Planificadas (Fase 3)

- `typescript` - Convenciones específicas de TypeScript
- `react-19` - Patrones avanzados de React 18
- `material-ui` - Patrones MUI y theming
- `vitest` - Testing patterns
- `ag-grid` - Configuración avanzada de AG Grid

---

## Estructura de Directorios

```
skills/
├── {skill-name}/
│   ├── SKILL.md              # Requerido - instrucciones y metadata
│   ├── scripts/              # Opcional - código ejecutable
│   ├── assets/               # Opcional - templates, esquemas, recursos
│   └── references/           # Opcional - enlaces a docs locales
└── README.md                 # Este archivo
```

---

## ¿Por qué Secciones de Auto-invoke?

**Problema**: Los asistentes de IA (Claude, Gemini, etc.) no invocan skills de forma confiable incluso cuando el `Trigger:` en la descripción de la skill coincide con la solicitud del usuario. Tratan las sugerencias de skills como "ruido de fondo" y avanzan con su enfoque predeterminado.

**Solución**: El archivo `AGENTS.md` contiene una sección **Auto-invoke Skills** que explícitamente ordena al agente: "Cuando realices la acción X, SIEMPRE invoca la skill Y PRIMERO." Este es un [workaround conocido](https://scottspence.com/posts/claude-code-skills-dont-auto-activate) que fuerza al agente a cargar las skills.

---

## Creando Nuevas Skills

### Quick Checklist

1. Crear directorio: `skills/{skill-name}/`
2. Agregar `SKILL.md` con frontmatter requerido
3. Agregar campos `metadata.scope` y `metadata.auto_invoke`
4. Mantener contenido conciso (menos de 500 líneas)
5. Referenciar docs existentes en lugar de duplicar
6. Agregar a tabla de skills en `AGENTS.md`
7. Actualizar tabla de auto-invoke en `AGENTS.md`

### Formato de SKILL.md

```markdown
# Título de la Skill

---

name: skill-name
description: >
Descripción breve de qué hace la skill.
Trigger: Cuándo se debe invocar esta skill.
license: MIT
metadata:
author: template-team
version: "1.0.0"
scope: [root]
auto_invoke: - "Acción que invoca esta skill" - "Otra acción que invoca esta skill"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep

---

## Critical Rules

- ✅ ALWAYS ...
- ❌ NEVER ...

## [Resto del contenido]
```

---

## Principios de Diseño

- **Conciso**: Solo incluir lo que el agente no sabe ya
- **Divulgación progresiva**: Apuntar a docs detalladas, no duplicar
- **Reglas críticas primero**: Liderar con patrones ALWAYS/NEVER
- **Ejemplos mínimos**: Mostrar patrones, no tutoriales

---

## Skills en Acción

### Ejemplo 1: Creando un Componente

**Sin skill de teaching:**

```typescript
// Created SupplierCard component
export const SupplierCard = ({ supplier }: Props) => {
  return <Card>...</Card>
}
```

**Con skill de teaching:**

```typescript
/**
 * SupplierCard - Componente reutilizable para mostrar tarjetas de proveedores.
 *
 * Razón: Abstraemos la UI de tarjeta para reutilizar en SupplierList y SupplierSearch,
 * evitando duplicación (DRY) y facilitando cambios futuros en el diseño.
 *
 * Patrón: Sigue la estructura de componentes comunes en /modules/common/components/
 */
export const SupplierCard = ({ supplier }: SupplierCardProps) => {
  return <Card>...</Card>
}
```

### Ejemplo 2: Creando un Archivo

**Sin skill de naming:**

```
Creando archivo: genericTable.tsx
❌ Commit falla en pre-commit (nombre incorrecto)
```

**Con skill de naming:**

```
Creando archivo: GenericTable.tsx (PascalCase, componente React)
✅ Pasa validación de naming-checker.mjs
```

---

## Recursos

- [Agent Skills Standard](https://agentskills.io) - Especificación del estándar abierto
- [Agent Skills GitHub](https://github.com/anthropics/skills) - Ejemplos de skills
- [Claude Code Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) - Guía de autoría de skills
- [AGENTS.md](../AGENTS.md) - Reglas generales para agentes de IA

---

## Contribuyendo

Al agregar o modificar skills:

1. **Mantén concisión** - Solo información esencial
2. **Explica el "por qué"** - No solo el "qué" o "cómo"
3. **Usa ejemplos** - Muestra buenos vs malos patrones
4. **Actualiza AGENTS.md** - Agrega a tablas de skills y auto-invoke
5. **Sigue el formato** - Usa el frontmatter correcto

---

## Mantenimiento

- **Revisar skills** regularmente para mantenerlas actualizadas
- **Eliminar skills obsoletas** cuando ya no sean relevantes
- **Actualizar ejemplos** cuando cambien los patrones del proyecto
- **Agregar skills nuevas** cuando emerjan patrones comunes

---

**Recuerda**: Las skills son documentación viva. Evolucionan con el proyecto y deben reflejar las mejores prácticas actuales.

Para preguntas o sugerencias sobre skills, contacta al equipo de el proyecto.
