import ChoiceContainer, { ContainerCreationCallback } from "../../../lib/Choices/ChoiceContainer";
import ChoicesManager from "../ChoicesManager";
import ColumnChoiceButton from "./ColumnButton";

export default
class ColumnContainer extends ChoiceContainer {

    constructor(
        type : string, 
        containersCreation : ContainerCreationCallback[], 
        choiceManager : ChoicesManager, 
        data : any, 
        ...args : any[])
    {
        super(type, containersCreation, choiceManager, data, ...args);
        this.registerButtonClass(ColumnChoiceButton);

        this.createNewContainer(() => $(`<div class="column-buttons-container col s12">`));

        
        // Création des buttons du choix

        for(const nodeValue of this.data)
        {
            const label = nodeValue.label || nodeValue;

            // récuperation des données du choix actuel
            const buttonChoiceIndex = this.choicesManager.choicesEnumerator.current.index.valueOf();
            const buttonChoiceNextIndex = this.choicesManager.choicesEnumerator.nextChoice.index.valueOf();
        
            const button = this.createButton(buttonChoiceIndex, buttonChoiceNextIndex, label);

        }

    }
}