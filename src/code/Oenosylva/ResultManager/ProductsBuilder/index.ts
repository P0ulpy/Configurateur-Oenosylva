import ResultManager from "..";
import { Data } from "../../../lib/Calculator";
import UIElement from "../../../lib/UIElement";
import ProductsParser from "./ProductsParser";
import LargeBuilder from "./LargeBuilder";
import Debug from "../../../lib/Debug";

export default
class ProductsBuilder extends UIElement
{
    public data : Data;
    public container : JQuery;
    public productsParser : ProductsParser;
    public largeBuilder : LargeBuilder

    constructor(public resultManager : ResultManager)
    {
        super();
        this.data = this.resultManager.data;
        this.container = this.resultManager.container;
        this.productsParser = new ProductsParser(this.data);

        this.largeBuilder = new LargeBuilder(this.data, this);

        this.largeBuilder.on('buildProductsRecommendations', () => this.emit("buildProductsRecommendations"))
        this.largeBuilder.on('buildAllProducts', () => this.emit("buildAllProducts"));
    }

    /**
     * // TODO : build description
     */
    public build(productsNames : string[])
    {
        Debug.log('---------- building products');

        $('.response-container').remove();

        Debug.log("productsNames", productsNames);

        // building products array concating duplicated product type
        const products = this.productsParser.concatDoublons(productsNames);

        Debug.log("concated products", products);

        if(this.isDisplaySize("l") || this.isDisplaySize("m"))
        {
            this.largeBuilder.build(products, "column");
        }
        else
        {
            this.largeBuilder.build(products, "row");
        }
    }
}