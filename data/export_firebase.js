fs = require('fs');
//fs.unlinkSync('plants_db.json');
for (var j = 1; j <= 1; j++) {
    var plants = require('./plant_db_' + j + '.json');
    var allFull = {};
    allFull.plants = [];
    for (var i = 0; i < plants.length; i++) {
        plantLight = {
            "id": plants[i].id,
            "fullname": plants[i].fullname,
            "image_path": plants[i].hasOwnProperty('images') ? plants[i].images[0].image_path : null
        };
        allFull.plants.push(plantLight);
        allFull[plants[i].id] = plants[i];
        console.log(plants[i].id);
    }
    jsonText = JSON.stringify(allFull);
    fs.appendFileSync('plants_firebase.json', jsonText);
}
