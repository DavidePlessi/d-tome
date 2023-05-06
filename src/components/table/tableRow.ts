import {CatalogTemplate, ITemplateProvider} from "@eusoft/webapp-core";
import TableRowTemplate from './tableRow.html';
import './tableRow.scss';


export const Templates = {
    Default: TableRowTemplate
}

export interface ITableRowProps {
    id: string;
    columns: {value: string}[];
    template?: keyof typeof Templates;
    onRowClick: (e: Event, id: string) => void;
}


export class TableRow implements ITemplateProvider {
    public id: string;
    public columns: {value: string}[];
    public template: CatalogTemplate<this>;
    public onRowClick: (e: Event, id: string) => void;

    public innerOnRowClick(e: Event) {
        this.onRowClick(e, this.id);
    }

    constructor(props: ITableRowProps) {
        this.id = props.id;
        this.columns = props.columns;
        this.template = Templates[props.template || 'Default'];
        this.onRowClick = props.onRowClick
    }

}