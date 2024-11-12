const axios = require('axios')

// axios.get('https://baidu.com')
//     .then(function(response) {
//         console.log(response)
//     })

async function getBaidu() {
    try {
        const response = await axios.get('https://baidu.com')
        console.log(response)
    } catch (err) {
        console.error(err)
    }
}

getBaidu()
