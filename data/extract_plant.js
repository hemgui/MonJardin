fs = require('fs');
//fs.unlinkSync('plants_db.json');
for (var j = 1; j <= 17; j++) {
    var plants = require('./plant_db_' + j + '.json');
    for (var i = 0; i < plants.length; i++) {
        plant = {
            "id": plants[i].id,
            "fullname": plants[i].fullname,
            "image_path": plants[i].hasOwnProperty('images') ? plants[i].images[0].image_path : null
        };
        jsonText = JSON.stringify(plant);
        fs.appendFileSync('plants_db.json', jsonText + ",");
        console.log(plant);
    }
    //console.log(result);
}
