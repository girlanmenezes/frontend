import React, { useState, useRef } from 'react';
import "./Login.css";
import TaskService from '../../service/TaskService';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../redux/features/authSlice'

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
      toast.current.show({ severity: 'warn', summary: 'Alerta', detail: 'Preencha os campos obrigatórios', life: 3000 });
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Usuário ou senha inválidos', life: 3000 });
    }
  }

  return (
    <div className="login-container">
      <Toast ref={toast} />
      <div className="login-left">
        <h1>WATI!</h1>
        <p>Qualidade de Software.</p>
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          <input
            type="text"
            placeholder="Username or email"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-options">
            <label><input type="checkbox" /> Remember me</label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="login-btn">Sign In</button>
          <p className="login-footer">
            New here? <a href="#">Create an Account</a>
          </p>
        </form>
      </div>
    </div>
  );
}
