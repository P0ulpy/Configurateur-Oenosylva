import { Data } from "../../../lib/Calculator";
import EventEmitter from "../../../lib/EventEmitter";

export
type Product = {
    type: string;
    heatings: string[],
    source: string,
    porcentage?: string,
    special? : {
        right: Product,
        left: Product
    }
}

export
type ProductType = {
    label: string,
    line: string,
    imagePath : string,
    productDescription : string,
    dimensions : string,
    conditioning : string,
    heating : {
        label : string,
        imgPath : string,
        types : string[]
    }
}

export default class ProductBuilder extends EventEmitter
{
    constructor(public data : Data) 
    {
        super();
    }

    public buildProduct(key : string, prodType : ProductType, products : Map<string, Product>, noBottomLine: boolean) : JQuery
    {
        const product = products.get(key);
        
        return $(`
            <div class="product row s12 valign-wrapper" ${(noBottomLine) ? `style="border-bottom: none"` : ''}>
                            
                <div class="product-img col s3 m3 l3 ${(!product) ? 'dontsee' : ""}">
                    <img class="responsive-img" src="${prodType.imagePath}">
                </div>
                
                <div class="heating-container col s4 m3 l3 ${(!product) ? 'dontsee' : ""}">
                    <img class="responsive-img" src="${prodType.heating.imgPath}">
                    <div class="heating-text col s12 center">${prodType.heating.label}</div>
                </div>  

                <div class="heating-span-text col s3">${this.buildHeatingsText(prodType.heating.types, product)}</div>

                <div class="porcentage col s1">
                    ${(product && product.porcentage) ? /*TODO : product.porcentage*/ "50%" : ""}
                </div>

                <img class="item-download-button col responsive-img ${(!product) ? 'dontsee' : ""}" 
                src="${this.data.config.response.downloadImage}"
                onclick="window.open('${prodType.productDescription}')">

            </div>`);
    }

    private buildHeatingsText(heatings: string[], product? : Product | null) : string
    {
        let heatingsString = "";

        for(const heating of heatings)
        {
            let heat = undefined;

            // if product is not defined heat HTML element have "dontsee" class
            if(product)
            {
                for(const productHeating of product.heatings) 
                {
                    if(productHeating.toLowerCase() == heating.toLowerCase())
                    {
                        heat = productHeating;
                    }
                }
            }

            heatingsString += `<div ${(!heat) ? 'class="dontsee"' : ""}> ${heating} </div>`;
        }

        return heatingsString;
    }

    public buildAllProduct(prodType : ProductType, noBottomLine: boolean) : JQuery
    {
        return $(`
            <div class="product row s12 valign-wrapper" ${(noBottomLine) ? `style="border-bottom: none"` : ''}>
                            
                <div class="product-img col s3 m3 l3">
                    <img class="responsive-img" src="${prodType.imagePath}">
                </div>
                
                <div class="heating-container col s4 m3 l3">
                    <img class="responsive-img" src="${prodType.heating.imgPath}">
                    <div class="heating-text col s12 center">${prodType.heating.label}</div>
                </div>  

                <div class="heating-span-text col s3">${prodType.heating.types.reduce((previousHeating, heating) => previousHeating += `<div> ${heating} </div>`, "")}</div>

                <div class="porcentage col s1">
                    
                </div>

                <img class="item-download-button col responsive-img" 
                src="${this.data.config.response.downloadImage}"
                onclick="window.open('${prodType.productDescription}')">

            </div>`);
    }
}