## API

The package is available by importing its default function:

```js
import fpj from 'fpj'
```

%~%

```## async fpj => FPJReturn
[
  ["dirname", "string"],
  ["packageName", "string"],
  ["opts", "FPJConfig"],
]
```

Returns the resolved entry point to the package. The preference will be given to the `module` field specified in the `package.json`. If the `main` is found instead, it will be indicated with `hasMain` property on the returned object.

%TYPEDEF types/index.xml%

%EXAMPLE: example, ../src => fpj%
%FORK-js example%

%~ width="25"%

### Fields

Any additional fields from `package.json` that need to be present in the output can be specified in the `fields` property.

%EXAMPLE: example/fields, ../src => fpj%
%FORK-js example/fields%

%~ width="25"%

### Soft Mode

When a package exports either a main or a module fields, `fpj` will check for their existence to resolve the path to the entry. When the entry does not exist, by default an error will be thrown. To disable the error, and add the `entryExists: false` to the output, the _Soft Mode_ can be activated.

%EXAMPLE: example/soft, ../src => fpj%
%FORK-js example/soft%

%~%