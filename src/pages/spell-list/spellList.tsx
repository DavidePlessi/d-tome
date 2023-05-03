import {CatalogTemplate, IViewComponent} from "@eusoft/webapp-core";
import {Foreach, Template} from "@eusoft/webapp-jsx";
import ISpell from "../../entities/ISpell";
import ISpellFilter from "../../entities/ISpellFilter";
import spellStore from "../../stores/spellStore";

export const Templates = {
    Default: (
        <Template name="SpellList">
            <table>
                <thead>
                <tr>
                    <td>Nome</td>
                    <td>Livello</td>
                    <td>Classe</td>
                </tr>
                </thead>
                <tbody>
                <Foreach src={(m: ISpellList) => m.filteredSpells}>
                    <tr>
                        <td text={m => m.name}/>
                        <td text={m => m.level}/>
                        <td text={m => m.classes}/>
                    </tr>
                </Foreach>
                </tbody>
            </table>
        </Template>
    )
}

export interface ISpellListProps {
    spells: ISpell[];
    template?: keyof typeof Templates;
}

export class ISpellList implements IViewComponent {
    public spells: ISpell[];
    public filteredSpells: ISpell[] = [];
    public filter: ISpellFilter;
    public template: CatalogTemplate<this>

    public applyFilter() {
        this.filteredSpells = spellStore.filterSpells(this.spells, this.filter);
    }

    constructor(props: ISpellListProps) {
        this.template = Templates[props.template || 'Default'] as any;
    }
}