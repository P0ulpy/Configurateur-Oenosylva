import { Data } from "../../../lib/Calculator";
import { copy } from "../../../lib/formatData";
import { Product } from "./ProductBuilder";

export default 
class ProductsParser
{
    constructor(public data : Data) {}

    /**
     * Retourne une array de Product a partir d'un tableau d'index de produit
     * @param productsIndexs {string[]}
     * @returns les produits sous forme de Product[]
     */
    public getProducts(productsIndexs : string[]) : Product[]
    {
        return productsIndexs.map(index => copy(this.data.products[index.trim()])) as Product[];
    }
 
    /**
     * Retourne une map de Product a partir d'un tableau d'index de produit
     * @param productsIndexs {string[]}
     * @returns les produits sous forme de Map<string, Product>
     */
    public getProductsMap(productsIndexs : string[]) : Map<string, Product>
    {
        const products = new Map<string, Product>();

        for(const index of productsIndexs)
        {
            products.set(index, copy(this.data.products[index.trim()]));
        }

        return products;
    }
 
    /**
     * Conctat les heatings des produits qui sont du meme type et qui se suivent et retourne les produits sous former de Product[]
     * @param productsNames {string[]}
     * @returns les produits sous forme de Product[]
     */
    public concatDoublons(productsNames : string[]) : Map<string, Product>
    {
        const dontMap : string[] = [];

        const productsRaw = this.getProducts(Object.values(productsNames));
        const products = new Map<string, Product>();

        for(const curr of productsRaw) 
        {
            for(const other of productsRaw)
            {
                if(other.source == curr.source) continue;

                if(curr.type == other.type)
                {     
                    if(!curr.special)
                    {
                        other.heatings.forEach(heating => {
                            if(!curr.heatings.includes(heating)) curr.heatings.push(heating);   
                        });
    
                        dontMap.push(other.source);
                    }
                    else if (curr.special.left.porcentage == other.special.left.porcentage &&
                        curr.special.right.porcentage == other.special.right.porcentage)
                    {
                        other.heatings.forEach(heating => {
                            if(!curr.heatings.includes(heating)) curr.heatings.push(heating);
                        });
    
                        dontMap.push(other.source);
                    }
                }
            }

            if(!dontMap.includes(curr.source)) 
            {
                if(curr.special)
                {
                    products.set(curr.special.right.type, curr.special.right);
                    products.set(curr.special.left.type, curr.special.left);
                }
                else
                {
                    products.set(curr.type, curr);
                }
            }
        }

        return products;
    }
}