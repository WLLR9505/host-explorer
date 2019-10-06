var fs = require('fs');
var styles = fs.readFileSync('./styles.css', 'utf8');

var files = [];
var folders = [];

function listItems (dir) { //usado para listar os itens
    var fileItems = [];
    var folderItems = [];
    fs.readdirSync(dir).forEach((i) => {
        let size = fs.statSync(dir + '/' + i).size / 1000000.0;
        if (size < 1) {
            size = Number(size * 1000).toFixed(2) + ' KB';
        } else {
            size = Number(size).toFixed(2) + ' MB';
        }

        var spanInfo = `<span style="display: none;" id="file=info"><span id="focus-info-file">${i}</span><span id="focus-info-size">${size}</span></span>`;

        if (i.toLowerCase().includes('.jpg')) {
            fileItems.push(`<a onclick="nav(this)" onmouseover="showInfo(this)"><span id="file-name">${i}${spanInfo}</span><i class="zmdi zmdi-image-o"></i></a>`);
        } else if (i.toLowerCase().includes('.mp4')) {
            fileItems.push(`<a onclick="nav(this)" onmouseover="showInfo(this)"><span id="file-name">${i}${spanInfo}</span><i class="zmdi zmdi-videocam"></i></a>`);
        } else if (i.toLowerCase().includes('.mp3')) {
            fileItems.push(`<a onclick="nav(this)" onmouseover="showInfo(this)"><span id="file-name">${i}${spanInfo}</span><i class="zmdi zmdi-speaker"></i></a>`);
        } else if (i.toLowerCase().includes('.')) {
            fileItems.push(`<a onclick="nav(this)" onmouseover="showInfo(this)"><span id="file-name">${i}${spanInfo}</span><i class="zmdi zmdi-file"></i></a>`);
        } else if (!i.toLowerCase().includes('.')) {
            folderItems.push(`<a onclick="nav(this)" onmouseover="showInfo(this)"><span id="file-name">${i}${spanInfo}</span><i class="zmdi zmdi-folder"></i></a>`);
        }
    });
    files = fileItems;
    folders = folderItems;
}

module.exports = function htmlBuilder (path, shortPath) {
    listItems(path);

    return `<!DOCTYPE html>
<html lang="en">
    <head>
        <title>${path}</title>
        </head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
        <style>${styles}</style>
        <script>
        function nav(d) {
            var p = document.getElementById('currentPath');
            location.href = location.protocol + "//" + location.host + p.innerText + '/' + d.innerText;
            console.log('./' + p.innerText + '/' + d.innerText);
        }

    function showInfo(el) {
        var statusBar = document.getElementById('statusBar');
        statusBar.innerHTML = el.childNodes[0].childNodes[1].innerHTML;
        
        var bgImg = statusBar.childNodes[0].innerText;
        
        if (bgImg.toLowerCase().includes('.jpg')) {
            var background = document.getElementById('bg');
            background.style.backgroundImage = 'url(' + location.protocol + '//' + location.host + location.pathname + '/' + bgImg + ')';
        }
    }
    </script>
        <body>
    <span id="bg">
    </span>
    <span id="black-prompt">
    <span id="pathBar">
            <a id="BACK" href="${shortPath}_BACK_" ><i class="zmdi zmdi zmdi-arrow-left"></i></a>
        <span id="currentPath">${shortPath}</span>
        </span>
        <span id="folders-area">
            ${folders.join('\n')}
        </span>
        <span id="files-area">
            ${files.join('\n')}
        </span>
        <span id="statusBar">
            host explorer v1.0
        </span>
    </span>
    </body>
</html>`;
}
;
