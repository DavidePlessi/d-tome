import {CatalogTemplate, ITemplateProvider } from "@eusoft/webapp-core";
import './draggableCard.scss';
import {Class, If, Template} from "@eusoft/webapp-jsx";
import getRandomId from "../../utils/getRandomId";

// @ts-ignore
const Templates = {
    'Default': (
        <Template name="DraggableCard">
            <div className="draggable-card" id={(m: DraggableCard)=> m.id} behavoir={"Drag"}>
                <div className="draggable-card__header">
                    <div className="draggable-card__title">
                        {(m: DraggableCard)=> m.title}
                    </div>
                    <div className="draggable-card__actions">
                        <button
                            className="draggable-card__action material-symbols-outlined"
                            on-click={(m: DraggableCard, e: Event) => m.onMinimize(e, m.id)}
                        > {(m: DraggableCard) => m.showContent ? 'minimize' : 'add'}
                        </button>
                        <button
                            className="draggable-card__action material-symbols-outlined"
                            on-click={(m: DraggableCard, e: Event) => m.onClose(e, m.id)}
                        > close
                        </button>
                    </div>
                </div>
                <div className="draggable-card__content">
                    <div className="draggable-card__content-text">
                        {/*// @ts-ignore*/}
                        <md-block>
                            {(m: DraggableCard)=> m.content}
                        {/*// @ts-ignore*/}
                        </md-block>
                    </div>
                </div>
            </div>
        </Template>
    )
}

export interface IDraggableCardProps {
    title: string;
    content: string;
    template?: keyof typeof Templates;
    onClose?: (e: Event, id: string) => void;
}

export class DraggableCard implements ITemplateProvider {
    public template: CatalogTemplate<this>;
    public title: string;
    public content: string;
    public id: string;
    public headerId: string;
    public dragElementSelector: string;
    public onClose?: (e: Event, id: string) => void;
    public showContent: boolean = true;


    public onMinimize(e: Event, id: string) {
        this.showContent = !this.showContent;
    }

    constructor(props: IDraggableCardProps) {
        this.id = 'draggable-card-' + getRandomId();
        this.headerId = 'draggable-card-header-' + getRandomId();
        this.dragElementSelector = '.draggable-card__title';
        this.template = Templates[props.template || 'Default'] as CatalogTemplate<this>;
        this.onClose = props.onClose;

        this.title = props.title;
        this.content = props.content;
    }

}