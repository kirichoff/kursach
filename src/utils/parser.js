const urlProducts = 'http://maz.by/ru/products/';
const url = 'http://maz.by';
const scrapeIt = require("scrape-it");
const base64Img = require('base64-img');
const fs = require('fs');
let items = [];
let categoriess = [{url: "/ru/products/trailers/"},{url: "/ru/products/passenger_vehicle/"}];

 async function f (){
    let categoryes = await scrapeIt(urlProducts, {
        categories: {
            listItem: ".b-menu_left li",
            name: 'categories',
            data:{
                title: 'a',
                url:{selector: 'a',attr: 'href'}
            }
        }
    });
    categoryes = categoryes.data.categories;
    for(let pt of categoryes){
        const encoded = encodeURI(pt.url);
        console.log(encoded);
        let promise = await   scrapeIt(url+encoded,{
            items:{
                listItem: '.art-list li',
                name: 'arts',
                data: {
                    title: 'a',
                    url: {selector: 'a', attr: 'href'}
                }
            }
        });
        categoriess = [...categoriess, ... promise.data.items];
    }
    let categories = categoriess;
    let itemsByTabs = [];
    for(let category of  categories) {
        const encoded = encodeURI(category.url);
        let result = await scrapeIt(url + encoded, {
            itemsByTabs: {
                listItem: '.tabs div .b-catalog__item',
                name: 'tab',
                categories: 'h1',
                data: {
                    title: '.b-cit__item a',
                    url: {selector: 'a', attr: 'href'},
                }
            }
        });
        itemsByTabs  = [...itemsByTabs,...result.data.itemsByTabs];
        console.log(itemsByTabs.length)
    }
    let dataItems = [];
    for(let item of itemsByTabs){
        const encoded = encodeURI(item.url);
        //console.log(`${url}/${encoded}`);
        let result = await scrapeIt(url+encoded,{
            title: 'h1',
            image: {selector:'.b-c__pic img', attr:'src'},
            description: '.b-catalog p',
            category: '.crumbs a:nth-child(5n)',
            features: {
                listItem: 'table tr',
                data: {
                    titleFeature: 'td:nth-child(1)',
                    textFeature: 'td:nth-child(2)'
                }
            }
        });
        dataItems.push(result.data);
        console.log(dataItems.length)
    }
    console.log('dataitems',dataItems.length);
    for(let data of dataItems) {
        const encoded = encodeURI(data.image);
        await new Promise( (resolve,reject) => {
            base64Img.requestBase64(url + encoded, function (err, res, body) {
                items.push({...data, image: body});
                resolve({data: body});
                console.log('items', items.length);
            })});
    }
    return items;
}
// f().then(itm=>{
//     fs.writeFile('data.json', JSON.stringify(itm), 'utf8', ()=>{});
// });
