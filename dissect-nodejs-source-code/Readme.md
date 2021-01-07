This document is used to support the Nodejs source code reading.


- Understand Nodejs directory structure

    **lib** folder has the Javascript code that provides the nice set of modules that are included by default with every Nodejs installation.

    **src** folder contains the C++ libraries for libuv.

- Dissect `fs.write()` function

    ``` js
    // lib/fs.js
    const binding = internalBinding('fs');
    ```

    > This `binding` variable is used in almost every function in **fs.js** file. Something must be special about it.

    ``` js
    // lib/internal/bootstrap/loaders.js

    // Set up internalBinding() in the closure.
    let internalBinding;
    {
    const bindingObj = ObjectCreate(null);
    // eslint-disable-next-line no-global-assign
    internalBinding = function internalBinding(module) {
        let mod = bindingObj[module];
        if (typeof mod !== 'object') {
        mod = bindingObj[module] = getInternalBinding(module);
        ArrayPrototypePush(moduleLoadList, `Internal Binding ${module}`);
        }
        return mod;
    };
    }
    ```

    > `internalBinding()` is from **lib/internal/bootstrap/loaders.js**. The main function of the loaders module is to load all libuv libraries and connect them through the V8 project with Nodejs.

    ``` js
    binding.writeBuffer(...);
    ```
    > For every module called from the `binding` object in the JavaScript section of Nodejs project, there is an equivalent of it in the C++ section, in the **src** folder.

    ``` c++
    env->SetMethod(target, "writeBuffer", WriteBuffer);
    ```
    > **node_file.cc**  contains C++ side of  the `writeBuffer()` implementation.

    ``` c++
    static void WriteBuffer(...) {
        // ...
        AsyncCall(env, req_wrap_async, args, "write", UTF8, AfterInteger,
              uv_fs_write, fd, &uvbuf, 1, pos);
        // ...
    }
    ```
    
    > This is the call to the part of libuv that does the actual writing where the libuv function uv_fs_write is called asynchronously.


# Reference

1. [Exploring Node.js Internals](https://www.smashingmagazine.com/2020/04/nodejs-internals/)

    > This article introduces how to start reading Nodejs source code.

2. [nodejs/node](https://github.com/nodejs/node/)

    > Nodejs source code repo on GitHub.
