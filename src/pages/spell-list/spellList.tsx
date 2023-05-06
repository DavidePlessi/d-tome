import {CatalogTemplate, ITemplate, ITemplateProvider} from "@eusoft/webapp-core";
import ISpellFilter from "../../entities/ISpellFilter";
import spellStore from "../../stores/spellStore";
import {ITableHeaderColumn, ITableProps, Table} from "../../components/table/table";
import './spellList.scss';
import {ITextInputProps, TextInput} from "../../components/input/textInput/textInput";
import {Button, IButtonProps} from "../../components/button/button";
import {DraggableCard, IDraggableCardProps} from "../../components/draggableCard/draggableCard";
import ISpell from "../../entities/ISpell";
import * as _ from "lodash";
import {Content, Foreach, If, Template} from "@eusoft/webapp-jsx";


export const Templates = {
    Default: (
        <Template name="SpellListTable">
            {/*// @ts-ignore*/}
            <form className="spell-list__filter-container" on-submit={(m: SpellList, e: Event) => m.applyFilter(e)}>
                <div className="spell-list__filter-form">
                    <Content src={(m: SpellList) => m.queryInput}/>
                    <Content src={(m: SpellList) => m.levelInput}/>
                    <Content src={(m: SpellList) => m.classesInput}/>
                </div>

            </form>
            <div className="spell-list__table-container">
                <Content src={(m: SpellList) => m.table}/>
            </div>
            <Foreach src={(m: SpellList) => m.draggableCards}>
                <Content src={(m: DraggableCard) => m}/>
            </Foreach>
        </Template>
    ) as ITemplate<SpellList>
}

export interface ISpellListProps {
    template?: keyof typeof Templates;
}

export class SpellList implements ITemplateProvider {
    public filter: ISpellFilter;
    public template: CatalogTemplate<this>;

    public table: Table;

    public queryInput: TextInput;
    public levelInput: TextInput;
    public classesInput: TextInput;

    public filterButton: Button;

    public draggableCards: DraggableCard[];

    public applyFilterTimeout: any;


    public applyFilter(event?: Event) {
        if(event)
            event.preventDefault();
        let result = spellStore.filterSpells(spellStore.spells, this.filter);

        if(this.table.activeSorts.length > 0) {
            result = _.orderBy(
                result,
                this.table.activeSorts.map(x => x.key),
                this.table.activeSorts.map(x => x.sort),
            );
        }


        this.table.updateTableRows(result);
    }

    public onFilterValueChange(item: TextInput) {

        this.filter[item.name as keyof ISpellFilter] = item.value;

        if(this.applyFilterTimeout)
            clearTimeout(this.applyFilterTimeout);

        this.applyFilterTimeout = setTimeout(() => {
            this.applyFilter();
        }, 500)
    }

    public onSort(e: Event, column: ITableHeaderColumn) {
        this.applyFilter()
    }

    public onCloseCard(e: Event, id: string) {
        this.draggableCards = this.draggableCards.filter(x => x.id !== id)
    }

    public getSpellDescription(spell: ISpell) {
        return `**Scuola** ${spell.school}  \n` +
        `**Tempo di lancio** ${spell.castingTime}  \n` +
        `**Raggio d'azione** ${spell.range}  \n` +
        `**Componenti** ${spell.components}  \n` +
        `**Durata** ${spell.duration}  \n` +
        `**Tiro salvezza** ${spell.savingThrow}  \n` +
        `**Rituale** ${spell.hasRitual ? 'Si' : 'No'}  \n` +
        `**Concentrazione** ${spell.hasConcentration ? 'Si' : 'No'}  \n\n` +
        `${spell.fullDescription}`+
        `${!!spell.atMajorLevels ? `\n**A livelli superiori** ${spell.atMajorLevels}` : ''}`;
    }

    public openCard(e: Event, id: string) {
        const spell = spellStore.spells.find(x => x.id === id);


        if(!spell) return;

        if(this.draggableCards.find(x => x.title === spell.name)) return;

        this.draggableCards.push(
            new DraggableCard({
                onClose: this.onCloseCard.bind(this),
                title: spell.name,
                content: this.getSpellDescription(spell),
                startPosition: {
                    x: (e as MouseEvent).clientX,
                    y: (e as MouseEvent).clientY,
                }
            } as IDraggableCardProps)
        )
    }

    constructor(props: ISpellListProps) {
        this.draggableCards = [];

        this.table = new Table({
            columns: [
                {label: 'Nome', key: 'name', onSort: this.onSort.bind(this), currentSort: "none"},
                {label: 'Livello', key: 'level', onSort: this.onSort.bind(this), currentSort: "none"},
                {label: 'Classi', key: 'classes', onSort: this.onSort.bind(this), currentSort: "none"}
            ] as ITableHeaderColumn[],
            rowsData: spellStore.spells,
            tableRowTemplate: 'Default',
            template: 'Default',
            onRowClick: this.openCard.bind(this)
        } as ITableProps);

        this.filter = {
            query: '',
            level: '',
            classes: ''
        } as ISpellFilter;

        this.queryInput = new TextInput({
            id: 'query',
            name: 'query',
            label: 'Nome',
            value: this.filter.query,
            onChange: () => this.onFilterValueChange(this.queryInput)
        } as ITextInputProps);

        this.levelInput = new TextInput({
            id: 'level',
            name: 'level',
            label: 'Livello',
            value: this.filter.query,
            onChange: () => this.onFilterValueChange(this.levelInput)
        } as ITextInputProps);

        this.classesInput = new TextInput({
            id: 'classes',
            name: 'classes',
            label: 'Classi',
            value: this.filter.query,
            onChange: () => this.onFilterValueChange(this.classesInput)
        } as ITextInputProps);

        this.filterButton = new Button({
            text: 'Filtra',
            type: 'submit',
            onClick: this.applyFilter.bind(this)
        } as IButtonProps)

        this.applyFilter();

        this.template = Templates[props.template || 'Default'] as any;
    }
}