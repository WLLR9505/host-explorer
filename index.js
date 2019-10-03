#!/usr/bin/env node
var path = require('path'),
    http = require('http'),
    htmlBuilder = require('./front/hostExplorer'),
    Navigator = require('./navigator'),
    config = require('./config'),
    fileHandler = require('./filehandler'),
    parse = require('url').parse;

process.title = 'hostExporer';
var args = process.argv,
    port = args[3] || 8000,
    rootFolder = args[2] || path.resolve(process.cwd()),
    types = config.types,
    webServer = http.createServer(),
    html;

rootFolder = rootFolder.replace(/%20/g, ' ');
rootFolder = rootFolder.replace(/\\/g, '/');
var nav = new Navigator(rootFolder);
    
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
        html = htmlBuilder(nav.fullPath);
        webServer.on('request', onRequest);
    }
}

function onRequest (req, res) {
    var filename = parse(req.url).pathname;

    var extension = filename.substr(filename.lastIndexOf('.') + 1).toLowerCase();
    
    if (filename == '/')
        filename = rootFolder;
    
    if (filename == '/_BACK_') {
        nav.goBack();
    } else if (!nav.fullPath.includes(filename)) {
        nav.goTo(filename);
    }

    if (!filename.includes('.')) { //if Folder
        html = htmlBuilder(nav.fullPath);
        res.writeHead(200, {
            'Content-Type': 'html',
            'Content-Lenght': html.length
        });
        res.end(html);
    } else { // if File
        fileHandler(nav.fullPath, (data) => {
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
//-----------------------------
main();
