const line = require('./schema/line.json');
const { DBLink } = require('../utils/database/link_influx');
const { getLineData } = require('./utils/index')

const dbLink = new DBLink(host = 'localhost', port = 8086, database = 'bfs'); 
dbLink.loadModelConfigs([line]);

async function savePnlInfo() {
    const data = await getLineData('LOI','NP_HF');
    if (!data || !data.length) return;
    if (data.length === 0) {
        console.warn("no data in this response");
    }
    // console.log(data,'data....');
    await dbLink.batchUpsert('line', data, { batchN: 1});
    // await dbLink.Query('line','type','asset_managers')
    // asset_manages assetManages
    // console.log(datas)
}
savePnlInfo()