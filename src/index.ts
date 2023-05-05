import { mount } from "@eusoft/webapp-core";
import Index from "./index.html";
import {Appbar} from "./components/appbar/appbar";
import {SpellList} from "./pages/spell-list/spellList";
import './index.scss';


interface IIndexModelProps {
    navbar: Appbar;
    spellList: SpellList;
}
class IndexModel {
    public navbar: Appbar;
    public spellList: SpellList

    constructor(props: IIndexModelProps) {
        this.navbar = props.navbar;
        this.spellList = props.spellList;
    }
}


async function runAsync() {
    const navbar = new Appbar({
        logo: 'http://3.bp.blogspot.com/-csueLM4N1_w/Ut4fZ0eMsgI/AAAAAAAAB28/fFR6wrg0IFM/s1600/icon_tome.png',
        homeLink: '/',
        template: 'Default'
    })

    const spellList = new SpellList({
        template: 'Default'
    })


    const model = new IndexModel({navbar, spellList});

    mount(document.body, Index, model);
}

window.addEventListener("load", runAsync);


