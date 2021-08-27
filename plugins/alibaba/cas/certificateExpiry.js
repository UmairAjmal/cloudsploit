var async = require('async');
var helpers = require('../../../helpers/alibaba');

module.exports = {
    title: 'Certificate Expiry',
    category: 'CAS',
    description: 'Ensure that SSL certificates are not expired.',
    more_info: 'Valid SSL certificate ensures that data is encrypted in transit.',
    link: 'https://www.alibabacloud.com/help/doc-detail/28544.htm',
    recommended_action: 'Renew the expired certificates',
    apis: ['CAS:DescribeUserCertificateList'],

    run: function(cache, settings, callback) {
        const results = [];
        const source = {};
        var regions = helpers.regions();

        for (const region of regions.cas) {
            const certificates =  helpers.addSource(cache, source,
                ['cas', 'DescribeUserCertificateList', region]);
            if(!certificates) continue;

            if (certificates.err || !certificates.data) {
                helpers.addResult(results, 3,
                    `Unable to describe certificates: ${helpers.addError(certificates)}`,
                    region);
                continue;
            }

            if (!certificates.data.length){
                helpers.addResult(results, 0, 'No certificates found', region);
                continue;
            }

            for (const certificate of certificates.data) {
                console.log(certificate);
                const status = (certificate && certificate.expired) ? 2: 0;
                helpers.addResult(results, status, `Certificate: ${certificate.name} is ${status ==2? 'expired': 'not expired'}`);
            }
        }
        callback(null, results, source);
    }
}