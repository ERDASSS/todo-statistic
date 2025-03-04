const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
//readLine(processCommand);
processCommand('sort date');

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    const commandSplit = command.split(' ');
    const TODOs = getTODOComments(getFiles());
    switch (commandSplit[0]) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            for (const TODO of TODOs) {
                console.log(TODO.str)
            }
            break;
        case 'important':
            const importantTODO = [];
            for (const str of TODOs){
                if (str.str.at(-2) === '!')
                    importantTODO.push(str.str);
            }
            console.log(importantTODO);
            break;

        case 'user':
            const strToFind = `TODO ${commandSplit[1]}`
            const TODOWithUsers = [];
            for (const str of TODOs) {
                if (str.str.toLowerCase().includes(strToFind.toLowerCase())) {
                    TODOWithUsers.push(str.str);
                }
            }
            console.log(TODOWithUsers);
            break;
        case 'sort':
            sort(commandSplit[1], TODOs);
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
            if ((split.length > 1 || str.slice(0, 2) === '//') && split[1].slice(1, 5) === 'TODO') {
                if (split[1].split(';').length - 1 === 2) {
                    const TODO = {
                        name: split[1].split(';')[0].slice(6),
                        str: '//' + split[1],
                        date: split[1].split(';')[1].replace(' ', ''),
                        importance: split[1].split('!').length - 1
                    }
                    arrStr.push(TODO);
                } else {
                    const TODO = {
                        name: '',
                        str: '//' + split[1],
                        date: '',
                        importance: split[1].split('!').length - 1
                    }
                    arrStr.push(TODO);
                }
            }
        }
    }

    return arrStr;
}

function  sort(command, TODOs) {
    switch (command) {
        case 'importance':
            const sortedTODOs = TODOs.sort((a, b) => b.importance - a.importance);
            for (const TODo of sortedTODOs) {
                console.log(TODo.str);
            }
            break;
        case 'user':
            const sort1 = TODOs.sort((a, b) => b.name.length - a.name.length);
            for (const TODo of sort1) {
                console.log(TODo.str);
            }
            break;
        case 'date':
            const sort2 = TODOs.sort((a, b) => new Date(b.date) - new Date(a.date));
            for (const TODo of sort2) {
                console.log(TODo.str);
            }
            break;
    }
}



// TODO you can do it!
