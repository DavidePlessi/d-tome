import {CatalogTemplate, ITemplateProvider } from "@eusoft/webapp-core";
import './draggableCard.scss';
import {Class, If, Template} from "@eusoft/webapp-jsx";
import getRandomId from "../../utils/getRandomId";

// @ts-ignore
// @ts-ignore
const Templates = {
    'Default': (
        <Template name="DraggableCard">
            <div className="draggable-card" id={(m: DraggableCard)=> m.id} behavoir={"Drag"}>
                {/*// @ts-ignore*/}
                <Class name="draggable-card--minimized" condition={(m: DraggableCard) => !m.showContent}/>
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
                    {/*// @ts-ignore*/}
                    <If condition={(m: DraggableCard) => m.showContent}>
                        <div className="draggable-card__content-text">
                            {/*// @ts-ignore*/}
                            <md-block>
                                {(m: DraggableCard)=> m.content}
                                {/*// @ts-ignore*/}
                            </md-block>
                        </div>
                    </If>
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
    startPosition?: { x: number, y: number };
}

export class DraggableCard implements ITemplateProvider {
    public template: CatalogTemplate<this>;
    public title: string;
    public content: string;
    public id: string;
    public headerId: string;
    public dragElementId: string;
    public onClose?: (e: Event, id: string) => void;
    public showContent: boolean = true;
    public currentMousePosition: { x: number, y: number } = {x: 0, y: 0};
    public deltaPosition: { x: number, y: number } = {x: 0, y: 0};
    public elementCurrentPosition: { x: number, y: number } = {x: 0, y: 0};


    public onMinimize(e: Event, id: string) {
        this.showContent = !this.showContent;
    }

    constructor(props: IDraggableCardProps) {
        this.id = 'draggable-card-' + getRandomId();
        this.headerId = 'draggable-card-header-' + getRandomId();
        this.dragElementId = 'draggable-card-header-title' + getRandomId();
        this.template = Templates[props.template || 'Default'] as CatalogTemplate<this>;
        this.onClose = props.onClose;

        if(props.startPosition)
            this.currentMousePosition = props.startPosition;

        this.title = props.title;
        this.content = props.content;
    }

}