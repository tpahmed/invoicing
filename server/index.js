const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const App = express();

const AllowAll = (req,res,next)=>{

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
}
App.use(bodyparser.json());
App.use(bodyparser.urlencoded({extended:1}));
App.use(AllowAll);

const conx = mysql.createConnection({
    host:process.env.HOST,
    port:process.env.PORT,
    user:process.env.USER,
    password:process.env.PASS,
    database:process.env.DB
})

App.get('/societe',(req,res)=>{
    conx.query(`SELECT Societe.*, COUNT(Invoice.no_inv) AS invoice_count 
                FROM Societe 
                LEFT JOIN Invoice ON Societe.id_societe = Invoice.payTo 
                GROUP BY Societe.id_societe;`
                ,(err,result)=>{
        if(err){
            res.json({success:false,data:err})
        }
        res.json({success:true,data:result})
    })
});

App.post('/societe',(req,res)=>{
    console.log(req)
    conx.query('INSERT INTO societe VALUES (NULL,?,?,?,?,?)',[
        req.body.Raison_S,
        req.body.Adresse,
        req.body.Email,
        req.body.telzone + req.body.tel,
        req.body.Patente
    ],(err,result)=>{
        if(err){
            res.json({success:false,data:err});
        }
        res.json({success:true,data:result});
    })
});

App.get('/client',(req,res)=>{
    conx.query('Select * from client;',(err,result)=>{
        if(err){
            res.json({success:false,data:err})
        }
        res.json({success:true,data:result})
    })
});

App.post('/client',(req,res)=>{
    conx.query('INSERT INTO client VALUES (NULL,?,?,?,?,?)',[
        req.body.Nom,
        req.body.Adresse,
        req.body.Email,
        req.body.telzone + req.body.tel,
        req.body.Id_Nat
    ],(err,result)=>{
        if(err){
            res.json({success:false,data:err})
        }
        res.json({success:true,data:result})
    })
});


App.get('/cat',(req,res)=>{
    conx.query(`
    SELECT Categorie.*, COUNT(Produit.id_categorie) AS products_count 
    FROM Categorie 
    LEFT JOIN Produit ON Categorie.id_categorie = Produit.id_categorie 
    GROUP BY Categorie.id_categorie;
    `,(err,result)=>{
        if(err){
            res.json({success:false,data:err})
        }
        res.json({success:true,data:result})
    })
});

App.get('/cat/:id',(req,res)=>{
    conx.query(`
    SELECT Titre
    FROM Categorie
    Where id_categorie = ?;
    `,[req.params.id],(err,result)=>{
        if(err){
            res.json({success:false,data:err})
        }
        res.json({success:true,data:result})
    })
});

App.post('/cat',(req,res)=>{
    conx.query('INSERT INTO Categorie VALUES (NULL,?,?)',[
        req.body.CategorieName,
        req.body.service ? 1 : 0
    ],(err,result)=>{
        if(err){
            res.json({success:false,data:err})
        }
        res.json({success:true,data:result})
    })
});

App.delete('/cat',(req,res)=>{
    conx.query('DELETE FROM `Categorie` WHERE id_categorie = ?',[
        req.body.id
    ],(err,result)=>{
        if(err){
            res.json({success:false,data:err})
        }
        res.json({success:true,data:result})
    })
});

App.get('/produit',(req,res)=>{
    conx.query(`
    SELECT Produit.*, Categorie.Titre AS products_cat 
    FROM Produit, Categorie
    Where Categorie.id_categorie = Produit.id_categorie 
    GROUP BY Produit.id_produit;
    `,(err,result)=>{
        if(err){
            res.json({success:false,data:err})
        }
        res.json({success:true,data:result})
    })
});

App.get('/produit/:id',(req,res)=>{
    conx.query(`
    SELECT *
    FROM Produit
    Where Produit.id_produit = ?;
    `,[req.params.id],(err,result)=>{
        if(err){
            res.json({success:false,data:err})
        }
        res.json({success:true,data:result})
    })
});

App.post('/produit/:id',(req,res)=>{
    conx.query(`
    Update Produit
    set Description = ?,
    Stock = ?,
    Price = ?,
    id_categorie = ?
    Where Produit.id_produit = ?;
    `,[
        req.body.Description,
        req.body.Stock,
        req.body.Price,
        req.body.id_categorie,
        req.params.id
    ],(err,result)=>{
        if(err){
            res.json({success:false,data:err})
        }
        res.json({success:true,data:result})
    })
});

App.post('/produit',(req,res)=>{
    conx.query('INSERT INTO Produit VALUES (NULL,?,?,?,?)',[
        req.body.Description,
        req.body.Stock,
        req.body.Prix,
        req.body.Categorie
    ],(err,result)=>{
        if(err){
            res.json({success:false,data:err})
        }
        res.json({success:true,data:result})
    })
});

App.delete('/produit',(req,res)=>{
    conx.query('DELETE FROM `Produit` WHERE id_produit = ?',[
        req.body.id
    ],(err,result)=>{
        if(err){
            res.json({success:false,data:err})
        }
        res.json({success:true,data:result})
    })
});

App.listen(4444);