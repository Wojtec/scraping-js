const fs = require('fs').promises;
const merca = require('./service/mercadona');


let TARGET_URL = "https://tienda.mercadona.es/categories/112";

(async () =>{

    await merca.initialize(TARGET_URL);
    let results = await merca.getResults();

    let data = JSON.stringify(results, null, 2);

    await fs.writeFile('mercadonaDB.json', data,(err)=>{

        if(err) throw err;
        console.log('Data written to file');

    });

    console.log('This is after the write call');

debugger;
})();