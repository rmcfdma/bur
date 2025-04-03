import axios from 'axios';
import Service from './Service';
import type { IComponente } from '~/types/IComponente';
import type { IFuncoesComponentes } from '~/types/IFuncoesComponente';

interface FuncoesComponentes extends Omit<IFuncoesComponentes, "componentes" | "funcoes"> {
};

interface ComponenteForm extends Omit<IComponente, "bruds" | "emprestimos" | "usuarios" | "funcoes_componentes"> {
  funcoes_componentes: FuncoesComponentes[];
}

export default class ComponenteService extends Service {
  constructor(api_base_url: string) {
    super(api_base_url)
  }

  create = async (componente: IComponente) => {
    try {
      if (!componente)
        throw new Error("O Componente não foi definido.")
      const resultado = await axios.post(`${this.api_base_url}/componentes`, { data: { componente: componente } }, { params: { includeToken: true } })
      return resultado.data;
    } catch (error) {
      console.error(error)
      return null
    }
  }

  remove = async (componente: ComponenteForm) => {
    try {
      const resultado = await axios.delete(`${this.api_base_url}/componentes/${componente.ID_COMPONENTES}/${componente.CPF}`, { params: { includeToken: true } })
      return resultado;
    } catch (error) {
      console.error(error)
      return undefined;
    }
  }

  removeAll = async (listaId: number[], listaJpeg: object[]) => {
    try {
      const resposta = await axios.delete(`${this.api_base_url}/componentes`, { data: {listaId: listaId, listaJpeg: listaJpeg}, params: { includeToken: true } })
      console.log("No service removeAll o resposta é: " + resposta)   
      console.log("No service removeAll o resposta.data é: " + resposta.data)
      console.log("No service removeAll o resposta.data.resultado é: " + resposta.data.resultado)
      return resposta.data;    
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  edit = async (componente: IComponente, exclusao: number[], inclusao: IFuncoesComponentes[]) => {
    try {
      const resultado = await axios.put(`${this.api_base_url}/componentes/${componente['ID_COMPONENTES']}`, { data: { componente: componente, exclusao: exclusao, inclusao: inclusao } }, { params: { includeToken: true } })
      return resultado;
    } catch (error) {
      console.error(error)
    }
  }

  getComponentesByBrud = async (brud: number) => {
    try {
      const componentes = await axios.get(`${this.api_base_url}/componentes/brud/${brud}`, { params: { includeToken: true } });
      return componentes.data;
    } catch (error) {
      console.error('Erro ao buscar componentes:', error);
      throw error; // Trate o erro conforme necessário
    }
  };

  getComponenteByCpf = async (cpf: string) => {
    try {
      const componente = await axios.get(`${this.api_base_url}/componentes/cpf/${cpf}`, { params: { includeToken: true } });
      return componente.data;
    } catch (error) {
      console.error('Erro ao buscar componentes:', error);
      throw error; // Trate o erro conforme necessário
    }
  };

  getComponenteByTefa = async (tefa: string) => {
    try {
      const componente = await axios.get(`${this.api_base_url}/componentes/tefa/${tefa}`, { params: { includeToken: true } });
      return componente.data;
    } catch (error) {
      console.error('Erro ao buscar componentes:', error);
      throw error; // Trate o erro conforme necessário
    }
  };

  getComponentesByName = async (name: string) => {
    try {
      const componentes = await axios.get(`${this.api_base_url}/componentes/nome/${name}`, { params: { includeToken: true } });
      return componentes.data;
    } catch (error) {
      console.error('Erro ao buscar componentes:', error);
      throw error; // Trate o erro conforme necessário
    }
  };

  getComponenteByFullname = async (fullname: string) => {
    try {
      const componentes = await axios.get(`${this.api_base_url}/componentes/fullname/${fullname}`, { params: { includeToken: true } });
      return componentes.data;
    } catch (error) {
      console.error('Erro ao buscar componentes:', error);
      throw error; // Trate o erro conforme necessário
    }
  };

  getComponentesByPage = async (page: number, size: number) => {
    try {
      const componentes = await axios.post(`${this.api_base_url}/componentes/pagination`,
        {data:{ "page": page, "size": size}}, {params:{ "includeToken": true } })
      return componentes.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        console.log("getComponentesByPage")
        return error
      }
    }
  }

  getComponentes = async () => {
    try {
      const componentes = await axios.get(`${this.api_base_url}/componentes`, { params: { includeToken: true } })
      return componentes.data
    } catch (error) {
      console.error(error)
    }
  }

  getComponenteById = async (id: number) => {
    let componente = null
    try {
      componente = await axios.get(`${this.api_base_url}/componentes/id2/${String(id)}`, { params: { includeToken: true } })
    } catch (error) {
      console.error(error)
    }
    return componente
  }

  getComponentesCount = async () => {
    try {
      const count = await axios.get(`${this.api_base_url}/componentes/count`, { params: { includeToken: true } })
      return count.data.count;
    } catch (error) {
      console.error(error)
      return undefined;
    }
  }

  getCep = async (cep: string) => {
    try {
      const endereco = await axios.get(`https://viacep.com.br/ws/${cep}/json/`, { params: { includeToken: true } })
      return endereco.data
    } catch (error) {
      return undefined
    }
  }

}