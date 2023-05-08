import {IBehavoir, defineBehavoir} from '@eusoft/webapp-core';

export class RippleBehaviour implements IBehavoir {
    attach(element: HTMLElement, model?: any):void {
        element.onclick = (e: MouseEvent) => {
            const button = e.currentTarget as HTMLButtonElement;
            const circle = document.createElement("span");
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;
    
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - (button.offsetLeft + radius)}px`;
            circle.style.top = `${e.clientY - (button.offsetTop + radius)}px`;
            circle.classList.add("ripple");
    
            const ripple = button.getElementsByClassName("ripple")[0];
            if (ripple) {
                ripple.remove();
            }
    
            button.appendChild(circle);
        };
    }

    detach(element: HTMLElement, model?: any): void {
    }

}


defineBehavoir('Ripple', () => new RippleBehaviour());

