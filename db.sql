create database Ivonne;

use Ivonne;

create table Societe(
    id_societe int auto_increment primary key,
    Raison_S varchar(50),
    Adresse text,
    Email varchar(50),
    Tel json,
    Patente varchar(15)
);

create table Client(
    id_client int auto_increment primary key,
    Nom varchar(50),
    Adresse text,
    Email varchar(50),
    Tel json,
    Id_Nat varchar(10)
);

create table Categorie(
    id_categorie int auto_increment primary key,
    Titre varchar(20),
    Service boolean
);

create table Produit(
    id_produit int auto_increment primary key,
    Description varchar(50),
    Stock bigint,
    Price float,
    id_categorie int references Categorie(id_categorie)
);


create table Invoice(
    no_inv varchar(50) primary key,
    Date_inv date,
    invoiceTo int references Client(id_client),
    payTo int references Societe(id_societe),
    Note text,
    Taxes float,
    Total float,
    Payed boolean
);

create table InvoiceProducts(
    id_invoiceProducts int auto_increment primary key,
    id_produit int references Produit(id_produit),
    no_inv int references Invoice(no_inv),
    Qty int
);


CREATE TRIGGER trg_Prod AFTER INSERT on invoiceproducts for EACH ROW
update produit set Stock = Stock-new.Qty WHERE id_produit = new.id_produit;


CREATE TRIGGER trg_Prod_dlt AFTER DELETE on invoiceproducts for EACH ROW
update produit set Stock = Stock+old.Qty WHERE id_produit = old.id_produit;


CREATE TRIGGER trg_inv AFTER DELETE on invoice for EACH ROW
delete FROM invoiceproducts WHERE no_inv = old.no_inv;

