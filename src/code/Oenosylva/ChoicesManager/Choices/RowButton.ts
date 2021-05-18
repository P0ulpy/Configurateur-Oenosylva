import ChoiceButton from "../../../lib/Choices/ChoiceButton";
import Debug from "../../../lib/Debug";
import RowContainer from "./RowContainer";

export default
class RowButton extends ChoiceButton 
{
    constructor(type : string, choiceContainer : RowContainer, ...args : any[])
    {
        super(type, choiceContainer, ...args);
        
        this.buildButton((choiceIndex : number, choiceNextIndex : number, label : string, imgSrc : string) => 
        $(`
        <div class="apport-button col">
            <img class="apport-button-img col s12 m6 offset-m3 l4 offset-l4" src="${imgSrc}">
            <div class="apport-button-text col s12 center">${label}</div>
        </div>`));
    }

    protected onBuild(choiceIndex : number, choiceNextIndex : number, label : string, imgSrc : string) : void
    {
        this.container.attr('id', label);
    }

    protected onClick(handler, choiceIndex : number, choiceNextIndex : number, label : string, imgSrc : string) : void
    {
        Debug.log('click', choiceIndex, choiceNextIndex, label);
        
        // on change la source de l'image du button pour mettre la version clicked
        const src = this.container.children(".apport-button-img").attr('src').replace('-clicked', '');
        this.container.children(".apport-button-img").attr('src', `${src.split('.svg')[0]}-clicked.svg`);

        //TODO : REFONTE des clicked

        // si on modifie un choix on enleve "clicked" du boutton
        // tester si le button qui est clicked est le bouton actuellement clicked
        if(this.choiceEnumerator.get(choiceIndex).value && choiceIndex != this.choiceEnumerator.current.index  && !this.container.hasClass('clicked'))
        {
            const element = document.getElementById(this.choiceEnumerator.get(choiceIndex).value);    
            element.setAttribute('class', element.getAttribute('class').replace('clicked', ''));

            if($(element).children(".apport-button-img").attr('src'))
            {
                const src = $(element).children(".apport-button-img").attr('src').replace('-clicked', '');
                $(element).children(".apport-button-img").attr('src', src);
            }
        }

        this.container.addClass('clicked');
    
        this.choiceEnumerator.set(choiceIndex, label);
        this.choiceEnumerator.goTo(choiceNextIndex);
    }
}