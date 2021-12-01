const { config_url } = require('../config/index')

function blockCryptoUrl(typeName) {
    const time = new Date().valueOf();
    const { baseurl, type, futuresType } = config_url;
    const { futures } = type;
    // console.log(futuresType[typeName],futuresType,'typename')
    const reqParmas = futuresType[typeName];
    const url = `${baseurl}/dashboard/markets_${futures}_${reqParmas}_weekly_cftccot.json?v=${time}`;
    const parameter = {
        url: url,
        headers: {
            'referer': 'https://www.theblockcrypto.com/'
        }
    }
    return parameter
}
// console.log(blockCryptoUrl('openInt'))
module.exports = {
    blockCryptoUrl
}

// large open interest holder sofcme bitcoin futures
// open interes to fcme bitcoin futures by trader category
// open short interes to fcme bitcoin futures by trader category
// net position sofcme bitcoin futures by trader category