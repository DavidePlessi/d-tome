import {CatalogTemplate, IComponent, ITemplate, propOf} from "@eusoft/webapp-core";
import './textInput.scss';
import getRandomId from "../../../utils/getRandomId";
import { ITemplateProvider } from "@eusoft/webapp-core";
import {Class, Template} from "@eusoft/webapp-jsx";

const Templates = {
    Default: (
        <Template name="TextInput">
            <div className="input__input-container">
                <input type="text"
                       id={(m: TextInput)=> m.id}
                       name={(m: TextInput)=> m.name}
                       value={(m: TextInput)=> m.value}
                >
                    {/*// @ts-ignore*/}
                    <Class name="has-value" condition={(m: TextInput) => m.value?.length > 0}/>
                </input>
                <label
                    htmlFor={(m: TextInput)=> m.id}
                >{(m: TextInput)=> m.label}</label>
            </div>
        </Template>
    ) as ITemplate<TextInput>
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