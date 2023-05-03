import { template } from "@eusoft/webapp-core";
import Index from "./index.html";
import spellStore from "./stores/spellStore";
import ISpell from "./entities/ISpell";
import ISpellFilter from "./entities/ISpellFilter";


interface IIndexModelProps {
    spells?: ISpell[];
    filter?: ISpellFilter;
}
class IndexModel {
    public spells: ISpell[] = [];
    public filteredSpells: ISpell[] = [];
    public filter: ISpellFilter;

    public filterSpells() {
        this.filteredSpells = this.spells.filter(spell => {
            if (this.filter.query &&
                !spell.name.toLowerCase().includes(this.filter.query.toLowerCase()) &&
                !spell.originalName.toLowerCase().includes(this.filter.query.toLowerCase())
            ) {
                return false
            }
            if (this.filter.level && spell.level !== this.filter.level) {
                return false
            }
            if (this.filter.hasConcentration && !spell.hasConcentration) {
                return false
            }
            return !(this.filter.components && !spell.components.includes(this.filter.components));
        })
    }

    constructor(props: IIndexModelProps) {
        this.spells = props.spells || [];
        this.filter = props.filter || {} as ISpellFilter;
        this.filterSpells();
    }
}


async function runAsync() {
    const model = new IndexModel({
        spells: spellStore.spells
    } as IIndexModelProps);

    template(document.body, Index, model);
}

window.addEventListener("load", runAsync);


