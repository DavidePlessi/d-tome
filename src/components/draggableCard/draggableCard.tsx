import {CatalogTemplate, ITemplateProvider } from "@eusoft/webapp-core";
import DraggableCardTemplate from './draggableCard.html';
import './draggableCard.scss';
import {Template} from "@eusoft/webapp-jsx";

function dragElement(element: HTMLElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(element.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(element.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: MouseEvent) {
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e: MouseEvent) {
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

const Templates = {
    'Default': DraggableCardTemplate,
    'DefaultJSX': (
        <Template name="DraggableCardJSX">
            <div className="draggable-card" on-load={(m: DraggableCard, e: Event) => m.innerOnLoad(e)}>
                <div className="draggable-card__header">
                    <div className="draggable-card__title" text={(m: DraggableCard)=> m.title}>
                        
                    </div>
                    <div className="draggable-card__actions">
                        <button
                            className="draggable-card__action"
                            on-click={(m: DraggableCard, e: Event) => m.innerOnClose(e)}
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
    onClose?: () => void;
}

export class DraggableCard implements ITemplateProvider {
    public template: CatalogTemplate<this>;
    public title: string;
    public content: string;
    public onClose?: () => void;


    public innerOnClose(e: Event) {
        const target = e.target as HTMLElement;
        target.remove();

        if (this.onClose)
            this.onClose();
    }

    public innerOnLoad(e: Event) {
        console.log('innerOnLoad')
        const target = e.target as HTMLElement;
        dragElement(target);

    }

    constructor(props: IDraggableCardProps) {
        this.template = Templates[props.template || 'DefaultJSX'] as CatalogTemplate<this>;

        this.title = props.title;
        this.content = props.content;
    }

}