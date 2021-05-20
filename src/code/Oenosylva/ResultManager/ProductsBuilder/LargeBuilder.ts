import ProductsBuilder from ".";
import { Data } from "../../../lib/Calculator";
import Debug from "../../../lib/Debug";
import ProductBuilder, { Product } from "./ProductBuilder";

export type Direction = "row" | "column";

export type TemplatePair = { 
    classic?: Product | null, 
    flavors?: Product | null
};

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
        // on recrée les container a chaques fois que l'on appelle build
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

        if(direction === "row")
        {
            this.buildRecommendationsRow(productslinesContainer, products);
        }
        if(direction === "column")
        {
            this.buildRecommendationsCol(productslinesContainer, products);
        }

        this.emit('buildProductsRecommendations', responsesContainer);
        return responsesContainer;
    }

    private buildRecommendationsRow(productslinesContainer : JQuery, products: Map<string, Product>)
    {
        if(this.productsHaveLine(products, 'classic'))
        {
            Debug.log("builinding recommendations classic range");
            const classicLineContainer = $(`
            <div class="product-line-container row" style="border-right: solid 1px #CB8827;">
                <div class="product-line-title center">${this.data.config.response.classicTitle}</div>
            </div>`).appendTo(productslinesContainer);

            this.buildRange(products, this.data.config.response.achitecture.classic, classicLineContainer);
        }

        if(this.productsHaveLine(products, 'flavors'))
        {
            Debug.log("builinding recommendations flavors range");
            const flavorLineContainer = $(`
            <div class="product-line-container row">
                <div class="product-line-title center">${this.data.config.response.flavorsTitle}</div>
            </div>`).appendTo(productslinesContainer);
    
            this.buildRange(products, this.data.config.response.achitecture.flavors, flavorLineContainer);
        }
    } 

    private buildRecommendationsCol(container : JQuery, products: Map<string, Product>)
    {
        let classicLineContainer: JQuery = null;
        let flavorLineContainer: JQuery = null;

        if(this.productsHaveLine(products, 'classic'))
        {
            Debug.log("builinding recommendations classic range");
            
            classicLineContainer = $(`
            <div class="product-line-container col s6" style="border-right: solid 1px #CB8827;">
                <div class="product-line-title center">${this.data.config.response.classicTitle}</div>
            </div>`).appendTo(container);
        }

        if(this.productsHaveLine(products, 'flavors'))
        {
            Debug.log("builinding recommendations flavors range");
            
            flavorLineContainer = $(`
            <div class="product-line-container col s6">
                <div class="product-line-title center">${this.data.config.response.flavorsTitle}</div>
            </div>`).appendTo(container);
        }

        if(this.productsHavePorcentage(products))
        {
            this.buildRangeColOrdered(products, classicLineContainer, flavorLineContainer);
        }
        else
        {
            if(classicLineContainer)
            {
                this.buildRange(products, this.data.config.response.achitecture.classic, classicLineContainer)
            }
            if(flavorLineContainer)
            {
                this.buildRange(products, this.data.config.response.achitecture.flavors, flavorLineContainer)

            }
        }
        
    } 

    private buildRange(products : Map<string, Product>, architecture : string[], container : JQuery)
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
            this.buildProduct(prodType, rangeProducts.get(productTypeIndex), (index === rangeProducts.size))
            .appendTo(container);
        }
    }

    private buildRangeColOrdered(products: Map<string, Product>, classicLineContainer : JQuery,  flavorLineContainer : JQuery)
    {
        const itemsOrder = this.buildItemsOrder(products);

        const buildOne = (item: Product, container : JQuery) => 
        {
            const prodType = this.data.productsType[item.type];
            this.buildProduct(prodType, item, (index === itemsOrder.length))
            .appendTo(container);
        }

        let index = 0;
        for(const orderLine of itemsOrder)
        {
            index++;

            if(orderLine.classic)
            {
                buildOne(orderLine.classic, classicLineContainer);
            }
            else
            {
                $(`<div class="product row s12 valign-wrapper" style="border-bottom: none">`)
                .appendTo(classicLineContainer);
            }
            
            if(orderLine.flavors)
            {
                buildOne(orderLine.flavors, flavorLineContainer);   

            } 
            else
            {
                $(`<div class="product row s12 valign-wrapper" ${(index === itemsOrder.length) ? `style="border-bottom: none"` : ''}>`)
                .appendTo(flavorLineContainer);
            }
        }
    }

    private buildItemsOrder(products: Map<string, Product>) : TemplatePair[]
    {
        const architecture = this.data.config.response.achitecture;

        let highest = 0;
        let lowest = 0;

        for(const product of products.values())
        {
            console.log(product.type);

            const classicIndex = architecture.classic.findIndex(item => item === product.type);
            const flavorsIndex = architecture.flavors.findIndex(item => item === product.type);

            console.log(classicIndex, flavorsIndex);

            highest = (classicIndex > highest) ? classicIndex : highest;
            highest = (flavorsIndex > highest) ? flavorsIndex : highest;

            lowest = (classicIndex != -1 && classicIndex < lowest) ? classicIndex : lowest;
            lowest = (flavorsIndex != -1 && flavorsIndex < lowest) ? flavorsIndex : lowest;
        }

        console.log(highest);
        console.log(lowest);

        const template: TemplatePair[] = [];

        for(let i = lowest; i <= highest; i++)
        {
            const line: TemplatePair = {};

            const flavorsItem = architecture.flavors[i];
            const classicItem = architecture.classic[i];

            line.classic = (products.has(classicItem)) ? products.get(classicItem) : null;
            line.flavors = (products.has(flavorsItem)) ? products.get(flavorsItem) : null;

            if(line.classic || line.flavors)
            {
                template.push(line);
            }
        }

        return template;
    }

    private productsHavePorcentage(productsMap: Map<string, Product>): boolean
    {
        for(const product of productsMap.values())
        {
            if(product.porcentage)
            {
                return true;
            }
        }

        return false;
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