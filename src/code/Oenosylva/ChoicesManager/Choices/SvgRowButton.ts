import ChoiceButton from "../../../lib/Choices/ChoiceButton";
import Debug from "../../../lib/Debug";
import SvgRowContainer from "./SvgRowContainer";

export default
class SvgRowButton extends ChoiceButton 
{
    constructor(type : string, choiceContainer : SvgRowContainer, ...args : any[])
    {
        super(type, choiceContainer, ...args);
        
        this.buildButton((choiceIndex : number, choiceNextIndex : number, label : string, imgSrc : string) => 
        $(`
        <div class="wine-button col s6">
            <div class="col s10 m8 offset-m2 l12"><img class="responsive-img" src="${imgSrc}"></div>
            <div class="col s10 offset-m1 center">${label}</div>
        </div>`));
    }

    protected onBuild(choiceIndex : number, choiceNextIndex : number, label : string, imgSrc : string)
    {
        this.container.attr('id', label);
    }

    protected onClick(handler, choiceIndex : number, choiceNextIndex : number, label : string, imgSrc : string) : void
    {
        Debug.log('click', imgSrc, choiceIndex, choiceNextIndex, label);
        
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