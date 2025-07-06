import axios from "axios";

const URL = process.env.REACT_APP_URL_BACKEND;

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      logout()
    }
  });



const putTask = async(task, id)=> {
    await axios.put(URL + 'robos/'+ id,task
      )
      .then((response) => response)
      .catch(function (error) {
        
      });
}

const login = async(user, senha)=> {  
 const data = await axios.post(URL+'token',
     {
    username: user,
    password: senha
  },
  {headers: {'content-type': 'application/x-www-form-urlencoded'}})

  if(data.status===200){
    console.log(data.data)
    return data.data
  }
  console.log(data.data)
  return false

}



const validaLogin= async (token)=>{
    const data = await axios.get(URL+'users/me/', {
        headers: {
          Authorization: 'Bearer ' + token 
        }
       })

 if(data.status===200){
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  localStorage.setItem("isAuthenticated", 'true');
  localStorage.setItem("token", token);
   return true
 }
 localStorage.removeItem('isAuthenticated')
 localStorage.removeItem('token')
 return false
}

const configAxio=  ()=> {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  return true
}

const logout=  ()=> {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('token')
}


const deleteTaskApi= async (_id)=> {

    await axios.delete(URL + 'robos/'+ _id,
      )
      .then((response) => response)
      .catch(function (error) {
        
      });
}

 const creatTask= async(task)=> {

    await axios.post(URL + 'robos/',task
      )
      .then((response) => response)
      .catch(function (error) {
        
      });
}

const executarTask= async(task)=> {
   axios.post(URL + 'executar/',task
    )
    .then((response) => response)
    .catch(function (error) {
      
    });
}



const getAllTasks = async ()=> {
   const dados =await axios.get(URL+ 'robos/', {
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        
      });
return dados
}

const semanas = [
    { name: 'Segunda', code: 1 },
    { name: 'Terça', code: 2 },
    { name: 'Quarta', code: 3 },
    { name: 'Quinta', code: 4 },
    { name: 'Sexta', code: 5 },
    { name: 'Sabado', code: 6 },
    { name: 'Domingo', code: 7 },
];

let emptyTask = {
    id: null,
    name: '',
    descricao: '',
    shell: '',
    repeticao: '',
    dtIni:'',
    dtFin:'' ,
    diasMes:'' ,
    dias: 0,
    semanas:''
};

const Erepeticao = [
    { name: 'Diariamente', code: 'D' },
    { name: 'Semanalmente', code: 'S' },
    { name: 'Mensalmente', code: 'M' },
    { name: 'Hora em hora', code: 'H' },
    { name: 'Desabilitado', code: 'N' },
];

const TaskService = {
    getAllTasks,
    creatTask,
    putTask,
    deleteTaskApi,
    login,
    validaLogin,
    executarTask,
    configAxio,
    logout,
    semanas,
    emptyTask,
    Erepeticao

};
export default TaskService
