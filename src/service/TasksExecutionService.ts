import axios from "axios";

const URL = process.env.REACT_APP_URL_BACKEND;


let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://192.168.57.80:8080/job/Robot/3/robot/report/report.html',
  headers: {'X-Requested-With': 'XMLHttpRequest',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': '*/*',
  'Accept': '*/*'},
  auth: {
    username: 'admin',
    password: '115621a99ae85be6ccc018810debdf154c'
  }
};


const getAllTasksExecution = async ()=> {

    const dados =await axios.get(URL+ 'results/', {
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
 
    });
return dados
}


const getAlldados = async ()=> {

  const dados =await axios.get(URL+ 'dados/', {
  })
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {

  });
return dados
}

const creatDados= async(dados)=> {

  await axios.post(URL + 'dados/',dados
    )
    .then((response) => response)
    .catch(function (error) {
      
    });
}


const getAllReportExecution = async ()=> {

  const dados =await axios.get(URL+ 'report/', {
  })
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    
  });
  console.log(dados)
return dados
}
/*
const getReportExecution = async (name)=> {

  const dados =await axios.get(URL+ 'report/'+name, {
  })
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    
  });
return dados
}

*/

const getReportExecution = async (name)=> {
  let config2 = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://192.168.57.80:8080/job/'+name+'/api/json',
    headers: {'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': '*/*',
    'Accept': '*/*'},
    auth: {
      username: 'admin',
      password: '115621a99ae85be6ccc018810debdf154c'
    }
  };

  const dados =await axios.request(config2)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    
  });
  
return dados
}

const putDados = async(dados, roboName)=> {
  await axios.put(URL + 'dados/'+ roboName,dados
    )
    .then((response) => response)
    .catch(function (error) {
      
    });
}

const getReport = async ()=> {
  const dados =await axios.request(config)
.then((response) => {
  console.log(response)
  return response.data;
})
.catch((error) => {
  console.log(error);
}
)
return dados}

const TasksExecutionService = {
    getAllTasksExecution,
    getAllReportExecution,
    getReportExecution,
    getReport,
    getAlldados,
    creatDados,
    putDados

};
export default TasksExecutionService
