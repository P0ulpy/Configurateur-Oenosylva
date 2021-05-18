const fs = require('fs');
const path = require('path')
const { formatData, extractProducts, getLabels } = require('./formater.js');

const treeEN = JSON.parse(fs.readFileSync(path.join(__dirname, "../../src/data/EN-US/posibilitiesTree-en-US.json"), _=>_));
const productsEN = JSON.parse(fs.readFileSync(path.join(__dirname, "../../src/data/EN-US/products-en-US.json"), _=>_));
const productsTypesEN = JSON.parse(fs.readFileSync(path.join(__dirname, "../../src/data/EN-US/products-type-en-US.json"), _=>_));
const configEN = JSON.parse(fs.readFileSync(path.join(__dirname, "../../src/data/EN-US/configuratorConfig-en-US.json"), _=>_));

console.log("--------------------- check EN data");

//checkIndex(formatData(treeEN).formatedTree, productsEN)
buildTree(treeEN, "EN");
buildProducts(productsEN, "EN");
buildProductsTypes(productsTypesEN, "EN");
buildConfig(configEN, "EN");

//const treeFR = JSON.parse(fs.readFileSync(path.join(__dirname, "../../src/json/posibilitiesTree-fr-FR.json"), _=>_));
//const productsFR = JSON.parse(fs.readFileSync(path.join(__dirname, "../../src/json/products-fr-FR.json"), _=>_));

//Debug.log("--------------------- check FR data");

//checkIndex(formatData(treeFR).formatedTree, productsFR)


function buildTree(tree, name = "FR")
{
    const labels = getLabels(tree);

    fs.writeFileSync(path.join(__dirname, `output/wines-${name}.txt`), labels.wines, _=>_);
    fs.writeFileSync(path.join(__dirname, `output/goals-${name}.txt`), labels.goals, _=>_);
    fs.writeFileSync(path.join(__dirname, `output/implementations-${name}.txt`), labels.implementations, _=>_);
    fs.writeFileSync(path.join(__dirname, `output/contactTimes-${name}.txt`), labels.contactTimes, _=>_);
}

function buildProducts(products, name = "FR")
{
    
}

function buildProductsTypes(productsTypes, name = "FR")
{

}

function buildConfig(config, name = "FR")
{

}

function checkIndex(tree, products)
{
    const treeProducts = extractProducts(tree);

    for(const treeProduct of treeProducts)
    {
        if(!products[treeProduct.trim()])
        {
            Debug.log(`Impossible de trouver la clée de produit "${treeProduct}"`);
        }
    }
}