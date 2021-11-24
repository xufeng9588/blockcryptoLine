const _axios = require('axios');
const { reject } = require('lodash');
// const { config } = require('./../config');
function request(config) {
    return new Promise((resolve, reject) => {
        axios(config).then((res) => {
            const data = res.data.Series['Hedge Funds'].Data;
            resolve(data)
        })
    })
}

async function axios(o) {
    return new Promise((resolve, reject) => {
        _axios(o).then(res => {
            if (res) {
                const body = res.data;
                try {
                    if (typeof body === 'string') body = JSON.parse(body)
                } catch (error) {
                    console.log(error)
                }
                resolve(body)
            }
        }).catch(() => {
            console.log('error')
        })
    }).catch((err) => {
        reject(err)
        console.log('error')
    })
}

// async function requestTest(){
//     const o = config;  
//     const res = await axios(o);
//     console.log(res);
// }

// requestTest()

module.exports = {
    axios
}