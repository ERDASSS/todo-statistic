const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
processCommand('show')

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            const ans = getTODOComments(getFiles());
            console.log(ans)
            break;
        default:
            console.log('wrong command');
            break;
    }
}

function getTODOComments(files) {
    let arrStr = [];
    for (const file of files) {
        const code = file.split('\n');
        for (const str of code) {
            const split = str.split('//');

            if ((split.length > 1 || str.slice(0, 2) === '//') && split[1].slice(1, 5) == 'TODO') {
                arrStr.push('//' + split[1]);
            }
        }
    }

    return arrStr;
}



// TODO you can do it!
