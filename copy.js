const fs = require('fs'),
      path = require('path');

function copySync(source, target) {
    let targetFile = target;

    if(fs.existsSync(target)){
        if(fs.lstatSync(target).isDirectory()){
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolder(source, target) {
    let files = [];
    
    console.log(`Copying source: ${source} to target: ${target}`);

    let targetFolder = path.join(target, path.basename(source));

    if(!fs.existsSync(targetFolder)){
        fs.mkdirSync(targetFolder);
    }

    if(fs.lstatSync(source).isDirectory()){
        files = fs.readdirSync(source);
        files.forEach(function(file){
            let currSrc = path.join(source, file);
            if(fs.lstatSync(currSrc).isDirectory()){
                copyFolder(currSrc, targetFolder);
            } else {
                copySync(currSrc, targetFolder);
            }
        });
    }
}

console.log(`Copying server/node_modules`);

copyFolder('./server/node_modules', './dist');

console.log(`Successfully copied node_modules`);

console.log(`Copying server/templates`);

copyFolder('./server/templates', './dist');

console.log(`Successfully copied templates`);

console.log(`Copying /static`);

copyFolder('./static', './dist');

console.log(`Successfully copied static`);

console.log(`Copying .env`);

copySync('.env', './dist');

console.log(`Successfully copied .env`);

console.log(`Copying package.json`);

copySync('package.json', './dist');

console.log(`Successfully copied package.json`);