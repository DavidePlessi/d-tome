import {CatalogTemplate, ITemplateProvider } from "@eusoft/webapp-core";
import DraggableCardTemplate from './draggableCard.html';
import './draggableCard.scss';
import {Template} from "@eusoft/webapp-jsx";
import getRandomId from "../../utils/getRandomId";

function dragElement(element: HTMLElement) {

}

const Templates = {
    'Default': DraggableCardTemplate,
    'DefaultJSX': (
        <Template name="DraggableCardJSX">
            <div className="draggable-card" id={(m: DraggableCard)=> m.id} behavoir={"Drag"}>
                <div className="draggable-card__header" id={(m: DraggableCard)=> m.headerId}>
                    <div className="draggable-card__title" text={(m: DraggableCard)=> m.title}>

                    </div>
                    <div className="draggable-card__actions">
                        <button
                            className="draggable-card__action"
                            on-click={(m: DraggableCard, e: Event) => m.onClose(e, m.id)}
                        > X
                        </button>
                    </div>
                </div>
                <div className="draggable-card__content">
                    <div className="draggable-card__content-text" text={(m: DraggableCard)=> m.content}>
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
    public onClose?: (e: Event, id: string) => void;

    constructor(props: IDraggableCardProps) {
        this.id = 'draggable-card-' + getRandomId();
        this.headerId = 'draggable-card-header-' + getRandomId();
        this.template = Templates[props.template || 'DefaultJSX'] as CatalogTemplate<this>;
        this.onClose = props.onClose;

        this.title = props.title;
        this.content = props.content;
    }

}