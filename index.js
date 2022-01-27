const line = require('./schema/line.json');
// const { DBLink } = require('../utils/database_influx_pg/link_influx');
const { getLineData } = require('./utils/index');
const { DBLink } = require('database_influx_pg/link_influx')

const dbLink = new DBLink(host = 'localhost', port = 8086, database = 'bfs'); 
dbLink.loadModelConfigs([line]);

async function savePnlInfo(urlName, dataName) {
    const data = await getLineData(urlName, dataName);
    if (!data || !data.length) return;
    if (data.length === 0) {
        console.warn("no data in this response");
    }
    // console.log(data,'data....');
    await dbLink.batchUpsert('line', data, { batchN: 1});
    // await dbLink.Query('line','type','asset_managers')
}
savePnlInfo('LOI','NP_HF')

module.exports = {
    savePnlInfo
}