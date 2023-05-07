import {CatalogTemplate,  TemplateMap, propOf} from "@eusoft/webapp-core";
import './textInput.scss';
import getRandomId from "../../../utils/getRandomId";
import { ITemplateProvider } from "@eusoft/webapp-core";
import {Class, Template, forModel} from "@eusoft/webapp-jsx";

const Templates : TemplateMap<TextInput> = {
    Default: forModel(m=>
        <Template name="TextInput">
            <div className="input__input-container">
                <input type="text"
                       id={m.id}
                       name={m.name}
                       value-pool={500}
                       value={m.value}
                >
                    {/*// @ts-ignore*/}
                    <Class name="has-value" condition={m.value?.length > 0}/>
                </input>
                <label
                    htmlFor={m.id}
                >{m.label}</label>
            </div>
        </Template>
    ) 
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
    public onChange: (value: string, oldValue: string) => void;
    public template: CatalogTemplate<this>;

    constructor(props: ITextInputProps) {
        this.id = `text-input__${props.id || getRandomId()}`;
        this.value = props.value;
        if (props.onChange)
            this.onChange = props.onChange;
        this.name = props.name || '';
        this.label = props.label || '';
        this.template = Templates[props.template || 'Default'];

        if(this.onChange)
            propOf(this, "value").subscribe(this.onChange);
    }
}