import {CatalogTemplate, ITemplate, ITemplateProvider} from "@eusoft/webapp-core";
import './tableRow.scss';
import {Class, Foreach, Template} from "@eusoft/webapp-jsx";
import {TextInput} from "../input/textInput/textInput";


export const Templates = {
    Default: (
        <Template name={'TableRowTemplate'}>
            <tr on-click={(m: TableRow, e: MouseEvent) => m.innerOnRowClick(e)} id={(m: TableRow) => m.id}>
                <Class name="table__clickable-row" condiction={(m: TableRow) => !!m.onRowClick}/>
                <Foreach src={(m: TableRow) => m.columns}>
                    <td>{(m: {value: string}) => m.value}</td>
                </Foreach>
            </tr>
        </Template>
    ) as ITemplate<TableRow>
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