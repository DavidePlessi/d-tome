import {CatalogTemplate, IViewComponent} from "@eusoft/webapp-core";
import {Template} from "@eusoft/webapp-jsx";

export const Templates = {
    Default: (
        <Template name="Navbar">
            <div className="navbar">
                <div className="navbar__logo">
                    <img src={(m: INavbar) => m.logo} alt="logo"/>
                </div>
            </div>
        </Template>
    )
}


interface INavbarProps {
    logo?: string;
    homeLink?: string;
    template?: keyof typeof Templates;
}

export class INavbar implements IViewComponent {
    public logo: string;
    public homeLink: string;
    public template: CatalogTemplate<this>

    constructor(props: INavbarProps) {
        this.logo = props.logo || '';
        this.homeLink = props.homeLink || '/';
        this.template = Templates[props.template || 'Default'] as any;
    }
}