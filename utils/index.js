const _ = require('lodash');
const { url } = require('./url');
const { config } = require('../config/index');
const { axios } = require('./request')
const { transformData, transformInf, transformPG } = require('./transform');
// const { request } = require('../../rates/utils/request');

async function getLineData(dbName) {
    const Url = url('NP');
    const data = await axios(Url)
    const hd = data.Series['Asset Managers'].Data;
    const handleData = await transformInf(hd, 'Asset Managers');
    // console.log(handleData)
    return handleData
    if (dbName === 'influx') {
        transformData(handleData, 'influx')
    } else if (dbName === 'postgres') {
        const d = transformPG(handleData);
        transformData(d, 'postgres')
    }else return
}
// getLineData('influx')



module.exports = {
    getLineData
}