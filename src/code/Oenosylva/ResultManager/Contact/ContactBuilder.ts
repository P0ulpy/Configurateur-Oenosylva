import { EntryOptionPlugin } from "webpack";
import ResultManager from "..";
import { Data } from "../../../lib/Calculator";
import UIElement from "../../../lib/UIElement";

export default class ContactBuilder extends UIElement
{
    public data : Data;
    public container : JQuery;

    constructor(public resultManager : ResultManager)
    {
        super();
        this.data = this.resultManager.data;
        this.container = this.resultManager.container;
    }

    public build()
    {
        $("#contact").remove();

        const contactContainerA = $(`
        <div id="contact" class="choice-container row s12 valign-wrapper" id="column4">

            <div class="contact-title-text col s4 hide-on-small-only">
                <div>${this.data.config.contact.title}</div>
            </div>
            
        </div>`).appendTo(this.container);
        
        const contactContainerB = $(`
        <div class="choice-buttons-container col s12 m7 l7">
            <div class="hide-on-med-and-up center-align" style="font-size: 15pt; margin-bottom: 0.5em;">
                <div style="color: white;">${this.data.config.contact.title}</div>
            </div>
        </div>
        `).appendTo(contactContainerA);
        
        const contactContainerC = $(`<div class="row s12"></div>`).appendTo(contactContainerB);

        const dropDown = this.buildDropDown();

        $(dropDown.select).appendTo(contactContainerC);
        $(dropDown.list).appendTo(contactContainerC);
    }

    buildDropDown(): { select: JQuery, list: HTMLElement }
    {

        const select = 
        $(`<div class="select-box">
            <div class="select-box__current" tabindex="1">
                <div class="select-box__value">
                    <input class="select-box__input" type="radio" id="1" value="1" name="Ben" checked="checked" />
                    <p class="select-box__input-text">${ "Select..." || this.data.config.contact.countries[0]?.label}</p>
                </div>
                <img class="select-box__icon" src="${this.data.config.contact.arrowImg}" alt="Arrow Icon" aria-hidden="true" />
            </div>
        </div>`);

        const selectText = select.get(0).querySelector('.select-box__input-text');

        const list = document.createElement('ul');
        list.hidden = true;
        list.classList.add('col', 'l5', 'm6', 's9', 'contact-ul');

        select.on('click', () => 
        {
            const icons = $('.select-box__icon');

            if(!icons.hasClass('rotateArrow'))
            {
                icons.addClass('rotateArrow');
            }
            else
            {
                icons.removeClass('rotateArrow');
            }
            
            list.hidden = !list.hidden
        });   
        list.addEventListener('focusout', () => list.hidden = true);

        for(const link of this.data.config.contact.countries)
        {
            const newButton = document.createElement('li');
            
            newButton.classList.add('link');
            newButton.innerHTML = link.label;

            if(link.link)
            {
                newButton.addEventListener('click', () => window.open(link.link));
            }

            list.appendChild(newButton);

            if(link.subLinks)
            {
                newButton.classList.add('link-to-sublink');

                const sublinks = [];

                for(const subLink of link.subLinks)
                {
                    const newSubButton = document.createElement('li');

                    newSubButton.classList.add('sublink');
                    newSubButton.hidden = true;
                    newSubButton.innerHTML = subLink.label;

                    newSubButton.addEventListener('click', () => window.open(subLink.link));

                    list.appendChild(newSubButton);
                    sublinks.push(newSubButton);
                }

                newButton.addEventListener('click', () => {

                    selectText.innerHTML = link.label;

                    for(const sublink of sublinks)
                    {
                        sublink.hidden = !sublink.hidden;
                    }
                });
            }
        }

        return {
            select,
            list
        }
    }
}