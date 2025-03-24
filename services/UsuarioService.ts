import axios from 'axios';
import Service from './Service';
import type { IUsuario } from '~/types/IUsuario';

export default class UsuarioService extends Service {

  constructor(api_base_url: string) {
    super(api_base_url);
  }

  getUsuarios = async () => {
    try {
      const usuarios = await axios.get(`${this.api_base_url}/usuarios`, { params: { includeToken: false } })
      return usuarios.data;
    } catch (error) {
      console.error(error)
    }
  }
  
  removeAll = async (lista: number[]) => {
    try {
      const usuarios = await axios.delete(`${this.api_base_url}/usuarios`, {data: lista, params: { includeToken: true }})
      return usuarios.data;
    } catch (error) {
      console.error(error)
      return undefined
    }
  }
  
  include = async (usuario: IUsuario) => {
    try {
      const resultado = await axios.post(`${this.api_base_url}/usuarios`, { usuario: usuario, params: { includeToken: true } })
      return resultado.data;
    } catch (error) {
      console.error(error)
    }
  }
  
  remove = async (id: number) => {
    try {
      const resultado = await axios.delete(`${this.api_base_url}/usuarios/${id}`, {params: { includeToken: true }})
      return resultado;
    } catch (error) {
      console.error(error)
    }
  }
  
  edit = async (usuario: IUsuario) => {
    console.log(usuario)
    try {
      const resultado = await axios.put(`${this.api_base_url}/usuarios/${usuario['ID_USUARIOS']}`, { usuario, "include-token": true })
      return resultado;
    } catch (error) {
      console.error(error)
    }
  }
  
  getUsuariosByPage = async (page: number, size: number) => {
    try {
      const usuarios = await axios.post(`${this.api_base_url}/usuarios/pagination`, {
        "page": page, "size": size, "includeToken": true
      })
      return usuarios.data;
    } catch (error) {
      throw error
    }
  }
  
  getUsuarioByUsername = async (username: string) => {
    try {
      const usuario = await axios.post(`${this.api_base_url}/usuarios/username/${username}`, { "includeToken": true })
      return usuario.data;
  
    } catch (error) {
      console.error(error)
    }
  }
  
  getUsuarioByComponente = async (id_componente: number) => {
    try {
      const usuario = await axios.get(`${this.api_base_url}/usuarios/componente/${id_componente}`, { params: { includeToken: true } })
      return usuario.data[0];
    } catch (error) {
      console.error(error)
    }
  }
  
  getUsuariosByNomeComponentes = async (nome: string) => {
    try {
      const usuarios = await axios.get(`${this.api_base_url}/usuarios/componentes/${nome}`, { params: { includeToken: true } })
      return usuarios.data;
    } catch (error) {
      console.error(error)
    }
  }
  
  getUsuariosCount = async () => {
    
    try {
      const count = await axios.get(`${this.api_base_url}/usuarios/count`, { params: { includeToken: false } })
      console.log(count.data.count)
      return count.data.count;
    } catch (error) {
      console.error(error)
      //return undefined;
    }
  }
  
  authenticate = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${this.api_base_url}/usuarios/login`, {data: {username: username,
      password: password,}}, {params: {"includeToken": true}})
      console.log(response.status)
      return { accessToken: response.data.accessToken, refreshToken: response.data.refreshToken, status: response.status, statusText: response.statusText}
    }
    catch (error) {
      throw error
    }
  }
  
  
  
}