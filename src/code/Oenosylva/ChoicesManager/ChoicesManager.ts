import Configurator from "../../lib/Calculator";
import SuperChoicesManager from "../../lib/Choices/SuperChoicesManager";
import DataProvider from "../DataProvider";
import RowContainer from "./Choices/RowContainer";
import ColumnContainer from "./Choices/ColumnContainer";
import SvgRowContainer from "./Choices/SvgRowContainer";
import ConfiguratorMain from "../CalculatorMain";
import Debug from "../../lib/Debug";

export default 
class ChoicesManager extends SuperChoicesManager {

    constructor(configurator : Configurator)
    {
        super(configurator);

        this.registerDataProviderClass(DataProvider);

        this.registerChoiceClass('row', RowContainer);
        this.registerChoiceClass('column', ColumnContainer);
        this.registerChoiceClass('svgRow', SvgRowContainer);

        // Création d'une fonction qui sera executer a la création des containers de choix
        this.registerChoiceContainersCreation((type : string, index : number, description : string) => {

            return $(`<div class="choice-container row s12 valign-wrapper">
        
                <div class="choice-title-number col s2 m1 l1">${index}</div>

                <div class="choice-title-text col s4 hide-on-small-only">
                    <div>${description}</div>
                </div>
            </div>`)
            .attr('id', `${type}${index}`);

        });

        this.registerChoiceContainersCreation((type : string, index : number, description : string) => {

            return $(`<div class="choice-buttons-container col s12 m7 l7">
                <div class="col s12 hide-on-med-and-up center-align" style="font-size: 20pt; margin-bottom: 0.5em;">
                    <div style="color: white;">${description}</div>
                </div>
            </div>`);

        });

        this.registerChoiceContainersCreation((type : string, index : number, description : string) => { return $(`<div class="row s12"></div>`); });
        
        this.choicesEnumerator.on('change', (_: any) => this.buildChoice());
        this.choicesEnumerator.on('end', (_: any) => this.buildProducts());
    }

    public onBuildChoice() : void
    {
        const values : any = this.dataProvider.get("ValuesByChoices");

        Debug.log('---------- building configurator', values);

        if(!values) {
            Debug.warn(`can't build : no values defined`);
            this.emit('error', `can't build : no values defined`)
            return;
        }

        // si on change de choix et que les reponses sont déja afficher 
        $(".response-container").remove();
        $(".response-all-container").remove();
        $("#contact").remove();

        // dans le cas ou on reconstruit un neud de choix
        if(this.choicesEnumerator.current.data.has("DOM"))
        {
            Debug.log("current have DOM");

            for(let i = this.choicesEnumerator.current.index; i < this.choicesEnumerator.choices.length; i++)
            {
                this.choicesEnumerator.get(i)?.data.get('DOM')?.forEach(container => container.remove());
            }
        }

        const choiceContainer = this.createChoiceContainer(
            this.dataProvider.get("ConfigChoiceStyleByCurrent"),
            Object.values(values),
            this.choicesEnumerator.current.index + 1,
            this.dataProvider.get("ConfigChoiceDecriptionByCurrent")
        );
        
        this.choicesEnumerator.current.data.set("DOM", choiceContainer.containersbundle);

        // scroll view to current choice if it't not the first choice

        if(this.choicesEnumerator.current.index != 0)
        {
            this.choicesEnumerator.current?.data.get("DOM")[0]?.get(0)?.scrollIntoView({
                block: 'end',
                behavior: 'smooth'
            });
        }
    }

    onBuildProducts()
    {
        const configuratorMain = this.configurator as ConfiguratorMain;
        configuratorMain.productsDisplay.build(this.dataProvider.get("ValuesByChoices"));
    }
}