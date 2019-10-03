var fs = require('fs');

module.exports = (filename, successFn, errorFn) => {
    fs.readFile(filename, (err, data) => {
        if (err) {
            errorFn(err);
        } else {
            successFn(data);
        }
    });
};
