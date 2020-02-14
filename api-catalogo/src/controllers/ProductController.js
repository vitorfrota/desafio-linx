const Product = require('../models/Product');

module.exports = {
    async show(req,res){
        const  { product_id } = req.params;
        const { type } = req.query;

        try{
            const response = await Product.find({ id: product_id });
            const product = response[0].toObject();
    
            if(!response){
                return res.status(401).json({ error: 'Produto não encontrado!'});
            }
    
            if(type === 'compact'){
                const { name, price, status, categories } = product;   
                return res.json({ 
                    name,
                    price,
                    status,
                    categories
                });
            }
            return res.json(product);
        }catch(e){
            return res.status(401).json({ error: 'Tivemos um problema para retornar os dados do produto!'});
        }
    }
}