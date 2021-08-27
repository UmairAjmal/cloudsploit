var aliCloud = require('@alicloud/pop-core');

const requestOption = {
    method: 'POST'
};
let pageNumber = 1;
module.exports = function(AlibabaConfig, collection, region, regionEndpointMap, callback) {
    const localConfig = {...AlibabaConfig};
    let endpoint = (regionEndpointMap && regionEndpointMap.includes(region)) ?
                        `https://cas.${region}.aliyuncs.com` : 'https://cas.aliyuncs.com';
    localConfig['endpoint'] = endpoint;
    localConfig['apiVersion'] = '2018-07-13'
    const client = new aliCloud(localConfig);

    collection.cas.DescribeUserCertificateList[region].data = [];

    const execute = function() {
        const queries = {
            'RegionId': region,
            'ShowSize': 50,
            'CurrentPage': pageNumber
        };
        client.request('DescribeUserCertificateList', queries, requestOption).then((res) => {
            callCB(null, res);
        }, (err) => {
            callCB(err);
        });
    };

    const callCB = function(err, data) {
        if (err) {
            collection.cas.DescribeUserCertificateList[region].err = err;
            return callback();
        }
        collection.cas.DescribeUserCertificateList[region].data = collection.cas.DescribeUserCertificateList[region].data.concat(data.CertificateList);
        if (data['CurrentPage'] &&  data['TotalCount'] &&
            (data['ShowSize'] * data['CurrentPage']) < data['TotalCount']){
            pageNumber += 1;
            execute();
        } else return callback();
    };

    execute();
};
