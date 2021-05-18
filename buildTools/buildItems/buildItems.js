const err = _ => Debug.log('\x1b[32m%s\x1b[0m', '\nfailed during building items');

const path = require('path')
const fs = require('fs');

const rawdata = fs.readFileSync(path.join(__dirname, 'input-items.txt'), 'utf-8', _=>_)
.replaceAll('\r', '')
const formated = rawdata.split('\n');

Debug.log("items backup is in", path.join(__dirname, 'items-backup.json'));
fs.writeFile(path.join(__dirname, 'items-backup.json'), JSON.stringify(formated), 'utf-8', _=>_)


const allkeys = [
    "granulats",
    "copeaux",
    "blocks",
    "block",
    "dominos",
    "staves",
    "staves 18",
    "staves18",
    "inserts",
    
    "classic",
    "flavors",
    "flavor"
];

const allheatings = [
    "légère",
    "moyenne",
    "moyenne+",
    "moyenne Longue",
    "blonde",
    "longue",
    "copeaux de fermentation",
]

const allSpecials = [
    "+",
    "/",
    "%"
    // /\b(?<!\.)(?!0+(?:\.0+)?%)(?:\d|[1-9]\d|100)(?:(?<!100)\.\d+)?%/g
]

function parseKey(element) {
        
    const keys = [];

    const e = element.trim().toLowerCase().replaceAll("\r", '');

    allkeys.forEach(key => 
    {
        if (e.indexOf(key) != -1)
        {
            keys.push(key)
        }
    });

    allheatings.forEach(key => 
    {
        if (e.indexOf(key) != -1)
        {
            keys.push(key)
        }
    });

    allSpecials.forEach(special => 
    {
        if (e.indexOf(special) != -1)
        {
            keys.push(special)
        }
    });
    
    if (e && keys.lenght != 0)
    {
        return {
            keys,
            source : element
        };
    }
}

const parsedKeys = []

formated.forEach(element => { 
    
    const parsedKey = parseKey(element);
    
    if(parsedKey)
    {
        parsedKeys.push(parsedKey) 
    }
});

Debug.log("items keyParsed is in", path.join(__dirname, 'items-keyParsed.json'));
fs.writeFile(path.join(__dirname, 'items-keyParsed.json'), JSON.stringify(parsedKeys), 'utf-8', _=>_);

const items = {};


parsedKeys.forEach(e => 
{
    const keys = e.keys;

    let type = null;
    let special = undefined;

    //si le l'element est spécial

    if(keys.includes("%") || keys.includes("/") || keys.includes("+"))
    {
        type = "Special";
    }

    if ((keys.includes("/") || keys.includes("+")) && keys.includes("%"))
    {
        if(keys.includes("/"))
        {
            const speSides = e.source.split('/');

            special = {
                right : {
                    source: speSides[0],
                    type: getType(parseKey(speSides[0]).keys),
                    heatings: getHeatings(parseKey(speSides[0]).keys),
                    porcentage: speSides[0].replaceAll(' ', '').match(/\d+(?:\\.\\d+)?%/g)
                },
                left : {
                    source: speSides[1],
                    type: getType(parseKey(speSides[1]).keys),
                    heatings: getHeatings(parseKey(speSides[1]).keys),
                    porcentage: speSides[1].replaceAll(' ', '').match(/\d+(?:\\.\\d+)?%/g)
                }
            }
        }
        else if(keys.includes("+"))
        {
            const speSides = e.source.split('+');

            special = {
                right : {
                    source: speSides[0],
                    type: getType(parseKey(speSides[0]).keys),
                    heatings: getHeatings(parseKey(speSides[0]).keys),
                    porcentage: speSides[0].replaceAll(' ', '').match(/\d+(?:\\.\\d+)?%/g)
                },
                left : {
                    source: speSides[1],
                    type: getType(parseKey(speSides[1]).keys),
                    heatings: getHeatings(parseKey(speSides[1]).keys),
                    porcentage: speSides[1].replaceAll(' ', '').match(/\d+(?:\\.\\d+)?%/g)
                }
            }
        }
    }
    else type = getType(keys)
    
    items[e.source] = {
        type,
        heatings: getHeatings(keys),
        special,
        source: e.source
    };
});

function getHeatings(keys)
{
    const heatings = [];

    allheatings.forEach(heat => 
    {
        if (keys.includes(heat))
        {
            heatings.push(heat)
        }
    });

    return heatings
}

function getType(keys)
{
    let type = null;

    if (keys.includes("classic") && !(keys.includes("flavors") || keys.includes("flavor")))
    {
        if (keys.includes("dominos")) type = "Dominos-Classic";
        else if (keys.includes("blocks") || keys.includes("block")) type = "Blocks-Classic";
        else if (keys.includes("inserts")) type = "Inserts-Classic";
        else if (keys.includes("staves"))
        {
            type = "Staves-Classic";
            if (keys.includes("staves 18") || keys.includes("staves18")) 
                type = "StavesThick-Classic";
        } 
        else 
        {
            if (keys.includes("dominos")) type = "Dominos-Classic";
            else if (keys.includes("granulats")) type = "Granulates-Flavors";
            else if (keys.includes("copeaux")) type = "Chips-Flavors";
            else {
                type = "ERROR - classic + is not dominos|granulats|copeaux";
            }
        }
    }

    else if ((keys.includes("flavors") || keys.includes("flavor")) && !keys.includes("classic"))
    {

        if (keys.includes("granulats")) type = "Granulates-Flavors";
        else if (keys.includes("copeaux")) type = "Chips-Flavors";
        else if (keys.includes("blocks") || keys.includes("block")) type = "Blocks-Flavors";
        else if (keys.includes("inserts")) type = "Inserts-Flavors";
        else if (keys.includes("inserts")) type = "Inserts-Flavors";
        else if (keys.includes("staves"))
        {
            type = "Staves-Flavors";
            if (keys.includes("staves 18") || keys.includes("staves18")) 
                type = "StavesThick-Flavors";
        } 
        else
        {
            if (keys.includes("dominos")) type = "Dominos-Classic";
            else if (keys.includes("granulats")) type = "Granulates-Flavors";
            else if (keys.includes("copeaux")) type = "Chips-Flavors";
            else {
                type = "ERROR - flavor + is not dominos|granulats|copeaux";
            }
        }
    }

    else if ((keys.includes("flavors") || keys.includes("flavor")) && keys.includes("classic"))
    {
        type = 'ERROR - this must be a "Special" type';
    }
    else 
    {
        if (keys.includes("dominos")) type = "Dominos-Classic";
        else if (keys.includes("granulats")) type = "Granulates-Flavors";
        else if (keys.includes("copeaux")) type = "Chips-Flavors";
        else {
            type = "ERROR - nothing + is not dominos|granulats|copeaux";
        }
    }

    return type;
}

Debug.log("items is in", path.join(__dirname, 'items.json'));

const itemsStr = JSON.stringify(items).replaceAll(` "`, `"`);

fs.writeFile(path.join(__dirname, 'items.json'), itemsStr, 'utf-8', _=>_);

Debug.log('\x1b[32m%s\x1b[0m', '\nsuccessfuly built items');