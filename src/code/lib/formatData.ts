/* 
    Permet d'utilisé le label comme index dans wine, goals, contactTimes et products
    basiquement cette fonction sert a optimiser le temps de traitements des données des choix 
    en ce servant de la puissance d'indexation par string de JavaScript
    l'avantage de formater l'indexation dans le code est l'optimisation des performances
*/
export function formatData(rawData : any, index : string = "label") : { formatedTree : any, choices : any }
{
    const formatedTree = {};
    let choices = {};

    formatDataLoop(rawData, formatedTree, choices, index);
    choices = Object.values(choices);

    return { formatedTree , choices};
}

function formatDataLoop(currentData : any, formatedData : any, choices : any, index : string = "label")
{
    for(const _key in currentData)
    {
        const value = currentData[_key]; // cpy
        const key = (value[index]) ? value[index] : _key; // cpy
        
        const iterables = [];

        // si la valeur n'est pas un objet ou un tableau
        if(typeof value !== 'object')
        {
            formatedData[key] = value;
        }
        else
        {
            // si c'est un objet ou un tableau on le stock pour le parcourir ensuite
            iterables.push(value) // cpy
            
            // si la valeur actuel ne contien pas l'indexation et qu'elle est iterable c'est que c'est un choix
            if(!value[index]) choices[key] = key;
        }

        for(const iterable of iterables)
        {
            formatedData[key] = {};
            formatDataLoop(iterable, formatedData[key], choices, index);
        }
    }
}

export function extractProducts(data : any)
{
    let products : string = "";

    for(const wine of Object.values(data.wines) as any)
    {
        for(const goal of Object.values(wine.goals) as any)
        {
            for(const impl of Object.values(goal.implementations) as any)
            {
                for(const contactTime of Object.values(impl.contactTimes) as any) 
                {
                    for(const product of Object.values(contactTime.products) as any)
                    {
                        products += product + "\n";
                    }

                    products += "\n";
                }
            }
        }
    }

    return products;
}


export function extractProductsInArray(data : any)
{
    let products = [];

    for(const wine of Object.values(data.wines) as any)
    {
        for(const goal of Object.values(wine.goals) as any)
        {
            for(const impl of Object.values(goal.implementations) as any)
            {
                for(const contactTime of Object.values(impl.contactTimes) as any) 
                {
                    for(const product of Object.values(contactTime.products) as any)
                    {
                        products.push(product);
                    }
                }
            }
        }
    }

    return products;
}

export function copy(obj : any)
{
    return JSON.parse(JSON.stringify(obj));
}