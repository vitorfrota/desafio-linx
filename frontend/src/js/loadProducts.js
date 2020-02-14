const formatPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

let container = document.getElementById('container');

let url = 'http://localhost:3334/recommendation?maxProducts=16'
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
        function renderCarousel(data, type){
            let pos = 0;

            let carousel = document.createElement('div'),
                listProducts = document.createElement('ul'),
                btnNext = document.createElement('BUTTON'),
                btnPrevious = document.createElement('BUTTON');
                btnNext.classList.add('next');
                btnNext.innerHTML = '<img src="src/img/right-arrow.svg" />';
                btnPrevious.classList.add('previous');
                btnPrevious.innerHTML = '<img src="src/img/left-arrow.svg" />';
                carousel.classList.add('carousel');


                btnNext.onclick = ()=> { pos < 16 && console.log(pos+=4)}
                btnPrevious.onclick = ()=> { pos > 0 && console.log(pos-=4)}

            let item = ``;
            
            data.products.slice(pos,pos+4).map((product, idx)=> {
                item += `<li>
                            <img src=${addPrefixURL(product.images.default)} />
                            <div>
                                <h3>${product.name}</h3>
                                <span>${formatPrice.format(product.oldPrice)}</span>
                                <p>Por <strong>${formatPrice.format(product.price)}</strong></p>
                                <p>10x ${formatPrice.format(product.price/10)}</p>
                                <span class=${type}>${type === 'popular' ? `${idx+1}°` : getReductionPrice(product.price, product.oldPrice)}</span>
                            </div>
                        </li>`;        
                listProducts.innerHTML = item;
                listProducts.append(btnPrevious, btnNext);
            });
            carousel.innerHTML = `<h2>${data.title}</h2>`;
            carousel.appendChild(listProducts);
            container.append(carousel);
        }
        renderCarousel(data.mostPopular, 'popular', 0);
        renderCarousel(data.priceReduction, 'reduction', 0);
      })



      function addPrefixURL(string){
          let prefix = 'http:';
          return prefix+string;
      }

      function getReductionPrice(price,oldPrice){ // função para calcular porcentagem do desconto
          return `-${(((oldPrice - price)/price)*100).toFixed(0)}%`
      }
