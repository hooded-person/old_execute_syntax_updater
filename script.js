console.log("script loaded");
const regex = /^execute (.*?) ((?:[~^]-?\d* ?|-?\d+ ?){3})(?: detect ((?:[~^]-?\d* ?|-?\d+ ?){3}) (\D*) (\d))? (.*)/gm;

const commandInput = document.getElementById("commandInput");
const commandOutput = document.getElementById("commandOutput");
commandInput.addEventListener("change", ()=>{
    let count = (commandInput.value.match(/\n/g) || []).length + 1
    if (count > 10 ) {
        commandInput.rows = count
        commandOutput.rows = count
    } else {
        commandInput.rows = 10
        commandOutput.rows = 10
    };
    console.log(count); 
});

const button = document.getElementById("updateButton");
button.addEventListener("click", () => {
    commandOutput.value = ""
    commandOutput.value = parseInput(commandInput.value);
});

function updateCommand(command) {
    console.log("UPDATING...");
    console.log(command);
    let results = [...command.matchAll(regex)][0];
    let target = results[1];
    let position = results[2];
    let detectPos = results[3];
    let detectBlock = results[4];
    let detectState = results[5];
    let chainCommand = results[6];
    let newCommand = "execute as " + target + " at @s";
    if (!(/(?:~0? ?){3}/gm.test(position))) {
        newCommand = newCommand + " positioned " + position;
    };
    if (detectPos) {
        newCommand = newCommand + ` if block ${detectPos} ${detectBlock} ${detectState}`
    };
    if (chainCommand.startsWith("execute")) {
        chainCommand = updateCommand(chainCommand);
        newCommand = newCommand + chainCommand.substring("execute".length);
    } else {
        newCommand = newCommand + " run " + chainCommand;
    };
    newCommand = newCommand.replace("as @s", "");
    newCommand = newCommand.replace("at @s at @s", "at @s");
    newCommand = newCommand.replace("  ", " ");
    console.log(newCommand);
    console.log("UPDATED");
    return newCommand;
};

function parseInput(input) {
    let commands = input.split("\n")
    commands = commands.map(updateCommand)
    console.log(commands)
    return commands.join("\n")
};
