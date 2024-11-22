This folder contains a learning example of GraphQL resolver.

And this example is based on the YouTube Video: [GraphQL Crash Course #5 - Resolver Functions](https://www.youtube.com/watch?v=mjqfYgFyziU) .


# Commands

1. Prepare project environment and dependencies

    ```bash
    npm init
    npm install --verbose
    ```

2. Start the server

    ```bash
    node index.js
    ```

3. GraphQL query

    ``` GraphQL
    query {
        games {
            id
            title
        }
    }
    ```

    ![a GraphQL query example](./screenshots/Screenshot_2024-11-21_at_10.48.19.png)
