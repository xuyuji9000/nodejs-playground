/**
 * This example demonstrates how to handle Promise() rejection.
 */


const example = new Promise((resolve, reject) => {
    reject('Hello World, rejected.')
}).catch((err) => {
    console.error(err)
})
