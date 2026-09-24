# Pull Request Guidelines - React Template Base

---

name: pr
description: >
Pull Request creation and conventions for React Template Base (Spanish template, task number extraction). Use when: Creating PRs, generating PR descriptions, or working with pull request templates.
license: MIT
metadata:
author: template-team
version: "2.0.0"
scope: [root]
auto_invoke: - "Create a PR with gh pr create" - "Creating a pull request" - "Generating PR description" - "Filling pull request template" - "gh pr create"
---

## Critical Rules

- ALWAYS verify that `src/modules/auth/pages/LoginPage.tsx` is NOT modified; if modified, REPORT IT immediately (it is often edited to bypass Active Directory for local testing)
- ALWAYS analyze ALL commits from branch divergence, not just the latest commit
- ALWAYS use `git diff development` (or target branch) to see full changes
- ALWAYS extract task number from branch name for PR title
- ALWAYS generate description in Spanish
- ALWAYS focus on "what" and "why", not "how"
- NEVER include implementation details or technical specifics in the description
- NEVER exceed the maximum points specified for each section
- ALWAYS ask for user confirmation before creating PR

---

## PR Creation Process

1. **Identify target branch** (usually `development`)
2. **Verify LoginPage.tsx is not modified** (see Pre-flight Check below)
3. **Analyze ALL changes** since branch divergence
4. **Extract task number** from current branch name
5. **Understand context** from User Story if provided
6. **Generate PR description** following template
7. **Create PR** with `gh pr create`

---

## PR Template Structure

```markdown
# #NROTarea Título Descriptivo

## Motivo de cambio

[Explicar brevemente qué se está haciendo y por qué.
Máximo 3 líneas.
Usar contexto de la US si está disponible.]

## Cambios realizados

- [Cambio principal 1]
- [Cambio principal 2]
- [Cambio principal 3]
- [Cambio principal 4]
- [Cambio principal 5]

[Máximo 5 puntos. Enfocarse en el "qué", no en el "cómo".
Evitar detalles técnicos innecesarios.]

## Impacto

- [Impacto en el usuario final 1]
- [Impacto en el usuario final 2]

[Máximo 2 puntos. Basarse en el contexto de la US.]

## Archivos clave

- `ruta/archivo1.ts`: Descripción breve del cambio
- `ruta/archivo2.ts`: Descripción breve del cambio
- `ruta/archivo3.ts`: Descripción breve del cambio
- `ruta/archivo4.ts`: Descripción breve del cambio
- `ruta/archivo5.ts`: Descripción breve del cambio

[Máximo 5 archivos. Solo los más relevantes.]

## Tareas relacionadas

#123, #456

[Listar números de tarea de los commits que comienzan con #NRO]
```

---

## Detailed Workflow

### Step 1: Identify Target Branch

```bash
# Usually targeting development
TARGET_BRANCH="development"

# Verify current branch
git branch --show-current

# Example: feature/1234-nueva-funcionalidad
```

### Step 2: Pre-flight Check - LoginPage.tsx

**CRITICAL**: Before creating or describing a PR, verify that `LoginPage.tsx` has NOT been modified. This file is commonly edited to bypass Active Directory for local testing, and such changes must never reach the PR.

```bash
# Check if LoginPage.tsx is modified (staged or unstaged)
git diff development -- src/modules/auth/pages/LoginPage.tsx
git diff --cached -- src/modules/auth/pages/LoginPage.tsx

# Or check if it appears in changed files
git diff --name-only development | grep -i LoginPage
```

**If modified**: STOP and REPORT to the user:

- "⚠️ **LoginPage.tsx está modificado**. Este archivo suele editarse para bypass de Active Directory en pruebas locales. Debe revertirse antes de crear el PR: `git checkout development -- src/modules/auth/pages/LoginPage.tsx`"

### Step 3: Analyze Changes

```bash
# View ALL commits since divergence
git log development..HEAD --oneline

# View complete diff
git --no-pager diff development

# View file statistics
git diff --stat development
```

**IMPORTANT**: Analyze ALL commits, not just the latest one. Understand the full scope of changes.

### Step 4: Extract Task Number

From branch name:

- `feature/1234-descripcion` → Task: `1234`
- `bugfix/5678-descripcion` → Task: `5678`

### Step 5: Understand Context (If User Story Provided)

If the user provides User Story text:

- Extract requirements and acceptance criteria
- Identify business need being addressed
- Understand expected impact on end users
- Use this context to enrich PR sections

### Step 6: Generate PR Description

#### **Motivo de cambio** (Max 3 lines)

Focus on:

- **What** is being done
- **Why** it's needed
- Business problem being solved

Use User Story context if available.

Example:

```
Se identificó la necesidad de optimizar el consumo de recursos durante
la generación de PDFs para usuarios concurrentes, ya que el sistema
actual no puede manejar eficientemente múltiples solicitudes simultáneas.
```

#### **Cambios realizados** (Max 5 points)

List main changes focusing on **what**, not **how**:

- New features added
- Systems integrated
- Configurations updated
- Validations implemented

Avoid technical details like specific parameters or line numbers.

Example:

```
- Migración a imágenes Docker más livianas
- Implementación de sistema de archivos temporales
- Optimización de parámetros de Puppeteer
- Actualización de configuración de Swagger
```

#### **Impacto** (Max 2 points)

Describe impact on end users:

- Performance improvements
- New capabilities
- Better user experience
- Increased reliability

Base this on User Story context.

Example:

```
- Reducción del tiempo de generación de PDFs
- Mayor estabilidad en entornos de producción
```

#### **Archivos clave** (Max 5 files)

List only the most relevant files with brief descriptions:

Example:

```
- `src/pdf-generator/pdf.service.ts`: Optimización de generación
- `docker/Dockerfile.prod`: Configuración de contenedores
- `src/config/puppeteer.config.ts`: Parámetros optimizados
```

#### **Tareas relacionadas**

Extract task numbers from all commits that start with `#`:

```bash
git log development..HEAD --pretty=format:"%s" | grep -oP '#\d+' | sort -u
```

---

## Complete Example

### Example 1: Performance Optimization

```markdown
# #64387 Optimización de Rendimiento en Generación de PDFs

## Motivo de cambio

Se identificó la necesidad de optimizar el consumo de recursos durante
la generación de PDFs para usuarios concurrentes, ya que el sistema
actual no puede manejar eficientemente múltiples solicitudes simultáneas.

## Cambios realizados

- Migración a imágenes Docker más livianas
- Implementación de sistema de archivos temporales
- Optimización de parámetros de Puppeteer
- Actualización de configuración de Swagger

## Impacto

- Reducción del tiempo de generación de PDFs
- Mayor estabilidad en entornos de producción

## Archivos clave

- `src/pdf-generator/pdf.service.ts`: Optimización de generación
- `docker/Dockerfile.prod`: Configuración de contenedores
- `src/config/puppeteer.config.ts`: Parámetros optimizados

## Tareas relacionadas

#64387
```

### Example 2: New Feature

```markdown
# #1234 Módulo de Gestión de Proveedores

## Motivo de cambio

Se requiere un módulo completo para gestionar el ciclo de vida de
proveedores, desde su registro hasta su aprobación, para centralizar
la información y facilitar el proceso de onboarding.

## Cambios realizados

- Implementación de módulo de proveedores con CQRS
- Sistema de workflow de aprobación multi-nivel
- Integración con Azure AD para autenticación
- Endpoints para carga y descarga de documentos en S3
- Tests E2E para todos los endpoints

## Impacto

- Reducción del tiempo de onboarding de proveedores
- Mayor trazabilidad en el proceso de aprobación

## Archivos clave

- `src/modules/supplier/supplier.module.ts`: Módulo principal
- `src/modules/supplier/commands/create-supplier/`: Lógica de creación
- `src/modules/supplier/controllers/supplier.controller.ts`: Endpoints
- `src/modules/supplier-approval/supplier-approval.service.ts`: Workflow
- `src/modules/supplier/tests/create-supplier.e2e.spec.ts`: Tests

## Tareas relacionadas

#1234, #1235, #1236
```

---

## Creating the PR

### Using GitHub CLI

```bash
# Create PR with heredoc for proper formatting
gh pr create --title "#1234 Título Descriptivo" --body "$(cat <<'EOF'
# #1234 Título Descriptivo

## Motivo de cambio

[Descripción...]

## Cambios realizados

- [Cambio 1]
- [Cambio 2]

## Impacto

- [Impacto 1]

## Archivos clave

- `archivo.ts`: Descripción

## Tareas relacionadas

#1234
EOF
)"

# Create draft PR (for work in progress)
gh pr create --draft --title "WIP: #1234 Título" --body "..."

# View PR in browser
gh pr view --web
```

---

## Important Considerations

### Language

- **All PR content**: Spanish
- **Code/Technical terms**: Keep in English (e.g., "controller", "repository")

### Conciseness

- Keep focused and avoid redundancy
- Prioritize clarity over detail
- Remove unnecessary information

### User Story Context

If User Story text is provided:

- Use it to understand business need
- Identify real impact on users
- Prioritize changes based on US requirements
- Reference US in "Motivo de cambio"

### Azure DevOps Compatibility

- Use markdown formatting compatible with Azure DevOps
- Test rendering if possible
- Ensure task links work correctly

---

## Commands Reference

```bash
# Check current state
git status
git branch --show-current

# Verify LoginPage.tsx is NOT modified (pre-flight)
git diff development -- src/modules/auth/pages/LoginPage.tsx

# View commits since divergence
git log development..HEAD --oneline
git log --graph --oneline development..HEAD

# View complete diff
git --no-pager diff development

# View file changes
git diff --stat development
git diff --name-only development

# Extract task numbers from commits
git log development..HEAD --pretty=format:"%s" | grep -oP '#\d+' | sort -u

# Create PR
gh pr create --title "..." --body "..."

# View PR
gh pr view
gh pr view --web

# Edit PR
gh pr edit <number>
```

---

## Integration with Azure DevOps

The PR will be reviewed on:

- **GitHub**: For code review and CI checks
- **Azure DevOps**: For tracking and project management

Ensure:

- Task numbers match Azure DevOps work items
- PR links to correct tasks
- Description provides context for reviewers

---

## PR Title Format

```
#NROTarea Título Descriptivo
```

- **Task number**: From branch name
- **Title**: Concise description (max 10 words)
- **Language**: Spanish
- **Case**: Title Case (capitalize first letter of main words)

Examples:

```
#1234 Implementación de Módulo de Proveedores
#5678 Corrección de Error en Validación de Archivos
#9012 Optimización de Consultas de Base de Datos
```

---

## Before Creating PR

Checklist:

- [ ] **LoginPage.tsx is NOT modified** (common bypass for local AD testing—must be reverted if present)
- [ ] All commits follow commit conventions
- [ ] Branch is up to date with target branch
- [ ] All tests pass locally
- [ ] Linting passes
- [ ] No merge conflicts
- [ ] Task number extracted correctly
- [ ] PR description is complete and concise
- [ ] Files staged and committed properly
- [ ] No sensitive data in commits

---

## After Creating PR

1. **Verify PR** was created correctly
2. **Share PR URL** with team if needed
3. **Monitor CI checks** (GitHub Actions)
4. **Address review comments** promptly
5. **Update PR** if requested
6. **Squash and merge** to development when approved

---

## Common Mistakes to Avoid

- ❌ Including modified LoginPage.tsx (bypass de Active Directory para pruebas locales)
- ❌ Not analyzing all commits (only looking at last one)
- ❌ Including technical implementation details
- ❌ Exceeding maximum points per section
- ❌ Missing task number in title
- ❌ Creating PR without running tests
- ❌ Not waiting for user confirmation
- ❌ Hardcoding values in description
- ❌ Including file paths in "Cambios realizados"
- ❌ Copying commit messages directly to PR
- ❌ Not using User Story context when available

---

**Remember**: The PR description is for reviewers and stakeholders to understand the value and scope of changes without reading the code. Write clearly and focus on business value.
