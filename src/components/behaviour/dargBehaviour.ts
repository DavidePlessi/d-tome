import {IBehavoir, defineBehavoir} from '@eusoft/webapp-core';

export class DragBehaviour implements IBehavoir {
    attach(element: HTMLElement, model?: any): void {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = element.querySelector(model.dragElementSelector);
        if (header) {
            header.onmousedown = dragMouseDown;
            header.ontouchstart = dragTouchDown;
        } else {
            element.onmousedown = dragMouseDown;
            element.ontouchstart = dragTouchDown;
        }

        function dragMouseDown(e: MouseEvent) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function dragTouchDown(e: TouchEvent) {
            e.preventDefault();
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
            document.ontouchend = closeDragTouchElement;
            document.ontouchmove = elementTouchDrag;
        }

        function elementTouchDrag(e: TouchEvent) {
            e.preventDefault();
            pos1 = pos3 - e.touches[0].clientX;
            pos2 = pos4 - e.touches[0].clientY;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function elementDrag(e: MouseEvent) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragTouchElement() {
            document.ontouchend = null;
            document.ontouchmove = null;
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    detach(element: HTMLElement, model?: any): void {
    }

}


defineBehavoir('Drag', () => new DragBehaviour());

