import EventEmitter from "./EventEmitter";

export default class UIElement extends EventEmitter
{
    constructor()
    {
        super();
    }

    isDisplaySize(size : "s" | "m" | "l") : boolean
    {
        switch(size)
        {
            case "s": return window.matchMedia("(min-width: 0px)").matches;
            case "m": return window.matchMedia("(min-width: 992px)").matches;
            case "l": return window.matchMedia("(min-width: 1200px)").matches;
        }
    }
}