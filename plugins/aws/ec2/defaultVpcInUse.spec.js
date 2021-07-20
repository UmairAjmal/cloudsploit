var expect = require('chai').expect;
var defaultVpcInUse = require('./defaultVpcInUse')

const describeRedshiftClusters = [
    {
        "ClusterIdentifier": "redshift-cluster-1",
        "NodeType": "dc2.large",
        "ClusterStatus": "available",
        "ClusterAvailabilityStatus": "Available",
        "MasterUsername": "awsuser",
        "DBName": "dev",
        "Endpoint": {
          "Address": "redshift-cluster-1.cks44thktt7l.us-east-1.redshift.amazonaws.com",
          "Port": 5439
        },
        "ClusterCreateTime": "2020-10-17T09:20:56.400Z",
        "AutomatedSnapshotRetentionPeriod": 1,
        "ManualSnapshotRetentionPeriod": -1,
        "ClusterSecurityGroups": [],
        "VpcId": "",
        "VpcSecurityGroups": [
          {
            "VpcSecurityGroupId": "sg-aa941691",
            "Status": "active"
          }
        ],
    },
    {
        "ClusterIdentifier": "redshift-cluster-1",
        "NodeType": "dc2.large",
        "ClusterStatus": "available",
        "ClusterAvailabilityStatus": "Available",
        "MasterUsername": "awsuser",
        "DBName": "dev",
        "Endpoint": {
          "Address": "redshift-cluster-1.cks44thktt7l.us-east-1.redshift.amazonaws.com",
          "Port": 5439
        },
        "ClusterCreateTime": "2020-10-17T09:20:56.400Z",
        "AutomatedSnapshotRetentionPeriod": 1,
        "ManualSnapshotRetentionPeriod": -1,
        "ClusterSecurityGroups": [],
        "VpcId": "",
        "VpcSecurityGroups": [
          {
            "VpcSecurityGroupId": "sg-aa941691",
            "Status": "active"
          }
        ],
    }
]
const describeVpcs = [
    {
        "CidrBlock": '172.31.0.0/16',
        "DhcpOptionsId": 'dopt-3a821040',
        "State": 'available',
        "VpcId": 'vpc-99de2fe4',
        "OwnerId": '111122223333',
        "InstanceTenancy": 'default',
        "Ipv6CidrBlockAssociationSet": [],
        "CidrBlockAssociationSet": "",
        "IsDefault": true,
        "Tags": []
    },
    {
        "CidrBlock": '172.31.0.0/16',
        "DhcpOptionsId": 'dopt-3a821040',
        "State": 'available',
        "VpcId": 'vpc-80fe2fe4',
        "OwnerId": '111122223333',
        "InstanceTenancy": 'default',
        "Ipv6CidrBlockAssociationSet": [],
        "CidrBlockAssociationSet": "",
        "IsDefault": false,
        "Tags": []
    }
];
const describeInstances = [
    {
        "Instances": [
            {
                "AmiLaunchIndex": 0,
                "ImageId": "ami-0947d2ba12ee1ff75",
                "InstanceId": "i-0ceecc81a1c5829f6",
                "InstanceType": "t2.micro",
                "KeyName": "auto-scaling-test-instance",
                "LaunchTime": "2020-11-09T21:27:25.000Z",
                "Monitoring": {
                    "State": "disabled"
                },
                "Placement": {
                    "AvailabilityZone": "us-east-1b",
                    "GroupName": "",
                    "Tenancy": "default"
                },
                "PublicIpAddress": "3.84.159.125",
                "State": {
                    "Code": 0,
                    "Name": "running"
                },
                "StateTransitionReason": "",
                "SubnetId": "subnet-673a9a46",
                "VpcId": "vpc-99de2fe4",
                "Architecture": "x86_64",
                "BlockDeviceMappings": [],
                "ClientToken": "",
                "EbsOptimized": false,
                "EnaSupport": true,
                "Hypervisor": "xen",
                "InstanceLifecycle": "spot"
            },
        ]
    },
    {
        "Instances": [
            {
                "AmiLaunchIndex": 0,
                "ImageId": "ami-0947d2ba12ee1ff75",
                "InstanceId": "i-0ceecc81a1c5829f6",
                "InstanceType": "t2.micro",
                "KeyName": "auto-scaling-test-instance",
                "LaunchTime": "2020-11-09T21:27:25.000Z",
                "Monitoring": {
                    "State": "disabled"
                },
                "Placement": {
                    "AvailabilityZone": "us-east-1b",
                    "GroupName": "",
                    "Tenancy": "default"
                },
                "PublicIpAddress": "3.84.159.125",
                "State": {
                    "Code": 0,
                    "Name": "running"
                },
                "StateTransitionReason": "",
                "SubnetId": "subnet-673a9a46",
                "VpcId": "vpc-80fe2fe4",
                "Architecture": "x86_64",
                "BlockDeviceMappings": [],
                "ClientToken": "",
                "EbsOptimized": false,
                "EnaSupport": true,
                "Hypervisor": "xen",
                "InstanceLifecycle": "spot"
            },
        ]
    },
];
const listFunctions = [
    {
        "FunctionName": "test-lambda",
        "FunctionArn": "arn:aws:lambda:us-east-1:000011112222:function:test-lambda",
        "Runtime": "nodejs12.x",
        "VpcConfig": {
            "VpcId": "vpc-99de2fe4",
        },
        "Role": "arn:aws:iam::000011112222:role/lambda-role"
    },
    {
        "FunctionName": "testing-1",
        "FunctionArn": "arn:aws:lambda:us-east-1:000011112222:function:testing-1",
        "Runtime": "nodejs12.x",
        "VpcConfig": {
            "VpcId": "vpc-80fe2fe4",
        },
        "Role": "arn:aws:iam::000011112222:role/service-role/testing-123"
    }
];
const describeRdsInstances = [
    {
        "DBInstanceIdentifier": "test-db-115",
        "DBInstanceClass": "db.m4.large",
        "Engine": "postgres",
        "DBInstanceStatus": "creating",
        "MasterUsername": "postgres",
        "DBName": "cloudsploit",
        "AllocatedStorage": 20,
        "PreferredBackupWindow": "09:07-09:37",
        "BackupRetentionPeriod": 0,
        "DBSecurityGroups": [],
        "AvailabilityZone": "us-east-1f",
        "DBSubnetGroup": {
          "DBSubnetGroupName": "default-vpc-99de2fe4",
          "DBSubnetGroupDescription": "Created from the RDS Management Console",
          "VpcId": "vpc-99de2fe4",
          "SubnetGroupStatus": "Complete",
          "Subnets": [
            {
              "SubnetIdentifier": "subnet-aac6b3e7",
              "SubnetAvailabilityZone": {
                "Name": "us-east-1c"
              },
              "SubnetOutpost": {},
              "SubnetStatus": "Active"
            }
          ]
        },
    },
    {
        "DBInstanceIdentifier": "test-db-114",
        "DBInstanceClass": "db.m4.large",
        "Engine": "postgres",
        "DBInstanceStatus": "creating",
        "MasterUsername": "postgres",
        "DBName": "cloudsploit",
        "AllocatedStorage": 20,
        "PreferredBackupWindow": "09:07-09:37",
        "BackupRetentionPeriod": 0,
        "DBSecurityGroups": [],
        "AvailabilityZone": "us-east-1f",
        "DBSubnetGroup": {
          "DBSubnetGroupName": "default-vpc-99de2fe4",
          "DBSubnetGroupDescription": "Created from the RDS Management Console",
          "VpcId": "vpc-80fe2fe4",
          "SubnetGroupStatus": "Complete",
          "Subnets": [
            {
              "SubnetIdentifier": "subnet-aac6b3e7",
              "SubnetAvailabilityZone": {
                "Name": "us-east-1c"
              },
              "SubnetOutpost": {},
              "SubnetStatus": "Active"
            }
          ]
        },
    },
]
const describeLoadBalancers = [
    {
        "LoadBalancerName": "akd-41",
        "DNSName": "akd-41-132269405.us-east-1.elb.amazonaws.com",
        "CanonicalHostedZoneName": "akd-41-132269405.us-east-1.elb.amazonaws.com",
        "CanonicalHostedZoneNameID": "Z35SXDOTRQ7X7K",
        "Subnets": [
            "subnet-06aa0f60",
            "subnet-673a9a46",
            "subnet-6a8b635b",
            "subnet-aac6b3e7",
            "subnet-c21b84cc",
            "subnet-e83690b7"
        ],
        "VPCId": "vpc-99de2fe4",
        "Instances": [],
    },
    {
        "LoadBalancerName": "akd-40",
        "DNSName": "akd-40-132269405.us-east-1.elb.amazonaws.com",
        "CanonicalHostedZoneName": "akd-40-132269405.us-east-1.elb.amazonaws.com",
        "CanonicalHostedZoneNameID": "Z35SXDOTRQ7X7K",
        "Subnets": [
            "subnet-06aa0f60",
            "subnet-673a9a46",
            "subnet-6a8b635b",
            "subnet-aac6b3e7",
            "subnet-c21b84cc",
            "subnet-e83690b7"
        ],
        "VPCId": "vpc-80fe2fe4",
        "Instances": [],
    },
];


const createCache = (vpcs, instance, loadBalancer, lambda, rdsInstance, redshiftCluster) => {
    return {
        ec2: {
            describeVpcs: {
                'us-east-1': {
                    data: vpcs,
                },
            },
            describeInstances: {
                'us-east-1': {
                    data: instance,
                },
            },
        },
        elb: {
            describeLoadBalancers: {
                'us-east-1': {
                    data: loadBalancer,
                },
            }
        },
        lambda: {
            listFunctions: {
                'us-east-1': {
                    data: lambda,
                },
            }
        },
        rds: {
            describeDBInstances: {
                'us-east-1': {
                    data: rdsInstance,
                },
            }
        },
        redshift: {
            describeClusters: {
                'us-east-1': {
                    data: redshiftCluster,
                },
            },
        },
    };
};

const createVpcErrorCache = (instance, loadBalancer, lambda, rdsInstance, redshiftCluster) => {
    return {
        ec2: {
            describeVpcs: {
                'us-east-1': {
                    err: {
                        message: 'Unable to describe vpcs'
                    },
                }
            },
            describeInstances: {
                'us-east-1': {
                    data: instance
                }
            },
        },
        elb: {
            describeLoadBalancers: {
                'us-east-1': {
                    data: loadBalancer
                }
            }
        },
        lambda: {
            listFunctions: {
                'us-east-1': {
                    data: lambda
                }
            }
        },
        rds: {
            describeDBInstances: {
                'us-east-1': {
                    data: rdsInstance
                }
            }
        },
        redshift: {
            describeClusters: {
                'us-east-1': {
                    data: redshiftCluster
                }
            },
        },
    };
};

const createInstanceErrorCache = (vpcs, loadBalancer, lambda, rdsInstance, redshiftCluster) => {
    return {
        ec2: {
            describeVpcs: {
                'us-east-1': {
                    data: vpcs
                }
            },
            describeInstances: {
                'us-east-1': {
                    err: {
                        message: 'Unable to describe instances'
                    },
                }
            },
        },
        elb: {
            describeLoadBalancers: {
                'us-east-1': {
                    data: loadBalancer
                }
            }
        },
        lambda: {
            listFunctions: {
                'us-east-1': {
                    data: lambda
                }
            }
        },
        rds: {
            describeDBInstances: {
                'us-east-1': {
                    data: rdsInstance
                }
            }
        },
        redshift: {
            describeClusters: {
                'us-east-1': {
                    data: redshiftCluster
                }
            },
        },
    };
};

const createLoadBalancerErrorCache = (vpcs, instance, lambda, rdsInstance, redshiftCluster) => {
    return {
        ec2: {
            describeVpcs: {
                'us-east-1': {
                    data: vpcs
                }
            },
            describeInstances: {
                'us-east-1': {
                    data: instance
                }
            },
        },
        elb: {
            describeLoadBalancers: {
                'us-east-1': {
                    err: {
                        message: 'Unable to describe load balancers'
                    },
                }
            }
        },
        lambda: {
            listFunctions: {
                'us-east-1': {
                    data: lambda
                }
            }
        },
        rds: {
            describeDBInstances: {
                'us-east-1': {
                    data: rdsInstance
                }
            }
        },
        redshift: {
            describeClusters: {
                'us-east-1': {
                    data: redshiftCluster
                }
            },
        },
    };
};

const createLambdaErrorCache = (vpcs, instance, loadBalancer, rdsInstance, redshiftCluster) => {
    return {
        ec2: {
            describeVpcs: {
                'us-east-1': {
                    data: vpcs
                }
            },
            describeInstances: {
                'us-east-1': {
                    data: instance
                }
            },
        },
        elb: {
            describeLoadBalancers: {
                'us-east-1': {
                    data: loadBalancer
                }
            }
        },
        lambda: {
            listFunctions: {
                'us-east-1': {
                    err: {
                        message: 'Unable to list functions'
                    },
                }
            }
        },
        rds: {
            describeDBInstances: {
                'us-east-1': {
                    data: rdsInstance
                }
            }
        },
        redshift: {
            describeClusters: {
                'us-east-1': {
                    data: redshiftCluster
                }
            },
        },
    };
};

const createRdsErrorCache = (vpcs, instance, loadBalancer, lambda, redshiftCluster) => {
    return {
        ec2: {
            describeVpcs: {
                'us-east-1': {
                    data: vpcs
                }
            },
            describeInstances: {
                'us-east-1': {
                    data: instance
                }
            },
        },
        elb: {
            describeLoadBalancers: {
                'us-east-1': {
                    data: loadBalancer
                }
            }
        },
        lambda: {
            listFunctions: {
                'us-east-1': {
                    data: lambda
                }
            }
        },
        rds: {
            describeDBInstances: {
                'us-east-1': {
                    err: {
                        message: 'Unable to describe rds instances'
                    },
                }
            }
        },
        redshift: {
            describeClusters: {
                'us-east-1': {
                    data: redshiftCluster
                }
            },
        },
    };
};

const createRedshiftErrorCache = (vpcs, instance, loadBalancer, lambda, rdsInstance) => {
    return {
        ec2: {
            describeVpcs: {
                'us-east-1': {
                    data: vpcs
                }
            },
            describeInstances: {
                'us-east-1': {
                    data: instance
                }
            },
        },
        elb: {
            describeLoadBalancers: {
                'us-east-1': {
                    data: loadBalancer
                }
            }
        },
        lambda: {
            listFunctions: {
                'us-east-1': {
                    data: lambda
                }
            }
        },
        rds: {
            describeDBInstances: {
                'us-east-1': {
                    data: rdsInstance
                }
            }
        },
        redshift: {
            describeClusters: {
                'us-east-1': {
                    err: {
                        message: 'Unable to describe redshift clusters'
                    },
                }
            },
        },
    };
};

const createNullCache = () => {
    return {
        ec2: {
            describeVpcs: {
                'us-east-1': null,
            },
            describeInstances: {
                'us-east-1': null,
            },
        },
        elb: {
            describeLoadBalancers: {
                'us-east-1': null,
            }
        },
        lambda: {
            listFunctions: {
                'us-east-1': null,
            }
        },
        rds: {
            describeDBInstances: {
                'us-east-1': null,
            }
        },
        redshift: {
            describeClusters: {
                'us-east-1': null,
            },
        },
    };
};

describe('defaultVpcInUse', function () {
    describe('run', function () {
        it('should PASS if no vpcs are detected', function (done) {
            const cache = createCache([], [], [], [], [], []);
            defaultVpcInUse.run(cache, {}, (err, results) => {
                expect(results.length).to.equal(1);
                expect(results[0].status).to.equal(0);
                done();
            });
        });

        it('should PASS if default vpc is not in use', function (done) {
            const cache = createCache([describeVpcs[0], describeVpcs[1]], [describeInstances[1]], [describeLoadBalancers[1]], [listFunctions[1]], [describeRdsInstances[1]], [describeRedshiftClusters[1]]);
            defaultVpcInUse.run(cache, {}, (err, results) => {
                expect(results.length).to.equal(1);
                expect(results[0].status).to.equal(0);
                done();
            });
        });

        it('should FAIL if default vpc is in use', function (done) {
            const cache = createCache([describeVpcs[0], describeVpcs[1]], [describeInstances[0]], [describeLoadBalancers[0]], [listFunctions[0]], [describeRdsInstances[0]], [describeRedshiftClusters[0]]);
            defaultVpcInUse.run(cache, {}, (err, results) => {
                expect(results.length).to.equal(1);
                expect(results[0].status).to.equal(2);
                done();
            });
        });

        it('should UNKNOWN if there was an error querying for VPCs', function (done) {
            const cache = createVpcErrorCache([describeInstances[0]], [describeLoadBalancers[0]], [listFunctions[0]], [describeRdsInstances[0]], [describeRedshiftClusters[0]]);
            defaultVpcInUse.run(cache, {}, (err, results) => {
                expect(results.length).to.equal(1);
                expect(results[0].status).to.equal(3);
                done();
            });
        });
        it('should UNKNOWN if there was an error querying for EC2 instances', function (done) {
            const cache = createInstanceErrorCache([describeVpcs[0]], [describeLoadBalancers[0]], [listFunctions[0]], [describeRdsInstances[0]], [describeRedshiftClusters[0]]);
            defaultVpcInUse.run(cache, {}, (err, results) => {
                expect(results.length).to.equal(2);
                expect(results[0].status).to.equal(3);
                done();
            });
        });

        it('should UNKNOWN if there was an error querying for load balancers', function (done) {
            const cache = createLoadBalancerErrorCache([describeVpcs[0]], [describeInstances[0]], [listFunctions[0]], [describeRdsInstances[0]], [describeRedshiftClusters[0]]);
            defaultVpcInUse.run(cache, {}, (err, results) => {
                expect(results.length).to.equal(2);
                expect(results[0].status).to.equal(3);
                done();
            });
        });
        it('should UNKNOWN if there was an error querying for lambda functions', function (done) {
            const cache = createLambdaErrorCache([describeVpcs[0]], [describeInstances[0]], [describeLoadBalancers[0]], [describeRdsInstances[0]], [describeRedshiftClusters[0]]);
            defaultVpcInUse.run(cache, {}, (err, results) => {
                expect(results.length).to.equal(2);
                expect(results[0].status).to.equal(3);
                done();
            });
        });
        it('should UNKNOWN if there was an error querying for rds instances', function (done) {
            const cache = createRdsErrorCache([describeVpcs[0]], [describeInstances[0]], [describeLoadBalancers[0]], [listFunctions[0]], [describeRedshiftClusters[0]]);
            defaultVpcInUse.run(cache, {}, (err, results) => {
                expect(results.length).to.equal(2);
                expect(results[0].status).to.equal(3);
                done();
            });
        });
        it('should UNKNOWN if there was an error querying for redshift clusters', function (done) {
            const cache = createRedshiftErrorCache([describeVpcs[0]], [describeInstances[0]], [describeLoadBalancers[0]], [listFunctions[0]], [describeRdsInstances[0]]);
            defaultVpcInUse.run(cache, {}, (err, results) => {
                expect(results.length).to.equal(2);
                expect(results[0].status).to.equal(3);
                done();
            });
        });

        it('should not return any results if unable to query for VPCs', function (done) {
            const cache = createNullCache();
            defaultVpcInUse.run(cache, {}, (err, results) => {
                expect(results.length).to.equal(0);
                done();
            });
        });
    });
});
