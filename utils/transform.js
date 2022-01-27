const _ = require('lodash');
const { line } = require('../../utils/database_influx_pg/influxdb/Table_Structure/index')
const { linePG } = require('../../utils/database_influx_pg/postgres/Table_Structure/index')
const { influxLink } = require('../../utils/database_influx_pg/influxdb/influx');
const { postgresLink } = require('../../utils/database_influx_pg/postgres/pg')

async function transformData(input, dbName) {
    if (dbName === 'influx') {
        const config = dbconfig(line,input);
        const hd = new influxLink(config)
        await hd.influxDB();
    } else if (dbName === 'postgres') {
        const config = dbconfig(linePG,input,values);
        var { values } = linePG;
        const hd = new postgresLink(config)
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
    // [{},{},{}] unique_id instrument_id+timestamp
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

function dbconfig(c, data, values) {
    if(!values) values='';
    const {database, tableName, host, field} = c;
    const config = {
        database: database,
            tableName: tableName,
            host: host,
            data: data,
            field: field,
            values: values
    }
    return config
}

module.exports = {
    transformData,
    transformInf,
    transformPG
}