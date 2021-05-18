import ChoiceButton from "../../../lib/Choices/ChoiceButton";
import Debug from "../../../lib/Debug";
import ColumnChoiceContainer from "./ColumnContainer";

export default
class ColumnButton extends ChoiceButton 
{
    constructor(type : string, choiceContainer : ColumnChoiceContainer, ...args : any[])
    {
        super(type, choiceContainer, ...args);
        
        this.buildButton((choiceIndex : number, choiceNextIndex : number, label : string) => 
        {
            return $(`<div class="column-button row s3 center-align">${label}</div>`);
        });
    }

    protected onBuild(choiceIndex : number, choiceNextIndex : number, label : string)
    {
        this.container.attr('id', label);
    }

    protected onClick(handler, choiceIndex : number, choiceNextIndex : number, label : string) : void
    {
        Debug.log('click', choiceIndex, choiceNextIndex, label);

        // si on modifie un choix on enleve "clicked" du boutton
        // tester si le button qui est clicked est le bouton actuellement clicked
        if(this.choiceEnumerator.get(choiceIndex).value && choiceIndex != this.choiceEnumerator.current.index && !this.container.hasClass('clicked'))
        {
            const element = document.getElementById(this.choiceEnumerator.get(choiceIndex).value);    
            element.setAttribute('class', element.getAttribute('class').replace('clicked', ''));
        }

        this.container.addClass('clicked');
    
        this.choiceEnumerator.set(choiceIndex, label);
        this.choiceEnumerator.goTo(choiceNextIndex);
    }
}