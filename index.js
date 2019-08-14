let request = require('request');
const j = request.jar()
request = request.defaults({jar:j})
const cheerio = require('cheerio');
const fs = require('fs');

request({
    method: 'GET',
    url: 'https://www.adidas.com/us/order-tracker',
    headers: {
        'authority': 'www.adidas.com',
        'method': 'GET',
        'path': '/us/order-tracker?cm_mmc=AdiEmail_OLC-_-None-_-Order_Confirmation-_-Transactional-_-MainBodyCTA-_-dv:eCom-_-cn:Order_Related-_-pc:None&cm_mmc1=US&cm_mmca3=F20D9FW7HNAREF8L&cm_mmca4=124978&cm_mmc2=adidas-NA-eCom-Email-OLC-None-None-US-Order_Related-None-1908',
        'scheme': 'https',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'max-age=0',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
    },
    qs: {
        'cm_mmc': 'AdiEmail_OLC-_-None-_-Order_Confirmation-_-Transactional-_-MainBodyCTA-_-dv:eCom-_-cn:Order_Related-_-pc:None',
        'cm_mmc1': 'US',
        'cm_mmca3': 'F20D9FW7HNAREF8L',
        'cm_mmca4': '124978',
        'cm_mmc2': 'adidas-NA-eCom-Email-OLC-None-None-US-Order_Related-None-1908'
    }
}, (e, r, b) => {
    if (e) console.error(e);
    console.log(r.statusCode);
    if (r.statusCode == 200) {
        request({
            method: 'POST',
            url: 'https://www.adidas.com/us/order-tracker',
            headers: {
                'authority': 'www.adidas.com',
                'method': 'POST',
                'path': '/us/order-tracker?dwcont=C1064070426',
                'scheme': 'https',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'max-age=0',
                'content-type': 'application/x-www-form-urlencoded',
                'origin': 'https://www.adidas.com',
                'referer': 'https://www.adidas.com/us/order-tracker?dwcont=C1164731334',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
            },
            qs: {
                'dwcont': 'C1064070426'
            },
            form: {
                'dwfrm_ordersignup_orderNo': '',
                'dwfrm_ordersignup_email': '',
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
                    const $ = cheerio.load(b);
                    fs.writeFileSync('helo' + (Math.random() * 10).toString() + '.html', b);
                    console.log($('.order-step selected').text());
                    
                }
            }
        })
    }
})
