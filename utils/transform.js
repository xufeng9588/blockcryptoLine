const _ = require('lodash');
const { line } = require('../../database/influxdb/Table_Structure/index')
const { linePG } = require('../../database/postgres/Table_Structure/index')
const { influxLink } = require('../../database/influxdb/influx');
const { postgresLink } = require('../../database/postgres/pg')

async function transformData(input, databaseName) {
    const data = input;
    if (databaseName === 'influx') {
        const { database, tableName, host, field } = line;
        const hd = new influxLink({
            database: database,
            tableName: tableName,
            host: host,
            data: data,
            field: field
        })
        await hd.influxDB();
    } else if (databaseName === 'postgres') {
        const { database, tableName, host, field, values } = linePG;
        const hd = new postgresLink({
            database: database,
            tableName: tableName,
            host: host,
            data: data,
            field: field,
            values: values
        })
        await hd.pgDBinput()
    }
}

async function transformInf(data, name) {
    const handleData = [];
    _.forEach(data, d => {
        const dt = new Date(d.Timestamp).getTime() * Math.pow(10, 3);
        // console.log(dt, '....')
        // const t = `${d.Timestamp}000`;
        // const time = JSON.parse(t);
        const hd = { type: name, time: dt, result: d.Result, time_interval: 'weekly' };
        handleData.push(hd)
    })
    return handleData
}

function transformPG(data) {
    const handleData = [];
    _.forEach(data, l => {
        const hd = [l.time, l.time_interval, l.type, l.result];
        handleData.push(hd)
    })
    return handleData
}

module.exports = {
    transformData,
    transformInf,
    transformPG
}