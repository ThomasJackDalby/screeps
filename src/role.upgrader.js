var roleUpgrader = {

    run: function(creep) {
        if(creep.carry.energy == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[sources.length -1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[sources.length -1], {visualizePathStyle: {stroke: '#aaaaff'}});
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#aaaaff'}});
            }
        }
    }
};

module.exports = roleUpgrader;