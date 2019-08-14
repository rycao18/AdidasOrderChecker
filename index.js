const request = require('request');
const HTMLParser = require('node-html-parser');
 

request({
    method: 'POST',
    url: 'https://www.adidas.com/us/order-tracker',
    headers: {
        'authority': 'www.adidas.com',
        'method': 'POST',
        'path': '/us/order-tracker',
        'scheme':' https',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/x-www-form-urlencoded',
        'origin': 'https://www.adidas.com',
        'referer': 'https://www.adidas.com/us/order-tracker?cm_mmc=AdiEmail_OLC-_-None-_-Order_Confirmation-_-Transactional-_-MainBodyCTA-_-dv:eCom-_-cn:Order_Related-_-pc:None&cm_mmc1=US&cm_mmc2=adidas-NA-eCom-Email-OLC-None-None-US-Order_Related-None-1908',
        'upgrade-insecure-requests': 1,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
    },
    form: {
        'dwfrm_ordersignup_orderNo': 'AD031254434',
        'dwfrm_ordersignup_email': 'rycao18@gmail.com',
        'dwfrm_ordersignup_signup': 'Find order'
    }
}, (e, r, b) => {
    if (e) console.error(e);
    else {
        // 1 = processing
        // 2 = confirmed
        // 3 = shipped
        
        console.log(r.statusCode);
        if (r.statusCode == 200) {
            var root = HTMLParser.parse(b); 
            console.log(root)
        }
    }
})