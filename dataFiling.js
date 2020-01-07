const fs = require('fs');
const dataFiling ={};
 dataFiling.ShopItems= (model)=> {
    fs.readFile('data.json', 'utf8', async (err, dat) => {
        let arr = JSON.parse(dat);
        console.log('parser');
        for (let data of arr) {
            let category = await model.post.SetCategory2({
                categoryName: data.category
            });
            let id = await model.post.AddShopItem({
                description: data.description,
                header: data.title,
                price: Math.random() * 10000,
                categoryId: category.categoryId
            });
            for (let fe of data.features) {
                console.log(fe);
                if (fe.textFeature !== "" && fe.titleFeature !== "") {
                    await model.post.AddChar({
                        itemId: id[0].Id,
                        charName: fe.titleFeature,
                        charContent: fe.textFeature
                    })
                }
            }
            model.post.AddItemContent({
                itemId: id[0].Id,
                content: data.image
            });
        }
    });
 };

 dataFiling.rating = (model)=>{
     let rate = Math.random() * (5- 1) + 1;
     // model.SetRating()
 };

module.exports = dataFiling;
