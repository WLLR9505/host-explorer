module.exports = class Navigator {
    constructor (currentDir) {
        this.currentDir = currentDir.split('/');
        this.fullPath = currentDir;
    }
    goTo (dir) {
        let last = this.currentDir.length - 1;
        if (String(this.currentDir[last]).includes('.')) {
            this.currentDir.pop();
        }
        this.currentDir.push(dir.replace('/',''));
        this.fullPath = this.currentDir.join('/');
    }
    goBack () {
        let last = this.currentDir.length - 1;
        if (String(this.currentDir[last]).includes('.')) {
            this.currentDir.pop();
        }
        this.currentDir.pop();
        this.fullPath = this.currentDir.join('/');
    }
};
