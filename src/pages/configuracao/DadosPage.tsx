import TasksExecutionService from '../../service/TasksExecutionService'
import React, { useEffect, useState } from 'react';
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';

interface Dados {
  roboName: string;
  usuario: string;
  senha: string;
  url: string;
  diasRetroativo: number;
  opcional1: string;
  opcional2: string;
  opcional3: string;
}


const DadosPage = () => {
  const [dadoscs, setDados] = useState<Dados[] | null>(null);

  useEffect(() => {
      TasksExecutionService.getAlldados().then((data)=> setDados(data))
  }, []);

  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
      let { newData, index } = e;
      let _dadosc = { ...newData };
      
      TasksExecutionService.putDados(_dadosc, newData.roboName)
      TasksExecutionService.getAlldados().then((data)=> setDados(data))
  };

  const textEditor = (options) => {
      return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback(e.target.value)} />;
  };

  const psEditor = (options) => {
    return <Password  value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback(e.target.value)} feedback={false}/>;
};


const senhaBodyTemplate = (options) => {
    return formatDate(options.senha)
};
const formatDate = (value) => {
    let res = value.substring(0, 2);
    return res+"****"
};


  return (
    <div className="card p-fluid">
    <DataTable value={dadoscs} editMode="row" dataKey="roboName" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }}>
        <Column field="roboName" header="Nome" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
        <Column field="usuario" header="Usuario" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
        <Column field="senha" header="Senha" body={senhaBodyTemplate} editor={(options) => psEditor(options)} style={{ width: '20%' }}></Column>
        <Column field="url" header="URL" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
        <Column field="diasRetroativo" header="Dias Retroativos" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
        <Column field="opcional1" header="Opcional1" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
        <Column field="opcional2" header="Opcional2" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
        <Column field="opcional3" header="Opcional3" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
    </DataTable>
</div>
  );
};
export default DadosPage;