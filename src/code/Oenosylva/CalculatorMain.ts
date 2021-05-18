import "./css/main.css";
import "../../vendors/jquery-3.2.1.min.js";
import "../../vendors/materialize.min.css";
import "../../vendors/materialize.min.js";

import { ConfiguratorPathes } from "../lib/Calculator";
import Calculator from "../lib/Calculator";
import ChoicesManager from "./ChoicesManager/ChoicesManager";
import ResultManager from "./ResultManager";
import { DebugLevel } from "../lib/Debug";

/*export function buildLangButtons(container : string, onclickFR, onclickEN)
{
    const frButton = document.createElement('div');
    frButton.innerHTML = "FR /";
    frButton.classList.add('trad-button');
    frButton.classList.add('trad-button-click');

    frButton.addEventListener('click', onclickFR);
    frButton.addEventListener('click', () => {
        enButton.classList.remove('trad-button-click');
        frButton.classList.add('trad-button-click');
    });

    const enButton = document.createElement('div');
    enButton.innerHTML = "EN";
    enButton.classList.add('trad-button');
    
    enButton.addEventListener('click', onclickEN);
    enButton.addEventListener('click', () => {
        frButton.classList.remove('trad-button-click');
        enButton.classList.add('trad-button-click');
    });

    document.querySelector(container).appendChild(frButton);
    document.querySelector(container).appendChild(enButton);
}*/

export default class CalculatorMain extends Calculator {

    public productsDisplay : ResultManager;

    constructor(container : string, paths : ConfiguratorPathes, debugLevel : DebugLevel)
    {
        super(container, paths, debugLevel);

        this.on('fetched', () => 
        {
            this.container.attr('class', "container col s12");
            this.registerChoiceManagerClass(ChoicesManager);
            this.productsDisplay = new ResultManager(this.data, this.container);
        });
    }

    protected buildPreConfigurator() : void
    {
        $(`
            <h1 class="preConfig-title">${this.data.config.outsideCalculator.title}</h1>
            <h2 class="preConfig-text">${this.data.config.outsideCalculator.text}</h2 >
            
            <div class="preConfig-img-container">
                <img class="responsive-img" src="${this.data.config.outsideCalculator.img}">
            </div>
        `).appendTo(this.container);
    }
}