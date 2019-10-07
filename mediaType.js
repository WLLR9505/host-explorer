const fs = require('fs');
const config = require('./config');
module.exports = (res, req, fullpath, extension) => {
    let stat = fs.statSync(fullpath);
    let fileSize = stat.size;
    let range = req.headers.range;
    if (range) {
        let parts = range.replace(/bytes=/, '').split('-');
        let start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        let chunksize = (end - start) + 1;
        let file = fs.createReadStream(fullpath, { start, end });

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': config.types[extension]
        });
        file.pipe(res);
    } else {
        res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': config.types[extension]
        });
        fs.createReadStream(fullpath).pipe(res);
    }
};
