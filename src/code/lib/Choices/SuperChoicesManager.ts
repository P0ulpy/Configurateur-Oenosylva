import Configurator from "../Calculator";
import ChoicesEnumerator from "./ChoicesEnumerator";
import EventEmitter from "../EventEmitter";
import SuperDataProvider from "../SuperDataProvider";

import ChoiceContainer, { ContainerCreationCallback } from "./ChoiceContainer";
import Debug from "../Debug";

export default class SuperChoicesManager extends EventEmitter
{
    public choicesEnumerator: ChoicesEnumerator;
    public dataProvider: SuperDataProvider;

    private choiceContainersCreation : ContainerCreationCallback[] = [];
    private ChoiceContainerClasses = new Map<string, typeof ChoiceContainer>() ;

    constructor(public configurator : Configurator)
    {
        super();
        this.configurator = configurator;
        this.choicesEnumerator = new ChoicesEnumerator(this.configurator.data.choices);
        this.dataProvider = new SuperDataProvider(this);
    }

    /**
     * // TODO : buildChoice description
     */
    public buildChoice() : void
    {
        this.emit('build');
        this.onBuildChoice();
    }
    protected onBuildChoice() : void {}
    
    /**
     * // TODO : buildProducts description
     */
    protected buildProducts() : void
    {
        this.emit('buildProducts');
        this.onBuildProducts()
        // TODO : buildProduct
    }
    protected onBuildProducts() : void {}

    /**
     * // TODO : createChoice description
     * @param type 
     * @param data 
     * @param args 
     */
    protected createChoiceContainer(type : string, data : any[], ...args : any[]) : ChoiceContainer
    {
        if(this.ChoiceContainerClasses.has(type))
        {
            const ChoiceContainerClass = this.ChoiceContainerClasses.get(type);
            const choice = new ChoiceContainerClass(type, this.choiceContainersCreation, this, data, ...args);
            
            Debug.log(`Successfully created new choice`, choice);

            return choice;
        }
        else
        {
            Debug.error(`trying to create unregistered Choice type "${type}"`);
            return null;
        }
    }

    /**
     * //TODO : registerChoiceContainersCreation description
     * @param creationCallback 
     */
    protected registerChoiceContainersCreation(creationCallback : ContainerCreationCallback)
    {
        this.choiceContainersCreation.push(creationCallback);
        Debug.log(`Registering GLOBAL choice container callback`);
    }

    /**
     * // TODO : registerDataProviderClass description
     * @param index
     * @param Choice 
     */
    protected registerChoiceClass(index : string, ChoiceClass : typeof ChoiceContainer)
    {
        this.ChoiceContainerClasses.set(index, ChoiceClass);
        Debug.log(`Registering choice class`);
    }

    /**
     * // TODO : registerDataProviderClass description
     * @param DataProviderClass 
     */
    protected registerDataProviderClass(DataProviderClass : typeof SuperDataProvider)
    {
        this.dataProvider = new DataProviderClass(this);
        Debug.log(`Registering DataProvider class`);
    }
}