import ChoicesManager from "./ChoicesManager/ChoicesManager";
import SuperDataProvider from "../lib/SuperDataProvider";
import Debug from "../lib/Debug";

export default 
class DataProvider extends SuperDataProvider 
{    
    constructor(choicesManager : ChoicesManager)
    {
        super(choicesManager);
    }

    private getConfigChoices() : any
    {
        return this.data.config.choices;
    }   

    private getConfigChoiceStyleByCurrent(index : number) : any
    {
        Debug.log("getConfigChoiceStyleByCurrent", this.data.config.choices.styles[this.choicesEnumerator.current.index]);
        return this.data.config.choices.styles[this.choicesEnumerator.current.index];
    } 

    private getConfigChoiceDecriptionByCurrent(index : number) : any
    {
        Debug.log("getConfigChoiceDecriptionByCurrent", this.data.config.choices.descriptions[this.choicesEnumerator.current.index])
        return this.data.config.choices.descriptions[this.choicesEnumerator.current.index];
    } 

    /**
     * // TODO : getRootByChoices description
     * @param {any} _data
     * @param {any} _choices
     * @returns {any} values
     */
    private getRootByChoices() : any
    {
        let choices = this.choicesEnumerator.toArray()
        // copie de l'objet de données
        let data = Object.assign({}, this.data.tree);

        choices.forEach((choice) => 
        {
            data = data[choice.label][choice.value];
        });

        return data;
    }

    /**
     * // TODO : getValuesByChoices description
     * @param {any} _data
     * @param {any} _choices
     * @returns {any} values
     */
    private getValuesByChoices() : any
    {
        let choices = this.choicesEnumerator.toArray()
        // copie de l'objet de données en selectionnant le premier groupe de choix disponible
        let data = Object.assign({}, this.data.tree[this.choicesEnumerator.choices[0].label]);

        choices.forEach((choice, i) => 
        {
            data = data[choice.value][this.choicesEnumerator.get(i + 1).label];
        });

        return data;
    }
}