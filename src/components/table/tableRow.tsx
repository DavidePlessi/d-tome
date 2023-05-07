import {CatalogTemplate, ITemplateProvider, TemplateMap} from "@eusoft/webapp-core";
import './tableRow.scss';
import {Class, Foreach, Template, forModel} from "@eusoft/webapp-jsx";
import { ITableRowData } from "./table";


export const Templates : TemplateMap<TableRow<any>> = {
    Default: forModel(m=>  
        <Template name={'TableRowTemplate'}>
            <tr on-click={(m: TableRow<any>, e: MouseEvent) => m.innerOnRowClick(e)} id={m.id}>
                <Class name="table__clickable-row" condition={!!m.onRowClick}/>
                <Foreach src={m.columns}>
                    {i => <td text={i.value}/> }
                </Foreach> 
            </tr> 
        </Template>
    ) 
}

export interface ITableRowProps<TModel extends ITableRowData> {
    columns: {value: string}[];
    template?: keyof typeof Templates;
    onRowClick: (e: Event, id: string) => void;
    data: TModel;
}


export class TableRow<TModel extends ITableRowData> implements ITemplateProvider {
    public id: string;
    public data: TModel;
    public columns: {value: string}[];
    public template: CatalogTemplate<this>;
    public onRowClick: (e: Event, id: string) => void;


    public innerOnRowClick(e: Event) {
        this.onRowClick(e, this.id);
    }


    constructor(props: ITableRowProps<TModel>) {
        this.id = props.data.id;
        this.columns = props.columns;
        this.template = Templates[props.template || 'Default'];
        this.onRowClick = props.onRowClick;
        this.data = props.data;
    }

}