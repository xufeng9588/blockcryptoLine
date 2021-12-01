const _ = require('lodash');
const { blockCryptoUrl } = require('./url');
const { queryKWord } = require('../config/index');
const { axios } = require('./request')
const { transformData, transformInf, transformPG } = require('./transform');
const { DBLink } = require('../../utils/database/link_influx');
const line = require('../schema/line.json');
// const { request } = require('../../rates/utils/request');

const { LOI, NP } = queryKWord;
const { LOI_NAME, LOI_TYPE } = LOI;
const { TYPE_LOI } = LOI_TYPE;

async function LOI_JUDGE(data) {
    const hd = data.Series[LOI_NAME].Data;
    const handleData = await transformInf(hd, TYPE_LOI);
    return handleData
}

async function NP_JUDGE(data,dataType) {
    const get = NP[dataType]['get'];
    const save = NP[dataType]['save'];
    const hd = data.Series[get].Data;
    var handleData = await transformInf(hd, save);
    return handleData
}

async function getLineData(urlKWord, dataType) {
    const Url = blockCryptoUrl(urlKWord);
    const data = await axios(Url)
    if (urlKWord === 'LOI') {
        var handleData = await LOI_JUDGE(data)
    } else if (urlKWord === 'NP') {
        var handleData = await NP_JUDGE(data,dataType)
    }else return
    // console.log(handleData)
    return handleData
    if (dbName === 'influx') {
        transformData(handleData, 'influx')
    } else if (dbName === 'postgres') {
        const d = transformPG(handleData);
        transformData(d, 'postgres')
    } else return
}
// getLineData('NP','AM')



module.exports = {
    getLineData
}