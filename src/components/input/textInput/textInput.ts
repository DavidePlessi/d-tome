import {CatalogTemplate, IComponent, propOf} from "@eusoft/webapp-core";
import TextInputTemplate from "./textInput.html";
import './textInput.scss';
import getRandomId from "../../../utils/getRandomId";
import { ITemplateProvider } from "@eusoft/webapp-core";

const Templates = {
    Default: TextInputTemplate
}

export interface ITextInputProps {
    id?: string;
    name?: string;
    value: string;
    onChange?: (value: string, oldValue: string) => void;
    label?: string;
    template?: keyof typeof Templates;
}

export class TextInput implements ITemplateProvider {
    public id: string;
    public name: string;
    public value: string;
    public label: string;
    public template: CatalogTemplate<this>

    public onChange(value: string, oldValue: string) {

    }

    /*
    public innerOnChange(e: Event) {

        const target = e.target as HTMLInputElement;
        const value = target.value;
        if(value && value.length > 0) {
            (e.target as HTMLInputElement).classList.add('has-value');
        } else {
            (e.target as HTMLInputElement).classList.remove('has-value');
        }

        if(this.onChange)
            this.onChange(e);
    }
    */

    constructor(props: ITextInputProps) {
        this.id = `text-input__${props.id || getRandomId()}`;
        this.value = props.value;
        if (props.onChange)
            this.onChange = props.onChange;
        this.name = props.name || '';
        this.label = props.label || '';
        this.template = Templates[props.template || 'Default'];

        propOf(this, "value").subscribe(this.onChange);
    }
}