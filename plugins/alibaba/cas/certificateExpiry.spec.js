var expect = require('chai').expect;
var certificateExpiry = require('./certificateExpiry.js');

const certificateList = [
    {
        "issuer": "Amazon.com",
        "expired": false,
        "common": "p0664djdqdxh",
        "name": "temp-key",
        "startDate": "2021-08-26"
    },
    {
        "issuer": "Amazon.com",
        "expired": true,
        "common": "p0664djdqdxh",
        "name": "temp-key",
        "startDate": "2021-08-26"
    },
    {
        "issuer": "Amazon.com",
        "common": "p0664djdqdxh",
        "name": "temp-key",
        "startDate": "2021-08-26"
    }
]
const createCache = (certificates, certificateErr) => {
    return {
        cas: {
            DescribeUserCertificateList: {
                'cn-hangzhou': {
                    data: certificates,
                    err: certificateErr
                } 
            }
        }
    }
}

const createNullCache = () => {
    return {
        DescribeUserCertificateList: {
            'cn-hangzhou': null
        }
    }
}

describe('certificateExpiry', function () {
    describe('run', function () {
        it('should PASS if certificate is not expired', function (done) {
            const cache = createCache([certificateList[0]], null);
            certificateExpiry.run(cache, {}, (err, results) => {
                expect(results.length).to.equal(1);
                expect(results[0].status).to.equal(0);
                expect(results[0].message).to.include(`Certificate: ${certificateList[1].name} is not expired`);
                expect(results[0].region).to.equal('cn-hangzhou');
                done();
            });
        });

        it('should PASS if no certificates found', function (done) {
            const cache = createCache([], null);
            certificateExpiry.run(cache, {}, (err, results) => {
                console.log(results);
                expect(results.length).to.equal(1);
                expect(results[0].status).to.equal(0);
                expect(results[0].message).to.include('No certificate found');
                expect(results[0].region).to.equal('cn-hangzhou');
                done();
            });
        });

        it('should FAIL if certificate is expired', function (done) {
            const cache = createCache([certificateList[1]], null);
            certificateExpiry.run(cache, {}, (err, results) => {
                expect(results.length).to.equal(1);
                expect(results[0].status).to.equal(2);
                expect(results[0].message).to.include(`Certificate: ${certificateList[1].name} is expired`);
                expect(results[0].region).to.equal('cn-hangzhou');
                done();
            });
        });

        it('should UNKNOWN if unable to describe certificates', function (done) {
            const cache = createCache([], 'Unable to describe certificates');
            certificateExpiry.run(cache, {}, (err, results) => {
                expect(results.length).to.equal(1);
                expect(results[0].status).to.equal(3);
                expect(results[0].message).to.include('Unable to describe certificates');
                expect(results[0].region).to.equal('cn-hangzhou');
                done();
            });
        });

        it('should not return if unable to get response for certificates', function (done) {
            const cache = createNullCache();
            certificateExpiry.run(cache, {}, (err, results) => {
                expect(results.length).to.equal(0);
                done();
            });
        });
    })
}) 