import { useEffect, useState } from "react";
import TasksExecutionService from '../../service/TasksExecutionService'

type Props = {};

const DadosPage = (props: Props) => {
  const [submitted, setSubmitted] = useState<any>(false);
  
  useEffect(() => {
   // report()
}, []);


async function report(){
  setSubmitted(await TasksExecutionService.getReport())
  console.log(submitted)
}

  return (
    <div dangerouslySetInnerHTML={{__html: submitted}} />
  );
};

export default DadosPage;