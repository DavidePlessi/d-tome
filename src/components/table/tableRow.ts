import {CatalogTemplate, IViewComponent} from "@eusoft/webapp-core";
import TableRowTemplate from './tableRow.html';
import './tableRow.scss';


export const Templates = {
    Default: TableRowTemplate
}

export interface ITableRowProps {
    columns: {value: string}[];
    template?: keyof typeof Templates;
}


export class TableRow implements IViewComponent {
    public columns: {value: string}[];
    public template: CatalogTemplate<this>;

    constructor(props: ITableRowProps) {
        this.columns = props.columns;
        this.template = Templates[props.template || 'Default'];
    }

}