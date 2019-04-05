## Soft Mode

When a package exports either a main or a module fields, `fpj` will check for their existence to resolve the path to the entry. When the entry does not exist, by default an error will be thrown. To disable the error, and add the `entryExists: false` to the output, the _Soft Mode_ can be activated.

%EXAMPLE: example/soft, ../src => fpj%
%FORK-js example/soft%

%~%