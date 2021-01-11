This document is used to support understand `child_process` inside Nodejs source code.


Relevant files: 

- **lib/internal/child_process.js** contains `ChildProcess` object definition

    > **child_process** module is dependent on **src/process_wrap.cc** C++ code.

- **lib/child_process.js** defines high level functions built on top of `ChildProcess` object


Questions:

- How `process_wrap` is registered?

    ``` C++
    // src/process_wrap.cc

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




# Rference

1. [Node module deep-dive: child_process](https://blog.safia.rocks/post/169346741925/node-module-deep-dive-childprocess)
