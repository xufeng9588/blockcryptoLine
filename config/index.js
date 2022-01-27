const config_url = {
    baseurl: 'https://data.tbstat.com',
    type: {
        futures: 'futures',
        options: 'options'
    },
    futuresType: {
        LOI: 'largeopeninterestholdersofcmebitcoinfutures',
        OI: 'openinterestofcmebitcoinfuturesbytradercategory',
        OSI: 'openshortinterestofcmebitcoinfuturesbytradercategory',
        NP: 'netpositionsofcmebitcoinfuturesbytradercategory'
    },
    optionsType: {
        aggreGatedOpenInt: 'aggregatedopeninterestofbitcoinoptions',
        volume: 'volumeofbitcoinoption',
        shareOfOpenInt: 'shareofopeninterestacrossbitcoinoptions'
    }
}

const queryKWord = {
    LOI: {
        LOI_NAME: 'Large open interest holders of CME Bitcoin futures',
        LOI_TYPE: {
            TYPE_LOI: 'open_interest'
        }
    },
    NP: {
        NP_AM: { get:'Asset Managers', save:'asset_managers'},
        NP_HF: { get:'Hedge Funds', save:'hedge_funds'},
        NP_NR: { get:'Non-Reported', save:'non_reported'},
        NP_O: { get:'Other', save:'other'}
    }
}

module.exports = {
    config_url,
    queryKWord
}