# NOMENCLATURA DEL PROYECTO

- **Carpetas**: utilizar kebab-case
  Ejemplo : mi-carpeta

- **Archivos .tsx**: permitir PascalCase o lowercase
  Ejemplo : MiComponente.tsx, micomponente.tsx

- **Archivos .ts dentro de /hooks**: permitir lowercase o camelCase
  Ejemplo : usemiHook.ts

- **Archivos .ts fuera de /hooks**:

  - Usar kebab-case. Ejemplo : mi-archivo.ts
  - Permitir lowercase si el archivo no tiene guiones. Ejemplo: miarchivo.ts

- **Excepciones**: los archivos pueden terminar con identificadores específicos como .constants, .service, etc., siguiendo las reglas anteriores para la parte del nombre antes del punto.

- **Hooks** : camelCase
  Ejemplo : useFetch.ts

- **Clases/interfaces/componentes/paginas**: PascalCase (comienza con mayuscula y lleva una mayuscula por cada separador). En caso de ser una clase que representa una abstracción por ejemplo strategies, colocar la palabra al final
  Ejemplo : UserHistory
  Ejemplo strategy : ClaudeChatbotStrategy

- **metodos/funciones** : camelCase tanto nombre como parametros de la función
  Ejemplo : getById

- **variables y propiedades** : camelCase
  Ejemplo: userId

- **Constantes** : capital case con separador guion bajo
  Ejemplo : PROMPT_TEMPLATE
