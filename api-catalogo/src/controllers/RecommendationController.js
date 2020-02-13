const Product = require('../models/Product');
const axios = require('axios');

module.exports = {
    async index(req,res){
    
        async function loadRecommendations(){
            const response = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json');

            const products = response.data.map(r=> ({
                ...r,
                recommendedProduct: Product.find({ id: r.id })
            }));

            return res.json(products);
        }
        loadRecommendations();

        async function loadProduct(idProduct){
            const response = await axios.get(`http://localhost:3333/product/${idProduct}?type=compact`);
            return response.data;
        }
    
      //  return res.json({ a: 'a'});
    }, 
}