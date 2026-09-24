# Path Aliases

Configurados en `tsconfig.json` y `vite.config.ts`.

---

## Usage

```typescript
import { GenericTable } from '@common/components/GenericTable';
import { useFetch } from '@common/hooks/useFetch';
import { getData } from '@common/services/http/private-http.service';
```

---

## Available Aliases

| Alias                  | Maps To                                   |
| ---------------------- | ----------------------------------------- |
| `@common/*`            | `./src/modules/common/*`                  |
| `@common-components/*` | `./src/modules/common/components/*`       |
| `@common-hooks/*`      | `./src/modules/common/hooks/*`            |
| `@common-services/*`   | `./src/modules/common/services/*`         |
| `@common-interfaces/*` | `./src/modules/common/interfaces/local/*` |
| `@theme/*`             | `./src/modules/common/theme/*`            |
| `@assets/*`            | `./src/assets/*`                          |
| `@global-contexts/*`   | `./src/modules/global/contexts/*`         |
| `@global-pages/*`      | `./src/modules/global/pages/*`            |
| `@routes/*`            | `./src/routes/*`                          |
| `@utils/*`             | `./src/utils/*`                           |

Al crear un modulo nuevo, agregar el alias en `tsconfig.json` **y** `vite.config.ts`.
