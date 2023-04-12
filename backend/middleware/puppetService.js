const puppeteer = require('puppeteer');

async function scrapeMercadoLivre({brand, category}) {
    console.log('duashdasuhduasda', brand)
    let uiImage = '.ui-search-result-image__element'
    let uiDescription = '.ui-search-item__title'
    let uiPrice = '.price-tag-fraction'
    let uiLayout = '.ui-search-layout__item'
    let uiUrl = 'https://www.buscape.com.br/search?q=tv'

    // const url = 'https://lista.mercadolivre.com.br/tv';
    const url = 'https://www.buscape.com.br/search?q=tv';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.goto(url, { waitUntil: 'networkidle2' });
  
    const products = await page.$$('.Paper_Paper__HIHv0');
  
    const results = [];
  
    for (let product of products) {
        try {
          await product.waitForSelector('.SearchCard_ProductCard_Image__ffKkn', { timeout: 5000 });
          const container = await product.$('[data-testid="product-card::image"]'); // Select the div that contains the image
          const imageElement = await container.$('img'); // Select the image element within the div
          const image = await imageElement.evaluate(img => img.src); // Get the 'src' attribute of the image element

          const description = await product.$eval('.SearchCard_ProductCard_Name__ZaO5o', title => title.textContent);

          let price = await product.$eval('.Text_MobileHeadingS__Zxam2', price => price.textContent);
          if (isNaN(price)) price = parseFloat(price.replace(/[^\d,.-]/g, '').replace(',', '.'))
          
          results.push({ image, description, price });
        } catch (error) {
          console.log(`Erro ao extrair informações do produto: ${error}`);
        }
      }
      
  
    await browser.close();
  
    return results;
  }
  
  

module.exports = scrapeMercadoLivre;