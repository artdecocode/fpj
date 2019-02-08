const { join, relative, resolve, dirname } = require('path');
let exists = require('@wrote/exists'); if (exists && exists.__esModule) exists = exists.default;
let read = require('@wrote/read'); if (read && read.__esModule) read = read.default;

/**
 * Finds the location of the `package.json` for the given dependency in the directory, and its entry file.
 * @param {string} dir The path to the directory where the requiring file is located.
 * @param {string} name The name of the required package.
 * @returns {Promise<FPJReturn>}
 */
const findPackageJson = async (dir, name) => {
  const fold = join(dir, 'node_modules', name)
  const path = join(fold, 'package.json')
  const e = await exists(path)
  if (e) {
    const res = await findEntry(path)
    if (res === undefined)
      throw new Error(`The package ${relative('', path)} does export the module.`)
    else if (res === null)
      throw new Error(`The exported module in package ${name} does not exist.`)
    const { entry, version, packageName, main } = res
    return {
      entry: relative('', entry), packageJson: relative('', path), version, packageName, ...(main ? { hasMain: true } : {}),
    }
  }
  if (dir == '/' && !e)
    throw new Error(`Package.json for module ${name} not found.`)
  return findPackageJson(join(resolve(dir), '..'), name)
}

/**
 * Finds the path to the entry based on package.json file. */
       const findEntry = async (path) => {
  const f = await read(path)
  let mod, version, packageName, main
  try {
    ({ 'module': mod, 'version': version, 'name': packageName, 'main': main } = JSON.parse(f))
  } catch (err) {
    throw new Error(`Could not parse ${path}.`)
  }
  const resolved = mod || main
  if (!resolved) return undefined
  let entry = join(dirname(path), resolved)
  const stat = await exists(entry)
  if (!stat) return null
  if (stat.isDirectory()) {
    const tt = join(entry, 'index.js')
    const e2 = await exists(tt)
    if (!e2) return null
    entry = tt
  }
  return { entry, version, packageName, main: !mod && main }
}

module.exports=findPackageJson

/* documentary types/index.xml */
/**
 * @typedef {Object} FPJReturn The return type of the program.
 * @prop {string} entry The location of the package's entry file. The preference is given to the `module` field.
 * @prop {string} packageJson The path to the package.json file itself.
 * @prop {string} version The version of the package.
 * @prop {string} packageName The name of the resolved package.
 * @prop {boolean} [hasMain] Whether the entry is the `main` rather than `module`.
 */


module.exports.findEntry = findEntry