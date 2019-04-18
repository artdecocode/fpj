import { join, relative, resolve, dirname } from 'path'
import exists from '@wrote/exists'
import read from '@wrote/read'
import resolveDep from 'resolve-dependency'

/**
 * Finds the location of the `package.json` for the given dependency in the directory, and its entry file.
 * @param {string} dir The path to the directory where the requiring file is located.
 * @param {string} name The name of the required package.
 * @param {FPJConfig} opts The options for `fpj`.
 * @param {Array<string>} [opts.fields] Any additional fields from `package.json` file to return.
 * @param {boolean} [opts.soft=false] If the entry export (main or module) does not exist, `soft` mode will not throw an error, but add the `hasEntry` property to the output set to _false_. Default `false`.
 * @returns {Promise<FPJReturn>}
 */
const findPackageJson = async (dir, name, opts = {}) => {
  const { fields, soft = false } = opts
  const fold = join(dir, 'node_modules', name)
  const path = join(fold, 'package.json')
  const e = await exists(path)
  if (e) {
    const res = await findEntry(path, fields, soft)
    if (res === undefined)
      throw new Error(`The package ${relative('', path)} does export the module.`)
    else if (!res.entryExists && !soft)
      throw new Error(`The exported module ${res.main} in package ${name} does not exist.`)
    const { entry, version, packageName, main, entryExists, ...rest } = res
    return {
      entry: relative('', entry),
      packageJson: relative('', path),
      ...(version ? { version } : {}),
      packageName,
      ...(main ? { hasMain: true } : {}),
      ...(!entryExists ? { entryExists: false } : {}),
      ...rest,
    }
  }
  if (dir == '/' && !e)
    throw new Error(`Package.json for module ${name} not found.`)
  return findPackageJson(join(resolve(dir), '..'), name, opts)
}

/**
 * Finds the path to the entry based on package.json file. */
export const findEntry = async (path, fields = []) => {
  const f = await read(path)
  let mod, version, packageName, main, rest
  try {
    ({
      'module': mod,
      'version': version,
      'name': packageName,
      'main': main,
      ...rest
    } = JSON.parse(f))
    rest = fields.reduce((acc, current) => {
      acc[current] = rest[current]
      return acc
    }, {})
  } catch (err) {
    throw new Error(`Could not parse ${path}.`)
  }
  const dir = dirname(path)
  let resolved = mod || main
  if (!resolved) {
    const indexExists = await exists(join(dir, 'index.js'))
    if (!indexExists) return undefined
    resolved = main = 'index.js'
  }
  let entry = join(dir, resolved)
  let r
  try {
    ({ path: r } = await resolveDep(entry))
    entry = r
  } catch (err) {/* does not exist */}
  return { entry, version, packageName, main: !mod && main,
    entryExists: !!r,
    ...rest }
}

export default findPackageJson

/* documentary types/index.xml */
/**
 * @typedef {Object} FPJConfig The options for `fpj`.
 * @prop {Array<string>} [fields] Any additional fields from `package.json` file to return.
 * @prop {boolean} [soft=false] If the entry export (main or module) does not exist, `soft` mode will not throw an error, but add the `hasEntry` property to the output set to _false_. Default `false`.
 *
 * @typedef {Object} FPJReturn The return type of the program.
 * @prop {string} entry The location of the package's entry file. The preference is given to the `module` field.
 * @prop {string} packageJson The path to the package.json file itself.
 * @prop {string} packageName The name of the resolved package.
 * @prop {string} [version] The version of the package.
 * @prop {boolean} [hasMain] Whether the entry is the `main` rather than `module`.
 * @prop {boolean} [entryExists] In soft mode, will be set to `false` if the entry file does not exist.
 */
