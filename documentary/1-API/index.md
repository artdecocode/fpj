## API

The package is available by importing its default function:

```js
import fpj from 'fpj'
```

%~%

```## async fpj => FPJReturn
[
  ["dirname", "string"],
  ["packageName", "string"]
]
```

Returns the resolved entry point to the package. The preference will be given to the `module` field specified in the `package.json`. If the `main` is found instead, it will be indicated with `hasMain` property on the returned object.

%TYPEDEF types/index.xml%

%EXAMPLE: example/example.js, ../src => fpj%
%FORK-js example example/example%

%~%