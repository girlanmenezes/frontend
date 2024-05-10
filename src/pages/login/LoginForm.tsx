import React, { useState, useRef } from 'react';
import "./styles.css";
import TaskService from '../../service/TaskService';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../redux/features/authSlice'
import assets from "../../assets";


export default function LoginForm() {

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef<Toast>(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (usuario.trim() && password.trim()) {
        let status = await TaskService.login(usuario, password)
        let valida = await TaskService.validaLogin(status.access_token)
        if (valida) {
          dispatch(setCredentials({ ...status, usuario }))
          setUsuario('')
          setPassword('')
          navigate('/')          
        }
      }
      toast.current.show({ severity: 'warn', summary: 'Alerta', detail: 'Favor Preencher os campos obrigatorios', life: 3000 });

    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Usuario ou senha invalida', life: 3000 });
    }
  }


  return (
    <div className="container">
      <Toast ref={toast} />
      <div className="container-login">
        <div className="wrap-login">

          
            <img className= "img-logo" src={assets.images.pg}  alt='MV'/>
          

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-title">
            <img src={assets.images.logow}  alt='WATI'/> 
            </div>
            <div className="wrap-input">
              <input
                className={usuario !== "" ? "has-val input" : "input"}
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Usuario"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

};