import { useEffect, useState } from "react";
import Chart from "./Charts";
import TasksExecutionService from '../../service/TasksExecutionService'

export default function App() {
  const [data, setdata] = useState();

  useEffect(() => {
    getAllReportName()
  }, []);

  async function getAllReportName(){
    setdata(await TasksExecutionService.getAtendimentoContaMensal())
    console.log(data)
}


  return (
    <div className="App">
      <Chart data={data} />
    </div>
  );
}