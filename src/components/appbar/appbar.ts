import {CatalogTemplate, IViewComponent} from "@eusoft/webapp-core";
import AppbarTemplate from "./appbar.html";
import './appbar.scss';

const Templates = {
    Default: AppbarTemplate
}

export interface IAppbarProps {
    logo?: string;
    homeLink?: string;
    template?: keyof typeof Templates;
}

export class Appbar implements IViewComponent {
    public logo: string;
    public homeLink: string;
    public template: CatalogTemplate<this>

    constructor(props: IAppbarProps) {
        this.logo = props.logo || '';
        this.homeLink = props.homeLink || '/';
        this.template = Templates[props.template || 'Default'] as any;
    }
}