module.exports = `
html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

#bg {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(3px);
    opacity: 75%;
    
    /*remove blur border*/
    margin: -5px;
    position: fixed;
    overflow: hidden;
    width: 110%;
    height: 110%
}

body {
    font-family: consolas, Liberation Mono, monospace, Courier;
    background-image: linear-gradient(-90deg, rgb(0, 174, 255), rgb(0, 255, 221));
    display: grid;
}

i {
    position: sticky;
    width: 100%;
    text-align: right;
    height: 20%;
}

a:hover {
    border-image: linear-gradient(to left,  #00aeff 0%, #00ffdd 100%);
        border-image-slice: 1;
        border-width: 1px;
    transition: 0.25s;
}


a {
    text-decoration: none;
    color: white;
    font-size: 2vh;
    border: 1px solid white;
    display: inline-block;
    margin: 1%;
    padding: 1%;
}

#folders-area a, #files-area a {
    height: 8vh;
    width: 8vh;
    animation: fadeIn 0.5s ease-in-out;
}

#folders-area {
    grid-area: folders;
    border-image: linear-gradient(to left,  #00aeff 0%, #00ffdd 100%);
        border-image-slice: 1;
        border-width: 2px;
        border-top: 0;
        border-right: 0;
        border-left: 0;
}

#files-area {
    grid-area: files;
}

#folders-area, #files-area {
    width: 94%;
    padding: 1% 3% 1% 3%;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

#file-name {
    height: 80%;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

#black-prompt {
    background-color: rgba(0, 0, 0, 0.945);
    width: 70vw;
    height: 90vh;
    justify-self: center;
    align-self: center;
    box-shadow: 4px 4px 4px 1px #000000a6;
    border-radius: 20px;
    color: white;

    display: grid;
    grid-template-areas: "pathbar"
                         "folders"
                         "files"
                         "statusbar";
    grid-template-rows: 3% 20% 74% 3%;
    z-index: 1;
}

#pathBar, #statusBar {
    border: black solid 2px;
    display: grid;
    color: white;
    background-color: black;
    align-content: center;
    padding: 0 5%;
    font-size: 2vh;
    overflow: hidden;
    text-overflow: ellipsis;
}

#pathBar {
    display: grid;
    grid-area: pathbar;
    border: black solid 2px;
    font-weight: bold;
    grid-template-areas: "back path";
    grid-template-columns: 5% 95%;

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    align-items: center;
}

#BACK {
    display: grid;
    grid-area: back;
    border: none;
    justify-content: left;
    font-size: 3vh;
}

#currentPath {
    display: grid;
    grid-area: path;
    margin: 0 5%;
}

#statusBar {
    grid-area: statusbar;

    display: grid;
    border: black solid 2px;
    font-weight: bold;
    grid-template-columns: 90% 10%;

    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    align-items: center;
}

#focus-info-size {
    color: rgb(0, 174, 255);
}

#focus-info-file {
    color: rgb(0, 255, 221);
}

::-webkit-scrollbar { 
    width: 0;
    height: 0;
}

@-webkit-keyframes fadeIn {
    0% { opacity: 0; } 
    100% { opacity:1; }
}`;
