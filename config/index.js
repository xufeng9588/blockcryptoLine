const config = {
    baseurl: 'https://data.tbstat.com',
    type: {
        futures: 'futures',
        options: 'options'
    },
    futuresType: {
        largeopenInt: 'largeopeninterestholdersofcmebitcoinfutures',
        openInt: 'openinterestofcmebitcoinfuturesbytradercategory',
        openShortInt: 'openshortinterestofcmebitcoinfuturesbytradercategory',
        netPosion: 'netpositionsofcmebitcoinfuturesbytradercategory'
    },
    optionsType:{
        aggreGatedOpenInt:'aggregatedopeninterestofbitcoinoptions',
        volume:'volumeofbitcoinoption',
        shareOfOpenInt:'shareofopeninterestacrossbitcoinoptions'
    }
}

module.exports = {
    config
}