// flightplan.js
const plan = require('flightplan');

// configuration
plan.target('staging', {
    host: '192.168.1.3',
    username: 'deploy',
    agent: process.env.SSH_AUTH_SOCK,
});

plan.target('production', {
    host: 'ec2-54-70-204-182.us-west-2.compute.amazonaws.com',
    username: 'deploy',
    agent: process.env.SSH_AUTH_SOCK,
});

//
// plan.target('production', [
//     {
//         host: 'www1.example.com',
//         username: 'pstadler',
//         agent: process.env.SSH_AUTH_SOCK
//     },
//     {
//         host: 'www2.example.com',
//         username: 'pstadler',
//         agent: process.env.SSH_AUTH_SOCK
//     }
// ]);

const tmpDir = `challenges-frontend${new Date().getTime()}`;
const stagingFolder = '/home/deploy/apps/challenges-frontend/';

// run commands on localhost
plan.local((local) => {
    local.log('Run build');
    local.exec('npm run prod:build');

    local.log('Copy files to remote hosts');
    const filesToCopy = local.exec('ls -d -1 public/*', { silent: true });
    local.transfer(filesToCopy, `/tmp/${tmpDir}`);
});

// run commands on the target's remote hosts
plan.remote((remote) => {
    remote.log('Move folder to web root');
    remote.sudo(`cp -R /tmp/${tmpDir}/public/* ${stagingFolder}`, { user: 'deploy' });
    remote.rm(`-rf /tmp/${tmpDir}`);

    remote.log('Copying is finished');
});
