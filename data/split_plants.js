fs = require('fs');
//fs.unlinkSync('plants_db.json');
for (var j = 1; j <= 17; j++) {
    var plants = require('./plant_db_' + j + '.json');
    for (var i = 0; i < plants.length; i++) {
        jsonText = JSON.stringify(plants[i]);
        fs.writeFileSync('plants/plant_'+plants[i].id+'.json', jsonText);
        console.log(plants[i].id);
    }
    //console.log(result);
}
