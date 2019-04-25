# fpj: **Find Package Json**

[![npm version](https://badge.fury.io/js/fpj.svg)](https://npmjs.org/package/fpj)

`fpj` Resolves The Location Of The Package.Json File For The Given Dependency By Traversing The File System Up Starting From Given Path.

```sh
yarn add -E fpj
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`async fpj(dirname: string, packageName: string, opts?: FPJConfig): FPJReturn`](#async-fpjdirname-stringpackagename-stringopts-fpjconfig-fpjreturn)
  * [`_fpj.Config`](#type-_fpjconfig)
  * [`_fpj.Return`](#type-_fpjreturn)
- [Fields](#fields)
- [Soft Mode](#soft-mode)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import fpj from 'fpj'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `async fpj(`<br/>&nbsp;&nbsp;`dirname: string,`<br/>&nbsp;&nbsp;`packageName: string,`<br/>&nbsp;&nbsp;`opts?: FPJConfig,`<br/>`): FPJReturn`

Returns the resolved entry point to the package. It will start checking for the presence of packages using Node's algorithm by resolving the `node_modules` folder first inside of the given _dirname_, then if not found, traverse up and repeat, until root of the OS is reached.

The preference of the `entry` output will be given to the `module` field specified in the _package.json_. If the `main` is found instead, it will be indicated with `hasMain` property on the returned object.

__<a name="type-_fpjconfig">`_fpj.Config`</a>__: The options for `fpj`.

|  Name  |             Type              |                                                                       Description                                                                       | Default |
| ------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| fields | <em>!Array&lt;string&gt;</em> | Any additional fields from `package.json` file to return.                                                                                               | -       |
| soft   | <em>boolean</em>              | If the entry export (main or module) does not exist, `soft` mode will not throw an error, but add the `hasEntry` property to the output set to _false_. | `false` |

_For example, the `package.json` files and meta information for 2 packages can be fetched using the following example:_

```js
/* yarn example/ */
import fpj from 'fpj'
import { dirname } from 'path'

(async () => {
  const zoroaster = await fpj(
    dirname('example/example.js'),
    'zoroaster'
  )
  console.log(zoroaster)
  const read = await fpj(
    dirname('example/example.js'),
    '@wrote/read'
  )
  console.log(read)
})()
```

_FPJ gives preference to the `module` field and will report it as the entry if it exists. Otherwise, the `main` is used with the `hasMain` property set to true:_

```js
{ entry: 'node_modules/zoroaster/build/index.js',
  packageJson: 'node_modules/zoroaster/package.json',
  version: '3.13.0',
  packageName: 'zoroaster',
  hasMain: true }
{ entry: 'node_modules/@wrote/read/src/index.js',
  packageJson: 'node_modules/@wrote/read/package.json',
  version: '1.0.4',
  packageName: '@wrote/read' }
```

__<a name="type-_fpjreturn">`_fpj.Return`</a>__: The return type of the program.

|       Name       |       Type       |                                       Description                                        |
| ---------------- | ---------------- | ---------------------------------------------------------------------------------------- |
| __entry*__       | <em>string</em>  | The location of the package's entry file. The preference is given to the `module` field. |
| __packageJson*__ | <em>string</em>  | The path to the package.json file itself.                                                |
| __packageName*__ | <em>string</em>  | The name of the resolved package.                                                        |
| version          | <em>string</em>  | The version of the package.                                                              |
| hasMain          | <em>boolean</em> | Whether the entry is the `main` rather than `module`.                                    |
| entryExists      | <em>boolean</em> | In soft mode, will be set to `false` if the entry file does not exist.                   |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Fields

Any additional fields from `package.json` that need to be present in the output can be specified in the `fields` property.

```js
/* yarn example/ */
import fpj from 'fpj'
import { dirname } from 'path'

(async () => {
  const zoroaster = await fpj(
    dirname('example/example.js'),
    'zoroaster',
    { fields: ['license', 'bin'] },
  )
  console.log(zoroaster)
})()
```
```js
{ entry: 'node_modules/zoroaster/build/index.js',
  packageJson: 'node_modules/zoroaster/package.json',
  version: '3.13.0',
  packageName: 'zoroaster',
  hasMain: true,
  license: 'MIT',
  bin: { zoroaster: 'build/bin/zoroaster.js' } }
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true"></a></p>

## Soft Mode

When a package exports either a main or a module fields, `fpj` will check for their existence to resolve the path to the entry. When the entry does not exist, by default an error will be thrown. To disable the error, and add the `entryExists: false` to the output, the _Soft Mode_ can be activated.

```js
/* yarn example/ */
import fpj from 'fpj'
import { dirname } from 'path'

(async () => {
  const zoroaster = await fpj(
    dirname('example/example.js'),
    'myPackage',
    { soft: true },
  )
  console.log(zoroaster)
})()
```
```js
{ entry: 'example/node_modules/myPackage/index.js',
  packageJson: 'example/node_modules/myPackage/package.json',
  version: '1.0.0',
  packageName: 'myPackage',
  hasMain: true,
  entryExists: false }
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a>   2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa" />
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>