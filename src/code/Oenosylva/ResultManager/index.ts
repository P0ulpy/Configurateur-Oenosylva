import { Data } from "../../lib/Calculator";
import UIElement from "../../lib/UIElement";
import ContactBuilder from "./Contact/ContactBuilder";
import ProductsBuilder from "./ProductsBuilder/index";

export default class ResultManager
{
    public productBuilder : ProductsBuilder
    public contactBuilder : ContactBuilder;

    constructor(public data : Data, public container : JQuery)
    {
        this.productBuilder = new ProductsBuilder(this);
        this.contactBuilder = new ContactBuilder(this);
        this.productBuilder.on('buildProductsRecommendations', () => this.contactBuilder.build());
        //this.productBuilder.on('buildAllProducts', () => this.contactBuilder.build());
    }

    public build(choices : any)
    {
        this.productBuilder.build(choices);
    }
}