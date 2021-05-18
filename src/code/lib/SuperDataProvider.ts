import ChoicesEnumerator from "./Choices/ChoicesEnumerator";
import SuperChoicesManager from "./Choices/SuperChoicesManager";
import { Data } from "./Calculator";
import Debug from "./Debug";

export default
class SuperDataProvider
{
    choicesManager: SuperChoicesManager;
    choicesEnumerator: ChoicesEnumerator;
    data: Data;

    constructor(choicesManager : SuperChoicesManager)
    {
        this.choicesManager = choicesManager;
        this.choicesEnumerator = this.choicesManager.choicesEnumerator;
        this.data = this.choicesManager.configurator.data;
    }

    get(index : string, ...args: any[])
    {
        if(this[`get${index}`])
        {
            return this[`get${index}`](...args);
        }
        else
        {
            Debug.error(`can't get provider "${index}"`);
            return null;
        }
    }
}