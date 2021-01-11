This document is used to support understand `child_process` inside Nodejs source code.


Relevant files: 

- **lib/internal/child_process.js** contains `ChildProcess` object definition

    > **child_process** module is dependent on **src/process_wrap.cc** C++ code.

- **lib/child_process.js** defines high level functions built on top of `ChildProcess` object



# Rference

1. [Node module deep-dive: child_process](https://blog.safia.rocks/post/169346741925/node-module-deep-dive-childprocess)
