import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TasksExecutionService from '../../service/TasksExecutionService'
import "./styles.css";
        
interface Report {
  code: string;
  name: string;
  url: string;
}

interface RR {
  number: number,
    url: string
}

type Props = {};

const RobotPage = (props: Props) => {

  useEffect(() => {
    getAllReportName()
  }, []);

  async function getAllReportName(){
    setReportsName(await TasksExecutionService.getAllReportExecution())
}

async function getReportFilter(value){
  setSelectedReport(value)
  const dados = await TasksExecutionService.getReportExecution(value)
  setReports(dados.builds)
}
  const [selectedReport, setSelectedReport] = useState(null);
  const [getReportsName, setReportsName] = useState<Report[]>([]);
  const [getReports, setReports] = useState<RR[]>([]);

  const startContent = (
    <React.Fragment>
      <div className="card flex justify-content-center">
        <Dropdown value={selectedReport} onChange={(e) => getReportFilter(e.value)} options={getReportsName}
          placeholder="Selecione o Task" className="w-full md:w-3rem" />
      </div>
    </React.Fragment>
  );

  const link = (getReports) => (
    <React.Fragment>
       <a target="_blank" rel="noopener noreferrer" href={getReports.url+'robot/report/log.html'} className='link'>Abrir</a>
    </React.Fragment>
  );

  return (
    <>
      <div className="card">
        <Toolbar start={startContent} />
      </div>

      <div className="card">
            <DataTable value={getReports} tableStyle={{ minWidth: '50rem' }}>
                <Column field="number" header="Code"></Column>
                <Column body={link} header="Url"></Column>
            </DataTable>
        </div>

    </>

  );
};

export default RobotPage;