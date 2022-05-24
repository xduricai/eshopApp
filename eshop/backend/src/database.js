const mysql = require('mysql');

// queries na inicializaciu databazy
let dbinit = [
    'CREATE DATABASE IF NOT EXISTS eshopdb CHARACTER SET utf8 COLLATE utf8_general_ci;',
    'USE eshopdb;',
    'CREATE TABLE IF NOT EXISTS Customers(id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(255), full_name VARCHAR(255),\
    street VARCHAR(255), street_num INT, city VARCHAR(255), pcode INT);',
    'CREATE TABLE IF NOT EXISTS Orders(id INT PRIMARY KEY AUTO_INCREMENT, customer_id INT, paid BOOLEAN,\
    FOREIGN KEY (customer_id) REFERENCES Customers(id));',
    'CREATE TABLE IF NOT EXISTS Products(id INT PRIMARY KEY AUTO_INCREMENT,product_type VARCHAR(255),\
    price FLOAT, img TEXT, order_id INT, FOREIGN KEY (order_id) REFERENCES Orders(id));',
   'CREATE TABLE IF NOT EXISTS Advert(link TEXT, image TEXT, ad_counter INT);' 
]

// queries na seed produktov
let items = 'INSERT INTO products (product_type, price, img) VALUES \
(\'Axe\', 64.99, \'https://media.istockphoto.com/photos/axe-stuck-in-a-piece-of-wood-picture-id170617091?b=1&k=20&m=170617091&s=170667a&w=0&h=HZ7-tm3vbQX-gYAFSyJ1raDKYeQiKQorxr2hp_TBJSQ=\'), \
(\'Hose\', 15.99, \'https://media.istockphoto.com/photos/top-view-of-hosepipe-on-grass-minimalistic-conception-picture-id961380694?b=1&k=20&m=961380694&s=170667a&w=0&h=kKq_7uahHGiZ-IkIrt0FuOOBKD_N_1e8WoqhzqjlKug=\'), \
(\'Lawn Mower\', 299.99, \'https://media.istockphoto.com/photos/lawn-mower-cutting-green-grass-in-backyard-garden-service-picture-id1251377935?b=1&k=20&m=1251377935&s=170667a&w=0&h=R4j2QV9oz-69ISpi-A0Mnx0aSv9py-2nNT-Rxu4h-4I=\'), \
(\'Rake\', 24.99, \'https://media.istockphoto.com/photos/fall-leaves-with-rake-picture-id157256122?b=1&k=20&m=157256122&s=170667a&w=0&h=XMsuooVhUgl-Itgyckb5fVuYYVA7EHyMET8ikqYSXco=\'), \
(\'Shovel\', 24.99, \'https://media.istockphoto.com/photos/shovel-and-dirt-picture-id153187710?b=1&k=20&m=153187710&s=170667a&w=0&h=9Tn-QglZbEwbLSwC2BXH6SFxObpMxtMQTOT8womcuwg=\'), \
(\'Sprinkler\', 6.99, \'https://media.istockphoto.com/photos/automatic-garden-lawn-sprinkler-picture-id1076104412?b=1&k=20&m=1076104412&s=170667a&w=0&h=jFp8d-F5tjO5Y90LzobYLnMXYbacOv-N99v1B3Kv1UE=\'), \
(\'Throwel\', 17.99, \'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNob3ZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60\'), \
(\'Watering Can\', 11.99, \'https://media.istockphoto.com/photos/watering-can-from-metal-picture-id177738022?b=1&k=20&m=177738022&s=170667a&w=0&h=Ya-fnx9MPp8Bi8hi87yA4qSX_VJ0LdPZ22MV4gOs4SU=\'), \
(\'Wheelbarrow\', 27.99, \'https://media.istockphoto.com/photos/studio-shot-of-a-wheelbarrow-full-of-dirt-picture-id529670736?b=1&k=20&m=529670736&s=170667a&w=0&h=EPPO0Z16bdFUmPbqtGcZkS8O73-Hj8PL_LgpLk1Yq3w=\')'

// pripojenie DB 
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
});

connection.connect((err) => {
    if (err){
        throw err;
    }
    console.log("DB connected.");
});

// inicializacia DB
async function initialize(){
    for(let i=0; i<dbinit.length; i++){
        connection.query(dbinit[i], (err) => {
            if(err){
                throw err;
            }
        });
    }
    try{
        await new Promise((resolve, reject) => {
            connection.query('SELECT COUNT(*) AS count FROM products', (err, result) => {
                if(result[0].count <= 0){
                    for(let i=0; i<3; i++){
                        connection.query(items, (err) => {
                            if(err){
                                throw err;
                            }
                        });
                    }
                }
                return err ? reject(err) : resolve();
            });
        });
    }
    catch(err){
        throw err;
    }

    connection.query('SELECT COUNT(*) AS count FROM Advert', (err, result) => {
        if(result[0].count <= 0){
            connection.query('INSERT INTO Advert (link, image, ad_counter) VALUES\
            (\'advert\', \'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGdhcmRlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60\', 0)')
        }
    });
}

initialize();

// pridanie objednavky
function addOrder(user, cart){
    // pridanie pouzivatela
    connection.query(`INSERT INTO Customers (email, full_name, street, street_num, city, pcode) VALUES \
    (\'${user.email}\', \'${user.name}\', \'${user.street}\', ${user.streetnum}, \'${user.city}\', ${user.pcode})`, (err, result) => {
        if(err){
            throw err;
        }
        // pridanie objednavky
        connection.query(`INSERT INTO Orders (customer_id, paid) VALUES (${result.insertId}, false)`, (err, result) => {
            if(err){
                throw err;
            }
            // pridanie produktov
            cart.forEach(element => {
                connection.query(`UPDATE Products SET order_id = ${result.insertId} WHERE product_type = \'${element.name}\' AND order_id IS NULL LIMIT 1`, (err) => {
                    if(err){
                        throw err;
                    }
                });
            });
        });
    });
}

module.exports = {connection, addOrder};