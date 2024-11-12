This document is used to support the understanding of the  source code of  `child_process` module .


Relevant files: 

- **lib/internal/child_process.js** contains `ChildProcess` object definition

    > **child_process** module is dependent on **src/process_wrap.cc** C++ code.

- **lib/child_process.js** defines high level functions built on top of `ChildProcess` object


Questions:

- How `process_wrap` is registered?

    ``` C++
    // code snippet location: 
    // - src/process_wrap.cc

    class ProcessWrap : public HandleWrap {
        // ...
    }

    // ...
    NODE_MODULE_CONTEXT_AWARE_INTERNAL(process_wrap, node::ProcessWrap::Initialize)
    ```

    > Here give **ProcessWrap** a name **process_wrap**


    ``` C++
    // src/node_binding.h
    #define NODE_MODULE_CONTEXT_AWARE_INTERNAL(modname, regfunc)                   \
    NODE_MODULE_CONTEXT_AWARE_CPP(modname, regfunc, nullptr, NM_F_INTERNAL)

    #define NODE_MODULE_CONTEXT_AWARE_CPP(modname, regfunc, priv, flags)           \
    static node::node_module _module = {                                         \
        NODE_MODULE_VERSION,                                                     \
        flags,                                                                   \
        nullptr,                                                                 \
        __FILE__,                                                                \
        nullptr,                                                                 \
        (node::addon_context_register_func)(regfunc),                            \
        NODE_STRINGIFY(modname),                                                 \
        priv,                                                                    \
        nullptr};                                                                \
    void _register_##modname() { node_module_register(&_module); }
    ```

    > Here defines registration function for **process_wrap**

- Where `process_wrap` is registered?

    ``` C++
    // src/node_binding.cc
    // ...
    #define NODE_BUILTIN_STANDARD_MODULES(V)                                       \
        V(async_wrap)                                                                \
        // ...
        V(process_wrap)                                                              \
        // ...
        V(zlib)
    // ...
    ```





- How `spawn()` handles `stdio`?

    1. `spawn()` exported as a child_process module public function

        ``` js
        // code snippet location:
        // lib/child_process.js
        module.exports = {
            // ...
            spawn,
            // ...
        };

        ```
    2. `spawn()` function public facing definition.

        ``` js
        function spawn(file, args, options) {
            const child = new ChildProcess();

            options = normalizeSpawnArguments(file, args, options);
            debug('spawn', options);
            child.spawn(options);

            return child;
        }
        ```

        > What is under `ChildProcess.spawn`?

    3. `spawn()` is a prototype function of `ChildProcess` class.

        ```js
        // code snippet location:
        // - lib/internal/child_process.js
        ChildProcess.prototype.spawn = function(options) {
            // ...
            stdio = getValidStdio(stdio, false);
            // ...
        }
        ```
    
    4. Initilize stdio with `Pipe`

        ```js
        // code snippet location:
        // - lib/internal/child_process.js
        function getValidStdio(stdio, sync) {
            // ...
            if (!sync)
                a.handle = new Pipe(PipeConstants.SOCKET);
            // ...
        }
        ```

    5. **stdio** is fundamentally `Socket`.

        ``` js
        // code snippet location:
        // - lib/internal/child_process.js
        function createSocket(pipe, readable) {
            return net.Socket({ handle: pipe, readable, writable: !readable });
        }
        ```

- How `net.Socket` init pipe?

    1. `createSocket`

        ``` js
        // code snippet location:
        // - lib/internal/child_process.js
        function createSocket(pipe, readable) {
            return net.Socket({ handle: pipe, readable, writable: !readable });
        }
        ```
    2. Initiate `Socket`

        ``` js
        // code snippet location:
        // - lib/net.js
        function Socket(options) {
            // ...
            if (options.handle) {
                this._handle = options.handle; // private
                this[async_id_symbol] = getNewAsyncId(this._handle);
            }
            // ...
        }
        ```


# Rference

1. [Node module deep-dive: child_process](https://blog.safia.rocks/post/169346741925/node-module-deep-dive-childprocess)
