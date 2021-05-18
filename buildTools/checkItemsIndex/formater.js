function formatData(rawData, index = "label")
{
    const formatedTree = {};
    let choices = {};

    formatDataLoop(rawData, formatedTree, choices, index);
    choices = Object.values(choices);

    return { formatedTree , choices};
}

function formatDataLoop(currentData, formatedData, choices, index = "label")
{
    for(const _key in currentData)
    {
        const value = currentData[_key]; 
        const key = (value[index]) ? value[index] : _key; 
        
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

function extractProducts(data)
{
    let products = [];

    for(const wine of Object.values(data.wines))
    {
        for(const goal of Object.values(wine.goals))
        {
            for(const impl of Object.values(goal.implementations))
            {
                for(const contactTime of Object.values(impl.contactTimes)) 
                {
                    for(const product of Object.values(contactTime.products))
                    {
                        products.push(product);
                    }
                }
            }
        }
    }

    return products;
}

function getLabels(tree)
{
    const mapWines = new Map();
    let wines = "";

    const mapGoals = new Map();
    let goals = "";

    const mapImplementations = new Map();
    let implementations = "";

    const mapContactTimes = new Map();
    let contactTimes = "";

    for(const wine of tree.wines)
    {
        if(!mapWines.has(wine.label))
        {
            mapWines.set(wine.label, null);
            wines += wine.label + "\n";
        }

        for(const goal of wine.goals)
        {

            if(!mapGoals.has(goal.label))
            {
                mapGoals.set(goal.label, null);
                goals += goal.label + "\n";
            }

            for(const imp of goal.implementations)
            {
                if(!mapImplementations.has(imp.label))
                {
                    mapImplementations.set(imp.label, null);
                    implementations += imp.label + "\n";
                }

                for(const cTime of imp.contactTimes)
                {
                    if(!mapContactTimes.has(cTime.label))
                    {
                        mapContactTimes.set(cTime.label, null);
                        contactTimes += cTime.label + "\n";
                    }
                }

            }
        }
    }

    return {
        wines,
        goals,
        implementations,
        contactTimes,
    }
}

module.exports = {
    formatData,
    extractProducts,
    getLabels,
}