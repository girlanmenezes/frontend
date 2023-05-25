import axios from "axios";

const URL = process.env.REACT_APP_URL_BACKEND;


let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:8080/job/Robot/3/robot/report/report.html',
  headers: {'X-Requested-With': 'XMLHttpRequest',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': '*/*',
  'Accept': '*/*'},
  auth: {
    username: 'admin',
    password: '114164d43fd345c30cd4e8d1cc5577a009'
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
    url: 'http://localhost:8080/job/'+name+'/api/json',
    headers: {'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': '*/*',
    'Accept': '*/*'},
    auth: {
      username: 'admin',
      password: '114164d43fd345c30cd4e8d1cc5577a009'
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
    getReport

};
export default TasksExecutionService
