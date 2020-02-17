let container = document.getElementById('container');

let pos = 0;

let URL_API = 'http://localhost:3334/recommendation?maxProducts=16';


const loadProducts = () => {
    fetch(URL_API)
    .then((response) => response.json())
    .then(function(data) {
        const arrMostPopular = data.mostPopular.products.map((item, idx)=> ({
            ...item,
            position: idx+1
        }));

        const arrPriceReduction = data.priceReduction.products;

        renderCarousel(data.mostPopular.title, arrMostPopular, 'popular', pos);
        renderCarousel(data.priceReduction.title, arrPriceReduction, 'reduction', pos);
      });
}

    loadProducts();

      function renderCarousel(title, products, type, pos){
        let carousel = document.createElement('div'),
            listProducts = document.createElement('ul'),
            btnNext = document.createElement('BUTTON'),
            btnPrevious = document.createElement('BUTTON');
            btnNext.classList.add('next');
            btnNext.innerHTML = '<img src="src/img/right-arrow.svg" />';
            btnPrevious.classList.add('previous');
            btnPrevious.innerHTML = '<img src="src/img/left-arrow.svg" />';
            carousel.classList.add('carousel');

            btnNext.onclick = ()=> { pos < products.length-4 && renderItems(products, pos+=4)}
            btnPrevious.onclick = ()=> { pos > 0 && renderItems(products, pos-=4)}

            function renderItems(products, pos){
                let item = ``;
                products.slice(pos,pos+4).map(product=> {
                    item += `<li>
                                <img src=${addPrefixURL(product.images.default)} />
                                <div>
                                    <h3>${product.name}</h3>
                                    <span>${formatPrice.format(product.oldPrice)}</span>
                                    <p>Por <strong>${formatPrice.format(product.price)}</strong></p>
                                    <p>10x ${formatPrice.format(product.price/10)}</p>
                                    <span class=${type}>${type === 'popular' ? `${product.position}°` : getReductionPrice(product.price, product.oldPrice)}</span>
                                </div>
                            </li>`;        
                    listProducts.innerHTML = item;
                    listProducts.append(btnPrevious, btnNext);
                });
            }
            renderItems(products, pos);
    
        carousel.innerHTML = `<h2>${title}</h2>`;
        carousel.appendChild(listProducts);
        container.append(carousel);
    }


      function addPrefixURL(string){ // para concatenar o protocolo http com o link das imagens
          let prefix = 'http:';
          return prefix+string;
      }

      function getReductionPrice(price,oldPrice){ // função para calcular porcentagem do desconto
          return `${(((price - oldPrice)/oldPrice)*100).toFixed(0)}%`
      }

      const formatPrice = new Intl.NumberFormat('pt-BR', { // formatar valor recebido da api em monetário
        style: 'currency',
        currency: 'BRL',
      });
    
