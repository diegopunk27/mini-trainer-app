import fs from 'fs'
import path from 'path'

const CONST_DEFAULT_DIR = './src'
/** Alineado con projectStructure.json: carpetas de feature en PascalCase. */
const PASCAL_CASE_FOLDER_PARENTS = new Set(['components', 'pages', 'contexts'])

function checkNamingConvention(dir, parentDir = '') {
  const errorList = []

  fs.readdirSync(dir).forEach((item) => {
    const fullPath = path.join(dir, item)
    const grandparentDir = path.basename(path.dirname(dir))

    if (fs.statSync(fullPath).isDirectory()) {
      const kebabOrLower = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(item)
      const pascalOk =
        PASCAL_CASE_FOLDER_PARENTS.has(parentDir) && /^[A-Z][a-zA-Z0-9]*$/.test(item)
      if (!kebabOrLower && !pascalOk) {
        errorList.push(
          `La carpeta no sigue la convención de nombres (kebab-case/lowercase, o PascalCase bajo components/pages/contexts): ${item}`,
        )
      }
      checkNamingConvention(fullPath, item) // verificar recursivamente el contenido del directorio
    } else {
      const extension = path.extname(item)
      const baseName = path.basename(item, extension)

      if (!['.ts', '.tsx', '.js', '.jsx'].includes(extension)) {
        return
      }

      if (parentDir === 'hooks' || grandparentDir === 'hooks') {
        // dentro de /hooks, los archivos ser lowercase o camelCase
        if (parentDir === 'tests' && !/test$/.test(baseName)) {
          // dentro de /tests, los archivos deben tener el sufijo .test
          errorList.push(`Archivo en /tests no sigue la convención de sufijo '.test': ${item}`)
        } else if (
          (parentDir === 'tests' && !/^[a-z][a-zA-Z0-9]*.test$/.test(baseName)) ||
          (parentDir !== 'tests' && !/^[a-z][a-zA-Z0-9]*$/.test(baseName))
        ) {
          errorList.push(`Archivo en /hooks no sigue la convención de nombres en lowercase o camelCase: ${item}`)
        }
      } else if (extension === '.tsx') {
        // los archivos .tsx fuera de /hooks deben ser PascalCase o lowercase
        if (!(/^[a-z]+(\.[a-z]+)*$/.test(baseName) || /^[A-Z][a-zA-Z0-9]*(\.[a-z]+)*$/.test(baseName))) {
          errorList.push(
            `Archivo .tsx fuera de /hooks no sigue la convención de nombres PascalCase o lowercase con sufijos permitidos: ${item}`,
          )
        }
      } else if (extension === '.ts') {
        // los archivos .ts fuera de /hooks deben ser kebab-case o lowercase, permitiendo cualquier sufijo
        const nameParts = baseName.split('.')
        const mainPart = nameParts[0]
        const pascalInterfaceFile =
          nameParts.length === 2 &&
          nameParts[1] === 'interface' &&
          /^[A-Z][a-zA-Z0-9]*$/.test(mainPart)
        const pascalServiceFile =
          nameParts.length === 2 &&
          nameParts[1] === 'service' &&
          /^[A-Z][a-zA-Z0-9]*$/.test(mainPart)
        const pascalBarrelInServicesFolder =
          parentDir === 'services' &&
          nameParts.length === 1 &&
          /^[A-Z][a-zA-Z0-9]*$/.test(mainPart)
        const hasValidMainPart =
          /^[a-z0-9]+(-[a-z0-9]+)*$/.test(mainPart) ||
          /^[a-z]+$/.test(mainPart) ||
          pascalInterfaceFile ||
          pascalServiceFile ||
          pascalBarrelInServicesFolder
        const hasValidSuffix = nameParts.length === 1 || nameParts.length === 2

        if (!hasValidMainPart || !hasValidSuffix) {
          errorList.push(
            `Archivo .ts fuera de /hooks no sigue la convención permitida (kebab-case o lowercase, con un sufijo opcional): ${item}`,
          )
        }
      }
    }
  })

  if (errorList.length > 0) {
    throw new Error(`Se encontraron problemas de convención de nombres:\n${errorList.join('\n')}`)
  }
}

try {
  checkNamingConvention(CONST_DEFAULT_DIR)
} catch (error) {
  console.error(error.message)
  process.exit(1)
}
