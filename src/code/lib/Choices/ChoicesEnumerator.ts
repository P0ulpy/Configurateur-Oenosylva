import Debug from '../Debug';
import UIElement from '../UIElement';

export
type ChoiceType = {
    label: string,
    index: number,
    value: string,
    isFirst: Function,
    data: Map<string, any>
};

export default
/**
 * ChoicesEnumerator
 */
class ChoicesEnumerator extends UIElement
{
    choices: ChoiceType[];
    current: ChoiceType;

    constructor(choicesLabels)
    {
        super();

        this.choices = [];

        Debug.log("choices Labels", choicesLabels);

        // Initialise tout les choix possibles
        for(let i = 0; i < choicesLabels.length; i++)
        {
            this.choices[i] = {
                label: choicesLabels[i],
                index: i,
                value: null,
                isFirst: _=> (i == 0),
                data: new Map<string, any>()
            };
        }

        this.current = this.choices[0];
    }

    /**
     * Permet de recuperer le choix suivant (retourne l'actuel si il n'y a pas de suivant)
     * @returns {any}
     */
    get nextChoice() : ChoiceType
    {
        if(this.current.index + 1 < this.choices.length)
            return this.choices[this.current.index + 1];
        return this.current;
    }

    /**
     * Permet de recuperer le choix precedant (retourne l'actuel si il n'y a pas de precedant)
     * @returns {any}
     */
    get previousChoice() : any
    {
        if(this.current.index - 1 >= 0)
            return this.choices[this.current.index - 1];
        return this.current;
    }

    /**
     * // TODO : goTo Description
     */
    goTo(index: number) : void
    {
        this.current = this.choices[index];

        for(let i = this.current.index; i < this.choices.length; i++)
        {
            this.choices[i].value = null;
        }

        Debug.log(`ChoiceManager.goTo(${index})`, this);
        
        if(!this.isEnd())
        {
            this.emit('change');
        }
        else
        {
            this.emit('end');
        }
    }

    /**
     * // TODO : setDOM Description
     */
    setData(index: number, data : any) : void
    {
        this.choices[index].data = data;
    }

    /**
     * // TODO : set Description
     */
    set(index : number, choice : string)
    {
        // .toString() pour faire une copie de la string (ne pas copier la référence)
        this.choices[index].value = choice.toString();
        Debug.log("ChoiceManager.set()", this);
    }

    /**
     * @returns true if current is last choice and current.value is defined
     */
    isEnd()
    {
        return (this.nextChoice == this.current)
    }

    /**
     * //TODO : getByLabel description
     */
    private getByLabel(label : string) : ChoiceType
    {
        for(const choice of this.choices)
        {
            Debug.log('choice', choice);
            if(choice.label == label) return choice;
        }

        return null;
    }

    /**
     * // TODO : completedChoicesCount Description
     */
    get completedChoicesCount()
    {
        let count = 0;
        for(const choice of this.choices)
        {
            if(choice.value) count++;
            else break;
        }
        return count;
    }

    /**
     * // TODO : set Description
     */
    get(index : number)
    {
        return this.choices[index];
    }

    /**
     * //TODO : toArray description
     */
    toArray()
    {
        const array = [];

        for(const choice of this.choices)
            if(choice.value) array.push(choice);

        return array;
    }
}