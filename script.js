console.log("script loaded");
const commandkeywordRegex = /^execute (.*?) ((?:[~^]-?\d* ?|-?\d+ ?){3})(?: detect ((?:[~^]-?\d* ?|-?\d+ ?){3}) (\D*) (\d))? (.*)/gm;
const commandInput = document.getElementById("commandInput");
const commandOutput = document.getElementById("commandOutput");
const updateButton = document.getElementById("updateButton");
var inputTextValue = commandInput.value;
randPlaceholder = [
    "execute @a[x=3] ~ ~ ~ say hi",
    "execute @e[dy=4] 31 1 5 tell @a hi",
    "execute Steve ~5 ~30 5 execute @e[r=5] ~~~ kill @s",
    "execute @e[r=5] ~~~ kill @s",
    "execute @a ~ ~ ~ detect ~ ~-1 ~ stone 0 say player standing on stone",
    "execute @e[type=creeper] ~ ~ ~ summon lightning_bolt",
    "execute @e[type=skeleton] ~ ~ ~ effect @e[type=skeleton] speed 1 1 true",
    "execute @a ~ ~ ~ setblock ~ ~-1 ~ minecraft:diamond_block",
    "execute @a[x=100,y=64,z=100,r=5] ~ ~ ~ give @p minecraft:diamond_sword",
    "execute @e[type=zombie] ~ ~ ~ tp @s @p[r=8]",
    "execute @a[type=player,name=!\"Alex\"] ~ ~ ~ kill @e[type=cow,r=5]",
    "execute @a[scores={money=10..}] ~ ~ ~ say You have 10 or more money",
    "execute @e[type=pig] ~ ~ ~ detect ~ ~-1 ~ grass 0 kill @s",
    "execute @e[type=wolf] ~ ~ ~ tp @p @s",
    "execute @a[hasitem={item=diamond}] ~ ~ ~ effect @s strength 10 1 true",
    "execute @e[type=arrow] ~ ~ ~ execute @e[type=player, r=5] ~ ~ ~ effect @s poison 5 1 true",
    "execute @e[type=creeper] ~ ~1 ~ detect ~ ~-1 ~ stone 0 summon lightning_bolt"
];
updateButton.addEventListener("click", () => {
    commandOutput.value = "";
    commandOutput.innerText = parseInput(commandInput.value);
});

commandInput.placeholder = randPlaceholder[Math.floor(Math.random() * randPlaceholder.length)];


function updateCommand(command) {
    console.log("UPDATING...");
    console.log(command);
    let results = [...command.matchAll(commandkeywordRegex)][0];
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

function copyCommand() {
  var copyText = commandOutput.innerText;
  navigator.clipboard.writeText(copyText);
}
