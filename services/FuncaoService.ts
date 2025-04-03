import axios from 'axios';
import Service from './Service';

export default class FuncaoService extends Service {
  
  constructor(api_base_url: string) {
    super(api_base_url);
  }

  getFuncoes = async () => {
    try {
      const funcoes = await axios.get(`${this.api_base_url}/funcoes`, { params: { includeToken: false } })
      return funcoes.data;
    } catch (error) {
      console.error(error)
    }
  }
}