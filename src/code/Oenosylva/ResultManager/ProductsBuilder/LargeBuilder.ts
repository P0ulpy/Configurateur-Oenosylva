import ProductsBuilder from ".";
import { Data } from "../../../lib/Calculator";
import Debug from "../../../lib/Debug";
import ProductBuilder, { Product } from "./ProductBuilder";

export type Direction = "row" | "column"

export default class LargeBuilder extends ProductBuilder
{
    public container : JQuery;

    private recommendationsContainer : JQuery;
    private allProductsContainer : JQuery;

    constructor(data : Data, public productsBuilder : ProductsBuilder)
    {
        super(data);
        this.container = this.productsBuilder.container;
    }

    public build(products : Map<string, Product>, direction : Direction)
    {
        this.recommendationsContainer?.remove();
        this.allProductsContainer?.remove();

        this.recommendationsContainer = this.buildProductsRecommendations(products, direction);
        this.allProductsContainer = this.buildAllProducts(this.recommendationsContainer, direction);
    }

    private buildProductsRecommendations(products : Map<string, Product>, direction : Direction) : JQuery
    {
        const responsesContainer = 
        $(`
        <div class="response-container col s12">
            <div class="response-title col center" style="background-color: #CB8827; color: #231F20;">
                ${this.data.config.response.title}
            </div>
        </div>`)
        .appendTo(this.container);

        const productslinesContainer = $(`<div class="products-lines-container row">`).appendTo(responsesContainer);

        const buildRange = (products : Map<string, Product>, architecture : string[], container : JQuery) => 
        {
            let index = 0;

            const rangeProducts = new Map<string, Product>();

            for(const productType of products.entries())
            {
                // if product key is contained in achitecture then continue
                if(!architecture.filter((productIndex) => productIndex === productType[0])[0]) continue;
                rangeProducts.set(productType[0], productType[1])
            }

            for(const productTypeIndex of rangeProducts.keys())
            {
                index++;
                const prodType = this.data.productsType[productTypeIndex];
                this.buildProduct(productTypeIndex, prodType, rangeProducts, (index === rangeProducts.size)).appendTo(container);
            }
        }

        if(direction !== 'row' || this.productsHaveLine(products, 'classic'))
        {
            Debug.log("builinding recommendations classic range");
            const classicLineContainer = $(`
            <div class="product-line-container ${(direction === "column") ? "col s6" : "row"}" style="border-right: solid 1px #CB8827;">
                <div class="product-line-title center">${this.data.config.response.classicTitle}</div>
            </div>`).appendTo(productslinesContainer);

            buildRange(products, this.data.config.response.achitecture.classic, classicLineContainer);
        }

        if(direction !== 'row' || this.productsHaveLine(products, 'flavors'))
        {
            Debug.log("builinding recommendations flavors range");
            const flavorLineContainer = $(`
            <div class="product-line-container ${(direction === "column") ? "col s6" : "row"}">
                <div class="product-line-title center">${this.data.config.response.flavorsTitle}</div>
            </div>`).appendTo(productslinesContainer);
    
            buildRange(products, this.data.config.response.achitecture.flavors, flavorLineContainer);
        }

        this.emit('buildProductsRecommendations', responsesContainer);
        return responsesContainer;
    }

    private productsHaveLine(productsMap: Map<string, Product>, range: "flavors" | "classic"): boolean
    {
        for(const item of this.data.config.response.achitecture[range])
        {
            if(item && productsMap.has(item))
            {
                return true;
            }
        }
    }

    private buildAllProducts(focusElement : JQuery, direction : Direction) : JQuery
    {
        const responsesContainer = 
        $(`
        <div class="response-all-container col s12">
            <div class="response-title col center" style="background-color: #CB8827; color: #231F20;">
                ${this.data.config.response.title2}
            </div>
        </div>`)
        .appendTo(this.container);
    
        const productslinesContainer = $(`<div class="products-lines-container row">`).appendTo(responsesContainer);

        const buildAllRange = (architecture : string[], container : JQuery) => 
        {
            let index = 0;

            for(const productTypeIndex of architecture)
            {
                index++;

                if(productTypeIndex)
                {
                    const prodType = this.data.productsType[productTypeIndex];
                    this.buildAllProduct(prodType, (index === architecture.length)).appendTo(container);
                }
                else if(direction === 'column')
                {
                    $(`<div class="product row s12 valign-wrapper" ${(index === architecture.length) ? `style="border-bottom: none"` : ''}>`).appendTo(container);
                }
            }
        }

        Debug.log("builinding allProducts classic range");

        const classicLineContainer = $(`
        <div class="product-line-container ${(direction === "column") ? "col s6" : "row"}" style="border-right: solid 1px #CB8827;">
            <div class="product-line-title center">${this.data.config.response.classicTitle}</div>
        </div>`).appendTo(productslinesContainer);

        buildAllRange(this.data.config.response.achitecture.classic, classicLineContainer);

        Debug.log("builinding allProducts flavors range");

        const flavorLineContainer = $(`
        <div class="product-line-container ${(direction === "column") ? "col s6" : "row"}">
            <div class="product-line-title center">${this.data.config.response.flavorsTitle}</div>
        </div>`).appendTo(productslinesContainer);
        
        buildAllRange(this.data.config.response.achitecture.flavors, flavorLineContainer);

        focusElement.get(0).scrollIntoView({
            block: 'center',
            behavior: 'smooth'
        });

        this.emit('buildAllProducts', responsesContainer);
        return responsesContainer;
    }
}