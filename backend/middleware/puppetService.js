const puppeteer = require('puppeteer');
const puppeteerExtra = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteerExtra.use(StealthPlugin());


async function scrape({brand, category, q}) {
  let categoryUsed = '';
  if (category === 'mobile') categoryUsed = 'celular'
  if (category === 'refrigerator') categoryUsed = 'geladeira'
  if (category === 'tv') categoryUsed = 'tv'
  let searchQuery = q.replace(/\s+/g, '-')
  let url = brand === 'mercadolivre' ? `https://lista.mercadolivre.com.br/${categoryUsed}-${searchQuery}` : `https://www.buscape.com.br/${categoryUsed}/${searchQuery}`;
  let uiLayout = brand === 'mercadolivre' ? '.ui-search-layout__item' : '.Paper_Paper__HIHv0';
  let uiImage = brand === 'mercadolivre' ? '.shops__image-element' : '[data-testid="product-card::image"]';
  let uiDescription = brand === 'mercadolivre' ? '.ui-search-item__title' : '.SearchCard_ProductCard_Name__ZaO5o';
  let uiPrice = brand === 'mercadolivre' ? '.price-tag-fraction' : '.Text_MobileHeadingS__Zxam2';

  const browser = await puppeteerExtra.launch();
  const page = await browser.newPage();

  await Promise.all([
    page.goto(url, { waitUntil: 'networkidle2' }),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);

  const products = await page.$$(uiLayout);

  const results = [];
  let count = 0; // Inicializa o contador
  
  for (let product of products) {
      try {
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
        price = price.toString();
        results.push({ image, description, price });
        count++; // Incrementa o contador após adicionar um produto aos resultados
        
        if (count === 3) break; // Encerra o loop após adicionar 10 produtos aos resultados
        
      } catch (error) {
        console.log(`Erro ao extrair informações do produto: ${error}`);
      }
    }
    

  await browser.close();

  return results;
}

  
  

module.exports = scrape;