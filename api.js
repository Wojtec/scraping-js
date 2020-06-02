const merca = require('./mercadona');

let TARGET_URL = "https://tienda.mercadona.es/categories/112";

(async () =>{

    await merca.initialize(TARGET_URL);
    let results = await merca.getResults();

console.log(results);

debugger;
})();