import {CatalogTemplate, IViewComponent} from "@eusoft/webapp-core";
import ButtonTemplate from "./button.html";
import './button.scss';
import getRandomId from "../../utils/getRandomId";

const Templates = {
    Default: ButtonTemplate
}

export interface IButtonProps {
    text?: string;
    type?: string;
    id?: string;
    onClick?: (e: Event) => void;
    template?: keyof typeof Templates;
}

export class Button implements IViewComponent {
    public text: string;
    public type: string;
    public id: string;
    public onClick: (e: Event) => void;
    public template: CatalogTemplate<this>

    innerOnClick(e: MouseEvent) {
        const button = e.currentTarget as HTMLButtonElement;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - (button.offsetLeft + radius)}px`;
        circle.style.top = `${e.clientY - (button.offsetTop + radius)}px`;
        circle.classList.add("ripple");

        const ripple = button.getElementsByClassName("ripple")[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);

        this.onClick(e);

    }

    constructor(props: IButtonProps) {
        this.id = props.id || getRandomId();
        this.type = props.type || 'button';
        this.text = props.text || '';
        this.onClick = props.onClick || (() => {});
        this.template = Templates[props.template || 'Default'];
    }
}