const puppeteer = require('puppeteer');

async function scrape({brand, category, q}) {
    let url = brand === 'mercadolivre' ? `https://lista.mercadolivre.com.br/${category}-${q}` : `https://www.buscape.com.br/${category}/${q}`;
    let uiLayout = brand === 'mercadolivre' ? '.ui-search-layout__item' : '.Paper_Paper__HIHv0';
    let uiImage = brand === 'mercadolivre' ? '.ui-search-result-image__element' : '[data-testid="product-card::image"]';
    let uiDescription = brand === 'mercadolivre' ? '.ui-search-item__title' : '.SearchCard_ProductCard_Name__ZaO5o';
    let uiPrice = brand === 'mercadolivre' ? '.price-tag-fraction' : '.Text_MobileHeadingS__Zxam2';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.goto(url, { waitUntil: 'networkidle2' });
  
    const products = await page.$$(uiLayout);
  
    const results = [];
  
    for (let product of products) {
        try {
        //   await product.waitForSelector('.SearchCard_ProductCard_Image__ffKkn', { timeout: 5000 });
          let image = '';
          if (brand === 'buscape') {
              const container = await product.$(uiImage); 
              const imageElement = await container.$('img');
              image = await imageElement.evaluate(img => img.src);
          }
          else  {
            image = await product.$eval(uiImage, img => img.src);
        }

          const description = await product.$eval(uiDescription, title => title.textContent);

          let price = await product.$eval(uiPrice, price => price.textContent);
          if (isNaN(price)) price = parseFloat(price.replace(/[^\d,.-]/g, '').replace(',', '.'))
          
          results.push({ image, description, price });
        } catch (error) {
          console.log(`Erro ao extrair informações do produto: ${error}`);
        }
      }
      
  
    await browser.close();
  
    return results;
  }
  
  

module.exports = scrape;