const fs = require('fs');
const path = require('path');
const Log = require('../Log.js');
const { formatData, extractProducts, getLabels } = require('./formater.js');

console.log(Log.reset, "--------------------- check EN data");

try {
    const treeEN = JSON.parse(fs.readFileSync(path.join(__dirname, "../../src/data/en-US/posibilitiesTree-en-US.json"), _=>_));
    const productsEN = JSON.parse(fs.readFileSync(path.join(__dirname, "../../src/data/en-US/products-en-US.json"), _=>_));
    const productsTypesEN = JSON.parse(fs.readFileSync(path.join(__dirname, "../../src/data/en-US/products-type-en-US.json"), _=>_));
    const configEN = JSON.parse(fs.readFileSync(path.join(__dirname, "../../src/data/en-US/configuratorConfig-en-US.json"), _=>_));
    
    checkTree_ProductsIndex(formatData(treeEN).formatedTree, productsEN);
    console.log('checkTree_ProductsIndex end');

    checkProduct_ProductTypeIndex(productsEN, productsTypesEN);
    console.log('checkProduct_ProductTypeIndex end');
    
    buildTree(treeEN, "EN");
    buildProducts(productsEN, "EN");
    buildProductsTypes(productsTypesEN, "EN");
    buildConfig(configEN, "EN");
}
catch(error)
{
    throw error;
}
finally
{
    console.log('index check end');
}

console.log(Log.reset, "--------------------- check FR data");

try {
    const treeFR = JSON.parse(fs.readFileSync(path.join(__dirname, "../../src/data/fr-FR/posibilitiesTree-fr-FR.json"), _=>_));
    const productsFR = JSON.parse(fs.readFileSync(path.join(__dirname, "../../src/data/fr-FR/products-fr-FR.json"), _=>_));
    const productsTypesFR = JSON.parse(fs.readFileSync(path.join(__dirname, "../../src/data/fr-FR/products-type-fr-FR.json"), _=>_));
    const configFR = JSON.parse(fs.readFileSync(path.join(__dirname, "../../src/data/fr-FR/configuratorConfig-fr-FR.json"), _=>_));
    
    // TESTS

    checkTree_ProductsIndex(formatData(treeFR).formatedTree, productsFR);
    console.log('checkTree_ProductsIndex end');
    
    checkProduct_ProductTypeIndex(productsFR, productsTypesFR);
    console.log('checkProduct_ProductTypeIndex end');


    //TESTS DATA ?

    buildTree(treeFR, "FR");
    buildProducts(productsFR, "FR");
    buildProductsTypes(productsTypesFR, "FR");
    buildConfig(configFR, "FR");
}
catch(error)
{
    throw error;
}
finally
{
    console.log('index check end');
}

function checkTree_ProductsIndex(tree, products)
{
    const treeProducts = extractProducts(tree);

    for(const treeProduct of treeProducts)
    {
        if(!products[treeProduct.trim()])
        {
            console.log(Log.fg.red ,`Impossible de trouver la clée de produit "${treeProduct}"`);
        }
    }
}

function checkProduct_ProductTypeIndex(products, productsTypes)
{
    const values = Object.values(products);
    const keys = Object.keys(products);

    for(let i = 0; i < keys.length; i++)
    {
        const key = keys[i];
        const value = values[i];

        // the special type is make to handle 50/50 products
        if(!productsTypes[value?.type] && value?.type !== 'Special')
        {
            console.log(Log.fg.red, `type "${value?.type}" (pos:${i}, key${key}) not existing in types`, Log.reset);
        }
        if(value?.type === 'Special')
        {
            if(!productsTypes[value?.special?.right?.type]) 
            {
                console.log(Log.fg.red, `type "${value?.special?.right?.type}" (pos:${i}, key:${key}, right) not existing in types`, Log.reset);
                console.log(value);
            }
            if(!productsTypes[value?.special?.left?.type]) 
            {
                console.log(Log.fg.red, `type "${value?.special?.left?.type}" (pos:${i}, key:${key}, left) not existing in types`, Log.reset);
                console.log(value);
                
            }
        }
    }

}

function buildTree(tree, name = "FR")
{
    const labels = getLabels(tree);

    fs.writeFileSync(path.join(__dirname, `output/Tree/wines-${name}.txt`), labels.wines, _=>_);
    fs.writeFileSync(path.join(__dirname, `output/Tree/goals-${name}.txt`), labels.goals, _=>_);
    fs.writeFileSync(path.join(__dirname, `output/Tree/implementations-${name}.txt`), labels.implementations, _=>_);
    fs.writeFileSync(path.join(__dirname, `output/Tree/contactTimes-${name}.txt`), labels.contactTimes, _=>_);
    fs.writeFileSync(path.join(__dirname, `output/Tree/products-${name}.txt`), labels.products, _=>_);
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