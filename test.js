const line = require('./schema/line.json');
const { DBLink } = require('../database/link_influx');
const { getLineData } = require('./utils/index')

const dbLink = new DBLink(host = 'localhost', port = 8086, database = 'bfs'); 

dbLink.loadModelConfigs([line]);

async function savePnlInfo() {
    const data = await getLineData();
    // if (!datas || !datas.length) return;
    // if (datas.length === 0) {
    //     console.warn("no data in this response");
    // }
    console.log(data,'data....');
    await dbLink.batchUpsert('line', data, { batchN: 1});
    // console.log(datas)
}
savePnlInfo()