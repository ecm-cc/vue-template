function load(tenant) {
    switch (tenant) {
    case '14q': return {
        repositoryId: '1a2cde3f-2913-3dc2-4a2e-e623459ac23a',
        processId: 'Process_inquiry',
        host: 'https://able-group-dev.d-velop.cloud',
        serviceUser: process.env.PROCESS_USER_DEV,
        personalIDs: ['XAPER', 'XDPER'],
        protectedRoutes: ['/dmsobjectextensions', '/configfeatures', '/'],
        personalGroupIDs: ['912D0FDB-2835-4CCC-B21E-134D9B8C95A7',
            '2C92E2F3-D801-4299-8FE1-790527FB215D',
            'B43402A6-25A4-4D1E-AE70-CD37C5D145FD',
            'CE05EE91-45F6-4D77-8F66-FC72C01B3CC1'],
        uniqueIdentifier: {
            XAPER: {
                childId: 'XDPER',
                uniqueId: '127',
            },
            XCASE: {
                childId: 'XDCAS',
                uniqueId: '39',
            },
            XLEV: {
                childId: 'XLVU',
                uniqueId: '15',
            },
            XLRV: {
                childId: 'XLVU',
                uniqueId: '15',
            },
            ADEB: {
                childId: 'DKUND',
                uniqueId: '32',
            },
            AKAUF: {
                childId: 'DKAUF',
                uniqueId: '65',
            },
            AKUNR: {
                childId: 'DKUNR',
                uniqueId: '159',
            },
            XRVER: {
                childId: 'DKUND',
                uniqueId: '15',
            },
            XEVER: {
                childId: 'XEVUN',
                uniqueId: '15',
            },
            ALIEF: {
                childId: 'DLIEA',
                uniqueId: '84',
            },
            ABEST: {
                childId: 'DLIEB',
                uniqueId: '70',
            },
            AUNTE: {
                childId: 'DUNTE',
                uniqueId: '144',
            },
        },
    };
    case '197': return {
        repositoryId: '64bdf712-b328-5f46-8fd0-b8e67aaf8bec',
        processId: 'Process_inquiry',
        host: 'https://able-group-qas.d-velop.cloud',
        serviceUser: process.env.PROCESS_USER_QAS,
        personalIDs: ['XAPER', 'XDPER'],
        personalGroupIDs: ['912D0FDB-2835-4CCC-B21E-134D9B8C95A7',
            '2C92E2F3-D801-4299-8FE1-790527FB215D',
            'B43402A6-25A4-4D1E-AE70-CD37C5D145FD',
            'CE05EE91-45F6-4D77-8F66-FC72C01B3CC1'],
        uniqueIdentifier: {
            XAPER: {
                childId: 'XDPER',
                uniqueId: '120',
            },
            XCASE: {
                childId: 'XDCAS',
                uniqueId: '83',
            },
            XLEV: {
                childId: 'XLVU',
                uniqueId: '6',
            },
            XLRV: {
                childId: 'XLVU',
                uniqueId: '6',
            },
            ADEB: {
                childId: 'DKUND',
                uniqueId: '138',
            },
            AKAUF: {
                childId: 'DKAUF',
                uniqueId: '151',
            },
            AKUNR: {
                childId: 'DKUNR',
                uniqueId: '199',
            },
            XRVER: {
                childId: 'DKUND',
                uniqueId: '6',
            },
            XEVER: {
                childId: 'XEVUN',
                uniqueId: '6',
            },
            ALIEF: {
                childId: 'DLIEA',
                uniqueId: '154',
            },
            ABEST: {
                childId: 'DLIEB',
                uniqueId: '153',
            },
            AUNTE: {
                childId: 'DUNTE',
                uniqueId: '124',
            },
        },
    };
    case '1ha': return {
        repositoryId: '576583f0-8cd0-5796-bc94-e49426e7bbfb',
        processId: 'Process_inquiry',
        host: 'https://able-group-version.d-velop.cloud',
        serviceUser: process.env.PROCESS_USER_VERSION,
        personalIDs: ['XAPER', 'XDPER'],
        personalGroupIDs: ['6D1BC0E4-D4D2-46FD-BB84-19A46F92C0B6',
            '2932AAD1-9D9A-4401-8B3E-66FB6CE4BEF7',
            '8D761DA2-9860-4B7C-BB4F-E51961B9C89A',
            'F2C8AE72-1ED1-419E-B4AC-7546D675ABAC'],
        uniqueIdentifier: {
            XAPER: {
                childId: 'XDPER',
                uniqueId: '123',
            },
            XCASE: {
                childId: 'XDCAS',
                uniqueId: '84',
            },
            XLEV: {
                childId: 'XLVU',
                uniqueId: '6',
            },
            XLRV: {
                childId: 'XLVU',
                uniqueId: '6',
            },
            ADEB: {
                childId: 'DKUND',
                uniqueId: '132',
            },
            AKAUF: {
                childId: 'DKAUF',
                uniqueId: '146',
            },
            AKUNR: {
                childId: 'DKUNR',
                uniqueId: '146',
            },
            XRVER: {
                childId: 'DKUND',
                uniqueId: '6',
            },
            XEVER: {
                childId: 'XEVUN',
                uniqueId: '6',
            },
            ALIEF: {
                childId: 'DLIEA',
                uniqueId: '148',
            },
            ABEST: {
                childId: 'DLIEB',
                uniqueId: '146',
            },
            AUNTE: {
                childId: 'DUNTE',
                uniqueId: '233',
            },
        },
    };
    // Default: Prod
    default: return {
        repositoryId: '16d943a8-4683-5ffb-b564-f3bf1903a967',
        processId: 'Process_inquiry',
        host: 'https://able-group.d-velop.cloud',
        regEx: 'P[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]',
        serviceUser: process.env.PROCESS_USER_PROD,
        personalIDs: ['XAPER', 'XDPER'],
        personalGroupIDs: ['6D1BC0E4-D4D2-46FD-BB84-19A46F92C0B6',
            '2932AAD1-9D9A-4401-8B3E-66FB6CE4BEF7',
            '8D761DA2-9860-4B7C-BB4F-E51961B9C89A',
            'F2C8AE72-1ED1-419E-B4AC-7546D675ABAC'],
        uniqueIdentifier: {
            XAPER: {
                childId: 'XDPER',
                uniqueId: '123',
            },
            XCASE: {
                childId: 'XDCAS',
                uniqueId: '84',
            },
            XLEV: {
                childId: 'XLVU',
                uniqueId: '6',
            },
            XLRV: {
                childId: 'XLVU',
                uniqueId: '6',
            },
            ADEB: {
                childId: 'DKUND',
                uniqueId: '132',
            },
            AKAUF: {
                childId: 'DKAUF',
                uniqueId: '146',
            },
            AKUNR: {
                childId: 'DKUNR',
                uniqueId: '146',
            },
            XRVER: {
                childId: 'DKUND',
                uniqueId: '6',
            },
            XEVER: {
                childId: 'XEVUN',
                uniqueId: '6',
            },
            ALIEF: {
                childId: 'DLIEA',
                uniqueId: '148',
            },
            ABEST: {
                childId: 'DLIEB',
                uniqueId: '146',
            },
            AUNTE: {
                childId: 'DUNTE',
                uniqueId: '233',
            },
        },
    };
    }
}

module.exports = {
    load,
};
