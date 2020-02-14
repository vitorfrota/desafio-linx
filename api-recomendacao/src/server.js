const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

const routes = express.Router();

app.use(cors());
app.use(express.json());

routes.get('/recommendation', async (req, res)=> {
    const { maxProducts = 10 } = req.query;

    if(maxProducts < 10){
      maxProducts = 10;
    }

    axios.all([
        axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json'),
        axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json')
      ]).then(axios.spread((mostPopularRes, priceReductionRes) => {

          async function getData(){
              const productsPopular = mostPopularRes.data.map(item => {     
                return axios
                .get(`http://localhost:3333/product/${item.recommendedProduct.id}`)
                .then(r=> r.data.status === 'AVAILABLE' && r.data)
                .catch(e=> {})
            });
  
            const productsReduction = priceReductionRes.data.slice(0, maxProducts).map(item => {     
              return axios
              .get(`http://localhost:3333/product/${item.recommendedProduct.id}`)
              .then(r=> r.data.status === 'AVAILABLE' && r.data)
              .catch(e=> {})
            });

            const popularArr = await Promise.all(productsPopular).then(response=> { 
              return response.filter(product=> product).slice(0, maxProducts)
            });
            const reductionArr = await Promise.all(productsReduction).then(response=> { 
              return response.filter(product=> product).slice(0, maxProducts)
            });
            const mostPopular = { title: 'Mais vendidos', products: popularArr};
            const priceReduction = { title: 'Produtos que baixaram de preço', products: reductionArr};
            const response = {mostPopular, priceReduction};
            return res.json(response);

          }
        getData();
        }));
});

app.use(routes);
app.listen(3334);