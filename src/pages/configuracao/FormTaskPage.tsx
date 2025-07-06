import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import TaskService from '../../service/TaskService';
import { ProgressSpinner } from 'primereact/progressspinner';
import "./styles.css";



interface Task {
    id: string
    name: string;
    descricao: string;
    shell: string;
    repeticao: string;
    diasMes: string
    dias: number;
    semanas: string;
    minutoHora: number;
}

export default function FormHome() {
    const [tasks, setTasks] = useState<Task[] | null | any>([]);
    const [taskDialog, setTaskDialog] = useState<boolean>(false);
    const [selectedTasks, setSelectedTasks] = useState<Task[] | null | any>(null);
    const [deleteTaskDialog, setDeleteTaskDialog] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [task, setTask] = useState<Task | any>(TaskService.emptyTask);
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const [repeticao, setRepeticao] = useState<any>([]);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        getAllTask()
    }, []);


    async function getAllTask(){
        setTasks(await TaskService.getAllTasks())
    }


    const openNew = () => {
        setTask(TaskService.emptyTask);
        setSubmitted(false);
        setTaskDialog(true);
        setRepeticao([])
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
              </div>
        );

    };


    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" /*onClick={exportCSV}*/ />;
    };


    const actionBodyTemplate = (rowData: Task) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editTask(rowData)}/>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteTask(rowData)} />
            </React.Fragment>
        );
    };

    const confirmDeleteTask = (task: Task) => {
        setTask(task);
        setDeleteTaskDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setTaskDialog(false);
    };

    const hideDeleteTaskDialog = () => {
        setDeleteTaskDialog(false);
    };

    const deleteTask = () => {     
        TaskService.deleteTaskApi(task._id)
        getAllTask()
        setDeleteTaskDialog(false);
        setTask(TaskService.emptyTask);

        toast.current.show({ severity: 'success', summary: 'Successo', detail: 'Task Deletada', life: 3000 });
    };

    const editTask = (task: Task) => {
        setTask({ ...task });
        setRepeticao(task.repeticao);
        setTaskDialog(true);
    };

    const deleteTaskDialogFooter = (
        <React.Fragment>
            <Button label="Nâo" icon="pi pi-times" outlined onClick={hideDeleteTaskDialog} />
            <Button label="Sim" icon="pi pi-check" severity="danger" onClick={deleteTask} />
        </React.Fragment>
    );

    const saveTask = () => {
        setSubmitted(true);
        if (task.name.trim() && task.descricao.trim() && task.shell.trim()) {
            let _tasks = [...tasks];
            let _task = { ...task };

            if (task._id) {
                TaskService.putTask(_task, task._id)
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Task atualizada com sucesso', life: 3000 });
            } else {

                _tasks.push(_tasks);
                TaskService.creatTask(_task);
                toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Task criada com sucesso', life: 3000 });
            }
            getAllTask()
            setTasks(_tasks);
            setTaskDialog(false);
            setTask(TaskService.emptyTask);
            setRepeticao([])
        }
    };

    const taskDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveTask} />
        </React.Fragment>
    );

    const actionBody = (rowData: Task) => {
        return <Button style={{ minWidth: '4rem', height:'2rem'}} onClick={() => execPro(rowData)} type="button" icon="pi pi-play"></Button>;
    };

    async function execPro(task) {
        setVisible(true)
        await TaskService.executarTask(task);
        setVisible(false)
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Execução solicitada com sucesso', life: 3000 });
      }

    const onInputNumberChange = (e, name: string) => {
        const val = e.value || 0;
        let _task = { ...task };

        _task[`${name}`] = val;

        setTask(_task);
    };


    const onInputChange = (e, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _task = { ...task };
        _task[`${name}`] = val;
        setTask(_task);
    };

    function onChangePeriodo(e: DropdownChangeEvent, name: string) {
        const val = (e.target && e.target.value) || '';

        let _task = { ...task };
        _task[`${name}`] = val;

        setRepeticao(_task.repeticao)

        setTask(_task);
    }

    function onChangeSemana(e: MultiSelectChangeEvent, name: string) {
        const val = (e.target && e.target.value) || '';
        
        let _task = { ...task };
        _task[`${name}`] = val;

        setTask(_task);
    };


    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable key={task.id} ref={dt} value={tasks} selection={selectedTasks} onSelectionChange={(e) => setSelectedTasks(e.value)}
                    dataKey="_id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} tasks" /*globalFilter={globalFilter} header={header}*/>
                    <Column header="Execuçâo"  body={actionBody} />
                    <Column field="name" header="Name" sortable style={{ width: '25%' }}></Column>
                    <Column field="descricao" header="Descrição" sortable style={{ width: '25%' }}></Column>
                    <Column field="repeticao.name" header="Periodo" sortable style={{ width: '25%' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '13rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={taskDialog} style={{ width: '43rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Configurações" modal footer={taskDialogFooter} onHide={hideDialog}>
                <div className="p-fluid">
                    <label htmlFor="name" className="font-bold">
                        Nome
                    </label>
                    <InputText id="name" value={task.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !task.name })} />
                    {submitted && !task.name && <small className="p-error">Name e obrigatorio.</small>}
                </div>
                <div className="p-fluid">
                    <label htmlFor="descricao" className="font-bold">
                        Descrição
                    </label>
                    <InputTextarea id="descricao" value={task.descricao} onChange={(e) => onInputChange(e, 'descricao')} rows={3} cols={20} required autoFocus className={classNames({ 'p-invalid': submitted && !task.descricao })} />
                    {submitted && !task.descricao && <small className="p-error">Descricao e obrigatorio.</small>}
                </div>
                <div className="p-fluid">
                    <label htmlFor="shell" className="font-bold">
                        Shell
                    </label>
                    <InputTextarea id="shell" value={task.shell} onChange={(e) => onInputChange(e, 'shell')} rows={3} cols={20} required autoFocus className={classNames({ 'p-invalid': submitted && !task.shell })} />
                    {submitted && !task.shell && <small className="p-error">Script shell e obrigatorio.</small>}
                </div>

                <div className='card'>
                    <div className="p-fluid" style={{ marginTop: '0.5em' }}>
                        <label htmlFor="agenda" className="font-bold">
                            Periodicidade
                        </label>
                    </div>
                    <Fieldset>
                        <div className="p-fluid">
                            <Dropdown value={task.repeticao} onChange={(e) => onChangePeriodo(e, 'repeticao')} options={TaskService.Erepeticao} optionLabel="name"
                                placeholder="Selecione a periodicidade" className="w-full md:w-14rem" />
                        </div>

                        {repeticao.code === "D" && (
                            <>
                                <div className="p-fluid" style={{ marginTop: '1em' }}>
                                    <label htmlFor="dias" className="font-bold block mb-2">Repetir a cada {task.dias} dias</label>
                                    <InputNumber inputId="dias" value={task.dias} onChange={(e) => onInputNumberChange(e, 'dias')} useGrouping={false} />
                                </div>
                            </>
                        )}

                        <>

                            {repeticao.code === "S" && (
                                <div className="card flex justify-content-center">
                                    <>
                                    </>

                                    <div className="p-fluid" style={{ marginTop: '1em' }}>
                                        <label htmlFor="dtIni"  >
                                            Dias da semana
                                        </label>
                                        <MultiSelect value={task.semanas} onChange={(e: MultiSelectChangeEvent) => onChangeSemana(e, 'semanas')} options={TaskService.semanas} optionLabel="name"
                                            placeholder="Selecione os dia da semana" maxSelectedLabels={3} className="w-full md:w-20rem" />
                                    </div>

                                </div>
                            )}

                        </>

                        <>

                            {repeticao.code === "M" && (
                                <div className="card flex justify-content-center">
                                    <>
                                    </>

                                    <div className="p-fluid" style={{ marginTop: '1em' }}>
                                        <label htmlFor="dtIni" >
                                            Dias da semana
                                        </label>
                                        <InputText placeholder="Ex: 1,2,15" id="diasMes" value={task.diasMes} onChange={(e) => onInputChange(e, 'diasMes')} />
                                    </div>

                                </div>
                            )}

                        </>

                        {/* Nova opção para execução de hora em hora */}
                        {repeticao.code === "H" && (
                            <div className="p-fluid" style={{ marginTop: '1em' }}>
                                <label htmlFor="minutoHora" className="font-bold block mb-2">Minuto da hora para execução (0-59)</label>
                                <InputNumber inputId="minutoHora" value={task.minutoHora} onChange={(e) => onInputNumberChange(e, 'minutoHora')} min={0} max={59} useGrouping={false} />
                            </div>
                        )}

                    </Fieldset>
                </div>            
            </Dialog>

            <Dialog visible={deleteTaskDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteTaskDialogFooter} onHide={hideDeleteTaskDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {task && (
                        <span>
                            Tem certeza de que deseja excluir <b>{task.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            {visible &&(
                <div className="overlay">
                        <ProgressSpinner/>
                </div>
            )}

        </div>
    );
}
