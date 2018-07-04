var roleFarmer = require('role.farmer');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

function get_next_name(prefix){
    var i = 0;
    while(Game.creeps[prefix+i] != null) i++;
    return prefix+i;
}

function count_number_of_roles(){
    var amount = {
        "farmer": 0,
        "builder": 0,
        "upgrader": 0,
    };
    for(var name in Game.creeps) {
        var role = Game.creeps[name].memory.role;
        if (!(role in amount)) amount[role] = 0;
        amount[role]++;
    }
    return amount;
}

function task_idle(role){
    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        if (creep.memory.role == undefined){
            creep.memory.role = role;
        }
    }
}

function list_roles(){
    var amount = count_number_of_roles();
    for(var role in amount) console.log(role + ": " + amount[role]);
}

function spawn_creep(role, spawn){
    var name = get_next_name(role);
    console.log("Spawning creep ["+name+"]");
    spawn.spawnCreep([WORK, WORK, MOVE, CARRY], name, {"role": role});
}

module.exports = {
    "task_idle": task_idle,
    "list_roles": list_roles,
    "loop": function () { 
        for(var name in Game.spawns){
            var spawn = Game.spawns[name];
            if (spawn.energy >= 300){

                var amount = count_number_of_roles();
                if (amount["farmer"] < 4) spawn_creep("farmer", spawn);
                else if (amount["upgrader"] < 4) spawn_creep("upgrader", spawn);
                else if (amount["builder"] < 4) spawn_creep("builder", spawn);
            }
        }

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'farmer') roleFarmer.run(creep);
            if(creep.memory.role == 'builder') roleBuilder.run(creep);
            if(creep.memory.role == 'upgrader') roleUpgrader.run(creep);
        }
    }
};