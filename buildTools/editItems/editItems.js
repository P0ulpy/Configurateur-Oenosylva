const items = {
    "Granulats": {
        "type": "Granulates-Flavors",
        "heatings": [],
        "source": "Granulats"
    },
    "Copeaux Flavors Chauffe Légère": {
        "type": "Chips-Flavors",
        "heatings": ["légère"],
        "source": "Copeaux Flavors Chauffe Légère"
    },
    "Copeaux Flavors Chauffe Moyenne": {
        "type": "Chips-Flavors",
        "heatings": ["moyenne"],
        "source": "Copeaux Flavors Chauffe Moyenne"
    },
    "Dominos Chauffe Blonde": {
        "type": "Dominos-Classic",
        "heatings": ["blonde"],
        "source": "Dominos Chauffe Blonde"
    },
    "Dominos Chauffe Moyenne": {
        "type": "Dominos-Classic",
        "heatings": ["moyenne"],
        "source": "Dominos Chauffe Moyenne"
    },
    "Blocks Flavors Chauffe Légère": {
        "type": "Blocks-Flavors",
        "heatings": ["légère"],
        "source": "Blocks Flavors Chauffe Légère"
    },
    "Blocks Flavors Chauffe Moyenne": {
        "type": "Blocks-Flavors",
        "heatings": ["moyenne"],
        "source": "Blocks Flavors Chauffe Moyenne"
    },
    "Staves Flavors Chauffe Légère": {
        "type": "Staves-Flavors",
        "heatings": ["légère"],
        "source": "Staves Flavors Chauffe Légère"
    },
    "Staves Flavors Chauffe Moyenne": {
        "type": "Staves-Flavors",
        "heatings": ["moyenne"],
        "source": "Staves Flavors Chauffe Moyenne"
    },
    "Staves 18 Flavors Chauffe Légère": {
        "type": "StavesThick-Flavors",
        "heatings": ["légère"],
        "source": "Staves 18 Flavors Chauffe Légère"
    },
    "Staves 18 Flavors Chauffe Moyenne": {
        "type": "StavesThick-Flavors",
        "heatings": ["moyenne"],
        "source": "Staves 18 Flavors Chauffe Moyenne"
    },
    "Inserts 25% Flavor Blonde": {
        "type": "Special",
        "heatings": ["blonde"],
        "source": "Inserts 25% Flavor Blonde",
        "special": {
            "right": {
                "source": "Inserts 25%",
                "type": "Inserts-Classic",
                "heatings": ["blonde"],
                "porcentage": "25%"
            },
            "left": {
                "source": "Flavor Blonde",
                "type": "Inserts-Flavors",
                "heatings": ["blonde"],
                "porcentage": "75%"
            }
        }
    },
    "Inserts 45% Flavor Blonde": {
        "type": "Special",
        "heatings": ["blonde"],
        "source": "Inserts 45% Flavor Blonde",
        "special": {
            "right": {
                "source": "Inserts 45%",
                "type": "Inserts-Classic",
                "heatings": ["blonde"],
                "porcentage": "45%"
            },
            "left": {
                "source": "Flavor Blonde",
                "type": "Inserts-Flavors",
                "heatings": ["blonde"],
                "porcentage": "55%"
            }
        }
    },
    "Inserts 45% Flavor Moyenne": {
        "type": "Special",
        "heatings": ["moyenne"],
        "source": "Inserts 45% Flavor Moyenne",
        "special": {
            "right": {
                "source": "Inserts 45%",
                "type": "Inserts-Classic",
                "heatings": ["moyenne"],
                "porcentage": "45%"
            },
            "left": {
                "source": "Flavor Moyenne",
                "type": "Inserts-Flavors",
                "heatings": ["moyenne"],
                "porcentage": "55%"
            }
        }
    },
    "Copeaux Classic Chauffe Légère": {
        "type": "Chips-Flavors",
        "heatings": ["légère"],
        "source": "Copeaux Classic Chauffe Légère"
    },
    "Copeaux Classic Chauffe Moyenne": {
        "type": "Chips-Flavors",
        "heatings": ["moyenne"],
        "source": "Copeaux Classic Chauffe Moyenne"
    },
    "Blocks Classic Chauffe Légère": {
        "type": "Blocks-Classic",
        "heatings": ["légère"],
        "source": "Blocks Classic Chauffe Légère"
    },
    "Blocks Classic Chauffe Moyenne": {
        "type": "Blocks-Classic",
        "heatings": ["moyenne"],
        "source": "Blocks Classic Chauffe Moyenne"
    },
    "Blocks CLassic Chauffe Moyenne": {
        "type": "Blocks-Classic",
        "heatings": ["moyenne"],
        "source": "Blocks CLassic Chauffe Moyenne"
    },
    "Staves Classic Chauffe Légère": {
        "type": "Staves-Classic",
        "heatings": ["légère"],
        "source": "Staves Classic Chauffe Légère"
    },
    "Staves Classic Chauffe Moyenne": {
        "type": "Staves-Classic",
        "heatings": ["moyenne"],
        "source": "Staves Classic Chauffe Moyenne"
    },
    "Inserts 25% Classic Blonde": {
        "type": "Special",
        "heatings": ["blonde"],
        "source": "Inserts 25% Classic Blonde",
        "special": {
            "right": {
                "source": "Inserts 25%",
                "type": "Inserts-Flavors",
                "heatings": ["blonde"],
                "porcentage": "25%"
            },
            "left": {
                "source": "Classic Blonde",
                "type": "Inserts-Classic",
                "heatings": ["blonde"],
                "porcentage": "75%"
            }
        }
    },
    "Inserts 45% Classic Blonde": {
        "type": "Special",
        "heatings": ["blonde"],
        "source": "Inserts 45% Classic Blonde",
        "special": {
            "right": {
                "source": "Inserts 45%",
                "type": "Inserts-Flavors",
                "heatings": ["blonde"],
                "porcentage": "45%"
            },
            "left": {
                "source": "Classic Blonde",
                "type": "Inserts-Classic",
                "heatings": ["blonde"],
                "porcentage": "55%"
            }
        }
    },
    "Inserts 25% Classic Moyenne": {
        "type": "Special",
        "heatings": ["moyenne"],
        "source": "Inserts 25% Classic Moyenne",
        "special": {
            "right": {
                "source": "Inserts 25%",
                "type": "Inserts-Flavors",
                "heatings": ["moyenne"],
                "porcentage": "25%"
            },
            "left": {
                "source": "Classic Moyenne",
                "type": "Inserts-Classic",
                "heatings": ["moyenne"],
                "porcentage": "75%"
            }
        }
    },
    "Inserts 45% Classic Moyenne": {
        "type": "Special",
        "heatings": ["moyenne"],
        "source": "Inserts 45% Classic Moyenne",
        "special": {
            "right": {
                "source": "Inserts 45%",
                "type": "Inserts-Flavors",
                "heatings": ["moyenne"],
                "porcentage": "45%"
            },
            "left": {
                "source": "Classic Moyenne",
                "type": "Inserts-Classic",
                "heatings": ["moyenne"],
                "porcentage": "55%"
            }
        }
    },
    "Copeaux 50% Flavors/50 % Classic Chauffe Légère": {
        "type": "Special",
        "heatings": ["légère"],
        "special": {
            "right": {
                "source": "Copeaux 50% Flavors",
                "type": "Chips-Flavors",
                "heatings": ["légère"],
                "porcentage": ["50%"]
            },
            "left": {
                "source": "50 % Classic Chauffe Légère",
                "type": "",
                "heatings": ["légère"],
                "porcentage": ["50%"]
            }
        },
        "source": "Copeaux 50% Flavors/50 % Classic Chauffe Légère"
    },
    "Copeaux 50% Flavors/50 % Classic Chauffe Moyenne": {
        "type": "Special",
        "heatings": ["moyenne"],
        "special": {
            "right": {
                "source": "Copeaux 50% Flavors",
                "type": "Chips-Flavors",
                "heatings": ["moyenne"],
                "porcentage": ["50%"]
            },
            "left": {
                "source": "50 % Classic Chauffe Moyenne",
                "type": "",
                "heatings": ["moyenne"],
                "porcentage": ["50%"]
            }
        },
        "source": "Copeaux 50% Flavors/50 % Classic Chauffe Moyenne"
    },
    "Blocks 50% Flavors/50 % Classic Chauffe Légère": {
        "type": "Special",
        "heatings": ["légère"],
        "special": {
            "right": {
                "source": "Blocks 50% Flavors",
                "type": "Blocks-Flavors",
                "heatings": ["légère"],
                "porcentage": ["50%"]
            },
            "left": {
                "source": "50 % Classic Chauffe Légère",
                "type": "Blocks-Classic",
                "heatings": ["légère"],
                "porcentage": ["50%"]
            }
        },
        "source": "Blocks 50% Flavors/50 % Classic Chauffe Légère"
    },
    "Blocks 50% Flavors/50 % Classic Chauffe Moyenne": {
        "type": "Special",
        "heatings": ["moyenne"],
        "special": {
            "right": {
                "source": "Blocks 50% Flavors",
                "type": "Blocks-Flavors",
                "heatings": ["moyenne"],
                "porcentage": ["50%"]
            },
            "left": {
                "source": "50 % Classic Chauffe Moyenne",
                "type": "Blocks-Classic",
                "heatings": ["moyenne"],
                "porcentage": ["50%"]
            }
        },
        "source": "Blocks 50% Flavors/50 % Classic Chauffe Moyenne"
    },
    "Staves 50% Flavors/ 50% Classic Chauffe Légère": {
        "type": "Special",
        "heatings": ["légère"],
        "special": {
            "right": {
                "source": "Staves 50% Flavors",
                "type": "Staves-Flavors",
                "heatings": ["légère"],
                "porcentage": ["50%"]
            },
            "left": {
                "source": " 50% Classic Chauffe Légère",
                "type": "Staves-Classic",
                "heatings": ["légère"],
                "porcentage": ["50%"]
            }
        },
        "source": "Staves 50% Flavors/ 50% Classic Chauffe Légère"
    },
    "Staves 50% Flavors/ 50% Classic Chauffe Moyenne": {
        "type": "Special",
        "heatings": ["moyenne"],
        "special": {
            "right": {
                "source": "Staves 50% Flavors",
                "type": "Staves-Flavors",
                "heatings": ["moyenne"],
                "porcentage": ["50%"]
            },
            "left": {
                "source": " 50% Classic Chauffe Moyenne",
                "type": "Staves-Classic",
                "heatings": ["moyenne"],
                "porcentage": ["50%"]
            }
        },
        "source": "Staves 50% Flavors/ 50% Classic Chauffe Moyenne"
    },
    "Inserts 25% Flavor + Classic Blonde ": {
        "type": "Special",
        "heatings": ["blonde"],
        "special": {
            "right": {
                "source": "Inserts 25% Flavor",
                "type": "Inserts-Flavors",
                "heatings": ["blonde"],
                "porcentage": "25%"
            },
            "left": {
                "source": " Classic Blonde ",
                "type": "Inserts-Classic",
                "heatings": ["blonde"],
                "porcentage": "75%"
            }
        },
        "source": "Inserts 25% Flavor + Classic Blonde "
    },
    "Inserts 45% Flavor + Classic Blonde": {
        "type": "Special",
        "heatings": ["blonde"],
        "special": {
            "right": {
                "source": "Inserts 45% Flavor",
                "type": "Inserts-Flavors",
                "heatings": ["blonde"],
                "porcentage": "45%"
            },
            "left": {
                "source": " Classic Blonde",
                "type": "Inserts-Classic",
                "heatings": ["blonde"],
                "porcentage": "55%"
            }
        },
        "source": "Inserts 45% Flavor + Classic Blonde"
    },
    "Inserts 45% Flavor + Classic Moyenne": {
        "type": "Special",
        "heatings": ["moyenne"],
        "special": {
            "right": {
                "source": "Inserts 45% Flavor",
                "type": "Inserts-Flavors",
                "heatings": ["moyenne"],
                "porcentage": "45%"
            },
            "left": {
                "source": " Classic Moyenne",
                "type": "Inserts-Classic",
                "heatings": ["moyenne"],
                "porcentage": "55%"
            }
        },
        "source": "Inserts 45% Flavor + Classic Moyenne"
    },
    "Inserts 25% Flavor + Classic Blonde": {
        "type": "Special",
        "heatings": ["blonde"],
        "special": {
            "right": {
                "source": "Inserts 25% Flavor",
                "type": "Inserts-Flavors",
                "heatings": ["blonde"],
                "porcentage": "25%"
            },
            "left": {
                "source": " Classic Blonde",
                "type": "Inserts-Classic",
                "heatings": ["blonde"],
                "porcentage": "75%"
            }
        },
        "source": "Inserts 25% Flavor + Classic Blonde"
    },
    "Copeaux Flavors Chauffe Longue": {
        "type": "Chips-Flavors",
        "heatings": ["longue"],
        "source": "Copeaux Flavors Chauffe Longue"
    },
    "Block Flavors Chauffe Moyenne": {
        "type": "Blocks-Flavors",
        "heatings": ["moyenne"],
        "source": "Block Flavors Chauffe Moyenne"
    },
    "Block Flavors Chauffe Longue": {
        "type": "Blocks-Flavors",
        "heatings": ["longue"],
        "source": "Block Flavors Chauffe Longue"
    },
    "Dominos Chauffe Longue": {
        "type": "Dominos-Classic",
        "heatings": ["longue"],
        "source": "Dominos Chauffe Longue"
    },
    "Staves Flavors Chauffe Longue": {
        "type": "Staves-Flavors",
        "heatings": ["longue"],
        "source": "Staves Flavors Chauffe Longue"
    },
    "Staves 18 Flavors Chauffe Longue": {
        "type": "StavesThick-Flavors",
        "heatings": ["longue"],
        "source": "Staves 18 Flavors Chauffe Longue"
    },
    "Inserts 25% Flavor Moyenne": {
        "type": "Special",
        "heatings": ["moyenne"],
        "source": "Inserts 25% Flavor Moyenne",
        "special": {
            "right": {
                "source": "Inserts 25%",
                "type": "Inserts-Classic",
                "heatings": ["moyenne"],
                "porcentage": "25%"
            },
            "left": {
                "source": "Classic Moyenne",
                "type": "Inserts-Flavors",
                "heatings": ["moyenne"],
                "porcentage": "75%"
            }
        }
    },
    "Inserts 45% Flavor Longue": {
        "type": "Special",
        "heatings": ["longue"],
        "source": "Inserts 45% Flavor Longue",
        "special": {
            "right": {
                "source": "Inserts 25%",
                "type": "Inserts-Classic",
                "heatings": ["longue"],
                "porcentage": "45%"
            },
            "left": {
                "source": "Flavor Longue",
                "type": "Inserts-Flavors",
                "heatings": ["longue"],
                "porcentage": "55%"
            }
        }
    },
    "Granulats Flavors": {
        "type": "Granulates-Flavors",
        "heatings": [],
        "source": "Granulats Flavors"
    },
    "Dominos Classic Chauffe Blonde": {
        "type": "Dominos-Classic",
        "heatings": ["blonde"],
        "source": "Dominos Classic Chauffe Blonde"
    },
    "Staves CLassic Chauffe Légère": {
        "type": "Staves-Classic",
        "heatings": ["légère"],
        "source": "Staves CLassic Chauffe Légère"
    },
    "Staves CLassic Chauffe Moyenne": {
        "type": "Staves-Classic",
        "heatings": ["moyenne"],
        "source": "Staves CLassic Chauffe Moyenne"
    },
    "Inserts 25% Classic Blonde ": {
        "type": "Special",
        "heatings": ["blonde"],
        "source": "Inserts 25% Classic Blonde ",
        "special": {
            "right": {
                "source": "Inserts 25%",
                "type": "Inserts-Flavors",
                "heatings": ["blonde"],
                "porcentage": "25%"
            },
            "left": {
                "source": "Classic Blonde",
                "type": "Inserts-Classic",
                "heatings": ["blonde"],
                "porcentage": "75%"
            }
        }
    },
    "Dominos Classic Chauffe Blonde/Moyenne": {
        "type": "Dominos-Classic",
        "heatings": ["moyenne", "blonde"],
        "source": "Dominos Classic Chauffe Blonde/Moyenne"
    },
    "Inserts 45% CLassic Moyenne": {
        "type": "Special",
        "heatings": ["moyenne"],
        "source": "Inserts 45% CLassic Moyenne",
        "special": {
            "right": {
                "source": "Inserts 45%",
                "type": "Inserts-Flavors",
                "heatings": ["moyenne"],
                "porcentage": "45%"
            },
            "left": {
                "source": "CLassic Moyenne",
                "type": "Inserts-Classic",
                "heatings": ["moyenne"],
                "porcentage": "55%"
            }
        }
    },
    "Dominos Classic Chauffe Moyenne": {
        "type": "Dominos-Classic",
        "heatings": ["moyenne"],
        "source": "Dominos Classic Chauffe Moyenne"
    },
    "Inserts 25% Flavors + Classic Blonde ": {
        "type": "Special",
        "heatings": ["blonde"],
        "special": {
            "right": {
                "source": "Inserts 25% Flavors",
                "type": "Inserts-Flavors",
                "heatings": ["blonde"],
                "porcentage": "25%"
            },
            "left": {
                "source": " Classic Blonde ",
                "type": "Inserts-Classic",
                "heatings": ["blonde"],
                "porcentage": "75%"
            }
        },
        "source": "Inserts 25% Flavors + Classic Blonde "
    },
    "Inserts 45% Flavors + Classic Blonde": {
        "type": "Special",
        "heatings": ["blonde"],
        "special": {
            "right": {
                "source": "Inserts 45% Flavors",
                "type": "Inserts-Flavors",
                "heatings": ["blonde"],
                "porcentage": "45%"
            },
            "left": {
                "source": " Classic Blonde",
                "type": "Inserts-Classic",
                "heatings": ["blonde"],
                "porcentage": "55%"
            }
        },
        "source": "Inserts 45% Flavors + Classic Blonde"
    },
    "Inserts 45% Flavors + Classic Moyenne": {
        "type": "Special",
        "heatings": ["moyenne"],
        "special": {
            "right": {
                "source": "Inserts 45% Flavors",
                "type": "Inserts-Flavors",
                "heatings": ["moyenne"],
                "porcentage": "45%"
            },
            "left": {
                "source": " Classic Moyenne",
                "type": "Inserts-Classic",
                "heatings": ["moyenne"],
                "porcentage": "55%"
            }
        },
        "source": "Inserts 45% Flavors + Classic Moyenne"
    },
    "Inserts 25% Flavors Moyenne": {
        "type": "Special",
        "heatings": ["moyenne"],
        "source": "Inserts 25% Flavors Moyenne",
        "special": {
            "right": {
                "source": "Inserts 25%",
                "type": "Inserts-Classic",
                "heatings": ["moyenne"],
                "porcentage": "25%"
            },
            "left": {
                "source": "Flavors Moyenne",
                "type": "Inserts-Flavors",
                "heatings": ["moyenne"],
                "porcentage": "75%"
            }
        }
    },
    "Inserts 45% Flavors Longue": {
        "type": "Special",
        "heatings": ["longue"],
        "source": "Inserts 45% Flavors Longue",
        "special": {
            "right": {
                "source": "Inserts 45%",
                "type": "Inserts-Classic",
                "heatings": ["longue"],
                "porcentage": "45%"
            },
            "left": {
                "source": "Flavors Longue",
                "type": "Inserts-Flavors",
                "heatings": ["longue"],
                "porcentage": "55%"
            }
        }
    },
    "Copeaux Flavors Assemblage Chauffe Légère et Moyenne": {
        "type": "Chips-Flavors",
        "heatings": ["légère", "moyenne"],
        "source": "Copeaux Flavors Assemblage Chauffe Légère et Moyenne"
    },
    "Dominos Classic Assemblage Chauffe Blonde et Moyenne": {
        "type": "Dominos-Classic",
        "heatings": ["moyenne", "blonde"],
        "source": "Dominos Classic Assemblage Chauffe Blonde et Moyenne"
    },
    "Blocks Flavors Assemblage Chauffe Légère et Moyenne": {
        "type": "Blocks-Flavors",
        "heatings": ["légère", "moyenne"],
        "source": "Blocks Flavors Assemblage Chauffe Légère et Moyenne"
    },
    "Dominos Assemblage Chauffe Blonde et Moyenne": {
        "type": "Dominos-Classic",
        "heatings": ["moyenne", "blonde"],
        "source": "Dominos Assemblage Chauffe Blonde et Moyenne"
    },
    "Inserts 25% Flavors Blonde ": {
        "type": "Special",
        "heatings": ["blonde"],
        "source": "Inserts 25% Flavors Blonde ",
        "special": {
            "right": {
                "source": "Inserts 25%",
                "type": "Inserts-Classic",
                "heatings": ["blonde"],
                "porcentage": "25%"
            },
            "left": {
                "source": "Flavors Blonde",
                "type": "Inserts-Flavors",
                "heatings": ["blonde"],
                "porcentage": "75%"
            }
        }
    },
    "Inserts 45% Flavors Blonde": {
        "type": "Special",
        "heatings": ["blonde"],
        "source": "Inserts 45% Flavors Blonde",
        "special": {
            "right": {
                "source": "Inserts 45%",
                "type": "Inserts-Classic",
                "heatings": ["blonde"],
                "porcentage": "45%"
            },
            "left": {
                "source": "Flavors Blonde",
                "type": "Inserts-Flavors",
                "heatings": ["blonde"],
                "porcentage": "55%"
            }
        }
    },
    "Inserts 45% Flavors Moyenne": {
        "type": "Special",
        "heatings": ["moyenne"],
        "source": "Inserts 45% Flavors Moyenne",
        "special": {
            "right": {
                "source": "Inserts 25%",
                "type": "Inserts-Classic",
                "heatings": ["moyenne"],
                "porcentage": "45%"
            },
            "left": {
                "source": "Flavors Moyenne",
                "type": "Inserts-Flavors",
                "heatings": ["moyenne"],
                "porcentage": "55%"
            }
        }
    },
    "Blocks Flavors Chauffe Longue": {
        "type": "Blocks-Flavors",
        "heatings": ["longue"],
        "source": "Blocks Flavors Chauffe Longue"
    },
    "Dominos Classic Chauffe Longue": {
        "type": "Dominos-Classic",
        "heatings": ["longue"],
        "source": "Dominos Classic Chauffe Longue"
    }
}

const fs = require('fs');
const path = require('path');

const names = [];

const editedItems = {};

Object.values(items).map(item => {

    if(item.source.indexOf('%') != -1 && item.source.indexOf('/') == -1 && item.source.indexOf('+') == -1)
    {
        names.push(item.source);

        if(item.source.indexOf('Flavor') != -1 || item.source.indexOf('Flavors') != -1) {
            item.type = "Inserts-Flavors";
        }
        if(item.source.indexOf('Classic') != -1) {
            item.type = "Inserts-Classic";
        }

        item.special = undefined;
        editedItems[item.source] = item;
    }
    else
    {
        editedItems[item.source] = item;
    }
})

Debug.log(names, names.length);

fs.writeFileSync(path.join(__dirname, '/editedItems.json'), JSON.stringify(editedItems), 'UTF-8', _=>_);