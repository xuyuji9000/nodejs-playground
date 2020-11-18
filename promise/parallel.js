/**
 * This file use Promise.all() to run parallel execution
 */
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })

}


const task = async function(value) {
    await sleep(1000)
    console.log(value)
}

const first = function() {
    return Promise.all([task("task1"), task("task2")])
} 

const second = function() {
    return Promise.all([task("task3"), task("task4")])
} 

first().then(() => {
    second()
})