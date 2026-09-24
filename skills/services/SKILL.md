# HTTP Services - React Template Base

---

name: services
description: >
HTTP service patterns and API communication guidelines for React Template Base. Covers private-http.service usage, API calls, error handling, and service layer best practices.
license: MIT
metadata:
author: template-team
version: "1.0.0"
scope: [root]
auto_invoke: - "Making API calls" - "Creating a service" - "HTTP requests" - "Calling the API" - "POST request" - "GET request" - "Working with private-http.service"
---

## Critical Rules

### Service Usage

- ✅ **ALWAYS** use `private-http.service` for API calls (never raw axios/fetch)
- ✅ **ALWAYS** use TypeScript generics to type responses
- ✅ **ALWAYS** create module-specific services in `/services/` directory
- ✅ **ALWAYS** use relative URLs (base URL comes from `VITE_API_URL`)
- ✅ **ALWAYS** handle errors with try/catch or let hooks handle them
- ✅ **ALWAYS** use `useFetch` for GET requests (SWR caching)
- ❌ **NEVER** make direct axios/fetch calls (bypasses auth, tracking, error handling)
- ❌ **NEVER** hardcode full URLs (use env variables)
- ❌ **NEVER** handle auth tokens manually (interceptor does it)
- ❌ **NEVER** create services without explaining the pattern (teaching mode)

---

## Private HTTP Service

**Ubicación:** `src/modules/common/services/http/private-http.service.ts`

**Propósito:** Servicio centralizado para todas las llamadas HTTP con:

- Autenticación automática (Bearer token)
- Promise tracking para loading states
- Type safety con TypeScript generics
- URL building automático desde env variables

---

## Available Functions

### 1. getData<T> - GET Requests

**Firma:**

```typescript
getData<T>(
  url: string,
  config?: AxiosRequestConfig,
  useTrack?: boolean,        // default: true
  delayMs?: number,          // default: 0
  baseURL?: string           // default: VITE_API_URL
): Promise<T>
```

**Uso básico:**

```typescript
import { getData } from '@common/services/http/private-http.service';
import { Supplier } from '../interfaces/supplier.interface';

// Simple GET
const suppliers = await getData<Supplier[]>('/api/suppliers');

// Con parámetros de query
const filteredSuppliers = await getData<Supplier[]>('/api/suppliers', {
  params: { status: 'active', page: 1, limit: 10 },
});

// Sin tracking (no muestra spinner global)
const data = await getData<Supplier[]>('/api/suppliers', {}, false);

// Con delay artificial (testing)
const data = await getData<Supplier[]>('/api/suppliers', {}, true, 2000);
```

**Por qué getData:**

- Automáticamente agrega Bearer token del localStorage
- Trackea promise para mostrar spinners globales
- Construye URL completa desde `VITE_API_URL`
- Type-safe con generics

**Cuándo usar:**

- ❌ **NO usar** en componentes (usar `useFetch` hook)
- ✅ Usar en services del módulo
- ✅ Usar en funciones utilitarias
- ✅ Usar en event handlers (onClick, onSubmit)

---

### 2. postData<T> - POST Requests

**Firma:**

```typescript
postData<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
  useTrack?: boolean,        // default: true
  baseURL?: string
): Promise<T>
```

**Uso:**

```typescript
import { postData } from '@common/services/http/private-http.service';
import { Supplier, SupplierFormData } from '../interfaces/supplier.interface';

// Crear un supplier
const newSupplier = await postData<Supplier>('/api/suppliers', {
  name: 'Acme Corp',
  email: 'contact@acme.com',
  phone: '+56912345678',
});

// Con headers custom
const response = await postData<ResponseType>('/api/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
```

**Por qué postData:**

- Auto-tracking de loading state
- Bearer token automático
- Manejo de errors centralizado
- Type-safe response

---

### 3. putData<T> - PUT Requests

**Firma:**

```typescript
putData<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
  useTrack?: boolean,
  baseURL?: string
): Promise<T>
```

**Uso:**

```typescript
import { putData } from '@common/services/http/private-http.service';

// Actualizar supplier completo
const updatedSupplier = await putData<Supplier>(`/api/suppliers/${id}`, {
  name: 'Updated Name',
  email: 'new@email.com',
  phone: '+56987654321',
});
```

**Cuándo usar PUT vs PATCH:**

- **PUT**: Reemplazar recurso completo
- **PATCH**: Actualizar campos específicos

---

### 4. patchData<T> - PATCH Requests

**Firma:**

```typescript
patchData<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
  useTrack?: boolean,
  baseURL?: string
): Promise<T>
```

**Uso:**

```typescript
import { patchData } from '@common/services/http/private-http.service';

// Actualizar solo el status
const updatedSupplier = await patchData<Supplier>(`/api/suppliers/${id}`, { status: 'APPROVED' });
```

---

### 5. deleteData<T> - DELETE Requests

**Firma:**

```typescript
deleteData<T>(
  url: string,
  config?: AxiosRequestConfig,
  useTrack?: boolean,
  baseURL?: string
): Promise<T>
```

**Uso:**

```typescript
import { deleteData } from '@common/services/http/private-http.service';

// Eliminar supplier
await deleteData(`/api/suppliers/${id}`);

// Con respuesta tipada
const response = await deleteData<{ message: string; deletedId: string }>(`/api/suppliers/${id}`);
```

---

### 6. getBlobData - Binary Data (Files)

**Firma:**

```typescript
getBlobData(
  url: string,
  config?: AxiosRequestConfig,
  useTrack?: boolean,
  baseURL?: string
): Promise<Blob>
```

**Uso:**

```typescript
import { getBlobData } from '@common/services/http/private-http.service';

// Descargar archivo
const blob = await getBlobData('/api/reports/download/report.pdf');

// Crear download link
const url = window.URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'report.pdf';
link.click();
window.URL.revokeObjectURL(url);

// O con URL absoluta (externa)
const externalBlob = await getBlobData('https://external-api.com/file.pdf');
```

**Por qué getBlobData:**

- Maneja `responseType: 'blob'` automáticamente
- Soporta URLs relativas y absolutas
- Útil para descargas de archivos, PDFs, imágenes

---

## Creating Module Services

### Service Layer Pattern

**Propósito:** Encapsular llamadas a la API en funciones reutilizables.

**Estructura:**

```
modules/{module-name}/services/
└── {module-name}.service.ts
```

**Template:**

```typescript
// modules/suppliers/services/supplier.service.ts
import {
  getData,
  postData,
  putData,
  patchData,
  deleteData,
} from '@common/services/http/private-http.service';
import { Supplier, SupplierFormData } from '../interfaces/supplier.interface';

/**
 * Get all suppliers with optional filters
 */
export const getSuppliers = (params?: { status?: string; page?: number; limit?: number }) => {
  return getData<{ results: Supplier[]; count: number }>('/api/suppliers', { params });
};

/**
 * Get single supplier by ID
 */
export const getSupplierById = (id: string) => {
  return getData<Supplier>(`/api/suppliers/${id}`);
};

/**
 * Create new supplier
 */
export const createSupplier = (data: SupplierFormData) => {
  return postData<Supplier>('/api/suppliers', data);
};

/**
 * Update supplier completely
 */
export const updateSupplier = (id: string, data: SupplierFormData) => {
  return putData<Supplier>(`/api/suppliers/${id}`, data);
};

/**
 * Update supplier partially
 */
export const updateSupplierStatus = (id: string, status: string) => {
  return patchData<Supplier>(`/api/suppliers/${id}`, { status });
};

/**
 * Delete supplier
 */
export const deleteSupplier = (id: string) => {
  return deleteData(`/api/suppliers/${id}`);
};

/**
 * Upload supplier documents
 */
export const uploadSupplierDocuments = (id: string, files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  return postData<{ uploadedFiles: string[] }>(`/api/suppliers/${id}/documents`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
```

**Por qué service layer:**

- **Centralización**: Todos los endpoints en un solo lugar
- **Documentación**: JSDoc documenta cada función
- **Reutilización**: Misma función en múltiples componentes
- **Testeable**: Fácil mockear servicios
- **Refactoring**: Cambios en API solo afectan service, no componentes
- **Type Safety**: Tipos claramente definidos

---

## Usage Patterns

### Pattern 1: useFetch for GET Requests (Recommended)

**Para consultas (GET) que necesitan caching y revalidación:**

```typescript
import { useFetch } from '@common/hooks/useFetch'
import { getSuppliers } from '../services/supplier.service'

const SupplierList = () => {
  const { data, error, isLoading, mutate } = useFetch(
    () => '/api/suppliers',
    () => getSuppliers({ status: 'active' })
  )

  if (isLoading) return <Spinner />
  if (error) return <Error />

  return (
    <GenericTable
      data={data?.results}
      onRefresh={() => mutate()}  // Manual revalidation
    />
  )
}
```

**Por qué useFetch:**

- SWR caching (no re-fetch innecesarios)
- Revalidación automática
- Loading/error states built-in
- Deduplicación de requests

---

### Pattern 2: Direct Service Call for Mutations

**Para mutations (POST, PUT, PATCH, DELETE):**

```typescript
import { toast } from 'react-toastify'
import { createSupplier } from '../services/supplier.service'

const SupplierForm = () => {
  const handleSubmit = async (formData: SupplierFormData) => {
    try {
      const newSupplier = await createSupplier(formData)
      toast.success('Proveedor creado exitosamente')
      navigate(`/suppliers/${newSupplier.id}`)
    } catch (error) {
      toast.error('Error al crear proveedor')
      console.error(error)
    }
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

**Por qué direct call:**

- Mutations no necesitan caching
- Control directo de success/error
- Simpler que `useHTTPMutation` para casos básicos

---

### Pattern 3: useHTTPMutation Hook (Optional)

**Para mutations con loading state automático:**

```typescript
import { useHTTPMutation } from '@common/hooks/useHTTPMutation'
import { createSupplier } from '../services/supplier.service'

const SupplierForm = () => {
  const { mutate, isLoading, error } = useHTTPMutation(createSupplier)

  const handleSubmit = async (formData: SupplierFormData) => {
    const result = await mutate(formData)
    if (result) {
      toast.success('Proveedor creado')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar'}
      </Button>
    </form>
  )
}
```

**Por qué useHTTPMutation:**

- Loading state automático
- Error handling consistente
- Menos boilerplate

---

## Authentication Flow

### How Tokens Work

**1. Login stores token:**

```typescript
// modules/auth/pages/Login.tsx
const handleLogin = async (credentials) => {
  const { token, user } = await postData('/api/auth/login', credentials);

  // Store in localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};
```

**2. Interceptor adds token automatically:**

```typescript
// private-http.service.ts (ya implementado)
client.interceptors.request.use((config) => {
  const token = getToken(); // Reads from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**3. Every request includes Bearer token:**

```typescript
// No necesitas hacer nada, el interceptor lo maneja
const suppliers = await getData('/api/suppliers');
// Request includes: Authorization: Bearer {token}
```

**4. Logout clears tokens:**

```typescript
import { clearAuthenticationKeys } from '@common/services/http/private-http.service';

const handleLogout = () => {
  clearAuthenticationKeys(); // Removes token and user from localStorage
  navigate('/login');
};
```

**Por qué este patrón:**

- **Automático**: No necesitas pasar token manualmente
- **Centralizado**: Un solo lugar para manejar auth
- **Seguro**: Token no expuesto en código

---

## Error Handling Patterns

### Pattern 1: Let useFetch Handle Errors

```typescript
const { data, error } = useFetch(...)

if (error) {
  return <ErrorDisplay error={error} />  // useFetch ya llamó useErrorHandler
}
```

**Por qué:**

- `useFetch` hook automáticamente usa `useErrorHandler`
- Toasts de error mostrados automáticamente
- Consistencia en manejo de errores

---

### Pattern 2: Try/Catch for Mutations

```typescript
const handleDelete = async (id: string) => {
  try {
    await deleteSupplier(id);
    toast.success('Proveedor eliminado');
    mutate(); // Revalidar lista
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error al eliminar');
    console.error(error);
  }
};
```

**Por qué:**

- Control granular de errores
- Mensajes específicos al contexto
- Logging de errores

---

### Pattern 3: useErrorHandler Hook

```typescript
import { useErrorHandler } from '@common/hooks/useHandleError';

const Component = () => {
  const handleError = useErrorHandler();

  const fetchData = async () => {
    try {
      await getData('/api/endpoint');
    } catch (error) {
      handleError(error); // Shows toast automatically
    }
  };
};
```

**Por qué:**

- Toasts consistentes
- Logging centralizado
- Menos boilerplate

---

## Environment Variables

### VITE_API_URL

**Configuración en `.env`:**

```bash
VITE_API_URL=https://api.project.com
```

**Uso automático:**

```typescript
// No necesitas hacer nada, private-http.service lo usa automáticamente
const data = await getData('/api/suppliers');
// → Requests to: https://api.project.com/api/suppliers
```

**Override baseURL (raro):**

```typescript
// Para APIs externas
const externalData = await getData(
  '/endpoint',
  {},
  true,
  0,
  'https://external-api.com', // Custom base URL
);
```

**Por qué env variables:**

- Diferentes URLs por entorno (dev, staging, prod)
- No hardcodear URLs en código
- Fácil cambiar sin recompilar

---

## Promise Tracking

### How It Works

**1. Todas las requests son tracked por defecto:**

```typescript
const data = await getData('/api/suppliers'); // useTrack = true
// → Shows global spinner via react-promise-tracker
```

**2. Deshabilitar tracking (opcional):**

```typescript
const data = await getData('/api/suppliers', {}, false); // useTrack = false
// → No global spinner
```

**3. Spinner global integrado:**

```typescript
import { usePromiseTracker } from 'react-promise-tracker'

const GlobalSpinner = () => {
  const { promiseInProgress } = usePromiseTracker()

  if (!promiseInProgress) return null

  return <Spinner />
}
```

**Por qué promise tracking:**

- Loading state global automático
- No necesitas useState para cada request
- UX consistente (mismo spinner)

---

## File Upload Pattern

### Uploading Files

```typescript
import { postData } from '@common/services/http/private-http.service'

const handleFileUpload = async (files: File[]) => {
  const formData = new FormData()

  files.forEach(file => {
    formData.append('files', file)
  })

  // Optional: Add metadata
  formData.append('metadata', JSON.stringify({ category: 'documents' }))

  try {
    const response = await postData<{ uploadedFiles: string[] }>(
      '/api/upload',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    toast.success(`${response.uploadedFiles.length} archivos subidos`)
  } catch (error) {
    toast.error('Error al subir archivos')
  }
}

// En el componente
<input
  type="file"
  multiple
  onChange={(e) => {
    if (e.target.files) {
      handleFileUpload(Array.from(e.target.files))
    }
  }}
/>
```

**Por qué FormData:**

- Standard para multipart/form-data
- Soporta múltiples archivos
- Backend puede parsear fácilmente

---

## File Download Pattern

### Downloading Files

```typescript
import { getBlobData } from '@common/services/http/private-http.service'

const handleDownload = async (fileId: string, filename: string) => {
  try {
    const blob = await getBlobData(`/api/files/${fileId}`)

    // Create download link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()

    // Cleanup
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    toast.success('Archivo descargado')
  } catch (error) {
    toast.error('Error al descargar archivo')
  }
}

// En el componente
<Button onClick={() => handleDownload('123', 'report.pdf')}>
  Descargar
</Button>
```

**Por qué Blob:**

- Binary data handling
- Soporta cualquier tipo de archivo
- No requiere abrir nueva ventana

---

## Common Patterns

### Pagination

```typescript
export const getSuppliers = (page: number = 1, limit: number = 10) => {
  return getData<{ results: Supplier[]; count: number }>('/api/suppliers', {
    params: { page, limit },
  });
};

// Uso
const { data } = useFetch(
  () => `/api/suppliers?page=${currentPage}&limit=${limit}`,
  () => getSuppliers(currentPage, limit),
);
```

---

### Filtering

```typescript
export const getSuppliers = (filters: {
  status?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}) => {
  return getData<Supplier[]>('/api/suppliers', { params: filters });
};

// Uso
const { data } = useFetch(
  () => `/api/suppliers?${JSON.stringify(filters)}`,
  () => getSuppliers(filters),
);
```

---

### Sorting

```typescript
export const getSuppliers = (sortBy: string = 'name', order: 'asc' | 'desc' = 'asc') => {
  return getData<Supplier[]>('/api/suppliers', { params: { sort_by: sortBy, order } });
};
```

---

## Checklist para Servicios

- [ ] Usar `private-http.service` (no axios/fetch directo)
- [ ] Tipar respuestas con TypeScript generics
- [ ] Crear service file en `/services/` del módulo
- [ ] Usar URLs relativas (no hardcodear base URL)
- [ ] Agregar JSDoc comments a funciones del service
- [ ] Usar `useFetch` para GET requests en componentes
- [ ] Usar direct calls para mutations
- [ ] Try/catch para manejo de errores
- [ ] Explicar decisiones de API design (teaching mode)

---

## Common Mistakes to Avoid

1. ❌ Hacer fetch/axios directo (sin auth, tracking, error handling)
2. ❌ Hardcodear URLs completas (usar `VITE_API_URL`)
3. ❌ No tipar respuestas (usar `any`)
4. ❌ Manejar tokens manualmente (interceptor lo hace)
5. ❌ No usar service layer (llamar API directo desde componentes)
6. ❌ No manejar errores (siempre try/catch o let hooks handle)
7. ❌ Duplicar lógica de API en múltiples lugares
8. ❌ No explicar patrones de API (teaching mode)

---

## Resources

- **Private HTTP Service**: `src/modules/common/services/http/private-http.service.ts`
- **Service Examples**: `src/modules/suppliers/services/`, `src/modules/payroll/services/`
- **Axios Docs**: https://axios-http.com/docs/intro
- **SWR Docs**: https://swr.vercel.app/

---

**Remember**: Always use `private-http.service` for API calls. It handles auth, tracking, and URL building automatically. Create service layers for each module to centralize API logic.
