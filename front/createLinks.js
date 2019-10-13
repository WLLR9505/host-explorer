const fs = require('fs');

//extention / function / icon
var types = [
    [ '.jpg', 'openImage(this)', 'zmdi zmdi-image-o' ],
    [ '.jpeg', 'openImage(this)', 'zmdi zmdi-image-o' ],
    [ '.png', 'openImage(this)', 'zmdi zmdi-image' ],
    [ '.gif', 'openImage(this)', 'zmdi zmdi-gif' ],
    [ '.mp3', 'nav(this)', 'zmdi zmdi-headset' ],
    [ '.mp4', 'nav(this)', 'zmdi zmdi-videocam' ],
    [ '.pdf', 'nav(this)', 'zmdi zmdi-book' ],
    [ '.', 'nav(this)', 'zmdi zmdi-file' ]
];

module.exports = (dir, t, folders, files) => {
    let size = fs.statSync(dir + '/' + t).size / 1000000.0;
    if (size < 1) {
        size = Number(size * 1000).toFixed(2) + ' KB';
    } else {
        size = Number(size).toFixed(2) + ' MB';
    }

    var spanInfo = `<span style="display: none;" id="file=info"><span id="focus-info-file">${t}</span><span id="focus-info-size">${size}</span></span>`;

    if (fs.statSync(dir + '/' + t).isDirectory()) {
        folders.push(`<a onclick="nav(this)" onmouseover="showInfo(this)"><span id="file-name">${t}${spanInfo}</span><i class="zmdi zmdi-folder"></i></a>`);
        return;
    }

    for (let index = 0; index < types.length; index++) {
        if (t.toLowerCase().includes(types[index][0])) {
            files.push(`<a onclick="${types[index][1]}" onmouseover="showInfo(this)"><span id="file-name">${t}${spanInfo}</span><i class="${types[index][2]}"></i></a>`);
            break;
        }
        if (index == types.length - 1) {
            files.push(`<a onclick="${types[index][1]}" onmouseover="showInfo(this)"><span id="file-name">${t}${spanInfo}</span><i class="${types[index][2]}"></i></a>`);
        }
    }
};
