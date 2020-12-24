var fs = require('fs');

function deleteFolders(path) {
    if(fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
        fs.readdirSync(path).forEach(function(file, index) {
            let currPath = path + '/' + file;

            if(fs.lstatSync(currPath).isDirectory()){
                deleteFolders(currPath);
            } else {
                fs.unlinkSync(currPath);
            }
        });

        console.log(`Deleting directory '${path}'`);
        fs.rmdirSync(path);
    }
};

console.log(`Cleaning directory`);

deleteFolders("./dist");

console.log(`Successfully cleaned tree structure`);