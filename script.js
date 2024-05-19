console.log("script loaded");
const regex = /^execute (.*?) ((?:~\d* ?|\d+ ?){3}) (.*)/gm;

const commandInput = document.getElementById("commandInput");
const commandOutput = document.getElementById("commandOutput");

const button = document.getElementById("updateButton");
button.addEventListener("click", () => {
    commandOutput.value = updateCommand(commandInput.value, 0);
});

function updateCommand(command) {
    console.log("UPDATING...")
    console.log(command);
    console.log(regex)
    let results = [...command.matchAll(regex)][0];
    console.log(results);
    let target = results[1]
    let position = results[2]
    let chainCommand = results[3]
    let newCommand = "execute as " + target + " at @s";
    if (position != "~ ~ ~") {
        newCommand = newCommand + " positioned " + position;
    };
    if (chainCommand.startsWith("execute")) {
        chainCommand = updateCommand(chainCommand);
        newCommand = newCommand + chainCommand.substring("execute".length);
    } else {
        newCommand = newCommand + " run " + chainCommand;
    };
    console.log(newCommand);
    console.log("UPDATED")
    return newCommand
};