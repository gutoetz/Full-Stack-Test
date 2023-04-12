const puppeteer = require('puppeteer');

async function scrapeMercadoLivre() {
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
        const image = await product.$eval('.SearchCard_ProductCard_Image__ffKkn', img => img.src);
        const description = await product.$eval('.Text_Text__h_AF6', title => title.textContent);
        const price = await product.$eval('.Text_Text__h_AF6', price => price.textContent);
  
        results.push({ image, description, price });
      } catch (error) {
        console.log(`Erro ao extrair informações do produto: ${error}`);
      }
    }
  
    await browser.close();
  
    return results;
  }
  
  

module.exports = scrapeMercadoLivre;