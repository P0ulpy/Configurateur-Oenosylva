import ChoicesManager from './Choices/SuperChoicesManager';
import Debug, { DebugLevel } from './Debug';
import EventEmitter from './EventEmitter';
import { formatData } from './formatData';

export type ConfiguratorPathes = {
    configPath : string,
    treePath : string,
    productsPath : string,
    productsTypePath : string,
    productsLinePath : string
}

export type Data = {
    tree?: any;
    choices?: string[];
    config?: {
        choices : {
            descriptions : string[],
            styles : string[]
        },
        response : {
            title : string,
            title2 : string,
            classicTitle : string,
            flavorsTitle : string,
            downloadImage : string,
            achitecture : {
                classic : string[],
                flavors : string[]
            }
        },
        outsideCalculator : {
            title : string,
            text : string,
            img : string
        },
        contact? : {
            title : string,
            arrowImg : string,
            countries : { label: string, link: string, subLinks?: { label: string, link: string }[] }[]
        }
    }
    products? : any;
    productsType? : any;
    productsLine? : any;
}

export default
class Calculator extends EventEmitter
{
    container: JQuery;
    choicesManager: ChoicesManager;
    
    data : Data = {};

    /**
     * //TODO : Configurator constructor description
     * @param container 
     * @param paths 
     */
    constructor(container : string, paths : ConfiguratorPathes, debugLevel? : DebugLevel) 
    {
        super()

        if (debugLevel) Debug.debugLevel = debugLevel

        this.container = $(container);
        this.fetchDataFiles(paths);
    }

    /**
     * Récuperation de toutes les données externes avec lesquelles sera contruit le Configurator
     * @param paths 
     */
    async fetchDataFiles(paths : ConfiguratorPathes)
    {
        Debug.log('paths', paths, this)

        let response = await fetch(paths.configPath);
        let text = await response.text();
        let json = await JSON.parse(text);

        this.data.config = json;
        this.buildPreConfigurator();
        
        response = await fetch(paths.productsPath);
        text = await response.text();
        json = await JSON.parse(text);

        this.data.products = json;

        response = await fetch(paths.productsTypePath);
        text = await response.text();
        json = await JSON.parse(text);

        this.data.productsType = json;

        response = await fetch(paths.productsLinePath);
        text = await response.text();
        json = await JSON.parse(text);

        this.data.productsLine = json;

        response = await fetch(paths.treePath)
        text = await response.text()
        const rawTree = await JSON.parse(text)
        
        const { choices, formatedTree } = formatData(rawTree);
        
        this.data.tree = formatedTree;
        this.data.choices = choices;

        Debug.log('data Loaded', this.data);

        this.emit('fetched');
    }

    protected buildPreConfigurator() : void {}

    protected registerChoiceManagerClass(ChoiceManagerClass : any) : void
    {
        this.choicesManager = new ChoiceManagerClass(this);
        this.choicesManager.buildChoice();
    }

}