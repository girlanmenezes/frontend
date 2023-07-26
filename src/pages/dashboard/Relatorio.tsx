import { useEffect, useState } from "react";
import Chart from "./Charts";
import TasksExecutionService from '../../service/TasksExecutionService'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Divider } from 'primereact/divider';


export default function App() {
  const [data, setdata] = useState();
  const [dataerror, setErro] = useState();

  useEffect(() => {
    getAllReportName()
  }, []);

  async function getAllReportName(){
    setdata(await TasksExecutionService.getAtendimentoContaMensal())
    setErro(await TasksExecutionService.AllatendimentoContaErro())
}


  return (
    <div className="App">
      <Chart data={data} />
      <br></br>
      <br></br>
      <br></br>
      <Divider></Divider>
      
      <div className="card">
            <DataTable value={dataerror} tableStyle={{ minWidth: '50rem' }}>
                <Column field="atendimento" header="Atendimento"></Column>
                <Column field="conta" header="Conta"></Column>
                <Column field="tela" header="Tela"></Column>
                <Column field="status" header="Status"></Column>
            </DataTable>
        </div>  
    </div>
  );
}