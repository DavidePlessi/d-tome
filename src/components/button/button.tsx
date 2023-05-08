import {CatalogTemplate, ITemplate, ITemplateProvider, TemplateMap} from "@eusoft/webapp-core";
import ButtonTemplate from "./button.html";
import './button.scss';
import getRandomId from "../../utils/getRandomId";
import { Template, forModel } from "@eusoft/webapp-jsx";

const Templates : TemplateMap<Button> = {
    Default: forModel(m=>
        <Template name="Button">
            <button className="button"
                    behavoir="Ripple"
                    type={m.type}
                    id={m.id}
                    on-click={(m: Button, e: MouseEvent) => m.innerOnClick(e)}
                    text={m.text}
            ></button>
        </Template>
    ) 
}

export interface IButtonProps {
    text?: string;
    type?: string;
    id?: string;
    onClick?: (e: Event) => void;
    template?: keyof typeof Templates;
}

export class Button implements ITemplateProvider {
    public text: string;
    public type: string;
    public id: string;
    public onClick: (e: Event) => void;
    public template: CatalogTemplate<this>

    innerOnClick(e: MouseEvent) {
        if(this.onClick)
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