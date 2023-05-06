import {IBehavoir, defineBehavoir} from '@eusoft/webapp-core';

export class DragBehaviour implements IBehavoir {
    attach(element: HTMLElement, model?: any): void {
        const header = element.querySelector(model.dragElementId);

        if(model.elementCurrentPosition.x === 0 && model.elementCurrentPosition.y === 0) {
            element.style.top = model.currentMousePosition.y + "px";
            element.style.left = model.currentMousePosition.x + "px";
        } else {
            element.style.top = model.elementCurrentPosition.y;
            element.style.left = model.elementCurrentPosition.x;
        }
        if (header) {
            header.onmousedown = dragMouseDown;
            header.ontouchstart = dragTouchDown;
        } else {
            element.onmousedown = dragMouseDown;
            element.ontouchstart = dragTouchDown;
        }

        function dragMouseDown(e: MouseEvent) {
            e.preventDefault();
            // pos3 = e.clientX;
            // pos4 = e.clientY;
            model.currentMousePosition.x = e.clientX;
            model.currentMousePosition.y = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function dragTouchDown(e: TouchEvent) {
            e.preventDefault();
            // pos3 = e.touches[0].clientX;
            // pos4 = e.touches[0].clientY;
            model.currentMousePosition.x = e.touches[0].clientX;
            model.currentMousePosition.y = e.touches[0].clientY;
            document.ontouchend = closeDragTouchElement;
            document.ontouchmove = elementTouchDrag;
        }

        function elementTouchDrag(e: TouchEvent) {
            e.preventDefault();
            model.deltaPosition.x = model.currentMousePosition.x - e.touches[0].clientX;
            model.deltaPosition.y = model.currentMousePosition.y - e.touches[0].clientY;
            model.currentMousePosition.x = e.touches[0].clientX;
            model.currentMousePosition.y = e.touches[0].clientY;
            element.style.top = (element.offsetTop - model.deltaPosition.y) + "px";
            element.style.left = (element.offsetLeft - model.deltaPosition.x) + "px";
        }

        function elementDrag(e: MouseEvent) {
            e.preventDefault();
            model.deltaPosition.x = model.currentMousePosition.x - e.clientX;
            model.deltaPosition.y = model.currentMousePosition.y - e.clientY;
            model.currentMousePosition.x = e.clientX;
            model.currentMousePosition.y = e.clientY;
            element.style.top = (element.offsetTop - model.deltaPosition.y) + "px";
            element.style.left = (element.offsetLeft - model.deltaPosition.x) + "px";

            model.elementCurrentPosition = {
                x: element.style.left,
                y: element.style.top
            };
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

