let doc = require('./docxGenerator');
let model = require('../Model/modelCombainer')

module.exports.docReports = {
    priceList: async () => {
        let items = await model.get.GetShopItemsReport()
        let body = items.map(k => [k.header, k.price]);
        return doc.getDoc({title: 'Прайс лист', headers: ["Товар","Цена"], body,description:
                'Цена указана в условных единицах и может отличаться от реальной, реальную цену вы можете уточнить у оператора.'
        })
    },
    ordersCount: async () => {
        let items = await model.get.OrdersCountByCategory();
        let body = items.map(k => [k.categoryName, k.count || 0])
        return doc.getDoc({
            title: 'Отчет о количестве заказанной продукции',
            headers: ['Тип', 'Количство заказов'],
            body
        })
    },
    mostPopular: async () => {
        let items = await model.get.MostPopular();
        let body = items.map(k => [k.header, k.count || 0, k.rating || 0])
        return doc.getDoc({
            title: 'Топ самой популярной продукции',
            headers: ['Модель', 'Количство заказов', 'Рейтинг'],
            body
        })
    },
    Customers: async () => {
        let items = await model.get.InfoCustomers();
        let body = items.map(k => [k.name,k.email,k.phone, k.count || 0])
        return doc.getDoc({
            title: 'Отчет о заказчиках',
            headers: ['ФИО', 'Email', 'Телефон','Количство заказов'],
            body
        })
    }
}