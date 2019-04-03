# fpj: **Find Package Json**

[![npm version](https://badge.fury.io/js/fpj.svg)](https://npmjs.org/package/fpj)

`fpj` Resolves The Location Of The Package.Json File For The Given Dependency By Traversing The File System Up Starting From Given Path.

```sh
yarn add -E fpj
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`async fpj(dirname: string, packageName: string): FPJReturn`](#async-fpjdirname-stringpackagename-string-fpjreturn)
  * [`FPJReturn`](#type-fpjreturn)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import fpj from 'fpj'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `async fpj(`<br/>&nbsp;&nbsp;`dirname: string,`<br/>&nbsp;&nbsp;`packageName: string,`<br/>`): FPJReturn`

Returns the resolved entry point to the package. The preference will be given to the `module` field specified in the `package.json`. If the `main` is found instead, it will be indicated with `hasMain` property on the returned object.

__<a name="type-fpjreturn">`FPJReturn`</a>__: The return type of the program.

|       Name       |   Type    |                                       Description                                        |
| ---------------- | --------- | ---------------------------------------------------------------------------------------- |
| __entry*__       | _string_  | The location of the package's entry file. The preference is given to the `module` field. |
| __packageJson*__ | _string_  | The path to the package.json file itself.                                                |
| __version*__     | _string_  | The version of the package.                                                              |
| __packageName*__ | _string_  | The name of the resolved package.                                                        |
| hasMain          | _boolean_ | Whether the entry is the `main` rather than `module`.                                    |

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
```js
{ entry: 'node_modules/zoroaster/build/index.js',
  packageJson: 'node_modules/zoroaster/package.json',
  version: '3.11.2',
  packageName: 'zoroaster',
  hasMain: true }
{ entry: 'node_modules/@wrote/read/src/index.js',
  packageJson: 'node_modules/@wrote/read/package.json',
  version: '1.0.3',
  packageName: '@wrote/read' }
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

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