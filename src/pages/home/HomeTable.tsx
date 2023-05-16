
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import TasksExecutionService from '../../service/TasksExecutionService'


interface Task {
    id: string
    name: string;
    descricao: string;
    status: string;
    passou: number;
    falhou: number;
    total: number;
    dataExecucao: object;

}

export default function FormHome() {
    const [tasks, setTasks] = useState<Task | any>([]);
    const dt = useRef<DataTable<any>>(null);

    useEffect(() => {
        getAllTask()
    }, []);

    async function getAllTask(){
        setTasks(await TasksExecutionService.getAllTasksExecution())
    }

    const getSeverity = (status: string) => {
        switch (status) {
            case 'Erro':
                return 'danger';

            case 'Sucesso':
                return 'success';

            case 'Pendente':
                return 'info';

            case 'Em execução':
                return 'warning';

            case 'renewal':
                return null;
        }
    };

    const statusBodyTemplate = (rowData: Task) => {
        return <Tag style={{ minWidth: '6rem' }} value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    return (
        <div className="card">
            <DataTable key={tasks.id} ref={dt} value={tasks} dataKey="_id" tableStyle={{ minWidth: '50rem' }} paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Execuçôes">
                <Column field="status" header="Ultima Execução" sortable  style={{ minWidth: '8rem'}} body={statusBodyTemplate} />
                <Column field="name" header="Name" sortable style={{ width: '25%' }}></Column>
                <Column field="descricao" header="Descrição" sortable style={{ width: '25%' }}></Column>
                <Column field="passou" header="Passou" sortable style={{ width: '25%' }}></Column>
                <Column field="falhou" header="Falhou" sortable style={{ width: '25%' }}></Column>
                <Column field="total" header="Total" sortable style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
    );
}
        