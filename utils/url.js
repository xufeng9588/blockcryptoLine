const { config } = require('../config/index')

function url(typeName) {
    const time = new Date().valueOf();
    const { baseurl, type, futuresType, optionsType } = config;
    const { futures, options } = type;
    const { largeopenInt, openInt, openShortInt, netPosion } = futuresType;
    if (typeName === 'LOI') {
        var url = `${baseurl}/dashboard/markets_${futures}_${largeopenInt}_weekly_cftccot.json?v=${time}`;
    } else if (typeName === 'OI') {
        var url = `${baseurl}/dashboard/markets_${futures}_${openInt}_weekly_cftccot.json?v=${time}`;
    } else if (typeName === 'OSI') {
        var url = `${baseurl}/dashboard/markets_${futures}_${openShortInt}_weekly_cftccot.json?v=${time}`;
    } else if (typeName === 'NP') {
        var url = `${baseurl}/dashboard/markets_${futures}_${netPosion}_weekly_cftccot.json?v=${time}`;
    } else return
    const parameter = {
        url: url,
        headers: {
            'referer': 'https://www.theblockcrypto.com/'
        }
    }
    return parameter
}

module.exports = {
    url
}

// large open interest holder sofcme bitcoin futures
// open interes to fcme bitcoin futures by trader category
// open short interes to fcme bitcoin futures by trader category
// net position sofcme bitcoin futures by trader category