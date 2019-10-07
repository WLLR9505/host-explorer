#!/usr/bin/env node
var path = require('path'),
    http = require('http'),
    fs = require('fs'),
    parse = require('url').parse,
    videoStream = require('./videoType'),
    htmlBuilder = require('./front/hostExplorer'),
    config = require('./config'),
    fileHandler = require('./filehandler');

process.title = 'hostExplorer';
var args = process.argv,
    port = args[3] || 8000,
    rootFolder = args[2] || path.resolve(process.cwd()),
    types = config.types,
    webServer = http.createServer(),
    html;

rootFolder = rootFolder.replace(/%20/g, ' ');
rootFolder = rootFolder.replace(/\\/g, '/');

var FULLPATH = rootFolder;
    
function main () {
    if (args[2] == '-h') {
        help();
    } else {
        try {
            webServer.listen(port, () => {
                process.stdout.write(`\x1b[01;32mHost Explorer started at: ${rootFolder}\x1b[0m\n`);
                process.stdout.write(`\x1b[01;36mhttp://localhost:${port}/\x1b[0m\n`);
                process.stdout.write('\x1b[01;33mCtrl+C to Shutdown\x1b[0m\n');
            });
        } catch (e) {
            process.stdout.write('\x1b[01;31mOcorreu um erro!\x1b[0m\n');
            process.stdout.write(e);
        }
        html = htmlBuilder(FULLPATH, FULLPATH.replace(rootFolder, ''));
        webServer.on('request', onRequest);
    }
}

function goTo (target) {
    if (target.includes('_BACK_')) { //ignore '_BACK_'
        target = target.split('/');
        target = target.filter((i) => {
            return !i.includes('_BACK_');
        });
        target = target.join('/');
    }
    return rootFolder + target;
}

function onRequest (req, res) {
    try {
        var filename = parse(req.url).pathname;
        console.log('REQUEST:   ' + rootFolder + filename);

        var extension = filename.substr(filename.lastIndexOf('.') + 1).toLowerCase();

        if (!FULLPATH.includes(filename))
            FULLPATH = goTo(filename);

        if (fs.statSync(FULLPATH).isDirectory()) { //if Folder
            html = htmlBuilder(FULLPATH, FULLPATH.replace(rootFolder, ''));
            res.writeHead(200, {
                'Content-Type': 'html',
                'Content-Lenght': html.length
            });
            res.end(html);
        } else { // if File
            if (filename.includes('.mp4')) {
                videoStream(res, req, FULLPATH);
            } else {
                fileHandler(FULLPATH, (data) => {
                    res.writeHead(200, {
                        'Content-Type': types[extension] || 'text/plain',
                        'Content-Lenght': data.length
                    });
                    res.end(data);
                }, (err) => {
                    console.log(err);
                    res.writeHead(404);
                    res.end();
                });
            }
        }
    } catch (error) {
        console.log('\x1b[01;31;1mattention! an error has been occurred\x1b[0m\n');
    }
}
//-----------------------------
main();
