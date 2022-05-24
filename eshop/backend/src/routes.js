const express = require('express');
const router = express.Router();
const {connection, addOrder} = require('./database.js');

//endpoint na vratenie vsetkych produktov, vratane tych co uz su sucastou objednavky
router.get('/products', (req,res) => {
    connection.query("SELECT * FROM products", (err, result) => {
        if (err){
            throw err;
        }
        res.json(result);
    });
});

//endpoint vracia reklamu 
router.get('/advert', (req,res) => {
    connection.query("SELECT * FROM Advert", (err, result) => {
        if (err){
            throw err;
        }
        res.json(result);
    });
});

// inkrementacia pocitadla
router.get('/increment', (req, res) => {
    connection.query("SELECT * FROM Advert", (err, result) => {
        if (err){
            throw err;
        }
        result[0].ad_counter++;
        
        connection.query("UPDATE Advert SET ad_counter = " + result[0].ad_counter.toString());
        res.json(result);
    });
});

//pridanie novej objednavky
router.post('/order', (req,res) => {
    addOrder(req.body.user, req.body.cart);
});

// vracia vsetky existujuce objednavky
router.get('/orders/all', (req, res) => {
    connection.query('SELECT * FROM Orders', (err, result)=>{
        if(err){
            throw err;
        }
        res.json(result)
    });
});
//cracia produkty, ktore su v objednavkach a udaje o prislusnej objednavke
router.get('/products/assigned', (req, res) => {
    let query = 'SELECT Orders.id, Products.id, Products.product_type, Products.price, Products.order_id\
    FROM Orders INNER JOIN Products ON Orders.id=Products.order_id;'
    
    connection.query(query, (err,result)=>{
        if(err){
            throw err;
        }
        res.json(result)
    });
});

// zaplatenie objednavky
router.post('/pay', async (req, res) => {
    let id = req.body.id;

    try{
        await new Promise((resolve, reject) => {
            connection.query(`UPDATE Orders SET paid = true WHERE id = ${id}`, (err, result) => {
                return err ? reject(err) : resolve();
            });
        });
    }
    catch(err){
        throw err;
    }

    connection.query('SELECT * FROM Orders', (err, result)=>{
        if(err){
            throw err;
        }
        res.json(result)
    });

});

// update reklamy
router.post('/update', async (req, res) => {
    try{
        await new Promise((resolve, reject) => {
            connection.query(`UPDATE Advert SET link = \'${req.body.link}\', image = \'${req.body.image}\'`, (err, result) => {
                return err ? reject(err) : resolve();
            });
        });
    }
    catch(err){
        throw err;
    }

    connection.query('SELECT * FROM Advert LIMIT 1', (err, result) => {
        if(err){
            throw err;
        }
        res.json(result);
    });
    
});

module.exports = router;