const fs = require('fs');
//const rawInput = fs.readFileSync('./input-products.txt', 'utf-8', _=>{});
const rawInput = `Granulats Flavors
Copeaux Flavors Assemblage Chauffe Légère et Moyenne
Dominos Classic Assemblage Chauffe Blonde et Moyenne
Blocks Flavors Assemblage Chauffe Légère et Moyenne

Copeaux Flavors Assemblage Chauffe Légère et Moyenne
Dominos Classic Assemblage Chauffe Blonde et Moyenne
Blocks Flavors Assemblage Chauffe Légère et Moyenne

Blocks Flavors Assemblage Chauffe Légère et Moyenne
Dominos Classic Assemblage Chauffe Blonde et Moyenne

Staves Flavors Chauffe Légère
Staves Flavors Chauffe Moyenne

Staves 18 Flavors Chauffe Légère
Staves 18 Flavors Chauffe Moyenne

Inserts 25% Flavors Blonde 
Inserts 45% Flavors Blonde
Inserts 45% Flavors Moyenne
Inserts 45% Flavors Moyenne

Inserts 25% Flavors Blonde 
Inserts 45% Flavors Blonde
Inserts 45% Flavors Moyenne
Inserts 45% Flavors Moyenne

Inserts 25% Flavors Blonde 
Inserts 45% Flavors Blonde
Inserts 45% Flavors Moyenne
Inserts 45% Flavors Moyenne

Granulats Flavors
Copeaux Flavors Chauffe Légère
Copeaux Flavors Chauffe Moyenne
Blocks Classic Chauffe Légère
Blocks Classic Chauffe Moyenne

Copeaux Flavors Chauffe Légère
Copeaux Flavors Chauffe Moyenne
Blocks Classic Chauffe Légère
Blocks Classic Chauffe Moyenne

Blocks Classic Chauffe Légère
Blocks CLassic Chauffe Moyenne
Dominos Classic Assemblage Chauffe Blonde et Moyenne

Staves Classic Chauffe Légère
Staves Classic Chauffe Moyenne

Staves Classic Chauffe Légère
Staves Classic Chauffe Moyenne

Inserts 25% Classic Blonde 
Inserts 45% Classic Blonde
Inserts 25% Classic Moyenne
Inserts 45% CLassic Moyenne

Inserts 25% Classic Blonde 
Inserts 45% Classic Blonde
Inserts 25% Classic Moyenne
Inserts 45% CLassic Moyenne

Inserts 25% Classic Blonde 
Inserts 45% Classic Blonde
Inserts 25% Classic Moyenne
Inserts 45% CLassic Moyenne

Granulats Flavors
Copeaux Flavors Chauffe Légère
Copeaux Flavors Chauffe Moyenne
Blocks 50% Flavors/50 % Classic Chauffe Légère
Blocks 50% Flavors/50 % Classic Chauffe Moyenne

Copeaux Flavors Chauffe Légère
Copeaux Flavors Chauffe Moyenne
Blocks 50% Flavors/50 % Classic Chauffe Légère
Blocks 50% Flavors/50 % Classic Chauffe Moyenne
Dominos Classic Assemblage Chauffe Blonde et Moyenne

Blocks 50% Flavors/50 % Classic Chauffe Légère
Blocks 50% Flavors/50 % Classic Chauffe Moyenne
Dominos Chauffe Moyenne

Staves 50% Flavors/ 50% Classic Chauffe Légère
Staves 50% Flavors/ 50% Classic Chauffe Moyenne

Staves 18 Flavors Chauffe Légère
Staves 18 Flavors Chauffe Moyenne

Inserts 25% Flavors + Classic Blonde 
Inserts 45% Flavors + Classic Blonde
Inserts 45% Flavors + Classic Moyenne
Inserts 45% Flavors + Classic Moyenne

Inserts 25% Flavors + Classic Blonde 
Inserts 45% Flavors + Classic Blonde
Inserts 45% Flavors + Classic Moyenne
Inserts 45% Flavors + Classic Moyenne

Inserts 25% Flavors + Classic Blonde 
Inserts 45% Flavors + Classic Blonde
Inserts 45% Flavors + Classic Moyenne
Inserts 45% Flavors + Classic Moyenne

Copeaux Flavors Chauffe Moyenne
Copeaux Flavors Chauffe Longue
Block Flavors Chauffe Moyenne
Block Flavors Chauffe Longue

Copeaux Flavors Chauffe Moyenne
Copeaux Flavors Chauffe Longue
Block Flavors Chauffe Moyenne
Block Flavors Chauffe Longue
Dominos Chauffe Moyenne
Dominos Chauffe Longue

Block Flavors Chauffe Moyenne
Block Flavors Chauffe Longue
Dominos Classic Chauffe Moyenne
Dominos Classic Chauffe Longue

Staves Flavors Chauffe Moyenne
Staves Flavors Chauffe Longue

Staves 18 Flavors Chauffe Moyenne
Staves 18 Flavors Chauffe Longue

Inserts 25% Flavors Moyenne
Inserts 45% Flavors Longue

Inserts 25% Flavors Moyenne
Inserts 45% Flavors Longue

Inserts 25% Flavors Moyenne
Inserts 45% Flavors Longue`;

Debug.log(rawInput)

const splitedData = rawInput.split(`

`);

const formatedInput = [];

splitedData.map(e => {
    formatedInput.push(e.split("\n"));
});

fs.writeFile('./products-formated.json', JSON.stringify(formatedInput), 'utf-8', Debug.log);

const productsShape = require('./productsShape.json');

let productsIndex = 0;

for(const goal of productsShape)
{
    for(const impl of goal.implementations)
    {
        for(const contactTime of impl.contactTimes) 
        {
            contactTime.products = [];

            if(formatedInput[productsIndex])
            {
                Debug.log("products", formatedInput[productsIndex])

                formatedInput[productsIndex].forEach(product => {
                    if(product)
                        contactTime.products.push(product);
                });
            }
            else
            {
                console.warn(`can't load products`, productsIndex, formatedInput[productsIndex]);
            }

            productsIndex++;
        }
    }
}

fs.writeFile('./products.json', JSON.stringify(productsShape), 'utf-8', _=>{});
