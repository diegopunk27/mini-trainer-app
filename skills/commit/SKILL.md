# Commit Guidelines - React Template Base

---

name: commit
description: >
Git commit conventions for React Template Base with task number extraction.
license: MIT
metadata:
author: template-team
version: "1.1.0"
scope: [root]
auto_invoke: - "Creating a git commit" - "Committing changes" - "git commit"
---

## Critical Rules

- ALWAYS extract task number from branch name automatically
- ALWAYS use format: `#NROTarea : TÍTULO DESCRIPTIVO EN MAYÚSCULAS`
- ALWAYS write title in UPPERCASE (Spanish)
- ALWAYS ask for user confirmation before committing
- NEVER commit without a task number (except for hotfixes)
- NEVER use `-n` flag unless user explicitly requests it
- NEVER use `git push --force` or `git push -f` (destructive, rewrites history)
- NEVER proactively offer to commit - wait for user to explicitly request it

---

## Commit Format

```
#NROTarea : TÍTULO DESCRIPTIVO DE LA FEATURE EN MAYÚSCULAS

Descripción detallada de los cambios globales realizados.
Explicar el "qué" y el "por qué" de los cambios.
```

### Extracting Task Number

The task number MUST be extracted automatically from the current branch name:

- Branch: `feature/1234-nueva-funcionalidad` → Task number: `1234`
- Branch: `bugfix/5678-correccion-error` → Task number: `5678`

### Title Guidelines

- **Language**: Always in Spanish
- **Case**: UPPERCASE
- **Content**: Describe the feature or fix clearly
- **Length**: Keep concise but descriptive

### Description Guidelines

- Explain what changed and why
- List main changes (3-5 bullet points recommended)
- Focus on business impact, not technical details
- Avoid redundant information

---

## Good vs Bad Examples

### Complete Commits

```
# GOOD - Clear and descriptive
#1234 : IMPLEMENTACIÓN DE MÓDULO DE INTERCAMBIO DE DIVISAS

Se agregó el nuevo módulo para gestionar el intercambio de divisas con las siguientes características:
- Controlador para procesar archivos XML de tasas de cambio
- Integración con el sistema de procesos existente
- Manejo de errores para casos de fallo en la carga

# GOOD - Bug fix with context
#5678 : CORRECCIÓN DE ERROR EN VALIDACIÓN DE ARCHIVOS

Se solucionó el problema de validación que permitía cargar archivos con formato incorrecto:
- Se agregaron validaciones adicionales para el formato XML
- Se mejoró el mensaje de error para el usuario
- Se añadieron pruebas para verificar el comportamiento correcto

# BAD - Missing context
#1234 : SE AGREGÓ NUEVA FUNCIONALIDAD

Se realizaron cambios.

# BAD - Too technical, not in uppercase
#1234 : Refactorizar método processXml() en línea 45

Cambié el código para usar async/await en lugar de callbacks.

# BAD - Missing task number
NUEVA FUNCIONALIDAD DE PROVEEDORES

Se agregó funcionalidad para proveedores.
```

---

## Workflow

1. **Check current state**

   ```bash
   git status
   git branch  # Verify current branch name
   git diff --stat HEAD
   ```

2. **Extract task number from branch**

   - If branch is `feature/1234-descripcion`, task number is `1234`
   - If branch is `bugfix/5678-descripcion`, task number is `5678`
   - If not in a feature/bugfix branch, ask user for task number

3. **Review recent commits for style**

   ```bash
   git log -3 --oneline
   ```

4. **Draft commit message**

   - Extract task number
   - Write concise title in UPPERCASE (Spanish)
   - Add detailed description of main changes

5. **Present to user for confirmation**

   - Show files to be committed
   - Show proposed message
   - Wait for explicit confirmation

6. **Execute commit**

   ```bash
   git add <files>
   git commit -m "$(cat <<'EOF'
   #1234 : TÍTULO DESCRIPTIVO EN MAYÚSCULAS

   Descripción detallada de los cambios.
   - Punto 1
   - Punto 2
   - Punto 3
   EOF
   )"
   ```

---

## Decision Tree

```
Is this a feature/bugfix branch?
├─ Yes → Extract task number from branch name
└─ No → Ask user for task number (or skip if hotfix)

Are there multiple significant changes?
├─ Yes → Include detailed description with bullet points
└─ No → Title only may be sufficient (but description recommended)

Is this a hotfix or emergency fix?
├─ Yes → May proceed without task number (with user approval)
└─ No → Task number is MANDATORY
```

---

## Special Cases

### Multiple Tasks in One Commit

If a commit addresses multiple tasks:

```
#1234, #5678 : TÍTULO DESCRIPTIVO EN MAYÚSCULAS

Descripción que menciona ambas tareas y cómo se relacionan.
```

### Hotfix Without Task Number

Only for emergencies:

```
HOTFIX: CORRECCIÓN CRÍTICA DE SEGURIDAD

Descripción del problema crítico y la solución aplicada.
```

### Merge Commits

Merge commits are handled by Git automatically. Do NOT modify merge commit messages.

---

## Commands

```bash
# Check current branch and extract task number
git branch --show-current

# View current changes
git status
git diff --stat HEAD

# Stage specific files (PREFERRED)
git add src/modules/supplier/supplier.service.ts
git add src/modules/supplier/supplier.controller.ts

# Stage all changes (use with caution)
git add .

# Create commit with multi-line message
git commit -m "$(cat <<'EOF'
#1234 : TÍTULO EN MAYÚSCULAS

Descripción detallada:
- Cambio 1
- Cambio 2
EOF
)"

# View recent commits
git log --oneline -5

# Amend last commit (same message)
git commit --amend --no-edit

# Amend last commit (new message)
git commit --amend -m "New message"
```

---

## Integration with Pre-commit Hooks

The project uses Husky pre-commit hooks that will:

1. Verify directory naming conventions
2. Run ESLint checks
3. Run Prettier formatting

If pre-commit fails:

- Fix the issues reported
- Stage the fixes
- Try committing again (do NOT use `--no-verify`)

---

## Co-Authoring

When pair programming or collaborating, add co-authors:

```
#1234 : TÍTULO DESCRIPTIVO EN MAYÚSCULAS

Descripción de los cambios realizados.

Co-authored-by: Nombre Apellido <email@project.com>
```

---

## Common Mistakes to Avoid

- ❌ Title in lowercase or mixed case
- ❌ Missing task number
- ❌ Using English instead of Spanish
- ❌ Too technical details in description
- ❌ Empty or vague descriptions
- ❌ Including file paths or line numbers
- ❌ Mixing changes from different tasks
- ❌ Using `git commit -m` with single line (use heredoc)
- ❌ Committing without testing changes
- ❌ Including sensitive data (.env files, credentials)

---

## Checklist Before Committing

- [ ] Branch name contains task number
- [ ] Task number extracted correctly
- [ ] Title is in UPPERCASE and Spanish
- [ ] Description explains "what" and "why"
- [ ] Relevant files are staged
- [ ] No sensitive data in commit
- [ ] Code follows project conventions
- [ ] Tests pass (if applicable)
- [ ] Pre-commit hooks will pass

---

**Remember**: A good commit message helps the team understand changes without reading the code. Write for your future self and teammates.
