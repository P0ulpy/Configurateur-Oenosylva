import Debug from "../Debug";
import UIElement from "../UIElement";
import ChoiceContainer from "./ChoiceContainer";
import ChoicesEnumerator from "./ChoicesEnumerator";

export default
class ChoiceButton extends UIElement {

    public type : string;

    public choiceContainer: ChoiceContainer;
    public choiceEnumerator: ChoicesEnumerator;
    public container: JQuery<HTMLElement>;
    
    protected buildArgs : any[];

    constructor(type : string, choiceContainer: ChoiceContainer, ...args : any[])
    {
        super();

        this.type = type;
        this.choiceContainer = choiceContainer;
        this.choiceEnumerator = this.choiceContainer.choicesManager.choicesEnumerator;
        this.buildArgs = args;
    }

    protected buildButton(buildCallback : (...args : any[]) => JQuery)
    {
        Debug.log(`Building button type "${this.type}" with args`, ...this.buildArgs)

        this.container = buildCallback(...this.buildArgs);

        this.onBuild(...this.buildArgs);
        this.emit('build', ...this.buildArgs);

        this.container.on('click', (handler : any) => {
            this.emit('click', handler, ...this.buildArgs);
            this.onClick(handler, ...this.buildArgs);
        });

        return this;
    }

    protected onBuild(...args : any[]) : void {}
    protected onClick(handler : false | JQuery.EventHandlerBase<HTMLElement, JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>>, ...args : any[]) : void {}
}