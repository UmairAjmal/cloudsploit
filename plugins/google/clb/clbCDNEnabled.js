var async = require('async');
var helpers = require('../../../helpers/google');

module.exports = {
    title: 'CLB CDN Enabled',
    category: 'CLB',
    description: 'Ensures that Cloud CDN is enabled on all load balancers',
    more_info: 'Cloud CDN increases speed and reliability as well as lowers server costs. Enabling CDN on load balancers creates a highly available system and is part of GCP best practices.',
    link: 'https://cloud.google.com/cdn/docs/quickstart',
    recommended_action: 'Enable Cloud CDN on all load balancers from the network services console.',
    apis: ['backendServices:list', 'projects:get'],

    run: function(cache, settings, callback) {
        var results = [];
        var source = {};
        var regions = helpers.regions();

        let projects = helpers.addSource(cache, source,
            ['projects','get', 'global']);

        if (!projects || projects.err || !projects.data || !projects.data.length) {
            helpers.addResult(results, 3,
                'Unable to query for projects: ' + helpers.addError(projects), 'global', null, null, (projects) ? projects.err : null);
            return callback(null, results, source);
        }

        var project = projects.data[0].name;

        async.each(regions.backendServices, function(region, rcb){
            let backendServices = helpers.addSource(cache, source,
                ['backendServices', 'list', region]);

            if (!backendServices) return rcb();

            if (backendServices.err || !backendServices.data) {
                helpers.addResult(results, 3,
                    'Unable to query backend services', region, null, null, backendServices.err);
                return rcb();
            }

            if (!backendServices.data.length) {
                helpers.addResult(results, 0, 'No load balancers found', region);
                return rcb();
            }

            let found = false;
            backendServices.data.forEach(backend => {
                if (!backend.name) return;

                found = true;
                let resource = helpers.createResourceName('backendServices', backend.name, project, 'global');
                if (backend.enableCDN) {
                    helpers.addResult(results, 0,
                        'CDN is enabled on the backend service', region, resource);
                } else {
                    helpers.addResult(results, 2,
                        'CDN is disabled on the backend service', region, resource);
                }
            });

            if (!found) {
                helpers.addResult(results, 0, 'No load balancers found', region);
                return rcb();
            }

            rcb();
        }, function(){
            // Global checking goes here
            callback(null, results, source);
        });
    }
};