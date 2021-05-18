import Debug from "../Debug";
import UIElement from "../UIElement";
import ChoiceButton from "./ChoiceButton";
import SuperChoicesManager from "./SuperChoicesManager";

export type ContainerCreationCallback = (type : string, ...args : any[]) => JQuery<HTMLElement>;

export default
class ChoiceContainer extends UIElement {

    public type : string;
    public choicesManager: SuperChoicesManager
    public container: JQuery;
    public containersbundle: JQuery[] = [];

    public data : any;

    private buildArgs : any[];
    private buttons: ChoiceButton[] = [];
    private ButtonClass : typeof ChoiceButton;
    
    /**
     * // TODO ChoiceContainer constructor description
     * @param type 
     * @param choicesManager 
     * @param data 
     * @param args...
     */
    constructor(
        type : string, 
        containersCreation : ContainerCreationCallback[], 
        choicesManager: SuperChoicesManager, 
        data : any, 
        ...args : any[])
    {
        super();
        this.type = type;
        this.choicesManager = choicesManager;
        this.data = data;
        this.buildArgs = args;

        for(const containerCreation of containersCreation)
        {
            this.createNewContainer(containerCreation);
        }
    }

    /**
     * // TODO creationCallback description
     * @param creationCallback
     */
    public createNewContainer(creationCallback : ContainerCreationCallback)
    {
        // si il n'existe pas de container le nouveau container deviens le container
        if(!this.container)
        {
            this.container = creationCallback(this.type, ...this.buildArgs).appendTo(this.choicesManager.configurator.container);
        }
        // si le container est deja définit on rajoute le nouveau container crée a l'interieur du container et le nouveau container deviens le container
        else
        {
            this.container = creationCallback(this.type, ...this.buildArgs).appendTo(this.container);
        }

        this.containersbundle.push(this.container);
    }

    /**
     * //TODO : createButton description
     * @param args 
     */
    protected createButton(...args : any[]) : ChoiceButton
    {
        const button : ChoiceButton = new this.ButtonClass(this.type, this, ...args);
        button.container.appendTo(this.container);
        
        this.buttons.push(button);
        button.on('click', (handler, ...args) => this.emit('click', button, handler, ...args))

        this.emit('createButton', button);
        return button;
    }

    /**
     * //TODO : createButton registerButtonClass
     * @param ButtonClass 
     */
    protected registerButtonClass(ButtonClass : any)
    {
        this.ButtonClass = ButtonClass;
        Debug.log(`Registering Button Class for "${this.type}"`);
    }
}